import { EntityOperations } from "./EntityOperations";

export interface AddRemoveRoles {
  code: string;
  operation: EntityOperations.CREATE | EntityOperations.DELETE;
}