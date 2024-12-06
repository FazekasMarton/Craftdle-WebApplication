import { Link } from "react-router-dom"
import { store } from "../../app/store"
import { deleteInfo, setInfo } from "../../features/info/infoSlice"
import { IGamemode } from "../../interfaces/IGamemode"

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
                    <div className="gamemodeIcon" style={{ backgroundImage: `url(https://localhost:3000/gamemodes/${gamemode.icon})` }}>
                        <Link className="playButton" to={`/play?gamemode=${gamemode.id}&newGame=${!gamemode.continueGame}`}></Link>
                    </div>
                    <h2 className="gamemodeName">{gamemode.name}</h2>
                    <span className="gamemodeDifficulty" style={{ color: `#${gamemode.difficulty.color}` }}>{gamemode.difficulty.name}</span>
                    <p className="gamemodeDescription">{gamemode.description}</p>
                    {gamemode.id == 1 && !gamemode.playedBefore ? <div className="gamemodeWarning"></div> : null}
                </article>
            })}
        </div>
    </section>
}