import axios from 'axios';

// Replace with your actual API URL
const ADD_LAUNDRY_API_URL = 'http://10.0.2.2:3000/laundry/create';

/**
 * Function to add a new laundry item
 * @param {string} name - Name of the laundry item
 * @param {number} price - Price of the laundry item
 * @returns {Promise} - Resolves with API response
 */
export const addLaundry = async (name, price) => {
  try {
    const response = await axios.post(ADD_LAUNDRY_API_URL, { name, price }); 
    return response;
  } catch (error) {
    throw error;
  }
};
