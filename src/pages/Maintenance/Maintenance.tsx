import { useSelector } from "react-redux";
import craftdleTitle from "../../assets/imgs/title/craftdle_title.png"
import { Countdown } from "../../components/Countdown"
import { RootState } from "../../app/store";

export function Maintenance() {
    const maintenance = useSelector((state: RootState) => state.maintenance);

    return <div id="maintenance">
        <main id="maintenanceMessage">
            <img id="craftdleMaintenanceTitle" src={craftdleTitle} alt="craftdle title" />
            <h1 id="maintenanceTitle">Maintenance</h1>
            <p>Craftdle is currently undergoing scheduled maintenance. We apologize for any inconvenience and appreciate your patience.</p>
            <p>Thank you,<br />The Guideian Angel Team</p>
            <p>Estimated End of Maintenance:<span id="maintenanceCountdown">
                <Countdown time={maintenance.countdown || 0}/>
            </span></p>
        </main>
    </div>
}