export interface Settings {
    id: number;
    volume: number;
    imagesSize: number;
    isSet: boolean;
    controls: Controls;
}

interface Controls {
    isTapMode: boolean;
    copy: string;
    remove: string;
    teableMapping: string[];
}