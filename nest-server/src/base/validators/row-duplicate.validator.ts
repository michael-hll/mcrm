import {
    ValidationArguments,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    registerDecorator,
} from 'class-validator';
import { Injectable } from '@nestjs/common';

/**
 * Use it on your dto column:
 * `@Validate(RowDuplicateValidator, ['column-1','column-2',...])`
 */
@ValidatorConstraint({ async: true })
@Injectable()
class RowDuplicateValidator implements ValidatorConstraintInterface {

    async validate(
        items: object[],
        validationArguments?: ValidationArguments): Promise<boolean> {
        const columnNames = validationArguments.constraints;
        if (!items
            || items.length == 0
            || !columnNames
            || columnNames.length == 0) {
            return true;
        }
        const rowValueSet = new Set();
        for (const row of items) {
            rowValueSet.add(columnNames.map(name => row[name].toString()).join('-'));
        }
        return rowValueSet.size === items.length;
    }
    defaultMessage?(validationArguments?: ValidationArguments): string {
        return `Have duplicate row values in columns '${validationArguments.constraints}'.`;
    }
}

/**
 * Use it on your dto column names:
 * `@IsRowValueDuplicated({}, ['column-1', 'column-2',...])`
 * @param options 
 * @param columnNames 
 * @returns 
 */
export function IsRowValueDuplicated(options?: ValidationOptions, columnNames?: any[]) {
    return (o: object, propertyName: string) => {
        registerDecorator({
            target: o.constructor,
            propertyName,
            options,
            validator: RowDuplicateValidator,
            async: true,
            constraints: columnNames
        })
    }
}