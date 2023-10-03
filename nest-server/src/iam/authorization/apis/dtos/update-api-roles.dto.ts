import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { IsRowValueDuplicated } from "src/base/validators/row-duplicate.validator";
import { UpdateApiRoleDto } from "./update-api-role.dto";

class UpdateApiRoleMany {

    @IsString()
    api_key: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateApiRoleDto)
    @IsRowValueDuplicated({}, ['code']) 
    roles: UpdateApiRoleDto[]
}

export class UpdateApiRoleManyDto {

    @ValidateNested({each: true})
    @Type(() => UpdateApiRoleMany)
    apis: UpdateApiRoleMany[]
}

