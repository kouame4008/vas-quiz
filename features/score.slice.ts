import { createSlice } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
    name: 'score',
    initialState: {
        points: 0,
    },
    reducers: {
        setScoreData(state, { payload }) {
            state.points = payload.points;
        }
    }
})

export const { setScoreData } = scoreSlice.actions;
export default scoreSlice.reducer;
