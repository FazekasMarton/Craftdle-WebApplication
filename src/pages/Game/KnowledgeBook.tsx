import { Items } from "../../classes/Items";
import { INonShapelessRecipe, IRecipe, IRecipeCollection, IShapelessRecipe } from "../../interfaces/IRecipe";
import searchIcon from "../../assets/imgs/icons/search_icon.png";
import { useMemo, useState } from "react";
import { getItem, Item } from "./Item";
import arrow from "../../assets/imgs/icons/arrow.png";
import { SoundEffect } from "../../classes/Audio";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { DefaultSettings } from "../../classes/DefaultSettings";

interface KnowledgeBookProps {
    recipes: IRecipeCollection;
    items: Items;
    craftingTableSize: number;
    setCraftingTable: (craftingTable: Array<Array<HTMLImageElement | null>>) => void;
    result: boolean;
    isOpen: boolean;
}

/**
 * Convert a shapeless recipe to a matrix format.
 * @param recipe - The shapeless recipe to convert.
 * @param craftingTableSize - The size of the crafting table.
 * @returns The converted recipe in matrix format.
 */
function convertToMatrix(recipe: IShapelessRecipe, craftingTableSize: number) {
    const convertedRecipe: INonShapelessRecipe = [[]];
    let colCounter = 0;
    let rowIndex = 0;
    recipe.required.forEach(materials => {
        if (colCounter >= craftingTableSize) {
            colCounter = 0;
            rowIndex++;
            convertedRecipe.push([]);
        }
        convertedRecipe[convertedRecipe.length - 1].push(typeof materials === "string" ? [materials] : materials);
        colCounter++;
    });
    return convertedRecipe;
}

/**
 * Check if a recipe group matches the search query.
 * @param recipeGroup - The recipe group to check.
 * @param search - The search query.
 * @returns True if the recipe group matches the search query, false otherwise.
 */
