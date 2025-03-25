import { ReactNode } from "react";
import { SoundEffect } from "../classes/Audio";
import { Link } from "react-router-dom";
import { store } from "../app/store";
import { deleteInfo, setInfo } from "../features/info/infoSlice";

/**
 * Props for the StoneButton component.
 */
interface StoneButtonProps {
    href?: string;
    newTab?: boolean;
    children: ReactNode;
    disabled?: true | boolean;
    onClick?: () => void;
    info?: {
        title?: string,
        titleColor?: string,
        text: string
    };
}

/**
 * StoneButton component to display a button with optional link and info tooltip.
 * @param props - The properties for the StoneButton component.
 * @returns The StoneButton component.
 */
export function StoneButton(props: StoneButtonProps) {
    return (
        <Border href={props.href} newTab={props.newTab} disabled={props.disabled} onClick={props.onClick} info={props.info}>
            <button
                style={props.disabled ? { opacity: 0.3 } : {}}
                disabled={props.disabled ? true : false}
            >
                {props.children}
            </button>
        </Border>
    );
}

/**
 * Border component to handle the button's border and interactions.
 * 
 * This component wraps the button and provides additional functionality,
 * such as playing a sound effect, handling tooltips, and managing link behavior.
 * 
 * @param props - The properties for the Border component.
 * @returns The Border component.
 */
function Border(props: StoneButtonProps) {
    const click = props.onClick ? props.onClick : () => {}
    const commonProps: React.HTMLAttributes<HTMLElement> = {
        className: props.disabled ? "disabledStoneButton" : "stoneButton",
        "aria-disabled": props.disabled,
        onClick: () => {
            SoundEffect.play("click");
            click();
            if(props.info){
                store.dispatch(deleteInfo())
            }
        },
        onMouseMove: props.info ? (e) => {
            store.dispatch(setInfo({x: e.clientX, y: e.clientY, title: props.info?.title, titleColor: props.info?.titleColor, text: props.info?.text}))
        } : undefined,
        onMouseLeave: props.info ? () => {
            store.dispatch(deleteInfo())
        } : undefined,
    };

    return props.href ? (
        <Link {...commonProps} to={props.href} target={props.newTab ? "_blank" : undefined}>
            {props.children}
        </Link>
    ) : (
        <div {...commonProps}>
            {props.children}
        </div>
    );
}
