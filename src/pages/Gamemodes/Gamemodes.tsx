import { useEffect, useState } from "react"
import { store } from "../../app/store"
import { getGamemodes } from "../../features/user/dataRequestSlice"
import { IGamemode } from "../../interfaces/IGamemode"
import { GamemodesFooter } from "./GamemodesFooter"
import { GamemodesMain } from "./GamemodesMain"

interface GamemodesProps {
    type: "singleplayer"
}

export function Gamemodes(props: GamemodesProps) {
    const [gamemodes, setGamemodes] = useState<Array<IGamemode>>([])

    async function collectGamemodes() {
        let response = await store.dispatch(getGamemodes(props.type))
        let res = (response.payload as any)
        setGamemodes(res.data.data.gamemodes)
    }
    useEffect(() => {
        collectGamemodes()
    }, [])

    console.log(gamemodes)

    return <main id="gamemodes">
        <header id="gamemodesHeader">
            <h1>Select Gamemode</h1>
        </header>
        <GamemodesMain />
        <GamemodesFooter />
    </main>
}