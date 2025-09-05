import { FilterActionTypes, FilterType } from '@/types/FilterTypes';
import React, { ActionDispatch, Dispatch, PropsWithChildren, SetStateAction, useCallback, useEffect, useState } from 'react'
import MainButton from '../buttons/MainButton';
import { FaClock, FaClockRotateLeft, FaFile, FaFilter, FaRegClock, FaServer, FaTag, FaUser } from 'react-icons/fa6';
import FormTextInput from '../input/FormTextInput';
import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";
import { FaTimes } from 'react-icons/fa';
import SmallButton from '../buttons/SmallButton';
import { useToast } from '@/hooks/contextHooks';
import { IconType } from 'react-icons';
import FilterSizeBar from './FilterSizeBar';
import useSharingUsers from '@/hooks/sharing/useSharingUsers';
import { Tag, User } from '@/types/Entities';
import { throwAxiosError } from '@/utils/forms';
import CheckBoxContent from '../input/CheckBoxContent';
import UserImage from '../user/UserImage';
import useFetchTags from '@/hooks/tagHooks/useFetchTags';

type Props = {
    dispatchFilter: ActionDispatch<[action: FilterActionTypes]> | null,
    currentFilter: FilterType,
    setShowFilter: Dispatch<SetStateAction<boolean>>
}

const FilterComponent = ({currentFilter, dispatchFilter, setShowFilter}: Props) => {

    const toast = useToast();
    const fetchSharingUsers = useSharingUsers();
    const fetchTags = useFetchTags();

    const [name, setName] = useState(currentFilter.name || "");
    const [minDate, setMinDate] = useState(currentFilter.minDate);
    const [maxDate, setMaxDate] = useState(currentFilter.maxDate);
    const [maxSize, setMaxSize] = useState(currentFilter.maxSize || 1024);
    const [minSize, setMinSize] = useState(currentFilter.minSize || 0);
    const [users, setUsers] = useState<Set<number>>(currentFilter.users || new Set());
    const [tags, setTags] = useState<Set<number>>(currentFilter.tags || new Set());

    const [availableTags, setAvailableTags] = useState<Tag[]>([]);
    const [availableUsers, setAvailableUsers] = useState<User[]>([]);

    useEffect(() => {
        fetchSharingUsers()
        .then(users => setAvailableUsers(users))
        .catch(err => throwAxiosError(err, toast));
    }, [])

    useEffect(() => {
        fetchTags()
        .then(tags => setAvailableTags(tags))
        .catch(err => throwAxiosError(err, toast));
    }, [])

    const setToastDateMessage = () => {
        toast.setToast({
            message: "Maximum date has to be grater than minimum date.",
            status: null,
            type: "ERROR"
        })
    }

    const setMaxDateAction = (date: Date | null) => {
        if (minDate && date && minDate > date){
            setToastDateMessage();
            return;
        }   

        setMaxDate(date);
    }

    const setMinDateAction = (date: Date | null) => {
        if (maxDate && date && maxDate < date){
            setToastDateMessage();
            return;
        }   

        setMinDate(date);
    }

    const applyFilters = () => {
        if (!dispatchFilter) return;
        dispatchFilter({type: "SET_FILTER", payload: {
            name,
            maxDate, 
            minDate, 
            maxSize,
            minSize,
            tags,
            users
        }});
        setShowFilter(false);
    }


    return (
        <>
            <div className='fixed top-[50%] left-[50%] translate-[-50%] sm:min-w-[500px] flex flex-col gap-5 z-40 bg-background px-[30px] py-[20px] rounded-[10px]'>
                
                <span className='flex items-center gap-4 font-bold text-[20px]'>
                   <FaFilter/> Filter files and folders
                </span>

                <Field
                    type='TEXT'
                    placeholder='File name'
                    value={name}
                    setValue={(string: string) => setName(string)}
                    Icon={FaFile}
                    name='Name'
                />

                <div className='flex gap-8 justify-between flex-1'>
                    <Field
                        type='TIME'
                        placeholder='Pick a date'
                        value={minDate}
                        setValue={setMinDateAction}
                        Icon={FaClock}
                        name='Min date'
                    />


                    <Field
                        type='TIME'
                        placeholder='Pick a date'
                        value={maxDate}
                        setValue={setMaxDateAction}
                        Icon={FaClock}
                        name='Max date'
                    />
                </div>


                <div className='flex flex-col gap-[15px]'>
                    <Title>
                        <FaServer/>
                        Size
                    </Title>

                    <div className='font-14-regular flex justify-between'>
                        <span>
                            Min size: {minSize?.toFixed(0)} mb
                        </span>

                        <span>
                            Max size: {maxSize?.toFixed(0)} mb
                        </span>
                    </div>
                        
                    <div className='flex flex-col gap-1'>
                        <FilterSizeBar minSize={minSize} maxSize={maxSize} setMaxSize={setMaxSize} setMinSize={setMinSize} offset={1024} unit='MB'/>

                        <div className='flex justify-between text-[12px] font-bold'>
                            <span>
                                0 mb
                            </span>

                            <span>
                                1024 mb
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col gap-2'>
                    <Title>
                        <FaUser/>
                        Sharing with / shared from
                    </Title>

                    <div className='flex gap-4'>
                        {availableUsers.map(user => {
                            return (
                                <CheckBoxContent setSelected={setUsers} value={user.id} key={user.id} preSelected={users.has(user.id)}>
                                    <UserImage src={user.picture} height={15} width={15}/>
                                    <span className='font-14-regular'>{user.username}</span>
                                </CheckBoxContent>
                            )
                        })}
                        
                    </div>
                </div>


                <div className='flex flex-col gap-2'>
                    <Title>
                        <FaTag/>
                        Tags
                    </Title>

                    <div className='flex gap-4'>
                        {availableTags.map(tag => {
                            return (
                                <CheckBoxContent setSelected={setTags} value={tag.id} key={tag.id} preSelected={tags.has(tag.id)}>
                                    <div style={{backgroundColor: tag.hex_color}} className='w-[15px] aspect-square rounded-full'/>
                                    <span className='font-14-regular'>{tag.name}</span>
                                </CheckBoxContent>
                            )
                        })}
                        
                    </div>
                </div>
                
                <div className='flex justify-end gap-3 mt-[30px]'>
                    <MainButton centered onClick={() => setShowFilter(false)} size='SMALL'>
                        Cancel
                    </MainButton>

                    <MainButton centered onClick={applyFilters} size='SMALL'>
                        Apply filters
                    </MainButton>
                </div>
            </div>

            <div className='faded'/>
        </>
    )
}

