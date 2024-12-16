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

export type IShapelessRecipe = Array<Array<string | null | Array<String>> | null>

export interface INonShapelessRecipe{
    required: Array<Array<string> | string>
    optional?: Array<Array<string> | string>
}