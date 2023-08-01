import { useMemo } from 'react';

import type { APP_PERMISSION_KEY } from '@/constants/role-based-access-control';
import { APP_PERMISSION_LIST, ROLE_BASED_ACCESS_CONTROL } from '@/constants/role-based-access-control';
import { useAuth } from '@/providers/AuthProvider';
import type { ROLE_ENUM } from '@/types/permission';
import { PERMISSION_ENUM } from '@/types/permission';

/**
 * The function checks if a given permission type is included in a list of available permissions.
 * @param availablePermissions - An array of available permissions. It is of type `readonly
 * PERMISSION_ENUM[]`, which means it is an array of elements of type `PERMISSION_ENUM` and cannot be
 * modified once defined.
 * @param {PERMISSION_ENUM} permissionType - The `permissionType` parameter is the specific permission
 * type that you want to check for access permission.
 * @returns a boolean value.
 */
const isAccessPermission = (availablePermissions: readonly PERMISSION_ENUM[], permissionType: PERMISSION_ENUM) => {
  return availablePermissions.includes(PERMISSION_ENUM.ALL) || availablePermissions.includes(permissionType);
};

/**
 * The function `getPermissionAccessRecord` returns an object that indicates whether certain
 * permissions are allowed based on the provided `availablePermissions` array.
 * @param availablePermissions - The `availablePermissions` parameter is an array of `PERMISSION_ENUM`
 * values. It represents the permissions that are available for access.
 * @returns The function `getPermissionAccessRecord` returns an object with properties indicating
 * whether certain permissions are allowed or not. The properties returned are:
 * - `allowAll` - Indicates whether the user has access to all permissions.
 * - `allowCreate` - Indicates whether the user has access to create permissions.
 * - `allowRead` - Indicates whether the user has access to read permissions.
 * - `allowUpdate` - Indicates whether the user has access to update permissions.
 * - `allowDelete` - Indicates whether the user has access to delete permissions.
 * - `allowVisible` - Indicates whether the user has access to visible permissions.
 */
const getPermissionAccessRecord = (availablePermissions: readonly PERMISSION_ENUM[]) => {
  return {
    allowAll: availablePermissions.includes(PERMISSION_ENUM.ALL),
    allowCreate: isAccessPermission(availablePermissions, PERMISSION_ENUM.CREATE),
    allowRead: isAccessPermission(availablePermissions, PERMISSION_ENUM.READ),
    allowUpdate: isAccessPermission(availablePermissions, PERMISSION_ENUM.UPDATE),
    allowDelete: isAccessPermission(availablePermissions, PERMISSION_ENUM.DELETE),
    allowVisible: isAccessPermission(availablePermissions, PERMISSION_ENUM.VISIBLE),
  };
};

/**
 * The `useRoleBasedAccessControl` function is a TypeScript function that checks the user's roles and
 * returns the permission access record based on the specified permission name.
 * @param permissionName - The `permissionName` parameter is a string that represents the name of a
 * specific permission. It is used to determine the available roles and permissions for that particular
 * permission.
 * @returns The function `useRoleBasedAccessControl` returns the `permissionAccessRecord`, which is a
 * record of permissions based on the user's role and the specified permission name.
 */
export const useRoleBasedAccessControl = (permissionName: APP_PERMISSION_KEY = 'APP_LEVEL') => {
  const { user } = useAuth();

  const permissionAccessRecord = useMemo(() => {
    if (!user) return getPermissionAccessRecord([]);
    const roles = user.roles || [];

    const availableRoles: Readonly<ROLE_ENUM[]> = APP_PERMISSION_LIST[permissionName] || [];

    const filteredAvailableRoles = availableRoles.filter(availableRole => roles.includes(availableRole));
    if (!filteredAvailableRoles.length) return getPermissionAccessRecord([]);

    const availablePermissions = filteredAvailableRoles.flatMap(
      availableRole => ROLE_BASED_ACCESS_CONTROL[availableRole],
    );

    const uniqueAvailablePermissions = [...new Set(availablePermissions)];

    if (!uniqueAvailablePermissions.length) {
      console.error(`No permissions found for role(s): ${filteredAvailableRoles.join(', ')}`);
      return getPermissionAccessRecord([]);
    }

    return getPermissionAccessRecord(uniqueAvailablePermissions);
  }, [user, permissionName]);

  return permissionAccessRecord;
};
