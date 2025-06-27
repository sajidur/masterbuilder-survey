import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  addMenu,
  getAllMenus,
} from "../../apiRequest/api";
import { tiers } from "./data";

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
}


const MenuManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [menuName, setMenuName] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState("");

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
      const newMenu = await addMenu({
        title: trimmedMenuName,
        appId: selectedAppObj.id,
        tier: selectedTier,
      });

      toast.success("Menu added successfully!");
      setMenus((prev) => [...prev, newMenu]);

      setMenuName("");
    } catch (error) {
      console.error("Failed to add menu:", error);
      toast.error("Failed to add menu.");
    }
  };

  return (
    <div className=" p-4">
  <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
    <span className="text-green-600 text-2xl">📁</span> Menu Management
  </h2>

  {/* Add Menu Form */}
  <div className="bg-white shadow-md rounded-xl p-6 mb-8">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Add New Menu</h3>

    <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
      {/* Module Dropdown */}
      <div>
        <label className="block mb-1 font-medium text-gray-700">Module</label>
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
        <label className="block mb-1 font-medium text-gray-700">Menu Name</label>
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
      <div className="mt-6">
        <button
          onClick={handleAddMenu}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          + Add
        </button>
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
              <th className="px-4 py-3 text-left">Module</th>
              <th className="px-4 py-3 text-left">App</th>
              <th className="px-4 py-3 text-left">Menu Name</th>
            </tr>
          </thead>
          <tbody>
            {menus.map((menu, index) => (
              <tr key={menu.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 text-gray-800">{menu.app.Module?.name || "—"}</td>
                <td className="px-4 py-3 text-gray-800">{menu.app?.name || "—"}</td>
                <td className="px-4 py-3 text-gray-800">{menu.title}</td>
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
