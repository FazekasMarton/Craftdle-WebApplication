import { ISettings } from "../interfaces/ISettings";

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

export class DefaultSettings{
    static getDefaultSettings() {
        return structuredClone(defaultSettings);
    }    
}