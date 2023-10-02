import { BadRequestException, ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { CurrentUserData } from '../interfaces/current-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { randomUUID } from 'crypto';
import { RefreshTokenStorageService } from 'src/redis/token/refresh-token.storage.service';
import { Role } from 'src/roles/entities/role.entity';
import { RoleCodes } from '../authorization/enums/role.codes';
import { CreateRoleDto } from 'src/roles/dto/create-role.dto';
import { DefaultUser } from './enums/default-user.enum';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenStorageService: RefreshTokenStorageService,
  ) { }

  async init() {
    // create default/admin roles
    const roles = [
      {
        code: RoleCodes.ADMIN,
        name: 'Administrator',
        description: 'An administrator role can update or delete user roles etc.',
      },
      {
        code: RoleCodes.DEFAULT,
        name: 'Default Role',
        description: 'When user sign up this default role will be assigned to the user.',
      }];
    await this.createDefaultRoles(roles);
    // create default admin user
    await this.createDefaultUsers();
  }

  private async createDefaultUsers() {
    const exists = await this.usersRepository.exist({ where: { email: DefaultUser.Email }})
    if(!exists){
      const user = this.usersRepository.create({
        username: DefaultUser.Username,
        password: await this.hashingService.hash(DefaultUser.Password),
        email: DefaultUser.Email,
        roles: [{
          code: RoleCodes.ADMIN,
        }],
      });
      await this.usersRepository.save(user);
    }    
  }

  private async createDefaultRoles(roles: CreateRoleDto[]) {
    for (let role of roles) {
      let exists = await this.rolesRepository.exist({ where: { code: role.code } });
      if (!exists) {
        const roleEntity = this.rolesRepository.create(role);
        await this.rolesRepository.save(roleEntity);
      }
    }
  }

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.username = signUpDto.username;
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);
      // assign default role: DEFAULT
      const role = await this.rolesRepository.findOne({ where: { code: RoleCodes.DEFAULT } });
      if (!role) {
        throw new BadRequestException('Default role doesnot exist in your system');
      }
      user.roles = [role];

      await this.usersRepository.save(user);
      return true;
    } catch (err) {
      const pgUniqueViolationErrorCode = '23505';
      if (err.code === pgUniqueViolationErrorCode) {
        throw new ConflictException('Email already exists.');
      }
      throw err;
    }
  }

  async singIn(signInDto: SignInDto) {
    const user = await this.usersRepository.findOneBy({
      email: signInDto.email,
    });
    if (!user) {
      throw new UnauthorizedException('User doesnot exist.');
    }
    const isEqual = await this.hashingService.compare(
      signInDto.password,
      user.password,
    );
    if (!isEqual) {
      throw new UnauthorizedException('Password doesnot match.')
    }

    return await this.generateTokens(user);
  }

  /**
   * 1. Generate a new token and a refresh token
   * 2. Save refresh token UUID to payload and redis
   * @param user 
   * @returns 
   */
  async generateTokens(user: User) {
    const refreshTokenId = randomUUID();
    try {
      const [accessToken, refreshToken] = await Promise.all([
        this.signToken<Partial<CurrentUserData>>(
          user.id,
          this.jwtConfigurations.accessTokenTtl,
          { email: user.email }
        ),
        this.signToken(
          user.id,
          this.jwtConfigurations.refreshTokenTtl, {
          refreshTokenId,
        }),
      ]);
      await this.refreshTokenStorageService.insert(user.id.toString(), refreshTokenId);
      return {
        accessToken,
        refreshToken,
      };
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }

  /**
   * 1. Verify refresh token use jwtService
   * 2. Get sub and refresh token uuid from payload
   * 3. Valid token uuid with redis
   * 4. Remove old token uuid from redis
   * 5. Finally generate a new token and a new refresh token
   * 6. Store the new refresh token uuid to redis
   * @param refreshTokenDto 
   * @returns 
   */
  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      const { sub, refreshTokenId } = await this.jwtService.verifyAsync<
        Pick<CurrentUserData, 'sub'> & { refreshTokenId: string }>(
          refreshTokenDto.refreshToken, {
          secret: this.jwtConfigurations.secret,
          audience: this.jwtConfigurations.audience,
          issuer: this.jwtConfigurations.issuer,
        });
      const user = await this.usersRepository.findOneByOrFail({ id: sub });
      const isValid = await this.refreshTokenStorageService.validate(user.id.toString(), refreshTokenId);
      if (isValid) {
        await this.refreshTokenStorageService.invalidate(user.id.toString());
      }
      return await this.generateTokens(user);
    } catch (err) {
      throw new UnauthorizedException(err.message ?? '');
    }
  }

  private async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfigurations.audience,
        issuer: this.jwtConfigurations.issuer,
        secret: this.jwtConfigurations.secret,
        expiresIn,
      }
    );
  }
}
