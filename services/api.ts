import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Constants from 'expo-constants';

const API_BASE_URL = (Constants.expoConfig && Constants.expoConfig.extra && Constants.expoConfig.extra.API_BASE_URL) || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach bearer token to every request
api.interceptors.request.use(async (config) => {
  try {
    const token = await AsyncStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
});

// Auto-logout on 401 (token expired / invalid)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      await AsyncStorage.removeItem('access_token');
    }
    return Promise.reject(error);
  }
);

export default api;
