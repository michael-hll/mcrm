import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUppercase, IsIn } from "class-validator";
import { EntityOperations } from "src/base/enum/entity-operations.enum";
import { ROLE_CODE_MIN_LENGTH } from "src/roles/roles.constants";


export class UpdateUserRoleDto {

    @IsString()
    @Length(ROLE_CODE_MIN_LENGTH)
    @IsUppercase()
    @ApiProperty()
    code: string;

    @IsString()
    @IsIn([EntityOperations.CREATE,EntityOperations.DELETE])
    @ApiProperty({description: 'Operation value could be C or D'})
    operation: string;
}