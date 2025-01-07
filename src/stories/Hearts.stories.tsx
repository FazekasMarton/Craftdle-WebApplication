import { Hearts } from "../pages/Game/Hearts";
import "../style.css"

export default {
    title: "Components/Hearts",
    component: Hearts,
};

export const Turn0 = () => <Hearts turn={0}/>;

export const Turn3 = () => <Hearts turn={3}/>;

export const Turn11 = () => <Hearts turn={11}/>;

export const Turn14 = () => <Hearts turn={14}/>;

export const Turn19 = () => <Hearts turn={19}/>;

export const Turn20 = () => <Hearts turn={20}/>;