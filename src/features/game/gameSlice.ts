import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the game state.
 */
interface GameState {
    newGame: boolean;
    allay: boolean;
    help: boolean;
    requiredControl: string[];
}

const initialState: GameState = {
    newGame: false,
    allay: true,
    help: false,
    requiredControl: []
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

        setAllay: (state, action: PayloadAction<boolean>) => {
            state.allay = action.payload
            state.help = false
        },

        setHelp: (state, action: PayloadAction<boolean>) => {
            state.allay = action.payload
            state.help = action.payload
        },

        setRequiredControl: (state, action: PayloadAction<string[]>) => {
            state.requiredControl = action.payload
        },

        resetRequiredControl: (state) => {
            state.requiredControl = []
        },

        removeRequiredControl: (state, action: PayloadAction<string>) => {
            state.requiredControl = state.requiredControl.filter(control => control !== action.payload)
        }
    },
});

// Export the actions and reducer
export const { setNewGame, setAllay, setHelp, setRequiredControl, resetRequiredControl, removeRequiredControl } = gameSlice.actions;
export default gameSlice.reducer;
