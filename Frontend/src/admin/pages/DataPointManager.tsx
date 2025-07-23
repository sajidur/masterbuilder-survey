/* eslint-disable @typescript-eslint/no-explicit-any */
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
  getAllFields,
  getAllDataPointsBySP,
} from "../../apiRequest/api";
import { ListTree } from "lucide-react";
import { tiers } from "./data";

interface Module {
  id: string;
  name: string;
}

interface App {
  id: string;
  name: string;
  module: Module; // Fixed to match nested structure
}

interface Menu {
  id: string;
  title: string;
  app: App; // Fixed to match nested structure
}

interface Item {
  id: string;
  name: string;
  menu: Menu; // Fixed to match nested structure
}

interface DataPoint {
  id: string;
  itemId: string;
  itemName: string;
  dpGroupCode: string;
  dataPoint: string;
  serialNumber: string;
  tier: string;
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
  const [tier, setTier] = useState("");

  const [isHide, setIsHide] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [dpGroups, setDpGroups] = useState<any[]>([]);

  const fieldTypes = ["text", "number", "date", "boolean", "dropdown"];

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [
          moduleData,
          appData,
          menuData,
          itemData,
          dataPointData,
          dpGroups,
        ] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllDataPointsBySP(),
          getAllFields(),
        ]);

        console.log("✅ Modules:", moduleData);
        console.log("✅ Apps:", appData);
        console.log("✅ Menus:", menuData);

        setModules(moduleData);
        setApps(appData);
        setMenus(menuData);
        setItems(itemData);
        setDataPoints(dataPointData);
        setDpGroups(dpGroups);
      } catch (error) {
        console.error("❌ Data fetch error:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchInitialData();
  }, []);

  // Filter logic updated to match nested structure
  // const filteredApps = apps.filter(
  //   (app) => app.Module?.name === selectedModule
  // );
  // const filteredMenus = menus.filter((menu) => menu.app?.name === selectedApp);
  // const filteredItems = items.filter(
  //   (item) => item.menu?.title === selectedMenu
  // );

  const filteredApps = apps.filter((app) => app.Module?.id === selectedModule);
const filteredMenus = menus.filter((menu) => menu.app?.id === selectedApp);
const filteredItems = items.filter((item) => item.menu?.id === selectedMenu);

  const resetForm = () => {
    // setSelectedModule("");
    // setSelectedApp("");
    // setSelectedMenu("");
    // setSelectedItem("");
    // setDpGroupCode("");
    setDataPointName("");
    setSerialNumber("");
    //setDataType("");
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
      tier,
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

  const modulename = modules.find((module) => module?.id === selectedModule)?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const menuname = menus.find((menu) => menu.id === selectedMenu)?.title;
  const itemname = items.find((item) => item.id === selectedItem)?.name;

  const filteredItemsdata = dataPoints.filter((item) => {
  const matchModule = selectedModule ? item.moduleName === modulename : true;
  const matchApp = selectedApp ? item.appName === appname : true;
  const matchMenu = selectedMenu ? item.menuTitle === menuname : true;
  const matchitem = selectedItem ? item.itemName === itemname : true;

  return matchModule && matchApp && matchMenu && matchitem;
});

  return (
    <div>
      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <h2 className="font-light text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 ">
              <ListTree size={18} />
            </span>
            Datapoint
          </h2>

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
              onChange={(e) => {
                const selectedId = e.target.value;
                setSelectedItem(selectedId);

                const selected = items.find((item) => item.id === selectedId);
                const prefix = selected ? `${selected.name}/` : "";

                setDpGroupCode(prefix);
              }}
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
          {/* <div>
            <label className="block mb-1 font-medium">DP Group</label>
            <input
              type="text"
              value={dpGroupCode}
              onChange={(e) => {
                const input = e.target.value;

                if (!input.startsWith(dpPrefix)) return;

                setDpGroupCode(input);
              }}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter dp group"
            />
          </div> */}

          {/* Group Code */}
          {false &&
          <div>
            <label className="block mb-1 font-medium">DP Group</label>
            <select
              value={dpGroupCode}
              onChange={(e) => setDpGroupCode(e.target.value)}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select Group</option>
              {dpGroups.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.fieldGroupCode}
                </option>
              ))}
            </select>
          </div>
}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mt-4">
          <div>
            <label className="block mb-1 font-medium">Serial No</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter SI number"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Datapoint</label>
            <input
              type="text"
              value={dataPointName}
              onChange={(e) => setDataPointName(e.target.value)}
              className="w-full border px-3 py-2 rounded"
              placeholder="Enter data point"
            />
          </div>

        {/* Tier */}

        <div>
          <label className="block mb-1 font-medium">Region</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose Region</option>
            {tiers.map((tierOption) => (
              <option key={tierOption.value} value={tierOption.value}>
                {tierOption.label}
              </option>
            ))}
          </select>
        </div>
          <div className="flex justify-between items-center space-x-2 mt-7">
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
                className="px-6 py-2 mt-7 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition ml-2"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded mt-6">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">DP Group</th>
              <th className="p-2 text-left">Serial</th>
              <th className="p-2 text-left">Datapoint</th>
              <th className="p-2 text-left">Region</th>
              <th className="p-2 text-left">Hide</th>
              <th className="p-2 text-left">Reqr</th>
              <th className="p-2 text-left">Data Type</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItemsdata.map((dp) => (
              <tr key={dp.id} className="border-t">
                <td className="p-2">{dp.itemName}</td>
                <td className="p-2">{dp.fieldgroupcode}</td>
                <td className="p-2">{dp.serialNumber}</td>
                <td className="p-2">{dp.dataPoint}</td>
                <td className="p-2 text-left">5</td>
                <td className="p-2">{dp.isHide ? "Yes" : "No"}</td>
                <td className="p-2">{dp.isRequired ? "Yes" : "No"}</td>
                <td className="p-2">{dp.dataType}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
  setEditId(dp.id);
  setDataPointName(dp.dataPoint);
  setDpGroupCode(dp.dpgroupcodeid); // Use id here
  setSerialNumber(dp.serialNumber);
  setDataType(dp.dataType);
  setIsRequired(dp.isRequired);
  setIsHide(dp.isHide);

  const item = dp.Item;
  const menu = item?.menu;
  const app = menu?.app;
  const module = app?.Module;

  // ✅ Set them in proper order using IDs (not names)
  setSelectedModule(dp.moduleid|| "");
    setSelectedApp(dp.appid || "");
    setSelectedMenu(dp.menuid || "");
    setSelectedItem(dp.itemid || "");
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
