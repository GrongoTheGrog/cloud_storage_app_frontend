import { ActionDispatch, Dispatch, SetStateAction } from "react"
import { Item, Tag, User } from "./Entities"

export type FilterActionTypes = 
    {type: "SET_MAX_DATE", payload: Date | null} | 
    {type: "SET_MIN_DATE", payload: Date | null} |
    {type: "SET_MIN_SIZE", payload: number | null} |
    {type: "SET_MAX_SIZE", payload: number | null} |
    {type: "SET_TAGS", payload: Set<number> | null} |
    {type: "SET_USERS", payload: Set<number> | null} |
    {type: "SET_FILTER", payload: FilterType} | 
    {type: "SET_NAME", payload: string} |
    {type: "CLEAR"}

export type FilterType = {
    maxSize: number | null,
    minSize: number | null,
    maxDate: Date | null,
    minDate: Date | null,
    name: string | null,
    users: Set<number> | null,
    tags: Set<number> | null
}

export type FilterContext = {
    filter: (items: Item[]) => Item[]; 
    dispatchFilter: ActionDispatch<[action: FilterActionTypes]> | null;
    setShowFilter: Dispatch<SetStateAction<boolean>> | null,
    filterObject: FilterType
}