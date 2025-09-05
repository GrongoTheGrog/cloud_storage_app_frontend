import React, { Dispatch, Ref, RefObject, SetStateAction, use, useEffect, useRef, useState } from 'react'

type SetState <T> = Dispatch<SetStateAction<T>>


type Props = {
    minSize: number,
    maxSize: number,
    setMinSize: SetState<number>;
    setMaxSize: SetState<number>;
    offset: number,
    unit: "BYTES" | "KB" | "MB" | "GB"
}

const FilterSizeBar = ({minSize, maxSize, setMinSize, setMaxSize, offset, unit}: Props) => {

    const minSizePosition = (minSize || 0) / offset * 100;
    const maxSizePosition = (maxSize || offset) / offset * 100;

    const [moving, setMoving] = useState();
    const [bar, setBar] = useState<HTMLDivElement | null>(null);

    const fullBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        setBar(fullBarRef.current);
    }, [])

    const setMinSizeAction = (newMinSize: number) => {
        if (newMinSize < maxSize) {
            setMinSize(newMinSize);
        }
    }

    const setMaxSizeAction = (newMaxSize: number) => {
        if (newMaxSize > minSize) {
            setMaxSize(newMaxSize);
        }
    }



    return (
        <div className='relative h-[15px] w-full bg-border rounded-[100px]' ref={fullBarRef}>

            <Dragable position={minSizePosition} setState={setMinSizeAction} offset={offset} bar={bar}/>
            <Dragable position={maxSizePosition} setState={setMaxSizeAction} offset={offset} bar={bar}/>

            <div style={{left: `${minSizePosition}%`, right: `${100 - maxSizePosition}%`}} className='absolute h-[15px] z-30 shaded'/>
        </div>
    )
}

const Dragable = ({position, setState, offset, bar}: {position: number, setState: (n: number) => void, offset: number, bar: HTMLDivElement | null}) => {


    const mouseMove = (e: MouseEvent) => {
        const barWidth = bar!.clientWidth;
        const mouse = e.clientX;
        const mousePosition = mouse - bar!.getBoundingClientRect().left;

        console.log(mousePosition);
        console.log(barWidth);
        console.log("");

        let percentage = mousePosition / barWidth;
        if (percentage >= 1) percentage = 1;
        if (percentage <= 0) percentage = 0;
        setState(percentage * offset);
    }

    const mouseUpEvent = () => {
        window.removeEventListener("mousemove", mouseMove);
        window.removeEventListener("mouseup", mouseUpEvent);
    }

    const mouseDownEvent = () => {
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUpEvent);
    }



    return (
        <div style={{left: `${position}%`}} className='h-[15px] translate-x-[-50%] absolute aspect-square bg-accent rounded-full hover:bg-foreground transition-colors duration-200 z-[35] cursor-pointer' onMouseDown={mouseDownEvent}/>
    )
}

export default FilterSizeBar