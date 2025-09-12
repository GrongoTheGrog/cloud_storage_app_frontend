import { ActionFiles } from "@/app/(items)/layout";
import { Item } from "./Entities"
import { FileRoles } from "./Permissions"
import { ActionDispatch } from "react";

export type ItemContextPayload = {
    fileRole: FileRoles | null,
    item: Item | null,
    isLoading: boolean,
    error: null | string;
    filePreviewLink: null | string;
}

export type ItemContext = {
    dispatch: ActionDispatch<[ActionFiles]>
} & ItemContextPayload