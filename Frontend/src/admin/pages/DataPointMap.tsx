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
  getAllDataPointmapsBySP,
  updateDataPointMap,
  addDataPointMap,
  deleteDataPointMap,
} from "../../apiRequest/api";
import { ListTree } from "lucide-react";
import { tiers, ViewEntrys } from "./data";

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

const DataPointMap: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedDPGroup, setDpGroup] = useState("");
  const [selectedDataPoint, setDataPoint] = useState("");
  const [tier, setTier] = useState("");

  const [isHide, setIsHide] = useState(false);
  const [isRequired, setIsRequired] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [dpGroups, setDpGroups] = useState<any[]>([]);
  const [datapointMaps, setDataPointMap] = useState<any[]>([]);
  const [disabled, setDisabled] = useState(false);
  const [viewEntry, setViewEntry] = useState("");

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
          datapointMaps
        ] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllDataPointsBySP(),
          getAllFields(),
          getAllDataPointmapsBySP()
        ]);

        setModules(moduleData);
        setApps(appData);
        setMenus(menuData);
        setItems(itemData);
        setDataPoints(dataPointData);
        setDpGroups(dpGroups);
        setDataPointMap(datapointMaps);
      } catch (error) {
        toast.error("Failed to load data.");
      }
    };

    fetchInitialData();
  }, []);

const filteredApps = apps.filter((app) => app.Module?.id === selectedModule);
const filteredMenus = menus.filter((menu) => menu.app?.id === selectedApp);
const filteredItems = items.filter((item) => item.menu?.id === selectedMenu);
const filteredDpGroup = dpGroups.filter((dpgroup) => dpgroup.Item?.id === selectedItem);
const filteredDP = dataPoints.filter((dp) => dp.itemid === selectedItem);
//const filteredTier = tiers.filter((t) => t.value === selectedDpGroupObj.tier);
//setTier(selectedDpGroupObj?.tier? selectedDpGroupObj.tier : "");

  const resetForm = () => {
    // setSelectedModule("");
    // setSelectedApp("");
    // setSelectedMenu("");
    // setSelectedItem("");
    // setDpGroupCode("");
    setDpGroup("");
    //setDataType("");
    setIsHide(false);
    setIsRequired(false);
    setEditId(null);
    setDisabled(false);
  };

  const handleAddOrUpdate = async () => {
    if (!selectedItem || !selectedDPGroup || !selectedDataPoint) {
      toast.warn("Please fill all required fields.");
      return;
    }
    const payload = {
      itemId: selectedItem,
      
      dpGroupId:selectedDPGroup,
      datapointid: selectedDataPoint,
      dataType:"",
      serialNumber:0,
      isHide,
      isRequired,
      viewEntry
    };


    try {
      if (editId) {
        await updateDataPointMap(editId, payload);
        toast.success("DataPoint updated successfully!");
        setDisabled(false);
      } else {
        await addDataPointMap(payload);
        toast.success("DataPoint added successfully!");
      }

      const updated = await getAllDataPointmapsBySP();
      setDataPointMap(updated);
      resetForm();
    } catch {
      toast.error("Failed to save DataPoint.");
    }
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id: string) => {
      const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

    try {
      await deleteDataPointMap(id);
      toast.success("Deleted.");
      const updated = await getAllDataPointmapsBySP();
      setDataPointMap(updated);
    } catch {
      toast.error("Failed to delete.");
    }
  };

  const modulename = modules.find((module) => module?.id === selectedModule)?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const menuname = menus.find((menu) => menu.id === selectedMenu)?.title;
  const itemname = items.find((item) => item.id === selectedItem)?.name;

  const filteredItemsdata = datapointMaps.filter((item) => {
  const matchModule = selectedModule ? item.moduleName === modulename : true;
  const matchApp = selectedApp ? item.appName === appname : true;
  const matchMenu = selectedMenu ? item.menuTitle === menuname : true;
  const matchitem = selectedItem ? item.itemName === itemname : true;
  const matchFG = selectedDPGroup ? item.dpGroupId === selectedDPGroup : true;

  return matchModule && matchApp && matchMenu && matchitem && matchFG;
});

