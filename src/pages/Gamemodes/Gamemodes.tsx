import { useEffect, useState } from "react"
import { RootState, store } from "../../app/store"
import { getGamemodes } from "../../features/user/dataRequestSlice"
import { IGamemode } from "../../interfaces/IGamemode"
import { GamemodesFooter } from "./GamemodesFooter"
import { GamemodesMain } from "./GamemodesMain"
import { useSelector } from "react-redux"
import { IResponse } from "../../interfaces/IResponse"

/**
 * Props for the Gamemodes component.
 */
interface GamemodesProps {
    type: "singleplayer"
}

/**
 * Gamemodes component to display and manage gamemodes.
 * 
 * This component fetches the list of gamemodes from the server and allows the user 
 * to select a gamemode. It also integrates the `GamemodesMain` and `GamemodesFooter` 
 * components for displaying the gamemodes and their associated actions.
 * 
 * @param props - The properties for the Gamemodes component.
 * @param props.type - The type of gamemodes to fetch (e.g., "singleplayer").
 * @returns The Gamemodes component.
 */
export function Gamemodes(props: GamemodesProps) {
    const user = useSelector((state: RootState) => state.user);
    const [gamemodes, setGamemodes] = useState<Array<IGamemode>>([])
    const [selectedGamemode, setSelectedGamemode] = useState<number | null>(null)

    useEffect(() => {
        const collectGamemodes = async () => {
            const response = await store.dispatch(getGamemodes(props.type))
            const res = (response.payload as IResponse)
            if (res.response) {
                setGamemodes((res.data.data as { gamemodes: Array<IGamemode> }).gamemodes)
            }
        }

        if(user.loginToken){
            collectGamemodes()
        }
    }, [user, props.type])

    return <main id="gamemodes">
        <header id="gamemodesHeader">
            <h1>Select Gamemode</h1>
        </header>
        <GamemodesMain gamemodes={gamemodes} selectedGamemode={selectedGamemode} setSelectedGamemode={setSelectedGamemode} />
        <GamemodesFooter gamemode={gamemodes.filter(g => g.id == selectedGamemode)[0]} />
    </main>
}