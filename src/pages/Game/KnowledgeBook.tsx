import { IItem, Items } from "../../classes/Items";
import { INonShapelessRecipe, IRecipe, IRecipeCollection, IShapelessRecipe } from "../../interfaces/IRecipe";
import searchIcon from "../../assets/imgs/icons/search_icon.png";
import React, { useState } from "react";
import { Item } from "./Item";
import arrow from "../../assets/imgs/icons/arrow.png";
import { SoundEffect } from "../../classes/Audio";
import { useSelector } from "react-redux";
import { RootState, store } from "../../app/store";
import { DefaultSettings } from "../../classes/DefaultSettings";
import { removeEmptyRows } from "../../functions/craft";
import shapeless from "../../assets/imgs/icons/shapeless_icon.png";
import { deleteInfo, setInfo } from "../../features/info/infoSlice";

interface KnowledgeBookProps {
    recipes: IRecipeCollection;
    itemCollection: IItem[];
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
function isSearchResult(recipeGroup: IRecipe[], search: string, items: IItem[]) {
    for (let recipeInfo of recipeGroup) {
        if (recipeInfo.name.toLowerCase().includes(search.toLowerCase())) {
            return true;
        } else if (recipeInfo.shapeless) {
            let recipe = recipeInfo.recipe as IShapelessRecipe;
            const materials = recipe.required.flat(2).concat(recipe.optional?.flat(2) || []);
            for (let material of materials) {
                if (material && items.find(item => item.id === material)?.name.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
            }
        } else {
            let recipe = recipeInfo.recipe as INonShapelessRecipe;
            for (let material of recipe.flat(3)) {
                if (material && items.find(item => item.id === material)?.name.toLowerCase().includes(search.toLowerCase())) {
                    return true;
                }
            }
        }
    }
    return false;
}

function dropUnavailableRecipes(recipes: IRecipe[], items: IItem[]) {
    const validRecipes = [];

    for (let index = 0; index < recipes.length; index++) {
        const recipe = recipes[index];

        if (recipe.shapeless) {
            const r = recipe.recipe as IShapelessRecipe;
            let allMaterialsValid = true;

            for (let i = 0; i < r.required.length; i++) {
                const materials = r.required[i];
                for (let j = 0; j < materials.length; j++) {
                    const material = materials[j];
                    if (!items.find(i => i.id === material)) {
                        materials.splice(j, 1);
                        j--;
                    }
                }

                if (materials.length === 0) {
                    allMaterialsValid = false;
                    break;
                }
            }

            if (allMaterialsValid) {
                validRecipes.push(recipe);
            }

        } else {
            const r = recipe.recipe as INonShapelessRecipe;
            let allSlotsValid = true;

            for (let rowIndex = 0; rowIndex < r.length; rowIndex++) {
                const row = r[rowIndex];
                for (let slotIndex = 0; slotIndex < row.length; slotIndex++) {
                    const slot = row[slotIndex];
                    if (slot) {
                        for (let materialIndex = 0; materialIndex < slot.length; materialIndex++) {
                            const material = slot[materialIndex];
                            if (!items.find(i => i.id === material)) {
                                slot.splice(materialIndex, 1);
                                materialIndex--;
                            }
                        }

                        if (slot.length === 0) {
                            allSlotsValid = false;
                            break;
                        }
                    }
                }

                if (!allSlotsValid) {
                    break;
                }
            }

            if (allSlotsValid) {
                validRecipes.push(recipe);
            }
        }
    }

    return validRecipes;
}

/**
 * KnowledgeBook component to display recipes and handle search functionality.
 * @param props - The props for the component.
 * @returns The KnowledgeBook component.
 */
function KnowledgeBookRaw(props: KnowledgeBookProps) {
    const customSettings = useSelector((state: RootState) => state.user.settings?.find(f => f.isSet === true));
    const currentSettings = customSettings || DefaultSettings.getDefaultSettings();
    const [search, setSearch] = useState("");
    const size = `${currentSettings.imagesSize / 25 + 2.5}vmin`;

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

                        const recipeGroup = dropUnavailableRecipes(JSON.parse(JSON.stringify(props.recipes[recipeGroupName])), props.itemCollection);
                        const recipeInfo = recipeGroup[recipeGroupIndex];
                        const recipe = recipeInfo?.shapeless ? (
                            convertToMatrix(recipeInfo.recipe as IShapelessRecipe, props.craftingTableSize)
                        ) : (
                            props.craftingTableSize < 3 ? (
                                removeEmptyRows(recipeInfo?.recipe as INonShapelessRecipe)
                            ) : (
                                recipeInfo?.recipe as INonShapelessRecipe
                            )
                        );

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

                        if (!recipe?.length || recipe?.length > props.craftingTableSize || recipe[0]?.length > props.craftingTableSize) {
                            return null;
                        }

                        return (
                            <div className="recipeContent slotButton"
                                key={recipeGroupName}
                                onClick={!props.result ? (e: React.MouseEvent<HTMLDivElement>) => {
                                    if (!(e.target as HTMLElement).classList.contains("recipeButton")) {
                                        const craftingTable: Array<Array<HTMLImageElement | null>> = Array.from({ length: 3 }).map(() => Array.from({ length: 3 }).map(() => null));
                                        recipe.forEach((row, rowIndex) => {
                                            row.forEach((slot, colIndex) => {
                                                if (slot) {
                                                    craftingTable[rowIndex][colIndex] = props.items.getItem(slot[materialIndex % slot.length]) as HTMLImageElement;
                                                }
                                            });
                                        });
                                        props.setCraftingTable(craftingTable);
                                        SoundEffect.play("click");
                                    }
                                } : () => { }}
                                onMouseMove={(e) => {
                                    store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: undefined, titleColor: undefined, text: recipeInfo.name }));
                                }}
                                onMouseLeave={() => {
                                    store.dispatch(deleteInfo())
                                }}
                                style={{
                                    display: isSearchResult(recipeGroup, search, props.itemCollection) ? "grid" : "none",
                                }}
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
                                                            {material ? <Item item={props.items.getItem(material)} /> : null}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <img className="recipeCraftingArrow" src={arrow} alt="arrow" draggable={false} style={{ height: size }} />
                                <div className="recipeSlot recipeItem" style={{ width: size, height: size }}>
                                    <Item item={props.items.getItem(recipeInfo.id)} />
                                </div>
                                {recipeInfo.shapeless && <img className="shapelessIcon" src={shapeless} alt="Shapeless" />}
                                {
                                    recipeGroup.length > 1 || Math.max(...recipe.flat().map(slot => slot?.length || 0)) > 1 ? (
                                        <>
                                            <div className="recipeCardPrevious recipeButton" onClick={(e) => {
                                                decrementCounter(); SoundEffect.play("click");
                                                store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: undefined, titleColor: undefined, text: recipeGroup[recipeGroupIndex - 1 < 0 ? recipeGroup.length - 1 : recipeGroupIndex - 1].name }))
                                            }} />
                                            <div className="recipeCardNext recipeButton" onClick={(e) => {
                                                incrementCounter(); SoundEffect.play("click");
                                                store.dispatch(setInfo({ x: e.clientX, y: e.clientY, title: undefined, titleColor: undefined, text: recipeGroup[recipeGroupIndex + 1].name }))
                                            }} />
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

export const KnowledgeBook = React.memo(KnowledgeBookRaw);