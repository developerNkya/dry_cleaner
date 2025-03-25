import axios from 'axios';

// Replace with your actual API URL
const URL = 'http://10.0.2.2:3000';

/**
 * Function to add a new laundry item
 * @param {string} name - Name of the laundry item
 * @param {number} price - Price of the laundry item
 * @returns {Promise} - Resolves with API response
 */
export const addLaundry = async (name, price) => {
  try {
    const response = await axios.post(URL + '/laundry/create', { name, price });
    return response;
  } catch (error) {
    throw error;
  }
};

/**
 * Function to update an existing laundry item
 * @param {string} name - Name of the laundry item
 * @param {number} price - Price of the laundry item
 * @param {number} id - ID of the laundry item to update
 * @returns {Promise} - Resolves with API response
 */
export const updateLaundry = async (name, price, id) => {
  try {
    // Correct the URL concatenation by using template literals for the id
    const response = await axios.put(`${URL}/laundry/${id}`, { name, price });
    return response;
  } catch (error) {
    throw error;
  }
};
