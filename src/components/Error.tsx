import { useSelector } from "react-redux";
import { RootState, store } from "../app/store";
import { Button } from "./Button";
import { useLocation, useNavigate } from "react-router-dom";
import { resetError } from "../features/error/errorSlice";

export function Error() {
    const error = useSelector((state: RootState) => state.error)
    const navigate = useNavigate();
    const location = useLocation();

    async function reload() {
        const urlParams = new URLSearchParams(location.search);

        if(urlParams.get('newGame') != null){
            urlParams.set('newGame', 'false');
        }
    
        await store.dispatch(resetError());
    
        navigate({
            pathname: location.pathname,
            search: urlParams.toString(),
        });
    
        window.location.reload();
    }
    


    return error.status != 200 ? (
        <div id="errorBorder">
            <div id='error'>
                <div id='errorContent'>
                    <h1 id='errorCode'>{error.status}</h1>
                    <h2 id='errorTitle'>{error.name}</h2>
                    <p id='errorText'>{error.message}</p>
                    <Button color="green" onClick={reload}>Try again</Button>
                </div>
            </div>
        </div>
    ) : null
}