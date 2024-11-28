interface StoneSliderProps{
    min: number,
    max: number,
    value: number
}

export function StoneSlider(props: StoneSliderProps){
    return <div className="stoneSlider">
        <input type="range" min={props.min} max={props.max} value={props.value} />
    </div>
}