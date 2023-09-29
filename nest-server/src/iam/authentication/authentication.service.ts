import { ConflictException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { HashingService } from '../hashing/hashing.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import jwtConfig from '../config/jwt.config';
import { CurrentUserData } from '../interfaces/active-user-data.interface';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { randomUUID } from 'crypto';
import { RefreshTokenStorageService } from 'src/redis/token/refresh-token.storage';
import { InvalidRefreshTokenError } from 'src/redis/token/invalid-refresh-token-error';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfigurations: ConfigType<typeof jwtConfig>,
    private readonly refreshTokenStorageService: RefreshTokenStorageService,
  ) { }

  async signUp(signUpDto: SignUpDto) {
    try {
      const user = new User();
      user.username = signUpDto.username;
      user.email = signUpDto.email;
      user.password = await this.hashingService.hash(signUpDto.password);

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
