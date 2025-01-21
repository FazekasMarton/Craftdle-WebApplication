import { ISettings } from "../interfaces/ISettings";

/**
 * Default settings object.
 */
const defaultSettings: ISettings = {
    id: 0,
    isSet: false,
    volume: 50,
    imagesSize: 50,
    controls: {
        isTapMode: false,
        copy: "LMB",
        remove: "RMB",
        tableMapping: ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
    }
};

/**
 * Class to handle default settings.
 */
export class DefaultSettings {
    /**
     * Get the default settings.
     * @returns The default settings.
     */
    static getDefaultSettings(): ISettings {
        return structuredClone(defaultSettings);
    }
}