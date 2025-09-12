import React, { useState } from 'react'

type Props = {
    preActivated: boolean,
    action: (setToggle: () => void) => void
}

const Toggle = ({preActivated, action}: Props) => {

    const [activated, setActivated] = useState(preActivated);

    const click = () => {
        action(() => setActivated(prev => !prev));
    }

    return (
        <div className={'relative h-[22px] w-[48px] border-1 border-border p-[3px] rounded-full cursor-pointer box-border transition-all ' + (activated ? "bg-border" : "bg-background")} onClick={click}>
            <div className={'h-full aspect-square bg-accent rounded-full transition-all ' + (!activated ? "translate-x-0" : "translate-x-[24px]")}/>
        </div>
    )
}

export default Toggle