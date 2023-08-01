import { PERMISSION_ENUM, ROLE_ENUM } from '@/types/permission';

/* The `ROLE_BASED_ACCESS_CONTROL` constant is an object that defines the permissions for different
roles in the application. It uses TypeScript's `Record` type to ensure that the keys of the object
are of type `ROLE_ENUM` and the values are arrays of type `PERMISSION_ENUM`. */
export const ROLE_BASED_ACCESS_CONTROL: Record<ROLE_ENUM, readonly PERMISSION_ENUM[]> = {
  [ROLE_ENUM.OWNER]: [PERMISSION_ENUM.ALL],
  [ROLE_ENUM.ADMIN]: [PERMISSION_ENUM.ALL],
  [ROLE_ENUM.CONTRIBUTOR]: [PERMISSION_ENUM.VISIBLE, PERMISSION_ENUM.READ, PERMISSION_ENUM.UPDATE],
  [ROLE_ENUM.GUEST]: [PERMISSION_ENUM.VISIBLE, PERMISSION_ENUM.READ],
  [ROLE_ENUM.USER]: [PERMISSION_ENUM.VISIBLE],
} as const;

/* The `APP_PERMISSION_LIST` constant is an object that defines different permissions for specific
actions or features in the application. It maps each action or feature to an array of roles that
have permission to perform that action or access that feature. */
export const APP_PERMISSION_LIST = {
  APP_LEVEL: Object.keys(ROLE_BASED_ACCESS_CONTROL) as ROLE_ENUM[], // Allow access permission based on all roles. This is used for the app level.
  SECRET_PAGE: [ROLE_ENUM.ADMIN], // Allow access permission based on the ADMIN role. This is used for the secret page.
} as const;

export type APP_PERMISSION_KEY = keyof typeof APP_PERMISSION_LIST;
