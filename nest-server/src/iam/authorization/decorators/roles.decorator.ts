import { SetMetadata } from "@nestjs/common";
import { RoleCodes } from "../enums/role.codes";

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleCodes[]) => SetMetadata(ROLES_KEY, roles);