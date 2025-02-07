import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// createAsyncThunk is used to define an asynchronous thunk action creator.
// 'fetchTodos' is the name of the action, and the function returns a promise 
// that resolves with the JSON response from the API.
export const fetchTodos = createAsyncThunk("fetchTodos", async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    return response.json();
})

// createSlice is used to define a slice of the Redux store.
// It includes the reducer logic and automatically generates actions.
const todoSlice = createSlice({
    name: "Todo", // Name of the slice
    initialState: {
        isLoading: false, // Indicates if data is being fetched
        data: null,       // Stores the fetched data
        isError: false,   // Indicates if there was an error fetching data
    },
    extraReducers: (builder) => {
        // Handles the pending state of the 'fetchTodos' action
        builder.addCase(fetchTodos.pending, (state, action) => {
            state.isLoading = true;
        });
        // Handles the fulfilled state of the 'fetchTodos' action
        // Updates the state with the fetched data
        builder.addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        // Handles the rejected state of the 'fetchTodos' action
        // Sets isError to true if there was an error fetching data
        builder.addCase(fetchTodos.rejected, (state, action) => {
            console.log("Error fetching todos: ", action.payload);
            state.isError = true;
        });
    }
});

// Export the reducer to be used in the store
export default todoSlice.reducer;
