import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Button } from "./Button";

export function Error() {
    const error = useSelector((state: RootState) => state.error)
    return error.status != 200 ? (
        <div id="errorBorder">
            <div id='error'>
                <div id='errorContent'>
                    <h1 id='errorCode'>{error.status}</h1>
                    <h2 id='errorTitle'>{error.name}</h2>
                    <p id='errorText'>{error.message}</p>
                    <Button color="green">Try again</Button>
                </div>
            </div>
        </div>
    ) : null
}