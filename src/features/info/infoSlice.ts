import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InfoState {
    position: {
        x: number;
        y: number;
    } | undefined;
    title: string | undefined;
    titlecolor: string | undefined;
    text: string | undefined;
}

const initialState: InfoState = {
    position: undefined,
    title: undefined,
    titlecolor: undefined,
    text: undefined
}

const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        setInfo: (state, action: PayloadAction<{x: number, y: number, title: string | undefined, titleColor: string | undefined, text: string | undefined}>) => {
            state.position = {
                x: action.payload.x,
                y: action.payload.y
            };
            state.title = action.payload.title;
            state.titlecolor = action.payload.titleColor
            state.text = action.payload.text;
        },
        deleteInfo: (state) => {
            state.position = undefined
        },
    },
});

export const { setInfo, deleteInfo } = infoSlice.actions;

export default infoSlice.reducer;