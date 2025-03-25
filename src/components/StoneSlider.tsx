import { ISettings } from "../interfaces/ISettings"

/**
 * Props for the StoneSlider component.
 */
interface StoneSliderProps {
    min: number,
    max: number,
    value: number,
    setValue: {
        fun: <K extends keyof ISettings>(key: K, value: ISettings[K]) => void,
        key: keyof ISettings
    }
}

/**
 * StoneSlider component to render a slider input.
 * 
 * This component allows users to select a value within a specified range.
 * It uses a callback function to update the value in the parent component.
 * 
 * @param props - The properties for the StoneSlider component.
 * @param props.min - The minimum value of the slider.
 * @param props.max - The maximum value of the slider.
 * @param props.value - The current value of the slider.
 * @param props.setValue - An object containing a function to update the value and the key to update.
 * @returns The StoneSlider component.
 */
export function StoneSlider(props: StoneSliderProps) {
    return <div className="stoneSlider">
        <input 
            type="range" 
            min={props.min} 
            max={props.max} 
            value={props.value} 
            onChange={(e) => {props.setValue.fun(props.setValue.key, Number(e.currentTarget.value))}}
        />
    </div>
}