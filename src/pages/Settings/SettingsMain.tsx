import { ReactNode } from "react"
import { StoneButton } from "../../components/StoneButton"
import { StoneSlider } from "../../components/StoneSlider"

interface SettingsTableProps{
    children: ReactNode,
    header: string
}

function SettingsTable(props: SettingsTableProps){
    return <table className="settingsTable">
        <thead><th colSpan={3}>{props.header}</th></thead>
        <tbody>{props.children}</tbody>
    </table>
}

export function SettingsMain() {
    return <section id="settingsMain">
        <SettingsTable header="General">
            <tr>
                <td>Volume</td>
                <td><StoneSlider /></td>
                <td><StoneButton>Reset</StoneButton></td>
            </tr>
        </SettingsTable>
    </section>
}