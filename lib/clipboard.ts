import React from 'react'

export const getFileFromClipboard = async (): Promise<Blob> => {
    let clipboard;

    try{
        clipboard = await navigator.clipboard.read();
    }catch(err){
        throw new Error("Failed to access clipboard. Try again later.");
    }
    
    for (const item of clipboard){
        for (const type of item.types){
            if (
                type.startsWith("image/") ||
                type === "application/pdf" || 
                type === "application/json" ||
                type.startsWith("video")
            ){
                return item.getType(type);
            }
        }
    }

    throw new Error("No files found on clipboard.");
}