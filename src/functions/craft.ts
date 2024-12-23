import { INonShapelessRecipe, IRecipeCollection, IShapelessRecipe } from "../interfaces/IRecipe";

type ICraftingTable = Array<Array<HTMLImageElement | null>>;

function removeEmptyRows(recipe: INonShapelessRecipe | ICraftingTable) {
    let newRecipe = recipe.filter(row => row.some(cell => cell !== null));
    if(newRecipe.length == 0) return newRecipe;
    const transpose = (matrix: any[][]) => matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
    const transposedRecipe = transpose(newRecipe);
    const filteredTransposedRecipe = transposedRecipe.filter(col => col.some(cell => cell !== null));
    return transpose(filteredTransposedRecipe);
}

function convertToNonShapeless(craftingTable: ICraftingTable): INonShapelessRecipe {
    return craftingTable.map(row => row.map(cell => {
        if (cell) {
            const classList = Array.from(cell.classList).filter(className => className !== "item");
            return classList.length > 0 ? classList[0] : null;
        }
        return null;
    })) as INonShapelessRecipe;
}

export function craft(craftingTable: ICraftingTable, recipes: IRecipeCollection): string | null {
    const filteredCraftingTable: INonShapelessRecipe = removeEmptyRows(convertToNonShapeless(craftingTable));

    for (let recipeGroup in recipes) {
        for (let recipe of recipes[recipeGroup]) {
            if (recipe.shapeless) {
                let items = filteredCraftingTable.flat(2).filter(cell => cell !== null);
                let requiredItems = (recipe.recipe as IShapelessRecipe).required;
                let optionalItems = (recipe.recipe as IShapelessRecipe).optional;
                let match = true;
                for(let i = 0; i < requiredItems.length; i++){
                    if(Array.isArray(requiredItems[i])){
                        let contain = false;
                        for(let j = 0; j < requiredItems[i].length; j++){
                            if(items.includes(requiredItems[i][j])){
                                items.splice(items.indexOf(requiredItems[i][j]), 1);
                                contain = true;
                                break;
                            }
                        }
                        if(!contain){
                            match = false;
                            break;
                        }
                    }else{
                        if(!items.includes(requiredItems[i] as string)){
                            match = false;
                            break;
                        }
                        items.splice(items.indexOf(requiredItems[i] as string), 1);
                    }
                }

                console.log(optionalItems);

                if(optionalItems && items.length > 0){
                    for(let i = 0; i < optionalItems.length; i++){
                        if(Array.isArray(optionalItems[i])){
                            let contain = false;
                            for(let j = 0; j < optionalItems[i].length; j++){
                                if(items.includes(optionalItems[i][j])){
                                    items.splice(items.indexOf(optionalItems[i][j]), 1);
                                    contain = true;
                                    break;
                                }
                            }
                            if(!contain){
                                match = false;
                                break;
                            }
                        }else{
                            if(items.includes(optionalItems[i] as string)){
                                items.splice(items.indexOf(optionalItems[i] as string), 1);
                            }
                        }
                    }
                }

                if(match && items.length == 0){
                    return recipe.id;
                }
            } else {
                const nonShapelessRecipe = recipe.recipe as INonShapelessRecipe;
                const filteredRecipe = removeEmptyRows(nonShapelessRecipe);

                if (filteredCraftingTable.length == filteredRecipe.length && filteredCraftingTable[0].length == filteredRecipe[0].length) {
                    let match = true;
                    for (let i = 0; i < filteredCraftingTable.length; i++) {
                        for (let j = 0; j < filteredCraftingTable[i].length; j++) {
                            if (!filteredRecipe[i][j]?.includes(filteredCraftingTable[i][j])) {
                                match = false;
                                break;
                            }
                        }
                        if (!match) break;
                    }
                    if (match) {
                        return recipe.id;
                    }
                }
            }
        }
    }
    return null;
}