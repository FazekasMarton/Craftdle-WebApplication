import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the game state.
 */
interface GameState {
    newGame: boolean;
}

// Initial state for the game slice
const initialState: GameState = {
    newGame: false
};

// Create the game slice
const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        /**
         * Set the new game state.
         * @param state - The current state.
         * @param action - The action containing the new game state.
         */
        setNewGame: (state, action: PayloadAction<boolean>) => {
            state.newGame = action.payload
        },
    },
});

// Export the actions and reducer
export const { setNewGame } = gameSlice.actions;
export default gameSlice.reducer;