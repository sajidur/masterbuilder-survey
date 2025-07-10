import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  getAllItems,
  addDataPoint,
  updateDataPoint,
  getAllDataPoints,
  deleteDataPoint,
  getAllModules,
  getAllApps,
  getAllMenus,
} from "../../apiRequest/api";

interface Module {
  id: string;
  name: string;
}

interface App {
  id: string;
  name: string;
  moduleId: string;
}

interface Menu {
  id: string;
  title: string;
  appId: string;
}

interface Item {
  id: string;
  name: string;
  menuId: string;
}

interface DataPoint {
  id: string;
  itemId: string;
  itemName: string;
  dpGroupCode: string;
  dataPoint: string;
  serialNumber: string;
  dataType: string;
  isHide: boolean;
  isRequired: boolean;
}

const DataPointManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [dpGroupCode, setDpGroupCode] = useState("");
  const [dataPointName, setDataPointName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [dataType, setDataType] = useState("");
  const [isHide, setIsHide] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const fieldTypes = ["text", "number", "date", "boolean", "dropdown"];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [moduleData, appData, menuData, itemData, dataPointData] =
          await Promise.all([
            getAllModules(),
            getAllApps(),
            getAllMenus(),
            getAllItems(),
            getAllDataPoints(),
          ]);
        setModules(moduleData);
        setApps(appData);
        setMenus(menuData);
        setItems(itemData);
        setDataPoints(dataPointData);
      } catch {
        toast.error("Failed to load data.");
      }
    };

    fetchInitialData();
  }, []);

  const filteredApps = apps.filter((app) => app.moduleId === selectedModule);
  const filteredMenus = menus.filter((menu) => menu.appId === selectedApp);
  const filteredItems = items.filter((item) => item.menuId === selectedMenu);

  const resetForm = () => {
    setSelectedModule("");
    setSelectedApp("");
    setSelectedMenu("");
    setSelectedItem("");
    setDpGroupCode("");
    setDataPointName("");
    setSerialNumber("");
    setDataType("");
    setIsHide(false);
    setIsRequired(false);
    setEditId(null);
  };

  const handleAddOrUpdate = async () => {
    if (!selectedItem || !dpGroupCode || !dataPointName || !dataType) {
      toast.warn("Please fill all required fields.");
      return;
    }

    const payload = {
      itemId: selectedItem,
      dpGroupCode,
      dataPoint: dataPointName,
      serialNumber,
      dataType,
      isHide,
      isRequired,
    };

    try {
      if (editId) {
        await updateDataPoint(editId, payload);
        toast.success("DataPoint updated successfully!");
      } else {
        await addDataPoint(payload);
        toast.success("DataPoint added successfully!");
      }

      const updated = await getAllDataPoints();
      setDataPoints(updated);
      resetForm();
    } catch {
      toast.error("Failed to save DataPoint.");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDataPoint(id);
      toast.success("Deleted.");
      const updated = await getAllDataPoints();
      setDataPoints(updated);
    } catch {
      toast.error("Failed to delete.");
    }
  };

  return (
    <div>
      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <h2 className=" font-light mb-4">DataPoint Manager</h2>

          {/* Module */}
          <div>
            <label className="block mb-1 font-medium">Module</label>
            <select
              value={selectedModule}
              onChange={(e) => {
                setSelectedModule(e.target.value);
                setSelectedApp("");
                setSelectedMenu("");
                setSelectedItem("");
              }}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Module</option>
              {modules.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          </div>

          {/* App */}
          <div>
            <label className="block mb-1 font-medium">App</label>
            <select
              value={selectedApp}
              onChange={(e) => {
                setSelectedApp(e.target.value);
                setSelectedMenu("");
                setSelectedItem("");
              }}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select App</option>
              {filteredApps.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>

          {/* Menu */}
          <div>
            <label className="block mb-1 font-medium">Menu</label>
            <select
              value={selectedMenu}
              onChange={(e) => {
                setSelectedMenu(e.target.value);
                setSelectedItem("");
              }}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Menu</option>
              {filteredMenus.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
            </select>
          </div>

          {/* Item */}
          <div>
            <label className="block mb-1 font-medium">Item</label>
            <select
              value={selectedItem}
              onChange={(e) => setSelectedItem(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Item</option>
              {filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Group Code */}
          <div>
            <label className="block mb-1 font-medium">DP Group Code</label>
            <input
              type="text"
              value={dpGroupCode}
              onChange={(e) => setDpGroupCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Serial Number */}
          <div>
            <label className="block mb-1 font-medium">Serial No</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* DataPoint Name */}
          <div>
            <label className="block mb-1 font-medium">DataPoint</label>
            <input
              type="text"
              value={dataPointName}
              onChange={(e) => setDataPointName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Data Type */}
          <div>
            <label className="block mb-1 font-medium">Data Type</label>
            <select
              value={dataType}
              onChange={(e) => setDataType(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Type</option>
              {fieldTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Checkboxes & Buttons */}
          <div className="flex justify-bwteen items-center space-x-2 mt-7">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isHide}
                onChange={(e) => setIsHide(e.target.checked)}
              />
              Hide
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isRequired}
                onChange={(e) => setIsRequired(e.target.checked)}
              />
              Required
            </label>
          </div>

          <div className="">
            <button
            onClick={handleAddOrUpdate}
            className="px-6 py-2 mt-7 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editId ? "Update" : "+ Add"}
          </button>

          {editId && (
            <button
              onClick={handleCancelEdit}
              className="px-6 py-2 mt-7 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">DP Group Code</th>
              <th className="p-2 text-left">DataPoint</th>
              <th className="p-2 text-left">Serial</th>
              <th className="p-2 text-left">Hide</th>
              <th className="p-2 text-left">Required</th>
              <th className="p-2 text-left">Data Type</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {dataPoints.map((dp) => (
              <tr key={dp.id} className="border-t">
                <td className="p-2">{dp.itemName}</td>
                <td className="p-2">{dp.dpGroupCode}</td>
                <td className="p-2">{dp.dataPoint}</td>
                <td className="p-2">{dp.serialNumber}</td>
                <td className="p-2">{dp.isHide ? "Yes" : "No"}</td>
                <td className="p-2">{dp.isRequired ? "Yes" : "No"}</td>
                <td className="p-2">{dp.dataType}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(dp.id);
                      setDataPointName(dp.dataPoint);
                      setDpGroupCode(dp.dpGroupCode);
                      setSerialNumber(dp.serialNumber);
                      setDataType(dp.dataType);
                      setIsRequired(dp.isRequired);
                      setIsHide(dp.isHide);
                      const item = items.find((i) => i.id === dp.itemId);
                      if (item) {
                        const menu = menus.find((m) => m.id === item.menuId);
                        const app = apps.find((a) => a.id === menu?.appId);
                        setSelectedModule(app?.moduleId || "");
                        setSelectedApp(app?.id || "");
                        setSelectedMenu(menu?.id || "");
                        setSelectedItem(item.id);
                      }
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(dp.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DataPointManager;