const Title = ({children}: PropsWithChildren) => {
    return (
        <span className='flex items-center gap-4 font-14-bold'>
            {children}
        </span>
    )
} 

type FieldProps = ({
    type: "TIME", 
    value: Date | null, 
    setValue: (date: Date | null) => void,
} | {
    type: "TEXT",
    value: string,
    setValue: (string: string) => void
}) & {
    name: string,
    Icon: IconType,
    placeholder: string
}

const Field = ({type, value, setValue, name, Icon, placeholder}: FieldProps) => {

    return (
        <div className='flex flex-col gap-2 w-full z-40'>
            <div className='font-16-bold flex items-center justify-between'>
                <Title>
                    <Icon/>
                    {name}
                </Title>
                {value && <SmallButton onClick={() => {
                    if (type === "TEXT") {
                        setValue("");
                    }else{
                        setValue(null);
                    }
                }}>
                    <FaTimes/>
                </SmallButton>}
            </div>
            {type == "TIME" ? 
            <DatePicker 
                placeholderText={placeholder}
                className='outline-0 w-full bordered text-[14px]' 
                selected={value} 
                onChange={date => setValue(date)}
            /> : 
            <input 
                className='input !text-[14px] !py-[2px] !w-full "placeholder:text-[14px]' 
                placeholder={placeholder}
                value={value}
                onChange={e => setValue(e.target.value)}
            /> }
        </div>
    )
}

export default FilterComponent