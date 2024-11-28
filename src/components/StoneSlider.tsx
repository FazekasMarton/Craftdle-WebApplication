import { ISettings } from "../interfaces/ISettings"

interface StoneSliderProps{
    min: number,
    max: number,
    value: number,
    setValue: {
        fun: <K extends keyof ISettings>(key: K, value: ISettings[K]) => void,
        key: keyof ISettings
    }
}

export function StoneSlider(props: StoneSliderProps){
    return <div className="stoneSlider">
        <input type="range" min={props.min} max={props.max} value={props.value} onChange={(e) => {props.setValue.fun(props.setValue.key, Number(e.currentTarget.value))}}/>
    </div>
}