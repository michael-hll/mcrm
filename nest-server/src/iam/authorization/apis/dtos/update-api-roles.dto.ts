import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { IsRowValueDuplicated } from "src/base/validators/row-duplicate.validator";
import { ApiProperty } from "@nestjs/swagger";
import { UpdateRolesDto } from "src/base/dto/update-roles.dto";

class UpdateApiRoleMany {

    @IsString()
    @ApiProperty()
    api_key: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateRolesDto)
    @IsRowValueDuplicated({}, ['code']) 
    @ApiProperty({type: UpdateRolesDto, isArray: true})
    roles: UpdateRolesDto[]
}

export class UpdateApiRoleManyDto {

    @ValidateNested({each: true})
    @Type(() => UpdateApiRoleMany)
    @ApiProperty({type: UpdateApiRoleMany, isArray: true})
    apis: UpdateApiRoleMany[]
}

