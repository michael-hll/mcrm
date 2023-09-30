import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateRoleDto } from './create-role.dto';

export class UpdateRoleDto extends OmitType(PartialType(CreateRoleDto), ['code']) {}
