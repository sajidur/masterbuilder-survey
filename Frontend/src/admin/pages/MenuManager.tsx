import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  addMenu,
  getAllMenus,
  updateMenu,
} from "../../apiRequest/api";
import { tiers } from "./data";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Module {
  id: string;
  name: string;
}

interface AppItem {
  id: string;
  name: string;
  Module: Module;
}

interface MenuItem {
  id: string;
  title: string;
  tier: string;
  App: AppItem;
  serialNumber: string;
}

const MenuManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [menuName, setMenuName] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [editMenuId, setEditMenuId] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, appsData, menusData] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
        ]);

        setModules(modulesData);
        setApps(appsData);
        setMenus(menusData);
        console.log(menus);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
    setSelectedApp("");
  }, [selectedModule]);

  const handleAddMenu = async () => {
    if (!selectedModule || !selectedApp) {
      toast.warn("Please select both module and app.");
      return;
    }

    const trimmedMenuName = menuName.trim();
    if (!trimmedMenuName) {
      toast.warn("Please enter a menu name.");
      return;
    }

    const selectedAppObj = apps.find((a) => a.name === selectedApp);

    if (!selectedAppObj) {
      toast.error("Invalid app selected.");
      return;
    }

    const payload = {
      title: trimmedMenuName,
      appId: selectedAppObj.id,
      tier: selectedTier,
      serialNumber,
    };

    try {
      if (editMenuId) {
        await updateMenu(editMenuId, payload);
        toast.success("Menu updated successfully!");
      } else {
        const newMenu = await addMenu(payload);
        setMenus((prev) => [...prev, newMenu]);
        toast.success("Menu added successfully!");
      }

      // Reset form
      setMenuName("");
      setSelectedModule("");
      setSelectedApp("");
      setSelectedTier("");
      setSerialNumber("");
      setEditMenuId(null);

      const updatedMenus = await getAllMenus();
      setMenus(updatedMenus);
    } catch (error) {
      console.error("Failed to save menu:", error);
      toast.error("Failed to save menu.");
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-green-600 text-2xl">📁</span> Menu Management
      </h2>

      {/* Add Menu Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Add New Menu
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
          {/* Serial Number */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter serial number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>

          {/* Module Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select Module --</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.name}>
                  {mod.name}
                </option>
              ))}
            </select>
          </div>

          {/* App Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">App</label>
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Select App --</option>
              {apps
                .filter((app) => app.Module?.name === selectedModule)
                .map((app) => (
                  <option key={app.id} value={app.name}>
                    {app.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Menu Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Menu Name
            </label>
            <input
              type="text"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Enter menu name"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Tier Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">-- Choose Tier --</option>
              {tiers.map((tier) => (
                <option key={tier.value} value={tier.value}>
                  {tier.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Add Button */}
        <div className="mt-6 flex items-center gap-4">
          <button
            onClick={handleAddMenu}
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            {editMenuId ? "Update Menu" : "+ Add Menu"}
          </button>
          {editMenuId && (
            <button
              onClick={() => {
                setEditMenuId(null);
                setMenuName("");
                setSelectedModule("");
                setSelectedApp("");
                setSelectedTier("");
                setSerialNumber("");
              }}
              className="px-6 py-2.5 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

      </div>

      {/* Menu List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Menu List</h3>

        {menus.length === 0 ? (
          <p className="text-gray-600">No menus available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">SI</th>
                  <th className="px-4 py-3 text-left">Module</th>
                  <th className="px-4 py-3 text-left">App</th>
                  <th className="px-4 py-3 text-left">Menu</th>
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-left">Actions</th>

                </tr>
              </thead>
              <tbody>
                {menus.map((menu, index) => (
                  <tr
                    key={menu.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {menu.serialNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {menu.app.Module?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {menu.app?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{menu.title}</td>
                    <td className="px-4 py-3 text-gray-800">{menu.tier}</td>

                    <td className="px-4 py-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditMenuId(menu.id);
                          setMenuName(menu.title);
                          setSelectedTier(menu.tier);
                          setSerialNumber(menu.serialNumber);
                          setSelectedModule(menu.app.Module.name);
                          // setSelectedApp(menu.app.name);

                          setTimeout(() => {
                            setSelectedApp(menu.app.name);
                          }, 50);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button className="text-red-600 hover:text-red-800">
                        <FaTrash />
                      </button>
                    </td>


                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default MenuManager;
