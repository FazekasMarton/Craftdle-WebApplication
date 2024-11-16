import clickSound from "../assets/audios/click.mp3"

const clickAudio = new Audio(clickSound)
clickAudio.preload = "auto"

export class SoundEffect{
    static click = clickAudio
}