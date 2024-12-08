import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addHijos = createAsyncThunk(
  "hijos/addHijos",
  async ({ userId, hijos }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/v1/hijos/`,
        { user: userId, hijos }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const hijoSlice = createSlice({
  name: "hijos",
  initialState: {
    hijos: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addHijos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addHijos.fulfilled, (state, action) => {
        state.isLoading = false;
        state.hijos.push(...action.payload);
      })
      .addCase(addHijos.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default hijoSlice.reducer;