//   const filteredItemsdata = datapointMaps.filter((dpm) => {
//   const matchitem = selectedItem ? dpm.itemId === selectedItem : true;
//   return matchitem;
// });

  return (
    <div>
      <div className="bg-white shadow rounded p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-4">
          <div>
          <h2 className="font-light text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 ">
              <ListTree size={18} />
            </span>
            FG- Field Map
          </h2>
                <p className="text-gray-700 font-medium mt-1">
          Total FG- Field Map: {filteredItemsdata.length}
        </p>
        </div>
          {/* Module */}
          <div>
            <label className="block mb-1 font-medium">Module</label>
            <select
              value={selectedModule}
              disabled={disabled}
              onChange={(e) => {
                setSelectedModule(e.target.value);
                setSelectedApp("");
                setSelectedMenu("");
                setSelectedItem("");
              }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedModule ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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
              disabled={disabled}
              onChange={(e) => {
                setSelectedApp(e.target.value);
                setSelectedMenu("");
                setSelectedItem("");
              }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedApp ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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
              disabled={disabled}
              onChange={(e) => {
                setSelectedMenu(e.target.value);
                setSelectedItem("");
              }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedMenu ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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
              disabled={disabled}
              onChange={(e) => {
                const selectedId = e.target.value;
                setSelectedItem(selectedId);
              }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedItem ? 'border-blue-600 border-2' : 'border-gray-300'}`}
            >
              <option value="">Select Item</option>
              {filteredItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
                                     <div>
                             <label className="block mb-1 text-sm font-semibold text-gray-700">
                               View/Entry
                             </label>
                             <select
                               value={viewEntry}
                               onChange={(e) => setViewEntry(e.target.value)}
                                 className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${viewEntry ? 'border-blue-600 border-2' : 'border-gray-300'}`}
                             >
                               <option value="">Choose</option>
                               {ViewEntrys.map((option) => (
                                 <option key={option.value} value={option.value}>
                                   {option.label}
                                 </option>
                               ))}
                   
                             </select>
                           </div>
          <div>
            <label className="block mb-1 font-medium">FG</label>
            <select
              value={selectedDPGroup}
              disabled={disabled}
              onChange={(e) => {
                setDpGroup(e.target.value);
                const selectedDpGroupObj = dpGroups.find((dpgroup) => dpgroup.id === e.target.value);
                setTier(selectedDpGroupObj?.tier || "");
              }
              }
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedDPGroup ? 'border-blue-600 border-2' : 'border-gray-300'}`}
            >
              <option value="">Select FG</option>
              {filteredDpGroup.map((group) => (
                <option key={group.id} value={group.id}>
                  {group.fieldGroupCode}
                </option>
              ))}
            </select>
          </div>


                  {/* Tier */}
        <div>
          <label className="block mb-1 font-medium">Tier</label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${tier ? 'border-blue-600 border-2' : 'border-gray-300'}`}
            disabled
          >
            <option value="">Choose Tier</option>
            {tiers.map((tierOption) => (
              <option key={tierOption.value} value={tierOption.value}>
                {tierOption.label}
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
          

        </div>

        <div className="grid grid-cols-1 md:grid-cols-8 gap-4 mt-4"> { 
                    <>
                    

         <div>
            <label className="block mb-1 font-medium">Field</label>
            <select
              value={selectedDataPoint}
              onChange={(e) => {
                const newValue = e.target.value;
                console.log(newValue);
                setDataPoint(newValue);
                console.log(selectedDataPoint);
              }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedDataPoint ? 'border-blue-600 border-2' : 'border-gray-300'}`}
            >
              <option value="">Select Field</option>
              {filteredDP.map((dp) => (
                <option key={dp.id} value={dp.id}>
                  {dp.dataPoint}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-between items-center space-x-2 mt-7">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isRequired}
                  onChange={(e) => setIsRequired(e.target.checked)} />
                Required
              </label>
              {/*
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isRequired}
          onChange={(e) => setIsRequired(e.target.checked)}
        />
        Required
      </label> */}
            </div></>
            }
                  

          { 
          <div className="flex justify-between items-center space-x-2 mt-7">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isHide}
                onChange={(e) => setIsHide(e.target.checked)}
              />
              Hide
            </label>

          </div>
          }
          <div className="">
            <button
              onClick={handleAddOrUpdate}
              className="px-6 py-2 mt-7 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              {editId ? "Update" : "+ Map"}
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
                 <th className="p-2 border-b text-left">Mod</th>
                <th className="p-2 border-b text-left">App</th>
                <th className="p-2 border-b text-left">Menu</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">View/Entry</th>
              <th className="p-2 text-left">FG</th>
              {/* <th className="p-2 text-left">Serial</th> */}
              <th className="p-2 text-left">Field</th>
              <th className="p-2 text-left">Hide</th>
              <th className="p-2 text-left">Required</th>
              {/* <th className="p-2 text-left">Region</th> */}
              {/* <th className="p-2 text-left">Hide</th> */}
              {/* <th className="p-2 text-left">Reqr</th> */}
              {/* <th className="p-2 text-left">Data Type</th> */}
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItemsdata.map((dp) => (
              <tr key={dp.id} className="border-t">
                 <td className="p-2">{dp.moduleName}</td>
                  <td className="p-2">{dp.appName}</td>
                  <td className="p-2">{dp.menuTitle}</td>
                <td className="p-2">{dp.itemName}</td>
                <td className="p-2">{dp.viewEntry}</td>
                <td className="p-2">{dp.fieldGroupCode}</td>
                {/* <td className="p-2">{dp.serialNumber}</td> */}
                <td className="p-2">{dp.datapoint}</td>
                <td className="p-2">{dp.isHide ? "Yes" : "No"}</td>
                <td className="p-2">{dp.isRequired ? "Yes" : "No"}</td>

                {/* <td className="p-2 text-left">5</td> */}
                {/* <td className="p-2">{dp.dataType}</td> */}
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => {
                                setEditId(dp.id);
                                setDataPoint(dp.dataPointId);
                                setDpGroup(dp.dpGroupId); // Use id here
                                // setIsHide(!!dp.isHide);
                                // const item = dp.Item;
                                // const menu = item?.menu;
                                // const app = menu?.app;
                                // const module = app?.Module;

                                // // ✅ Set them in proper order using IDs (not names)
                                setSelectedModule(dp.moduleid|| "");
                                setSelectedApp(dp.appid || "");
                                setSelectedMenu(dp.menuid || "");
                                setSelectedItem(dp.itemId || "");
                                setDisabled(true);
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

export default DataPointMap;
