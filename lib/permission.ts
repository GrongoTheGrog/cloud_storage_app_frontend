import { useItem } from "@/app/(items)/layout"
import { FilePermissions, rolePermissions } from "@/types/Permissions";

export const userHasPermission = () => {
    const {fileRole, dispatch} = useItem();
    return (permission: FilePermissions) => {
        if (!fileRole) return false;
        return rolePermissions[fileRole].has(permission)
    }
}