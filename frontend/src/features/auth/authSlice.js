import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

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
        try {
            //From authService
            return await authService.register(user)
        } catch (error) {
            const message = (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                            error.message ||
                            error.toString()

            return thunkAPI.rejectWithValue(message)
        }
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
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
                state.isError = false
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.user = null
                state.isError = true
                state.message = action.payload
            })

    }
})


export const { reset } = authSlice.actions

//Imported in store.js as authReducer
export default authSlice.reducer