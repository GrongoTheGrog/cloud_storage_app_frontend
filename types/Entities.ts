import { MediaType } from "./MediaTypes";

export interface User {
    id: number;
    username: string;
    email: string;
    picture: string
}

export interface Item {
    id: number;
    name: string;
    owner: User;
    folder: Folder;
    path: string;
    type: string;
    created_at: Date;
    updated_at: Date;
    isPublic: boolean;
    size: number

}

export interface Folder extends Item {
    storedFiles: Item[]
}

export interface File extends Item {
    fileType: MediaType
}