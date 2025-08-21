import { MediaType } from "@/types/MediaTypes";
import { IconType } from "react-icons";
import { FaFile, FaFileAudio, FaFileExcel, FaFileImage, FaFilePdf, FaFilePowerpoint, FaFileVideo, FaFileWord } from "react-icons/fa6";

export function getIcon(fileType: MediaType): IconType{
    
    switch (fileType) {
        case "application/vnd.ms-excel":
            return FaFileExcel;
        case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
            return FaFileExcel;

        case "application/msword":
            return FaFileWord;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
            return FaFileWord;

        case "application/vnd.ms-powerpoint":
            return FaFilePowerpoint;
        case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
            return FaFilePowerpoint;

        case "application/pdf":
            return FaFilePdf;
        
    }


    if (fileType.startsWith("audio")) return FaFileAudio;
    if (fileType.startsWith("video")) return FaFileVideo;
    if (fileType.startsWith("image")) return FaFileImage;

    return FaFile;
}

export function formatSize(size: number | undefined | null){
    if (!size) return "0 bytes"

    let finalSize = size;
    let sizeUnits = ["bytes", "kb", "mb", "gb", "tb"];
    let i = 0;

    while(finalSize > 1024){
        i++;
        finalSize /= 1024;
    };

    return `${Math.ceil(finalSize)} ${sizeUnits[i]}`

}

export function isColorDark(hex: string): boolean {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness < 128;
}