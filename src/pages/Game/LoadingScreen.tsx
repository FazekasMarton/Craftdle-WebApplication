interface ILoadingScreenProps {
    total: number;
    loaded: number;
}

export function LoadingScreen(props: ILoadingScreenProps) {
    return <div id="loadingScreen">
        <p>Loading level</p>
        <p>Building terrain</p>
        <div id='progressBarBorder'>
            <div id='progressBarInner' style={{width: `${props.loaded / props.total * 100}%`}}></div>
        </div>
    </div>   
}