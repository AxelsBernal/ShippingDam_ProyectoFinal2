import axios from 'axios';

export async function getShippingAll() {
  try {
    const result = await axios.get(`${import.meta.env.VITE_REST_API_ECOMMERCE}entregas/`);
    console.log('<<AXIOS-SHIPPING>>: ', result.data);
    return result.data;
  } catch (error) {
    console.error('<<AXIOS-SHIPPING-ERROR>>: ', error);
    return [];
  }
}
