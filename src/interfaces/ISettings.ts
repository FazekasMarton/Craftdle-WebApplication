export interface ISettings {
    id: number;
    volume: number;
    imagesSize: number;
    isSet: boolean;
    controls: IControls;
}

interface IControls {
    isTapMode: boolean;
    copy: string;
    remove: string;
    teableMapping: string[];
}