import axios from 'axios';

// Reusable Axios instance
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Change to your backend URL if needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});




// Add Module
export const addModule = async (data: { name: string }) => {
  try {
    const response = await apiClient.post('/survey-module/addModule', data);
    return response.data;
  } catch (error) {
    console.error('Error adding module:', error);
    throw error;
  }
};

// Add App
export const addApp = async (data: { name: string; moduleId: number }) => {
  try {
    const response = await apiClient.post('/survey-module/addApps', data);
    return response.data;
  } catch (error) {
    console.error('Error adding app:', error);
    throw error;
  }
};

// Add Menu
export const addMenu = async (data: { title: string; appId: number }) => {
  try {
    const response = await apiClient.post('/survey-module/addMenu', data);
    return response.data;
  } catch (error) {
    console.error('Error adding menu:', error);
    throw error;
  }
};

// Add Item
export const addItem = async (data: { name: string; menuId: number }) => {
  try {
    const response = await apiClient.post('/survey-module/addItem', data);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};

// Add Subitem
export const addSubitem = async (data: { label: string; itemId: number }) => {
  try {
    const response = await apiClient.post('/survey-module/addSubitems', data);
    return response.data;
  } catch (error) {
    console.error('Error adding subitem:', error);
    throw error;
  }
};

// Add Sub-Subitem
export const addSubSubitem = async (data: { label: string; subItemId: number }) => {
  try {
    const response = await apiClient.post('/survey-module/addSubSubItem', data);
    return response.data;
  } catch (error) {
    console.error('Error adding sub-subitem:', error);
    throw error;
  }
};

// Add Field
export const addField = async (data: { name: string; subSubItemId: number }) => {
  try {
    const response = await apiClient.post('/survey-module/addField', data);
    return response.data;
  } catch (error) {
    console.error('Error adding field:', error);
    throw error;
  }
};


// Add a module
// await addModule({ name: 'Survey Module' });

// await addApp({ name: 'Health App', moduleId: 1 });

// await addMenu({ title: 'Dashboard', appId: 2 });
// await addItem({ name: 'Item A', menuId: 1 });
// await addSubitem({ label: 'Subitem A', itemId: 2 });
// await addSubSubitem({ label: 'SubSub A', subItemId: 3 });
// await addField({ name: 'Field A', subSubItemId: 4 });









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

// Get all subitems
export const getAllSubSubitems = async () => {
  try {
    const response = await apiClient.get('/survey-module/allSubSubitems');
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



//demo
export const uploadDocument = async (formData: FormData) => {
  return await axios.post("/api/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUploadedDocuments = async () => {
  const res = await fetch("/api/documents"); // update with your actual endpoint
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
