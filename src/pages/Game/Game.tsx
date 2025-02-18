import { StoneButton } from "../../components/StoneButton";
import { CraftingTable } from "./CraftingTable";
import { Cursor } from "./Cursor";
import { Hearts } from "./Hearts";
import { KnowledgeBook } from "./KnowledgeBook";
import { Tips } from "./Tips";
import { IItem, Items } from "../../classes/Items";
import { Inventory } from "./Inventory";
import { useEffect, useRef, useState } from "react";
import { ITips } from "../../interfaces/ITips";
import { IRecipeCollection } from "../../interfaces/IRecipe";
import { useSearchParams } from "react-router-dom";
import { Hints } from "./Hints";
import { RootState, store } from "../../app/store";
import { useSelector } from "react-redux";
import { setHelp, setNewGame } from "../../features/game/gameSlice";
import { Meta } from "../../components/Meta";
import { GameOver } from "./GameOver";
import { SoundEffect } from "../../classes/Audio";
import { Tutorial } from "./Tutorial";
import { Button } from "../../components/Button";
import { LoadingScreen } from "./LoadingScreen";
import { setError } from "../../features/error/errorSlice";

/**
 * Gamemode names mapping.
 */
const gamemodeNames = {
    "1": "Tutorial",
    "2": "Classic",
    "3": "Daily",
    "4": "All in One",
    "5": "Pocket",
    "6": "Resource",
    "7": "Hardcore"
}

/**
 * Interface for the guess data.
 */
interface IGuess {
    items: Array<IItem>,
    recipes: IRecipeCollection,
    tips: ITips,
    hints: Array<string | null> | null,
    hearts: number | null,
    result: boolean
}

/**
 * Game component to display the game interface.
 * @returns The Game component.
 */
export function Game() {
    const socket = useSelector((state: RootState) => state.socket.socket)
    const user = useSelector((state: RootState) => state.user)
    const [searchParams, setSearchParams] = useSearchParams();
    const gamemode = searchParams.get("gamemode");
    const isGamemodeValid = isNaN(Number(gamemode)) || gamemode == null || Number(gamemode) > 7 || Number(gamemode) < 1
    const gamemodeId = isGamemodeValid ? "1" : gamemode;
    const gamemodeName = gamemodeNames[gamemodeId as keyof typeof gamemodeNames]
    const craftingTableSize = gamemodeId == "5" ? 2 : 3;
    const [tableContent, setTableContent] = useState<Array<Array<HTMLImageElement | null>>>(
        Array.from({ length: craftingTableSize }, () =>
            Array.from({ length: craftingTableSize }, () => null)
        )
    );
    const [itemsCollection, setItemsCollection] = useState<Array<IItem>>([])
    const [recipes, setRecipes] = useState<IRecipeCollection>({})
    const [isKnowledgeBookOpen, setIsKnowledgeBookOpen] = useState(false);
    const [tips, setTips] = useState<ITips>([])
    const [hints, setHints] = useState<Array<string | null> | null>(null)
    const [maxHearts, setMaxHearts] = useState<number | null>(null)
    const [result, setResult] = useState(false)
    const [newTurn, setNewTurn] = useState(0)
    const [loading, setLoading] = useState(true)
    const items = useRef(new Items())
    const turn = tips.length - (result ? 1 : 0)

    /**
     * Start a new game.
     * @param gamemode - The gamemode to start.
     * @param newGame - Whether to start a new game.
     */
    function startGame(gamemode: string, newGame: boolean) {
        socket?.emit("startGame", {
            gamemode: gamemode,
            newGame: newGame
        })
        setNewTurn(prev => prev + 1)
    }

    useEffect(() => {
        startGame(gamemodeId, store.getState().game.newGame)

        socket?.on("guess", (data: IGuess) => {
            console.log(data)
            if (data.items) {
                setItemsCollection(data.items)
                items.current.addItems(data.items)
            }
            if (data.recipes) {
                setRecipes(data.recipes)
                let recipesItems: IItem[] = []
                Object.keys(data.recipes).forEach(recipeGroup => {
                    const currentRecipe = data.recipes[recipeGroup]
                    currentRecipe.forEach(recipe => {
                        recipesItems.push(recipe)
                    });
                });
                items.current.addItems(recipesItems)
            }
            if (data.items || data.recipes) {
                items.current.allImagesLoaded().then((result) => {
                    console.log("All images loaded:", result)
                    if (result) {
                        setLoading(false)
                    } else {
                        store.dispatch(setError("LoadingError"))
                    }
                })
            }
            setTips(data.tips)
            setHints(data.hints)
            setMaxHearts(data.hearts)
            setResult(data.result)
            setTableContent(Array.from({ length: craftingTableSize }, () => Array(3).fill(null)))
            if (data.tips.length > 0) {
                if (gamemodeId == "7" && !data.result) {
                    SoundEffect.play("hit")

                } else {
                    SoundEffect.play("drop")
                }
            }
            setTimeout(() => {
                const tipContainer = document.getElementById("tipsContainer")
                tipContainer?.scrollTo({
                    top: tipContainer.scrollHeight * -1,
                    behavior: "smooth"
                })
            }, 0);
        })

        return () => { socket?.off("guess") }
    }, [socket])

    useEffect(() => {
        if (isGamemodeValid) {
            searchParams.set("gamemode", gamemodeId)
            setSearchParams(searchParams)
        }
    }, [searchParams, setSearchParams])

    return <>
        <Meta
            title={gamemodeName}
        />
        {loading && <LoadingScreen />}
        <div id="game">
            <nav>
                <StoneButton href="/singleplayer">Quit Game</StoneButton>
                <StoneButton onClick={() => {
                    startGame(gamemodeId, true)
                }}>New Game</StoneButton>
                {!user.isGuest && <StoneButton href="/settings" onClick={() => {
                        store.dispatch(setNewGame(false))
                    }}>Settings</StoneButton>}
            </nav>
            <CraftingTable gamemode={Number(gamemodeId)} turn={turn} isHardcore={gamemodeId != "7"} craftingTable={tableContent} size={craftingTableSize} items={items.current} recipes={recipes} isKnowledgeBookOpen={isKnowledgeBookOpen} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen} socket={socket} />
            {maxHearts && <Hearts turn={turn} maxHearts={maxHearts} />}
            {gamemodeId !== "1" ? (
                hints && <Hints key={`${newTurn}-hints`} hints={hints} turn={turn} />
            ) : (
                !loading && <>
                    <Button onClick={!result ? () => { store.dispatch(setHelp(true)) } : undefined} color="green">Ask Allay</Button>
                    <Tutorial key={`${newTurn}-tutorial`} turn={turn} />
                </>
            )}
            <Tips tips={tips} craftingTableSize={craftingTableSize} itemsCollection={items.current} />
            {
                itemsCollection.length > 0 && Object.keys(recipes).length > 0 ? (
                    <>
                        {gamemodeId != "7" && <KnowledgeBook itemCollection={itemsCollection} isOpen={isKnowledgeBookOpen} result={result} setCraftingTable={setTableContent} recipes={recipes} items={items.current} craftingTableSize={craftingTableSize} />}
                        <Inventory isOpen={!isKnowledgeBookOpen} items={items.current} itemsCollection={itemsCollection} />
                    </>
                ) : null
            }
            {!result && <Cursor craftingTableSize={craftingTableSize} craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} items={items.current} />}
            {
                maxHearts && turn >= maxHearts * 2 ? (
                    <GameOver startGame={() => { startGame(gamemodeId, true) }} />
                ) : null
            }
        </div>
    </>
}