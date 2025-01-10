import { BrowserRouter } from "react-router-dom";
import { Credits } from "../pages/Credits/Credits";
import "../style.css"

export default {
    title: "Pages/Credits",
    component: Credits,
};

export const Default = () => {
    return <BrowserRouter>
        <Credits />
    </BrowserRouter>
}