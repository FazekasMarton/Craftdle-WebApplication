import { BrowserRouter } from "react-router-dom";
import { PatchNotes } from "../pages/PatchNotes/PatchNotes";
import "../style.css"

export default {
    title: "Pages/PatchNotes",
    component: PatchNotes,
};

export const Default = () => {
    return <BrowserRouter>
        <PatchNotes />
    </BrowserRouter>
}