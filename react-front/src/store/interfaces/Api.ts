import { AddRemoveRoles } from "./AddRemoveRoles";
import { Role } from "./Role";

export interface Api {

  key: string;

  description: string;

  module: string;

  module_name: string;

  controller: string;

  controller_name: string;

  api: string;

  api_name: string;

  is_amdin: boolean;
  
  roles: Role[];
}

interface UpdateApiRoles {

  api_key: string;

  roles: AddRemoveRoles[]
}

export interface UpdateApiRolesMany {

  apis: UpdateApiRoles[]
}