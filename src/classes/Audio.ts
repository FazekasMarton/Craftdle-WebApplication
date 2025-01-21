// Import audio files
import clickSound from "../assets/audios/click.mp3";
import achievementSound from "../assets/audios/Achievement.mp3";
import creeperSound from "../assets/audios/creeper.mp3";
import { store } from "../app/store";

// Define sound effects with preloaded audio
const soundEffects = {
    "click": new Audio(clickSound),
    "achievement": new Audio(achievementSound),
    "creeper": new Audio(creeperSound)
} as const;

// Preload all audio files
Object.values(soundEffects).forEach(audio => audio.preload = "auto");

/**
 * Class to handle playing sound effects.
 */
export class SoundEffect {
    /**
     * Play a sound effect.
     * @param effect - The name of the sound effect to play.
     */
    static play(effect: keyof typeof soundEffects) {
        const volume = store.getState().user.settings?.find(s => s.isSet)?.volume ?? 50;
        const audio = new Audio(soundEffects[effect].src);
        audio.volume = Math.max(0, Math.min(1, volume / 100));
        audio.play();
    }
}