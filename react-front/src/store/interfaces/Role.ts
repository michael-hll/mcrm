export interface Role {
  code?: string;
  name?: string;
  description?: string;
}
export interface RoleGrid {
  code?: string;
  name?: string;
  description?: string;
  isNew?: boolean;
}

export const InitRoleInstance: RoleGrid = {
  code: '',
  name: '',
  description: '',
  isNew: false,
};