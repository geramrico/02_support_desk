import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import noteService from "./noteService";


const initialState = {
    notes: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

// Create new note
export const createNote = createAsyncThunk(
    'note/create',
    async (ticketId, noteText, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token

            return await noteService.createNote(ticketId, noteText, token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })


// Create new note
export const getNotes = createAsyncThunk(
    'note/getAll',
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token

            return await noteService.getNotes(ticketId, token)
        } catch (error) {
            const message = (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()

            return thunkAPI.rejectWithValue(message)
        }
    })


export const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
        .addCase(createNote.pending, state => {
            state.isLoading = true
        })
        .addCase(createNote.fulfilled, state => {
            state.isLoading = false
            state.isSuccess = true
        })
        .addCase(createNote.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
        .addCase(getNotes.pending, state => {
            state.isLoading = true
        })
        .addCase(getNotes.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.notes = action.payload
        })
        .addCase(getNotes.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        })
    }

})

export const { reset } = noteSlice.actions

//Imported in store.js as noteReducer
export default noteSlice.reducer