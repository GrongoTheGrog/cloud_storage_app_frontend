import React, { PropsWithChildren, ReactNode } from 'react'

type Props = {
    text: string | null | undefined | number,
    preText?: string,
    className?: string
}

const TextSk = ({text, preText, className}: Props) => {
    return text ? (
        <span className={className}>
            {text}
        </span>
    ) : (
        <span className={className}>
            {preText || "Loading..."}
        </span>
    )
}

export default TextSk