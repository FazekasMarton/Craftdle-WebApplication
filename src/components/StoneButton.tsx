import { ReactNode } from "react";
import { SoundEffect } from "../classes/Audio";
import { Link } from "react-router-dom";

interface StoneButtonProps {
    href?: string;
    children: ReactNode;
    disabled?: true | boolean;
    onClick?: () => void
}

export function StoneButton(props: StoneButtonProps) {
    return (
        <Border href={props.href} disabled={props.disabled} onClick={props.onClick}>
            <button
                style={props.disabled ? { opacity: 0.3 } : {}}
                disabled={props.disabled ? true : false}
            >
                {props.children}
            </button>
        </Border>
    );
}

function Border(props: StoneButtonProps) {
    let click = props.onClick ? props.onClick : () => {}
    return props.href ? (
        <Link
            className="stoneButton"
            to={props.href}
            style={props.disabled ? { pointerEvents: "none" } : {}}
            onClick={() => {SoundEffect.play("click"); click()}}
        >
            {props.children}
        </Link>
    ) : (
        <div
            className="stoneButton"
            style={props.disabled ? { pointerEvents: "none" } : {}}
            onClick={() => {SoundEffect.play("click"); click()}}
        >
            {props.children}
        </div>
    );
}
