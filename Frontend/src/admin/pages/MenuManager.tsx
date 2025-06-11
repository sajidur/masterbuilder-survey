import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  addMenu,
  getAllMenus,
} from "../../apiRequest/api";

interface Module {
  id: number;
  name: string;
}

interface AppItem {
  id: number;
  name: string;
  Module: Module;
}

interface MenuItem {
  id: number;
  name: string;
  App: AppItem;
  Module: Module;
}

const MenuManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  console.log({menus});
  

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [menuName, setMenuName] = useState<string>("");

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

    const selectedMod = modules.find((m) => m.name === selectedModule);
    const selectedAppObj = apps.find((a) => a.name === selectedApp);

    if (!selectedMod || !selectedAppObj) {
      toast.error("Invalid module or app selected.");
      return;
    }

    try {
      await addMenu({
        title: trimmedMenuName,
        appId: selectedAppObj.id,
      });

      toast.success("Menu added successfully!");

      const newMenu: MenuItem = {
        id: Date.now(), // temporary ID
        name: trimmedMenuName,
        App: selectedAppObj,
        Module: selectedMod,
      };

      setMenus((prev) => [...prev, newMenu]);
      setMenuName("");
    } catch (error) {
      console.error("Failed to add menu:", error);
      toast.error("Failed to add menu.");
    }
  };

  return (
    <div className="p-4 mx-auto">
      <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-green-600 text-2xl">📁</span> Menu Management
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4 pb-6">
        {/* Module Dropdown */}
        <div className="w-full sm:w-1/3">
          <label
            htmlFor="module"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Module
          </label>
          <select
            id="module"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
        <div className="w-full sm:w-1/3">
          <label
            htmlFor="app"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select App
          </label>
          <select
            id="app"
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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

        {/* Menu Input */}
        <div className="w-full sm:w-1/4">
          <label
            htmlFor="menuName"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Menu Name
          </label>
          <input
            id="menuName"
            type="text"
            value={menuName}
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Enter menu name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Add Button */}
        <div className="w-full sm:w-[8%]">
          <button
            onClick={handleAddMenu}
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      {/* Menus List */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Menu List</h3>

        {menus.length === 0 ? (
          <p>No menus available.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border-b border-gray-300 text-left">
                  Module
                </th>
                <th className="p-2 border-b border-gray-300 text-left">App</th>
                <th className="p-2 border-b border-gray-300 text-left">Menu</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id} className="border-t border-gray-300">
                  <td className="p-2">{menu?.app.Module?.name || "—"}</td>
                  <td className="p-2">{menu?.app?.name || "—"}</td>
                  <td className="p-2">{menu?.title}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default MenuManager;
