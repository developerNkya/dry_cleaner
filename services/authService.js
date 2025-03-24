import axios from 'axios';

// Replace with your API endpoint
const LOGIN_API_URL = 'http://10.0.2.2:3000/users/login';

/**
 * Function to handle login request
 * @param {string} username - The username to login with
 * @param {string} password - The password to login with
 * @returns {Promise} - The promise that resolves with the response or an error
 */
export const loginUser = async (username, password) => {
  try {
    const response = await axios.post(LOGIN_API_URL, { username, password });
    console.log('the response');
    const statusCode = response.data.status;   
    return statusCode; // Return the API response
  } catch (error) {
    throw error;
  }
};
