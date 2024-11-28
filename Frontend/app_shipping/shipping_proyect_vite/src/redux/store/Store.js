import { configureStore } from '@reduxjs/toolkit';
import ShippingSlice from '../slices/ShippingSlice';

const store = configureStore({
  reducer: {
    shippingReducer: ShippingSlice,
  },
});

export default store;
