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
 * @param props - The properties for the StoneSlider component.
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