import { ReactNode } from "react"

interface StoneButtonProps {
    href: string,
    children: ReactNode
    disabled?: true | boolean
}

export function StoneButton(props: StoneButtonProps) {
    return <a
        id="stoneButton"
        href={props.href}
        style={props.disabled ? {
            pointerEvents: "none"
        } : {}}
    >
        <button
            style={props.disabled ? {
                opacity: 0.3
            } : {}}
        >{props.children}</button>
    </a>
}