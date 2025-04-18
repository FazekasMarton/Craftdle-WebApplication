import { useSelector } from "react-redux";
import { Countdown } from "../../components/Countdown"
import { RootState } from "../../app/store";

/**
 * MaintenanceNotice component to display the maintenance countdown.
 * This component shows a title and a countdown timer for the estimated
 * start of maintenance. The countdown value is retrieved from the Redux store.
 * @returns The MaintenanceNotice component.
 */
export function MaintenanceNotice() {
    const maintenance = useSelector((state: RootState) => state.maintenance);

    return <div id="maintenanceNotice">
        <h1 id="maintenanceNoticeTitle">Start of Estimated Maintenance:</h1>
        <p id="maintenanceNoticeCountdown">
            <Countdown time={maintenance.countdown || 0} />
        </p>
    </div>
}