import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { IsRowValueDuplicated } from "src/base/validators/row-duplicate.validator";
import { UpdateApiRoleDto } from "./update-api-role.dto";
import { ApiProperty } from "@nestjs/swagger";

class UpdateApiRoleMany {

    @IsString()
    @ApiProperty()
    api_key: string;

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => UpdateApiRoleDto)
    @IsRowValueDuplicated({}, ['code']) 
    @ApiProperty({type: UpdateApiRoleDto, isArray: true})
    roles: UpdateApiRoleDto[]
}

export class UpdateApiRoleManyDto {

    @ValidateNested({each: true})
    @Type(() => UpdateApiRoleMany)
    @ApiProperty({type: UpdateApiRoleMany, isArray: true})
    apis: UpdateApiRoleMany[]
}

