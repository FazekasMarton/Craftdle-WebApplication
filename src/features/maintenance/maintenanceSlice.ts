import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMaintenance } from "../../interfaces/IMaintenance";

// Initial state for the maintenance slice
const initialState: IMaintenance = {
    started: false,
    countdown: null
};

// Create the maintenance slice
const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState,
    reducers: {
        /**
         * Update the maintenance state.
         * @param state - The current state.
         * @param action - The action containing the maintenance data.
         */
        setMaintenance(state, action: PayloadAction<IMaintenance>) {
            state.started = action.payload.started
            state.countdown = action.payload.countdown
        },
    }
});

// Export the actions and reducer
export const { setMaintenance } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;