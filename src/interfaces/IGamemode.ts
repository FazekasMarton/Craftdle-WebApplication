/**
 * Interface for a gamemode.
 */
export interface IGamemode {
    id: number,
    icon: string,
    name: string,
    description: string,
    difficulty: {
        name: string,
        color: string
    }
    continueGame: boolean,
    playedBefore: boolean
}