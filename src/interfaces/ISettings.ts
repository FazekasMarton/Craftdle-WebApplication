export interface ISettings {
    id: number;
    volume: number;
    imagesSize: number;
    isSet: boolean;
    controls: IControls;
}

export interface IControls {
    isTapMode: boolean;
    copy: string;
    remove: string;
    tableMapping: string[];
}