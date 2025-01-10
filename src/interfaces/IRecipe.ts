export type IRecipeCollection = {
    [key: string]: Array<IRecipe>
}

export interface IRecipe {
    id: string,
    name: string,
    recipe: IShapelessRecipe | INonShapelessRecipe,
    shapeless: boolean,
    src: string
}

export type INonShapelessRecipe = Array<Array<Array<string> | null>>

export interface IShapelessRecipe{
    required: Array<Array<string> | string>
    optional?: Array<Array<string> | string>
}