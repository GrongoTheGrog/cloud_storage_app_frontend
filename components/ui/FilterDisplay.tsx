import { useFilter } from '@/context/FilterContext'
import React, { ReactNode } from 'react'
import CheckBoxContent from '../input/CheckBoxContent';
import { FaTimes } from 'react-icons/fa';
import { formatDate, formatDateHour } from '@/lib/time';

const FilterDisplay = () => {

    const {filterObject, dispatchFilter} = useFilter();

    if (!dispatchFilter) return null;

    return (
        <div className={'flex gap-5 flex-wrap  mt-[10px]'}>
            <FilterTag 
                clearFilter={() => dispatchFilter({type: "SET_MIN_DATE", payload: null})} 
                name='Min date' 
                value={formatDate(filterObject.minDate?.toISOString())}
            />

            <FilterTag 
                clearFilter={() => dispatchFilter({type: "SET_MAX_DATE", payload: null})} 
                name='Max date' 
                value={formatDate(filterObject.maxDate?.toISOString())}
            />

            {filterObject.minSize != 0 && <FilterTag 
                clearFilter={() => dispatchFilter({type: "SET_MIN_SIZE", payload: null})} 
                name='Min size' 
                value={filterObject.minSize && filterObject.minSize?.toFixed(0) + " mb"}
            />}

            {filterObject.maxSize != 1024 && <FilterTag 
                clearFilter={() => dispatchFilter({type: "SET_MAX_SIZE", payload: null})} 
                name='Max size' 
                value={filterObject.maxSize && filterObject.maxSize?.toFixed(0) + " mb"}
            />}
        </div>
    )
}

const FilterTag = ({clearFilter, value, name}: {clearFilter: () => void, value: string | number | null | undefined, name: string}) => {

    return (
        <>
            {(value && value !== "") && 
            <button className='flex items-center gap-2 cursor-pointer bg-border text-[14px] px-[15px] rounded-full !min-h-0 p-0 !py-[1px] hover:light-shadow' onClick={clearFilter}>
                <FaTimes/>
                <span>
                    {name}: {value}
                </span>
            </button>}
        </>
    )
}

export default FilterDisplay