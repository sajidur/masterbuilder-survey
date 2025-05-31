import axios from 'axios';

// Reusable Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Change to your backend URL if needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});


export const getAllModules = async () => {
  try {
    const response = await apiClient.get('/survey-module/allModules');
    return response.data;
  } catch (error) {
    console.error('Error fetching all modules:', error);
    throw error;
  }
};
// Get all apps
export const getAllApps = async () => {
  try {
    const response = await apiClient.get('/survey-module/allApps');
    return response.data;
  } catch (error) {
    console.error('Error fetching all apps:', error);
    throw error;
  }
};

// Get all menus
export const getAllMenus = async () => {
  try {
    const response = await apiClient.get('/survey-module/allMenus');
    return response.data;
  } catch (error) {
    console.error('Error fetching all menus:', error);
    throw error;
  }
};

// Get all items
export const getAllItems = async () => {
  try {
    const response = await apiClient.get('/survey-module/allItems');
    return response.data;
  } catch (error) {
    console.error('Error fetching all items:', error);
    throw error;
  }
};

// Get all subitems
export const getAllSubitems = async () => {
  try {
    const response = await apiClient.get('/survey-module/allSubitems');
    return response.data;
  } catch (error) {
    console.error('Error fetching all subitems:', error);
    throw error;
  }
};

// Get all fields
export const getAllFields = async () => {
  try {
    const response = await apiClient.get('/survey-module/allFields');
    return response.data;
  } catch (error) {
    console.error('Error fetching all fields:', error);
    throw error;
  }
};
