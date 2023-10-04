import { SetMetadata } from "@nestjs/common";

export const IS_ADMIN_ONLY = '$IS_ADMIN_ONLY$';

/**
 * Used for decorate api's admin role only
 * @param name 
 * @returns 
 */
export const UseAdmin = () => SetMetadata(IS_ADMIN_ONLY, true);