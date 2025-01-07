import { Hearts } from "../pages/Game/Hearts";
import "../style.css"

export default {
    title: "Components/Hearts",
    component: Hearts,
};

export const Turn0 = () => <Hearts turn={0} maxHearts={10}/>;

export const Turn3 = () => <Hearts turn={3} maxHearts={10}/>;

export const Turn11 = () => <Hearts turn={11} maxHearts={10}/>;

export const Turn14 = () => <Hearts turn={14} maxHearts={10}/>;

export const Turn19 = () => <Hearts turn={19} maxHearts={10}/>;

export const Turn20 = () => <Hearts turn={20} maxHearts={10}/>;