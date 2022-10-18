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
        },

        setLogOut(state) {
            state.user = null;
            state.accessToken = null;
        }
    }
})

export const { setUserData, setLogOut } = userSlice.actions;
export default userSlice.reducer;
