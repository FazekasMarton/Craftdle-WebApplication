import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMaintenance } from "../../interfaces/IMaintenance";

const initialState: IMaintenance = {
    started: false,
    countdown: null
};

const maintenanceSlice = createSlice({
    name: "maintenance",
    initialState,
    reducers: {
        setMaintenance(state, action: PayloadAction<IMaintenance>) {
            state.started = action.payload.started
            state.countdown = action.payload.countdown
        },
    }
});

export const { setMaintenance } = maintenanceSlice.actions;
export default maintenanceSlice.reducer;