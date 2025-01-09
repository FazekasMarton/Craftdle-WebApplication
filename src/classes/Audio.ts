import clickSound from "../assets/audios/click.mp3";
import achievementSound from "../assets/audios/Achievement.mp3";
import creeperSound from "../assets/audios/creeper.mp3";

const clickAudio = new Audio(clickSound);
clickAudio.preload = "auto";

const achievementAudio = new Audio(achievementSound);
achievementAudio.preload = "auto";

const creeperAudio = new Audio(creeperSound);
creeperAudio.preload = "auto";

export class SoundEffect {
    static play(effect: "click" | "achievement" | "creeper") {
        switch (effect) {
            case "click":
                new Audio(clickSound).play();
                break;
            case "achievement":
                new Audio(achievementSound).play();
                break;
            case "creeper":
                new Audio(creeperSound).play();
                break;
        }
    }
}