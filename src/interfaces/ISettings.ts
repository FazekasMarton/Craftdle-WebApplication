/**
 * Interface for user settings.
 */
export interface ISettings {
    id: number; // Unique identifier for the settings.
    volume: number; // Volume level for the game.
    imagesSize: number; // Size of images in the game.
    isSet: boolean; // Indicates if the settings are active.
    controls: IControls; // User control settings.
}

/**
 * Interface for user controls settings.
 */
export interface IControls {
    isTapMode: boolean; // Indicates if tap mode is enabled.
    copy: string; // Key binding for the copy action.
    remove: string; // Key binding for the remove action.
    tableMapping: string[]; // Key bindings for table interactions.
}