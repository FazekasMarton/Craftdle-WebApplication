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
import { RootState } from "../../app/store";
import { useSelector } from "react-redux";

interface IGuess {
    items: Array<IItem>,
    recipes: IRecipeCollection,
    tips: ITips,
    hints: Array<string | null> | null,
    hearts: number | null,
    result: boolean
}

export function Game() {
    const socket = useSelector((state: RootState) => state.socket.socket)
    const [searchParams] = useSearchParams();
    const gamemodeId = searchParams.get("gamemode")
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
    const items = useRef(new Items())

    function startGame(gamemode: string | null, newGame: string | null) {
        socket?.emit("startGame", {
            gamemode: gamemode,
            newGame: newGame
        })
    }

    useEffect(() => {
        startGame(gamemodeId, searchParams.get("newGame"))

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
            setTips(data.tips)
            setHints(data.hints)
            setMaxHearts(data.hearts)
            setResult(data.result)
            setTableContent(Array.from({ length: craftingTableSize }, () => Array(3).fill(null)))
        })

        return () => { socket?.off("guess") }
    }, [socket])

    return <div id="game">
        <nav>
            <StoneButton href="/singleplayer">Quit Game</StoneButton>
            <StoneButton onClick={() => {
                startGame(gamemodeId, searchParams.get("newGame"))
            }}>New Game</StoneButton>
        </nav>
        <CraftingTable craftingTable={tableContent} size={craftingTableSize} items={items.current} recipes={recipes} isKnowledgeBookOpen={isKnowledgeBookOpen} setIsKnowledgeBookOpen={setIsKnowledgeBookOpen} socket={socket} />
        {maxHearts && <Hearts turn={tips.length} maxHearts={maxHearts} />}
        {hints && <Hints hints={hints} turn={tips.length - (result ? 0 : 1)} />}
        <Tips tips={tips} craftingTableSize={craftingTableSize} itemsCollection={items.current} />
        {
            itemsCollection.length > 0 && Object.keys(recipes).length > 0 ? (
                isKnowledgeBookOpen ? <KnowledgeBook setCraftingTable={setTableContent} recipes={recipes} items={items.current} craftingTableSize={craftingTableSize} /> : <Inventory items={items.current} itemsCollection={itemsCollection} />
            ) : null
        }
        <Cursor craftingTableSlots={tableContent} setCraftingTableSlots={setTableContent} />
    </div>
}