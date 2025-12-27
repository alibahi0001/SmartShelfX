import axios from 'axios';
const BASE_URL = 'http://localhost:9191/invent';
const LOGIN_URL = BASE_URL + '/login';
const REGISTER_URL = BASE_URL + '/register';

// Login user with username and password - returns role
export const loginUser = (username, password) => {
  console.log('Attempting login to:', LOGIN_URL);
  console.log('Username:', username);
  return axios.post(LOGIN_URL, { username, password })
    .then(response => {
      console.log('Login response:', response);
      return response;
    })
    .catch(error => {
      console.error('Login error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: LOGIN_URL
      });
      throw error;
    });
};

// Register new user
export const registerUser = (userData) => {
  console.log('Attempting registration to:', REGISTER_URL);
  console.log('User data:', userData);
  return axios.post(REGISTER_URL, userData)
    .then(response => {
      console.log('Registration response:', response);
      return response;
    })
    .catch(error => {
      console.error('Registration error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        url: REGISTER_URL
      });
      throw error;
    });
};

// For pulling from the db and validating
export const validateUser = (userId, password) => {
  return axios.get(LOGIN_URL + "/" + userId + "/" + password);
};

export const getUserDetails = () => {
  return axios.get(LOGIN_URL);
};