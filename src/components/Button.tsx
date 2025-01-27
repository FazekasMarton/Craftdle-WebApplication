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
 * @param props - The props for the component.
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