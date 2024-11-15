import { ReactNode } from "react"

interface StoneButtonProps {
    href?: string,
    children: ReactNode
    disabled?: true | boolean
}

export function StoneButton(props: StoneButtonProps) {
    return <Border disabled={props.disabled}>
        <button
            style={props.disabled ? {
                opacity: 0.3
            } : {}}
        >{props.children}</button>
    </Border>
}

function Border(props: StoneButtonProps) {
    return props.href ? (
        <a
            className="stoneButton"
            href={props.href}
            style={props.disabled ? {
                pointerEvents: "none"
            } : {}}
        >
            {props.children}
        </a>
    ) : (
        <div
            className="stoneButton"
            style={props.disabled ? {
                pointerEvents: "none"
            } : {}}
        >
            {props.children}
        </div>
    )
}