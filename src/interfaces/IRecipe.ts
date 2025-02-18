/**
 * Type definition for a collection of recipes.
 */
export type IRecipeCollection = {
    [key: string]: Array<IRecipe>
}

/**
 * Interface for a recipe.
 */
export interface IRecipe {
    id: string,
    name: string,
    recipe: IShapelessRecipe | INonShapelessRecipe,
    shapeless: boolean,
    src: string
}

/**
 * Type definition for a non-shapeless recipe.
 */
export type INonShapelessRecipe = Array<Array<Array<string> | null>>

/**
 * Interface for a shapeless recipe.
 */
export interface IShapelessRecipe {
    required: Array<Array<string>>
    optional?: Array<Array<string>>
}