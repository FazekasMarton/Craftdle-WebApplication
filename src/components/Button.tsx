import { SoundEffect } from "../classes/Audio"

interface ButtonProps{
    color: "green" | "gray",
    onClick?: () => void
    children: string
}

export function Button(props: ButtonProps){
    let click = props.onClick ? props.onClick : () => {}
    return <button className={`${props.color}Button button`} onClick={() => {
        SoundEffect.play("click")
        click()
    }}>{props.children}</button>
}