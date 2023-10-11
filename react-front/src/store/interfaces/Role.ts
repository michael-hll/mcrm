export interface Role {
  code?: string;
  name?: string;
  description?: string;
  color?: string;
}
export interface RoleGrid {
  code?: string;
  name?: string;
  description?: string;
  color?: string;
  isNew?: boolean;
}

export const InitRoleInstance: RoleGrid = {
  code: '',
  name: '',
  description: '',
  color: '#339af0',
  isNew: false,
};