/**
 * Type definition for a collection of recipes.
 * 
 * Maps recipe IDs to arrays of recipes.
 */
export type IRecipeCollection = {
    [key: string]: Array<IRecipe> // Key is the recipe ID, value is an array of recipes.
}

/**
 * Interface for a recipe.
 */
export interface IRecipe {
    id: string; // Unique identifier for the recipe.
    name: string; // Display name of the recipe.
    recipe: IShapelessRecipe | INonShapelessRecipe; // Recipe details.
    shapeless: boolean; // Indicates if the recipe is shapeless.
    src: string; // Source URL for the recipe's image.
}

/**
 * Type definition for a non-shapeless recipe.
 * 
 * Represents a grid of items required for crafting.
 */
export type INonShapelessRecipe = Array<Array<Array<string> | null>>;

/**
 * Interface for a shapeless recipe.
 * 
 * Represents required and optional items for crafting.
 */
export interface IShapelessRecipe {
    required: Array<Array<string>>; // Required items for the recipe.
    optional?: Array<Array<string>>; // Optional items for the recipe.
}