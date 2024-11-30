import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoState {
    position: {
        x: number;
        y: number;
    } | null;
    text: string;
}

const initialState: InfoState = {
    position: null,
    text: ""
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<{x: number, y: number, text: string}>) => {
            state.position = {
                x: action.payload.x,
                y: action.payload.y
            }
            state.text = action.payload.text
        },
        deleteInfo: (state) => {
            state.position = null
        },
    },
});

export const { setInfo, deleteInfo } = infoSlice.actions;

export default infoSlice.reducer;