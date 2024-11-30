import { ReactNode } from "react";
import { SoundEffect } from "../classes/Audio";
import { Link } from "react-router-dom";
import { store } from "../app/store";
import { deleteInfo, setInfo } from "../features/info/infoSlice";

interface StoneButtonProps {
    href?: string;
    children: ReactNode;
    disabled?: true | boolean;
    onClick?: () => void;
    info?: string;
}

export function StoneButton(props: StoneButtonProps) {
    return (
        <Border href={props.href} disabled={props.disabled} onClick={props.onClick} info={props.info}>
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
    const commonProps: React.HTMLAttributes<HTMLElement> = {
        className: props.disabled ? "disabledStoneButton" : "stoneButton",
        onClick: () => {
            SoundEffect.play("click");
            click();
        },
        onMouseMove: props.info ? (e) => {
            store.dispatch(setInfo({x: e.clientX, y: e.clientY, text: props.info || ""}))
        } : undefined,
        onMouseLeave: props.info ? () => {
            store.dispatch(deleteInfo())
        } : undefined,
    };

    return props.href ? (
        <Link {...commonProps} to={props.href}>
            {props.children}
        </Link>
    ) : (
        <div {...commonProps}>
            {props.children}
        </div>
    );
}
