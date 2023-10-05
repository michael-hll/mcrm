import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsUppercase, IsIn } from "class-validator";
import { EntityOperations } from "src/base/enum/entity-operations.enum";
import { ROLE_CODE_MIN_LENGTH } from "src/roles/roles.constants";
import { IsRowValueDuplicated } from "../validators/row-duplicate.validator";


export class UpdateRolesDto {

    @IsString()
    @Length(ROLE_CODE_MIN_LENGTH)
    @IsUppercase()
    @ApiProperty()
    @IsRowValueDuplicated()
    code: string;

    @IsString()
    @IsIn([EntityOperations.CREATE,EntityOperations.DELETE])
    @ApiProperty({description: 'Operation value could be C or D'})
    operation: string;
}