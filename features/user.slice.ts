import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        accessToken: null
    },
    reducers: {
        setUserData(state, { payload }) {
            state.user = payload.user;
            state.accessToken = payload.accessToken;
        }
    }
})

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
