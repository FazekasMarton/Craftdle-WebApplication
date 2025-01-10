import { Provider, useDispatch } from "react-redux";
import "../style.css"
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

export const OK = () => {
    const dispatch = useDispatch()
    dispatch(resetError())

    return <BrowserRouter>
        <Error />
    </BrowserRouter>
}

export const ServiceUnavailable = () => {
    const dispatch = useDispatch()
    dispatch(setError(new TypeError().name))

    return <BrowserRouter>
        <Error />
    </BrowserRouter>
}

export const BadRequest = () => {
    const dispatch = useDispatch()
    dispatch(setError(new SyntaxError().name))

    return <BrowserRouter>
        <Error />
    </BrowserRouter>
}

export const InternalServerError = () => {
    const dispatch = useDispatch()
    dispatch(setError(new RangeError().name))

    return <BrowserRouter>
        <Error />
    </BrowserRouter>
}