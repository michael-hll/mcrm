import { SetMetadata } from "@nestjs/common";

export const NAME = '$NAME$';

export const Name = (name: string) => SetMetadata(NAME, name);