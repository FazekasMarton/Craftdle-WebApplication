import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Interface for the info state.
 */
interface InfoState {
    position: {
        x: number;
        y: number;
    } | undefined;
    title: string | undefined;
    titlecolor: string | undefined;
    text: string | undefined;
}

// Initial state for the info slice
const initialState: InfoState = {
    position: undefined,
    title: undefined,
    titlecolor: undefined,
    text: undefined
}

// Create the info slice
const infoSlice = createSlice({
    name: 'info',
    initialState,
    reducers: {
        /**
         * Set the info state.
         * @param state - The current state.
         * @param action - The action containing the info data.
         */
        setInfo: (state, action: PayloadAction<{x: number, y: number, title: string | undefined, titleColor: string | undefined, text: string | undefined}>) => {
            state.position = {
                x: action.payload.x,
                y: action.payload.y
            };
            state.title = action.payload.title;
            state.titlecolor = action.payload.titleColor
            state.text = action.payload.text;
        },
        /**
         * Delete the info state.
         * @param state - The current state.
         */
        deleteInfo: (state) => {
            state.position = undefined
        },
    },
});

// Export the actions and reducer
export const { setInfo, deleteInfo } = infoSlice.actions;
export default infoSlice.reducer;