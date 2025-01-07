import { Items } from "../../classes/Items";
import { INonShapelessRecipe, IRecipeCollection, IShapelessRecipe } from "../../interfaces/IRecipe"
import searchIcon from "../../assets/imgs/icons/search_icon.png"
import { useState } from "react";
import { Item } from "./Item";
import arrow from "../../assets/imgs/icons/arrow.png"

interface KnowledgeBookProps {
    recipes: IRecipeCollection;
    items: Items;
    craftingTableSize: number;
}

function convertToMatrix(recipe: IShapelessRecipe, craftingTableSize: number) {
    const convertedRecipe: INonShapelessRecipe = [[]]
    let colCounter = 0;
    let rowIndex = 0;
    recipe.required.forEach(materials => {
        if(colCounter >= craftingTableSize){
            colCounter = 0;
            rowIndex++;
            convertedRecipe.push([]);
        }
        convertedRecipe[convertedRecipe.length - 1].push(typeof materials === "string" ? [materials] : materials);
        colCounter++;
    });
    return convertedRecipe
}

export function KnowledgeBook(props: KnowledgeBookProps) {
    const [search, setSearch] = useState("")

    return <div id="knowledgeBook">
        <header id="knowledgeBookHeader">
            <h1 id="knowledgeBookTitle">Knowledge Book:</h1>
            <nav className="searchBar">
                <img className="searchIcon" src={searchIcon} alt="Search Icon" />
                <input type="text" id="knowledgeBookSearch" className="search" placeholder="Search..." onInput={(e) => { setSearch(e.currentTarget.value) }} />
            </nav>
        </header>
        <div id="knowledgeBookContainer">
            <div id="knowledgeBookContent">
                {
                    Object.keys(props.recipes).map((recipeGroupName) => {
                        const recipeGroup = props.recipes[recipeGroupName];
                        const recipeInfo = recipeGroup[0];
                        const recipe = recipeInfo.shapeless ? convertToMatrix(recipeInfo.recipe as IShapelessRecipe, props.craftingTableSize) : recipeInfo.recipe as INonShapelessRecipe;
                        if (recipe.length > props.craftingTableSize || recipe[0].length > props.craftingTableSize) {
                            return null;
                        }
                        return <div className="recipeContent slotButton">
                            <table className="recipeCraftingTable">
                                {
                                    Array.from({ length: props.craftingTableSize }).map((_, rowIndex) => {
                                        return <tr>
                                            {
                                                Array.from({ length: props.craftingTableSize }).map((_, colIndex) => {
                                                    const item = recipe[rowIndex] ? recipe[rowIndex][colIndex] : null;
                                                    return <td className="recipeSlot">
                                                        {
                                                            item ? <Item item={props.items.getItem(item[0])} /> : null
                                                        }
                                                    </td>
                                                })
                                            }
                                        </tr>
                                    })
                                }
                            </table>
                            <img className="recipeCraftingArrow" src={arrow} alt="arrow" />
                            <div className="recipeSlot">
                                <Item item={props.items.getItem(recipeInfo.id)} />
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    </div>
}