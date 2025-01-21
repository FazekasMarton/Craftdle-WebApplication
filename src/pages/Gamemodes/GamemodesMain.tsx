import { Link } from "react-router-dom"
import { store } from "../../app/store"
import { deleteInfo, setInfo } from "../../features/info/infoSlice"
import { IGamemode } from "../../interfaces/IGamemode"
import { setNewGame } from "../../features/game/gameSlice"

interface GamemodesMainProps {
    gamemodes: Array<IGamemode>,
    selectedGamemode: number | null,
    setSelectedGamemode: (value: number | null) => void
}

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
                    <div className="gamemodeIcon" aria-label={`${gamemode.name} mode icon`} style={{ backgroundImage: `url(http://localhost:3000/gamemodes/${gamemode.icon})` }}>
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