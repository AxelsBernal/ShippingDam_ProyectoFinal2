import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ShippingDataArr: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
};

const shippingSlice = createSlice({
  name: 'SHIPPING',
  initialState,
  reducers: {
    SET_DATA_SHIPPING: (state, action) => {
      console.log('<<REDUX-REDUCER>>:<<SET_DATA_SHIPPING>>', action.payload);
      state.ShippingDataArr = action.payload;
      state.status = 'succeeded';
    },
    START_LOADING: (state) => {
      state.status = 'loading';
    },
    SET_ERROR: (state) => {
      state.status = 'failed';
    },
  },
});

export const { SET_DATA_SHIPPING, START_LOADING, SET_ERROR } = shippingSlice.actions;

export default shippingSlice.reducer;
