
export type PopupTypes = "DELETE" | "WARNING" 

export interface PopupInterface {
    type: PopupTypes,
    title: string,
    subtitle: string,
    format?: "NORMAL" | "INPUT",
    mainText: string,
    action: ((input: string) => void) | (() => void)
}


export interface PopupContext {
    activate: (popup: PopupInterface) => void;
    popup: PopupInterface;
}