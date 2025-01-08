import clickSound from "../assets/audios/click.mp3";
import achievementSound from "../assets/audios/Achievement.mp3";

const clickAudio = new Audio(clickSound);
clickAudio.preload = "auto";

const achievementAudio = new Audio(achievementSound);
achievementAudio.preload = "auto";

export class SoundEffect {
    static play(effect: "click" | "achievement") {
        switch (effect) {
            case "click":
                new Audio(clickSound).play();
                break;
            case "achievement":
                new Audio(achievementSound).play();
                break;
        }
    }
}