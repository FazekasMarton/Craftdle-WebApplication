import { IGamemode } from "../../interfaces/IGamemode"

interface GamemodesMainProps{
    gamemodes: Array<IGamemode>
}

export function GamemodesMain(props: GamemodesMainProps) {
    return <section id="gamemodesMain">
        <div id="gamemodesList">
            {props.gamemodes.map((gamemode, index) => {
                return <article key={index}>
                    <div className="gamemodeIcon" style={{backgroundImage: `url(${gamemode.icon})`}}>
                        
                    </div>
                    <h2 className="gamemodeName">{gamemode.name}</h2>
                    <span className="gamemodeDifficulty" style={{color: `#${gamemode.difficulty.color}`}}>{gamemode.difficulty.name}</span>
                    <p className="gamemodeDescription">{gamemode.description}</p>
                </article>
            })}
        </div>
    </section>
}