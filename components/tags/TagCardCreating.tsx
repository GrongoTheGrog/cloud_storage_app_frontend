import { useToast } from '@/hooks/contextHooks'
import useCreateTag from '@/hooks/tagHooks/useCreateTag'
import { Tag } from '@/types/Entities'
import { throwAxiosError } from '@/utils/forms'
import React, { ChangeEvent, Dispatch, SetStateAction, useCallback, useRef, useState } from 'react'
import Toast from '../ui/Toast'
import FormTextInput from '../input/FormTextInput'
import MainButton from '../buttons/MainButton'
import { FaEdit, FaTimes } from 'react-icons/fa'
import { FaCheck } from 'react-icons/fa6'
import { isColorDark } from '@/lib/FileFunctions'

type Props = {
    setTags: Dispatch<SetStateAction<Tag[]>>,
    setCreating: Dispatch<SetStateAction<boolean>>
}

const TagCardCreating = ({setTags, setCreating}: Props) => {

    const [hexColor, setHexColor] = useState("#B22222");
    const predefinedColors = [
        "#B22222",
        "#4F7942",
        "#2C3E50",
        "#D4AF37",
        "#5DADE2",
        "#DA70D6"
    ];

    const createTag = useCreateTag();
    const toast = useToast();

    const isDark = isColorDark(hexColor);

    const timer = useRef<ReturnType<typeof setTimeout>>(null);

    const createTagAction = useCallback((formData: FormData) => {
        const name = formData.get("tagName");
        const description = formData.get("description");

        if (!name || !hexColor || !description){
            toast.setToast({
                message: "All fields in tag creation are required.",
                status: null,
                type: "ERROR"
            });
            return;
        }

        createTag(
            name.toString().trim(), 
            description.toString().trim(), 
            hexColor
        ).then(tag => {
            setTags(prev => [...prev, tag])
        }).catch(err => {
            console.log(err);
            throwAxiosError(err, toast)
        });
    }, [hexColor])

    const setHexColorAction = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (timer.current){
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            setHexColor(e.target.value);
        }, 200);
    }, [])

    return (
        <form className='flex flex-col gap-2 p-2 rounded-[5px] border-1 border-accent' action={createTagAction}>

            <FormTextInput className="!p-1 !text-[12px] !font-regular !py-0.5 !px-[10px] !w-full" name='tagName' placeholder="Tag name" password={false}/>

            <FormTextInput className="!p-1 !text-[12px] !font-regular !py-0.5 !px-[10px] !w-full" name='description' placeholder="Description" password={false}/>

            <div className='relative flex items-center px-[24px] my-[5px] gap-2 justify-baseline'>

                <div className='grid grid-cols-3 gap-[4px] min-w-[55px] grid-rows-2'>
                    {predefinedColors.map(color => (
                        <button 
                            type='button' 
                            className={`w-full aspect-square cursor-pointer rounded-[3px] outline-0`} 
                            style={{backgroundColor: color}} 
                            key={color}
                            onClick={() => setHexColor(color)}
                        >
                        </button>
                    ))}
                </div>

                <label className={`p-0 rounded-[10px] cursor-pointer ${isDark ? "text-background" : "text-foreground"}`} htmlFor='color' style={{backgroundColor: hexColor}} >
                    <FaEdit className='m-[8px] size-4'/>
                </label>

                <input type='color' id='color' name='color' className='w-[0px] absolute left-0 top-[100%]' onChange={setHexColorAction}/>

                <span className='font-14-bold'>
                    Color: <span>{hexColor}</span>
                </span>
            </div>

            <div className='flex justify-between gap-2 w-full'>
                <MainButton size='SMALL' centered className='!min-w-0 w-full' onClick={() => setCreating(false)}>
                    <FaTimes/>
                </MainButton>

                <MainButton size='SMALL' centered background className='!min-w-0 w-full' submit>
                    <FaCheck/>
                </MainButton>
            </div>
        </form>
    )
}

export default TagCardCreating