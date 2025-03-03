import { store } from "../../app/store";
import { deleteInfo } from "../../features/info/infoSlice";

interface ILoadingScreenProps {
    total: number;
    loaded: number;
}

export function LoadingScreen(props: ILoadingScreenProps) {
    store.dispatch(deleteInfo())
    
    return <div id="loadingScreen">
        <p>Loading level</p>
        <p>Building terrain</p>
        <div id='progressBarBorder'>
            <div id='progressBarInner' style={{width: `${props.loaded / props.total * 100}%`}}></div>
        </div>
    </div>   
}