export type FileRoles = "ADMIN_ROLE" | "VIEW_ROLE" | "EDIT_ROLE";

export type FilePermissions = "VIEW" | "UPDATE" | "DELETE" | "SHARE" | "MOVE";

export const rolePermissions: Record<FileRoles, Set<FilePermissions>> = {
    "VIEW_ROLE": new Set(["VIEW"]),
    "EDIT_ROLE": new Set(["VIEW", "UPDATE"]),
    "ADMIN_ROLE": new Set(["VIEW", "UPDATE", "DELETE", "SHARE", "MOVE"])
}