import FilterComponent from '@/components/ui/Filter';
import { Item, Tag, User } from '@/types/Entities';
import { FilterType, FilterActionTypes, FilterContext } from '@/types/FilterTypes';
import React, { createContext, PropsWithChildren, useContext, useReducer, useState } from 'react'

const initialFilter = {
    maxDate: null,
    minDate: null,
    maxSize: null,
    minSize: null,
    tags: null,
    name: null,
    users: null
}

const Provider = createContext<FilterContext>({
    filter: (items: Item[]) => items,
    dispatchFilter: null,
    setShowFilter: null,
    filterObject: initialFilter
});

export const useFilter = (): FilterContext => {
    return useContext(Provider);
}


const action = (prevState: FilterType, action: FilterActionTypes): FilterType => {
    switch (action.type){
        case "SET_MAX_DATE":
            return {...prevState, maxDate: action.payload};
        case "SET_MIN_DATE":
            return {...prevState, minDate: action.payload};
        case "SET_MAX_SIZE":
            return {...prevState, maxSize: action.payload};
        case "SET_MIN_SIZE":
            return {...prevState, minSize: action.payload};
        case "SET_TAGS":
            return {...prevState, tags: action.payload};
        case "SET_USERS":
            return {...prevState, users: action.payload};
        case "SET_FILTER":
            return action.payload;
        case "SET_NAME":
            return {...prevState, name: action.payload}
        case "CLEAR": 
            return initialFilter;
    }
}


const FilterContextProvider = ({children}: PropsWithChildren) => {

    const [currentFilter, dispatchFilter] = useReducer(action, initialFilter);
    const [showFilter, setShowFilter] = useState(false);


    const filter = (items: Item[]) => {
        return items?.filter(item => {
            return (
                (!currentFilter.maxDate || new Date(item.created_at) < currentFilter.maxDate) &&
                (!currentFilter.minDate || new Date(item.created_at) > currentFilter.minDate) &&
                (!currentFilter.maxSize || item.size < currentFilter.maxSize * 1024 * 1024) &&
                (!currentFilter.minSize || item.size > currentFilter.minSize * 1024 * 1024) &&
                (!currentFilter.name || currentFilter.name === "" || item.name.includes(currentFilter.name)) &&
                (!currentFilter.tags || item.tagJoins.some(tagJoin => currentFilter.tags?.has(tagJoin.tag.id))) &&
                (!currentFilter.users || currentFilter.users.size === 0 || item.sharedItems.some(sharedItem => 
                    currentFilter.users?.has(sharedItem.owner.id) || 
                    currentFilter.users?.has(sharedItem.user.id)
                ))
            )
        });
    }

    console.log(currentFilter)

    return (
        <Provider.Provider value={{filter, dispatchFilter, setShowFilter, filterObject: currentFilter}}>
            {children}
            {showFilter && <FilterComponent currentFilter={currentFilter} dispatchFilter={dispatchFilter} setShowFilter={setShowFilter}/>}
        </Provider.Provider>
    )
}

export default FilterContextProvider