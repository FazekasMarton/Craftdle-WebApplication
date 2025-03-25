import { SoundEffect } from "../classes/Audio"

/**
 * Props for the Button component.
 */
interface ButtonProps {
    /**
     * The color of the button.
     */
    color: "green" | "gray";

    /**
     * Optional click handler for the button.
     */
    onClick?: () => void;

    /**
     * The content to be displayed inside the button.
     */
    children: string;
}

/**
 * Button component to render a button with specified color and click handler.
 * 
 * This component plays a click sound effect when clicked and executes the provided click handler.
 * 
 * @param props - The props for the component.
 * @param props.color - The color of the button ("green" or "gray").
 * @param props.onClick - Optional click handler for the button.
 * @param props.children - The content to be displayed inside the button.
 * @returns The Button component.
 */
export function Button(props: ButtonProps) {
    const { color, onClick, children } = props;

    return (
        <button
            className={`${color}Button button`}
            onClick={() => {
                SoundEffect.play("click");
                if (onClick) onClick();
            }}
        >
            {children}
        </button>
    );
}