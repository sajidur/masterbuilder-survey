import axios from 'axios';
import config from '../config';

const apiClient = axios.create({
  baseURL: config.BASE_URL,
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
  layout: string;
}) => {
  try {
    const response = await apiClient.post('/survey-module/addSubSubSubItem', {
      ...data,
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
    layout: string
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateSubSubSubItem/${id}`, {
      ...data,
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



export const addField = async (data: {
  itemId: string;
  displayType: string;
  serialNumber: string;
  fieldGroupCode: string;
  tier: string;
  remarks: string;
  subItemId?: string | null;
  subSubItemId?: string | null;
  subSubSubItemId?: string | null;
}) => {
  try {
    const response = await apiClient.post("/survey-module/addField", data);
    return response.data;
  } catch (error) {
    console.error("Error adding field:", error);
    throw error;
  }
};

export const updateField = async (
  id: string,
  data: {
    itemId: string;
    displayType: string;
    serialNumber: string;
    fieldGroupCode: string;
    tier: string;
    remarks: string;
    subItemId?: string | null;
    subSubItemId?: string | null;
    subSubSubItemId?: string | null;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateField/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating field:", error);
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

//add dp group map



export const addDpGroupMap = async (data: {
  itemId: string;
  displayType: string;
  // serialNumber: string;
  fieldGroupCode: string;
  tier: string;
 // remarks: string;
  subItemId?: string | null;
  subSubItemId?: string | null;
  subSubSubItemId?: string | null;
}) => {
  try {
    const response = await apiClient.post("/survey-module/createDPGroupMap", data);
    return response.data;
  } catch (error) {
    console.error("Error adding field:", error);
    throw error;
  }
};

export const updateDpGroupMap= async (
  id: string,
  data: {
    itemId: string;
    // displayType: string;
    serialNumber: string;
    fieldGroupCode: string;
    tier: string;
    remarks: string;
    subItemId?: string | null;
    subSubItemId?: string | null;
    subSubSubItemId?: string | null;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateDPGroupMap/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating field:", error);
    throw error;
  }
};



// delete field
export const deleteDPGroupMap = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteDPGroupMap/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting field:", error);
    throw error;
  }
};




// Add DataPoint
export const addDataPoint = async (data: {
  itemId: string;
  dpGroupCode: string;
  dataPoint: string;
  serialNumber: string;
  dataType: string;
  isRequired: boolean;
  isHide: boolean;
}) => {
  try {
    const response = await apiClient.post('/survey-module/addDataPoint', data);
    return response.data;
  } catch (error) {
    console.error('Error adding DataPoint:', error);
    throw error;
  }
};

// Update DataPoint
export const updateDataPoint = async (
  id: string,
  data: {
    itemId: string;
    dpGroupCode: string;
    dataPoint: string;
    serialNumber: string;
    dataType: string;
    isRequired: boolean;
    isHide: boolean;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateDataPoint/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating DataPoint:', error);
    throw error;
  }
};

// Delete DataPoint
export const deleteDataPoint = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteDataPoint/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting DataPoint:", error);
    throw error;
  }
};

// add DATA POINT MAP
export const addDataPointMap = async (data: {
  itemId: string;
  dpGroupCode: string;
  dataPoint: string;
  serialNumber: string;
  dataType: string;
  isRequired: boolean;
  isHide: boolean;
}) => {
  try {
    const response = await apiClient.post('/survey-module/createDataPointMap', data);
    return response.data;
  } catch (error) {
    console.error('Error adding DataPoint:', error);
    throw error;
  }
};

// Update DataPoint
export const updateDataPointMap = async (
  id: string,
  data: {
    itemId: string;
    dpGroupCode: string;
    dataPoint: string;
    serialNumber: string;
    dataType: string;
    isRequired: boolean;
    isHide: boolean;
  }
) => {
  try {
    const response = await apiClient.put(`/survey-module/updateDataPointMap/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error updating DataPoint:', error);
    throw error;
  }
};

// Delete DataPoint
export const deleteDataPointMap = async (id: string) => {
  try {
    const response = await apiClient.delete(`/survey-module/deleteDataPointMap/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting DataPoint:", error);
    throw error;
  }
};
// Optional: Get all DataPoints
export const getAllDataPointsBySP = async () => {
  try {
    const response = await apiClient.get(`/survey-module/allDataPointBySP`);
    return response.data;
  } catch (error) {
    console.error("Error fetching DataPoints:", error);
    throw error;
  }
};
// Optional: Get all DataPoints
export const getAllDataPoints = async () => {
  try {
    const response = await apiClient.get(`/survey-module/allDataPoints`);
    return response.data;
  } catch (error) {
    console.error("Error fetching DataPoints:", error);
    throw error;
  }
};


export const allDataPointBySP = async () => {
  try {
    const response = await apiClient.get(`/survey-module/allDataPointBySP`);
    return response.data;
  } catch (error) {
    console.error("Error fetching DataPoints:", error);
    throw error;
  }
};




// Get all DataFields
export const getAllDataFields = async () => {
  try {
    const response = await apiClient.get(`/survey-module/allDataPoints`);
    return response.data;
  } catch (error) {
    console.error("Error fetching DataFields:", error);
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
export const getAllMenusBySP = async () => {
  try {
    const response = await apiClient.get('/survey-module/getallMenuBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all menus:', error);
    throw error;
  }
};

// Get all items
export const getAllItems = async () => {
  try {
    const response = await apiClient.get('/survey-module/allitems');
    return response.data;
  } catch (error) {
    console.error('Error fetching all items:', error);
    throw error;
  }
};

// Get all items
export const getAllItemsBySP = async () => {
  try {
    const response = await apiClient.get('/survey-module/getallitemBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all items:', error);
    throw error;
  }
};

// Get all subitems
export const getAllSubitems = async () => {
  try {
    const response = await apiClient.get('/survey-module/getallsubitemBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all subitems:', error);
    throw error;
  }
};
// Get all subitems
export const getallsubitemBySP = async () => {
  try {
    const response = await apiClient.get('/survey-module/getallsubitemBySP');
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

// Get all subSubitems
export const getallsubsubitemBySP = async () => {
  try {
    const response = await apiClient.get('/survey-module/getallsubsubitemBySP');
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
// Get all subSubSubitems
export const getAllSubSubSubitemsBySP = async () => {
  try {
    const response = await apiClient.get('/survey-module/getallsubsubsubitemBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all subitems:', error);
    throw error;
  }
};
// Get all fields
export const getAllFieldsBySP = async () => {
  try {
    const response = await apiClient.get('/survey-module/allDataGroupBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all fields:', error);
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
export const getAllDataPointmapsBySP  = async () => {
  try {
    const response = await apiClient.get('/survey-module/getAllDataPointmapsBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all fields:', error);
    throw error;
  }
};

export const getAllDPGroupmapsBySP  = async () => {
  try {
    const response = await apiClient.get('/survey-module/GetDPGroupMapsBySP');
    return response.data;
  } catch (error) {
    console.error('Error fetching all fields:', error);
    throw error;
  }
};
// Get all fields
export const ReportsData = async () => {
  try {
    const response = await apiClient.get('/survey-module/reportdata');
    return response.data;
  } catch (error) {
    console.error('Error fetching all fields:', error);
    throw error;
  }
};





// demo
export const uploadDocument = async (formData: FormData) => {
  return await axios.post(`${config.BASE_URL}/api/documents/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUploadedDocuments = async () => {
  const res = await fetch(`${config.BASE_URL}/api/documents`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};
