import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        }, setLoading(state, value) {
            state.loading = value.payload;
        },
        setToken(state, action) {
            state.token = action.payload;
        },
    },
});

export const { setUser, setToken, setLoading } = profileSlice.actions;
export default profileSlice.reducer;