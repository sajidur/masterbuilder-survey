import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);



// Add Module
export const addModule = async (data: { name: string ,tier: string, serialNumber: string}) => {
  try {
    const response = await apiClient.post('/survey-module/addModule', data);
    return response.data;
  } catch (error) {
    console.error('Error adding module:', error);
    throw error;
  }
};
// Update Module
export const updateModule = async (
  id: string,
  data: { name: string; tier: string; serialNumber: string }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateModule/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating module:', error);
    throw error;
  }
};
//delete module
export const deleteModule = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteModule/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting module:", error);
    throw error;
  }
};



// Add App
export const addApp = async (data: { name: string; moduleId: string, tier: string, serialNumber: string }) => {
  try {
    const response = await apiClient.post('/survey-module/addApps', data);
    return response.data;
  } catch (error) {
    console.error('Error adding app:', error);
    throw error;
  }
};
// Update Apps
export const updateApps = async (
  id: string,
  data: { name: string; moduleId: string; tier: string; serialNumber: string }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateApps/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating module:', error);
    throw error;
  }
};
//delete app
export const deleteApp = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteApps/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting app:", error);
    throw error;
  }
};



// Add Menu
export const addMenu = async (data: { title: string; appId: string, tier: string, serialNumber: string }) => {
  try {
    const response = await apiClient.post('/survey-module/addMenu', data);
    return response.data;
  } catch (error) {
    console.error('Error adding menu:', error);
    throw error;
  }
};
// Update Menu
export const updateMenu = async (
  id: string,
  data: { title: string; appId: string, tier: string, serialNumber: string }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateMenu/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating module:', error);
    throw error;
  }
};
//delete menu
export const deleteMenu = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteMenu/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting menu:", error);
    throw error;
  }
};



// Add Item
export const addItem = async (data: { name: string; menuId: string, tier: string, serialNumber: string, buttonType:string, buttonLabel: string; navigationTo: string, description: string }) => {
  try {
    const response = await apiClient.post('/survey-module/addItem', data);
    return response.data;
  } catch (error) {
    console.error('Error adding item:', error);
    throw error;
  }
};
// Update Item
export const updateItem = async (
  id: string,
  data: { name: string; menuId: string, tier: string, serialNumber: string, buttonType:string, buttonLabel: string; navigationTo: string, description: string }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateItem/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating module:', error);
    throw error;
  }
};
//delete item
export const deleteItem = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteItem/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting Item:", error);
    throw error;
  }
};



// Add Subitem
export const addSubitem = async (data: { name: string; itemId: string, tier: string, templateId: string, serialNumber: string, buttonType:string, navigationTo: string, description: string; buttonLabel: string; layout: string}) => {
  try {
    const response = await apiClient.post('/survey-module/addSubitems', data);
    return response.data;
  } catch (error) {
    console.error('Error adding subitem:', error);
    throw error;
  }
};
// Update Subitem
export const updateSubitem = async (
  id: string,
  data: { name: string; itemId: string, tier: string, templateId: string, serialNumber: string, buttonType:string, navigationTo: string, description: string,buttonLabel: string; layout: string }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateSubitems/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating sub:', error);
    throw error;
  }
};
//delete subitem
export const deleteSubItem = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteSubitems/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubItem:", error);
    throw error;
  }
};



// Add Sub-Subitem
export const addSubSubitem = async (data: {
  name: string;
  subItemId: string;
  tier: string;
  templateId: string | null;
  serialNumber: string;
  layout: string;
  buttonType: string;
  buttonLabel: string;
  navigationTo: string;
}) => {
  try {
    const response = await apiClient.post('/survey-module/addSubSubItem', data);
    return response.data;
  } catch (error) {
    console.error('Error adding sub-subitem:', error);
    throw error;
  }
};

// Update subSubitem
export const updateSubSubitem = async (
  id: string,
  data: {
    name: string;
    subItemId: string;
    tier: string;
    templateId: string | null;
    serialNumber: string;
    layout: string;
    buttonType: string;
    buttonLabel: string;
    navigationTo: string;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateSubSubItem/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating subsub:', error);
    throw error;
  }
};

//delete subsubitem
export const deleteSubSubItem = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteSubSubItem/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubSubItem:", error);
    throw error;
  }
};



export const addSubSubSubitem = async (data: {
  name: string;
  subSubItemId: string;
  tier: string;
  serialNumber: string;
}) => {
  try {
    const response = await apiClient.post('/survey-module/addSubSubSubItem', {
      ...data,
      layout: "default",
      templateId: null,
      templateText: null,
    });
    return response.data;
  } catch (error) {
    console.error('Error adding sub-sub-subitem:', error);
    throw error;
  }
};

// Update SubSubSubitem
export const updateSubSubSubitem = async (
  id: string,
  data: {
    name: string;
    subSubItemId: string;
    tier: string;
    serialNumber: string;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateSubSubSubItem/${id}`, {
      ...data,
      layout: "default",
      templateId: null,
      templateText: null,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating sub-sub-subitem:', error);
    throw error;
  }
};

//delete subsubsub
export const deleteSubSubSubItem = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteSubSubSubItem/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting SubSubSubItem:", error);
    throw error;
  }
};



// Add Field
export const addField = async (data: {
  name: string;
  displayType: string;
  dataType: string;
  isRequired: boolean;
  subSubSubItemId: string;
  serialNumber: string;
  fieldGroupCode: string;
  tier: string;
  
}) => {
  try {
    const response = await apiClient.post('/survey-module/addField', data);
    return response.data;
  } catch (error) {
    console.error('Error adding field:', error);
    throw error;
  }
};

// Update Field
export const updateField = async (
  id: string,
  data: {
    name: string;
    displayType: string;
    dataType: string;
    isRequired: boolean;
    subSubSubItemId: string;
    serialNumber: string;
    fieldGroupCode: string;
    tier: string;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateField/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating field:', error);
    throw error;
  }
};

// delete field
export const deleteField = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteField/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting field:", error);
    throw error;
  }
};












// Add Template
export const addTemplate = async (data: { name: string; description: string, code: string }) => {
  try {
    const response = await apiClient.post('/templates/addTemplate', data);
    return response.data;
  } catch (error) {
    console.error('Error adding field:', error);
    throw error;
  }
};


export const getAllTemplates  = async () => {
  try {
    const response = await apiClient.get('/templates/getAllTemplates');
    return response.data;
  } catch (error) {
    console.error('Error fetching all modules:', error);
    throw error;
  }
};








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

// Get all subSubitems
export const getAllSubSubitems = async () => {
  try {
    const response = await apiClient.get('/survey-module/allSubSubItems');
    return response.data;
  } catch (error) {
    console.error('Error fetching all subitems:', error);
    throw error;
  }
};


// Get all subSubSubitems
export const getAllSubSubSubitems = async () => {
  try {
    const response = await apiClient.get('/survey-module/getAllSubSubSubItems');
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
