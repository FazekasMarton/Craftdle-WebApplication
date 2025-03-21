import { ISettings } from "../interfaces/ISettings";

/**
 * Default settings object.
 * Contains the default configuration for the application, including volume, image size, and controls.
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
 * Provides methods to retrieve the default settings.
 */
export class DefaultSettings {
    /**
     * Get the default settings.
     * Creates a deep clone of the default settings to ensure immutability.
     * @returns The default settings.
     */
    static getDefaultSettings(): ISettings {
        return structuredClone(defaultSettings);
    }
}