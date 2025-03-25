/**
 * Interface for a gamemode.
 */
export interface IGamemode {
    id: number; // Unique identifier for the gamemode.
    icon: string; // Icon representing the gamemode.
    name: string; // Display name of the gamemode.
    description: string; // Description of the gamemode.
    difficulty: {
        name: string; // Name of the difficulty level.
        color: string; // Color associated with the difficulty level.
    };
    continueGame: boolean; // Indicates if the game can be continued.
    playedBefore: boolean; // Indicates if the gamemode has been played before.
}