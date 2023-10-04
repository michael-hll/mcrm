import { SetMetadata } from "@nestjs/common";
import { Base } from "../base";

export const MODULE_CLASS_NAME = '$MODULE_CLASS_NAME$';

/**
 * Used for decorate controler's module name
 * In order to make the roles permissions system work
 * @param name 
 * @returns 
 */
export const ModuleClassName = (name: string) => SetMetadata(MODULE_CLASS_NAME, name);