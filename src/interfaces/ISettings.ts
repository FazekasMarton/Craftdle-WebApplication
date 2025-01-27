/**
 * Interface for user settings.
 */
export interface ISettings {
    id: number;
    volume: number;
    imagesSize: number;
    isSet: boolean;
    controls: IControls;
}

/**
 * Interface for user controls settings.
 */
export interface IControls {
    isTapMode: boolean;
    copy: string;
    remove: string;
    tableMapping: string[];
}