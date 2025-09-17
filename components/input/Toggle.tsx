import React, { useEffect, useState } from 'react'

type Props = {
    preActivated: boolean,
    action: () => void
}

const Toggle = ({preActivated, action}: Props) => {

    const click = () => {
        action();
    }

    return (
        <div className={'relative h-[22px] w-[48px] border-1 border-border p-[3px] rounded-full cursor-pointer box-border transition-all ' + (preActivated ? "bg-border" : "bg-background")} onClick={click}>
            <div className={'h-full aspect-square bg-accent rounded-full transition-all ' + (!preActivated ? "translate-x-0" : "translate-x-[24px]")}/>
        </div>
    )
}

export default Toggle