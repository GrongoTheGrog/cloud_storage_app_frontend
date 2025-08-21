
export type PopupTypes = "DELETE" | "WARNING" 

export interface PopupInterface {
    type: PopupTypes,
    title: string,
    subtitle: string,
    mainText: string,
    action: () => void
}


export interface PopupContext {
    activate: (popup: PopupInterface) => void;
    popup: PopupInterface;
}