function isSearchResult(recipeGroup: IRecipe[], search: string) {
    for (let recipeInfo of recipeGroup) {
        if (recipeInfo.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
        } else if (recipeInfo.shapeless) {
            let recipe = recipeInfo.recipe as IShapelessRecipe;
            const materials = recipe.required.flat(2).concat(recipe.optional?.flat(2) || []);
            for (let material of materials) {
                if (material && material.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
            }
        } else {
            let recipe = recipeInfo.recipe as INonShapelessRecipe;
            for (let material of recipe.flat(3)) {
                if (material && material.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * KnowledgeBook component to display recipes and handle search functionality.
 * @param props - The props for the component.
 * @returns The KnowledgeBook component.
 */
export function KnowledgeBook(props: KnowledgeBookProps) {
    const customSettings = useSelector((state: RootState) => state.user.settings?.find(f => f.isSet === true));
    const currentSettings = customSettings || DefaultSettings.getDefaultSettings();
    const [search, setSearch] = useState("");
    const size = `${currentSettings.imagesSize / 25 + 2.5}vmin`;

    const cachedItems = useMemo(() => {
        const cache: { [key: string]: HTMLImageElement | null } = {};
        return async (id: string) => {
            if (!cache[id]) {
                cache[id] = await getItem(id, props.items) || null;
            }
            return cache[id];
        };
    }, [props.items]);

    return (
        <div id="knowledgeBook" style={{ display: props.isOpen ? "grid" : "none" }}>
            <header id="knowledgeBookHeader">
                <h1 id="knowledgeBookTitle">Knowledge Book:</h1>
                <nav className="searchBar">
                    <img className="searchIcon" src={searchIcon} alt="Search Icon" draggable={false} />
                    <input
                        type="text"
                        id="knowledgeBookSearch"
                        className="search"
                        placeholder="Search..."
                        onInput={(e) => setSearch(e.currentTarget.value)}
                    />
                </nav>
            </header>
            <div id="knowledgeBookContainer">
                <div id="knowledgeBookContent">
                    {Object.keys(props.recipes).map(recipeGroupName => {
                        if (recipeGroupName === "gaLogo0") return null;
                        const [recipeGroupIndex, setRecipeGroupIndex] = useState(0);
                        const [materialIndex, setMaterialIndex] = useState(0);

                        const recipeGroup = props.recipes[recipeGroupName];
                        const recipeInfo = recipeGroup[recipeGroupIndex];
                        const recipe = recipeInfo?.shapeless ? convertToMatrix(recipeInfo.recipe as IShapelessRecipe, props.craftingTableSize) : recipeInfo?.recipe as INonShapelessRecipe;

                        function incrementCounter() {
                            let longestSlot = Math.max(...recipe.flat().map(slot => slot?.length || 0));
                            setMaterialIndex((prev) => {
                                const newValue = prev + 1;
                                if (newValue >= longestSlot) {
                                    setRecipeGroupIndex(p => {
                                        if (p + 1 >= recipeGroup.length) {
                                            return 0;
                                        }
                                        return p + 1;
                                    });
                                    return 0;
                                }
                                return newValue;
                            });
                        }

                        function decrementCounter() {
                            setMaterialIndex((prev) => {
                                if (prev - 1 < 0) {
                                    setRecipeGroupIndex(p => {
                                        if (p - 1 < 0) {
                                            return recipeGroup.length - 1;
                                        }
                                        return p - 1;
                                    });
                                    const rInfo = recipeGroup[recipeGroup.length - 1];
                                    const previousRecipe = rInfo?.shapeless ? convertToMatrix(rInfo.recipe as IShapelessRecipe, props.craftingTableSize) : rInfo?.recipe as INonShapelessRecipe;
                                    return Math.max(...previousRecipe.flat().map(slot => slot?.length || 0)) - 1;
                                }
                                return prev - 1;
                            });
                        }

                        if (!isSearchResult(recipeGroup, search) || recipe.length > props.craftingTableSize || recipe[0].length > props.craftingTableSize) {
                            return null;
                        }

                        return (
                            <div className="recipeContent slotButton"
                                key={recipeGroupName}
                                onClick={!props.result ? async (e) => {
                                    if (!(e.target as HTMLElement).classList.contains("recipeButton")) {
                                        const craftingTable: Array<Array<HTMLImageElement | null>> = Array.from({ length: props.craftingTableSize }).map(() => Array.from({ length: props.craftingTableSize }).map(() => null));
                                        const craftingTablePromises = recipe.map(row =>
                                            Promise.all(row.map(slot => slot ? cachedItems(slot[materialIndex % slot.length]) : null))
                                        );
                                        (await Promise.all(craftingTablePromises)).forEach((row, rowIndex) => {
                                            row.forEach((slot, colIndex) => {
                                                craftingTable[rowIndex][colIndex] = slot;
                                            });
                                        });
                                        props.setCraftingTable(craftingTable);
                                        SoundEffect.play("click");
                                    }
                                } : undefined}
                            >
                                <table className="recipeCraftingTable">
                                    <tbody>
                                        {Array.from({ length: props.craftingTableSize }).map((_, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {Array.from({ length: props.craftingTableSize }).map((_, colIndex) => {
                                                    const item = recipe[rowIndex] ? recipe[rowIndex][colIndex] : null;
                                                    const material = item ? item[materialIndex % item.length] : null;
                                                    return (
                                                        <td className="recipeSlot" key={colIndex} style={{ width: size, height: size }}>
                                                            {material ? <Item itemId={material} items={props.items} /> : null}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <img className="recipeCraftingArrow" src={arrow} alt="arrow" draggable={false} style={{ height: size }} />
                                <div className="recipeSlot recipeItem" style={{ width: size, height: size }}>
                                    <Item itemId={recipeInfo.id} items={props.items} />
                                </div>
                                {
                                    recipeGroup.length > 1 || Math.max(...recipe.flat().map(slot => slot?.length || 0)) > 1 ? (
                                        <>
                                            <div className="recipeCardPrevious recipeButton" onClick={() => { decrementCounter(); SoundEffect.play("click") }} />
                                            <div className="recipeCardNext recipeButton" onClick={() => { incrementCounter(); SoundEffect.play("click") }} />
                                        </>
                                    ) : null
                                }
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}