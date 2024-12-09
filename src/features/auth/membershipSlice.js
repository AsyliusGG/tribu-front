import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const checkMembership = createAsyncThunk("membership/checkMembership", async (userId, thunkAPI) => {
  const token = Cookies.get("auth_token");
  try {
    const response = await axios.get(`http://localhost:8000/api/v1/memberships/${userId}/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const membershipSlice = createSlice({
  name: "membership",
  initialState: {
    active: false,
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkMembership.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkMembership.fulfilled, (state, action) => {
        state.isLoading = false;
        state.active = action.payload.active && (!action.payload.end_date || new Date(action.payload.end_date) > new Date());
      })
      .addCase(checkMembership.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default membershipSlice.reducer;