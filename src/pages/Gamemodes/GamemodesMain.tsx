import { Link } from "react-router-dom"
import { store } from "../../app/store"
import { deleteInfo, setInfo } from "../../features/info/infoSlice"
import { IGamemode } from "../../interfaces/IGamemode"
import { setNewGame } from "../../features/game/gameSlice"

/**
 * Props for the GamemodesMain component.
 */
interface GamemodesMainProps {
    gamemodes: Array<IGamemode>,
    selectedGamemode: number | null,
    setSelectedGamemode: (value: number | null) => void
}

/**
 * GamemodesMain component to display the list of gamemodes.
 * 
 * This component renders a list of available gamemodes, allowing the user to select one.
 * It also provides visual feedback and warnings for specific gamemodes.
 * 
 * @param props - The properties for the GamemodesMain component.
 * @param props.gamemodes - Array of available gamemodes.
 * @param props.selectedGamemode - The currently selected gamemode ID.
 * @param props.setSelectedGamemode - Function to update the selected gamemode.
 * @returns The GamemodesMain component.
 */
export function GamemodesMain(props: GamemodesMainProps) {
    return <section id="gamemodesMain">
        <div id="gamemodesList">
            {props.gamemodes.map((gamemode, index) => {
                return <article
                    key={index}
                    className={props.selectedGamemode == gamemode.id ? "selectedGamemode" : ""}
                    onClick={() => {
                        props.setSelectedGamemode(gamemode.id)
                    }}
                    onMouseMove={gamemode.id == 1 && !gamemode.playedBefore ? (e) => {
                        store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: "Warning", titleColor: "#AA0000", text: "You haven't played Tutorial yet" }))
                    } : undefined}
                    onMouseLeave={gamemode.id == 1 && !gamemode.playedBefore ? () => {
                        store.dispatch(deleteInfo())
                    } : undefined}>
                    <div className="gamemodeIcon" aria-label={`${gamemode.name} mode icon`} style={{ backgroundImage: `url(${import.meta.env.VITE_SERVER_URL}/assets/gamemodes/${gamemode.icon})` }}>
                        <Link className="playButton" to={`/play?gamemode=${gamemode.id}`} onClick={() => {
                            store.dispatch(setNewGame(!gamemode.continueGame))
                        }}></Link>
                    </div>
                    <h2 className="gamemodeName">{gamemode.name}</h2>
                    <div className="gamemodeDifficulty" style={{ color: `#${gamemode.difficulty.color}` }}>{gamemode.difficulty.name}</div>
                    <p className="gamemodeDescription">{gamemode.description}</p>
                    {gamemode.id == 1 && !gamemode.playedBefore ? <div className="gamemodeWarning"></div> : null}
                </article>
            })}
        </div>
    </section>
}