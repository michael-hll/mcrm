import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { CurrentUserData } from 'src/iam/interfaces/current-user-data.interface';
import { REQUEST_USER_KEY } from 'src/iam/iam.constants';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleCodes } from '../enums/role.codes';

@Injectable()
export class AdminRoleGuard implements CanActivate {
    
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
    ) { }

    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const user: CurrentUserData = context.switchToHttp().getRequest()[
            REQUEST_USER_KEY
        ];
        const roles = await this.usersRepository
            .createQueryBuilder('user')
            .relation(User, 'roles')
            .of(new User({id: user.sub}))
            .loadMany();
        for(let role of roles){
            if(role.code === RoleCodes.ADMIN){
                return true;
            }
        }
        return false;
    }
}