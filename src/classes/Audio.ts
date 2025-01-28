// Import audio files
import clickSound from "#/assets/audios/click.mp3";
import achievementSound from "#/assets/audios/Achievement.mp3";
import creeperSound from "#/assets/audios/creeper.mp3";
import dropSound from "#/assets/audios/drop.mp3";
import hitSound from "#/assets/audios/hit.mp3";
import allay1Sound from "#/assets/audios/allay1.mp3";
import allay2Sound from "#/assets/audios/allay2.mp3";
import allay3Sound from "#/assets/audios/allay3.mp3";
import allay4Sound from "#/assets/audios/allay4.mp3";
import write1Sound from "#/assets/audios/write1.mp3";
import write2Sound from "#/assets/audios/write2.mp3";
import write3Sound from "#/assets/audios/write3.mp3";
import { store } from "../app/store";

interface ISoundEffects {
    [key: string]: HTMLAudioElement[]
}

// Define sound effects with preloaded audio
const soundEffects: ISoundEffects = {
    click: [
        new Audio(clickSound)
    ],
    achievement: [
        new Audio(achievementSound)
    ],
    creeper: [
        new Audio(creeperSound)
    ],
    drop: [
        new Audio(dropSound)
    ],
    hit: [
        new Audio(hitSound)
    ],
    allay: [
        new Audio(allay1Sound),
        new Audio(allay2Sound),
        new Audio(allay3Sound),
        new Audio(allay4Sound)
    ],
    write: [
        new Audio(write1Sound),
        new Audio(write2Sound),
        new Audio(write3Sound)
    ]
} as const;

// Preload all audio files
Object.values(soundEffects).forEach(audio => audio.forEach(a => a.load()));

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

        const soundEffectArray = soundEffects[effect];
        if (!soundEffectArray || soundEffectArray.length === 0) {
            console.warn(`Sound effect "${effect}" has no available audio files.`);
            return;
        }

        const randomIndex = Math.floor(Math.random() * soundEffectArray.length);
        const audio = soundEffectArray[randomIndex];

        audio.volume = Math.max(0, Math.min(1, volume / 100));
        audio.currentTime = 0;
        audio.play().catch(err => {
            console.error(`Failed to play sound effect "${effect}":`, err);
        });
    }
}
