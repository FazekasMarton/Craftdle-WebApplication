import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';

interface InfoState {
    position: {
        x: number;
        y: number;
    } | null;
    text: ReactNode;
}

const initialState: InfoState = {
    position: null,
    text: ""
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<{x: number, y: number, text: ReactNode}>) => {
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