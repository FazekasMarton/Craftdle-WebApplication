import { Provider, useDispatch } from "react-redux";
import "../style.css";
import { store } from "../app/store";
import { Error } from "../components/Error";
import { BrowserRouter } from "react-router-dom";
import { resetError, setError } from "../features/error/errorSlice";

export default {
    title: "Components/Error",
    component: Error,
    decorators: [
        (Story: any) => (
            <Provider store={store}>
                <Story />
            </Provider>
        ),
    ]
};

/**
 * OK story for the Error component.
 * @returns The OK story.
 */
export const OK = () => {
    const dispatch = useDispatch();
    dispatch(resetError());

    return <BrowserRouter>
        <Error />
    </BrowserRouter>;
};

/**
 * ServiceUnavailable story for the Error component.
 * @returns The ServiceUnavailable story.
 */
export const ServiceUnavailable = () => {
    const dispatch = useDispatch();
    dispatch(setError(new TypeError().name));

    return <BrowserRouter>
        <Error />
    </BrowserRouter>;
};

/**
 * BadRequest story for the Error component.
 * @returns The BadRequest story.
 */
export const BadRequest = () => {
    const dispatch = useDispatch();
    dispatch(setError(new SyntaxError().name));

    return <BrowserRouter>
        <Error />
    </BrowserRouter>;
};

/**
 * InternalServerError story for the Error component.
 * @returns The InternalServerError story.
 */
export const InternalServerError = () => {
    const dispatch = useDispatch();
    dispatch(setError(new RangeError().name));

    return <BrowserRouter>
        <Error />
    </BrowserRouter>;
};