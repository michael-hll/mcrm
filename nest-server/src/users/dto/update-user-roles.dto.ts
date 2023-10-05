import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UpdateRolesDto } from "src/base/dto/update-roles.dto";


export class UpdateUserRolesDto {

    @ValidateNested({each: true})
    @Type(() => UpdateRolesDto)
    @ApiProperty({isArray: true, type: UpdateRolesDto})
    roles: UpdateRolesDto[];
}