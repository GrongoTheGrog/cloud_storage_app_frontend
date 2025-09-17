import { MediaType } from "./MediaTypes";

export interface User {
    id: number;
    username: string;
    email: string;
    picture: string
}

export interface Tag {
    user: User;
    name: string;
    description: string;
    id: number;
    hex_color: string;
}

export interface TagJoin {
    id: number;
    tag: Tag
}

export interface SharedItem {
    id: number,
    item: Item,
    owner: User,
    user: User
}

export interface Item {
    id: number;
    name: string;
    owner: User;
    folder: Folder;
    path: string;
    type: "FOLDER" | "FILE";
    created_at: string;
    updated_at: string;
    isPublic: boolean;
    size: number;
    storedFiles: Item[];
    fileType: MediaType
    tagJoins: TagJoin[]
    sharedItems: SharedItem[]

}

export interface Folder extends Item {
    storedFiles: Folder[] | File[]
}

export interface File extends Item {
    fileType: MediaType
}