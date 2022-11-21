import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//Imported in Register.jsx
export const register = createAsyncThunk(
    'auth/register',
    async (user, thunkAPI) => {
        console.log(user);
    })

//Imported in Login.jsx
export const login = createAsyncThunk(
    'auth/login',
    async (user, thunkAPI) => {
        console.log(user);
    })

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

    }
})

//Imported in store.js as authReducer
export default authSlice.reducer