import { SET_DATA_SHIPPING, START_LOADING, SET_ERROR } from './slices/ShippingSlice';
import { getShippingAll } from './actions/ShippingActions';

export const fetchShippingData = () => async (dispatch) => {
  dispatch(START_LOADING());
  try {
    const data = await getShippingAll();
    dispatch(SET_DATA_SHIPPING(data));
  } catch (error) {
    console.error('<<THUNK-ERROR>>: ', error);
    dispatch(SET_ERROR());
  }
};
