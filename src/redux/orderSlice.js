import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const sendOrder = createAsyncThunk(
  "order/sendOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/order/send", orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { status: null, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.status = "error";
        state.error = action.payload;
      });
  },
});

export default orderSlice.reducer;
