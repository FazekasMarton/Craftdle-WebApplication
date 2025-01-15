import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GameState {
    newGame: boolean;
}

const initialState: GameState = {
    newGame: false
};

const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        setNewGame: (state, action: PayloadAction<boolean>) => {
            state.newGame = action.payload
        },        
    },
});

export const { setNewGame } = gameSlice.actions;

export default gameSlice.reducer;