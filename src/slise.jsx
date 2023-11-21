import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

export const fetchData = createAsyncThunk('data/fetchData', async () => {
  const response = await axios.get('https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FReal_Madrid_CF&psig=AOvVaw3vaM0hP7oMfJAZ_zdnWrzT&ust=1700653394690000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNCW4uCB1YIDFQAAAAAdAAAAABAE');
  return response.data;
});

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
