import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  addItem,
} from "../../apiRequest/api";
import { tiers } from "./data";

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
  app: AppItem;
}

interface Item {
  id: number;
  name: string;
  menu: MenuItem;
}

const ItemManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [itemName, setItemName] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState("");

  useEffect(() => {
    // Load all data initially
    const fetchData = async () => {
      try {
        const [modulesData, appsData, menusData, itemsData] = await Promise.all(
          [getAllModules(), getAllApps(), getAllMenus(), getAllItems()]
        );

        setModules(modulesData);
        setApps(appsData);
        setMenus(menusData);
        setItems(itemsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  // Reset dependent dropdowns on change
  useEffect(() => {
    setSelectedApp("");
    setSelectedMenu("");
  }, [selectedModule]);

  useEffect(() => {
    setSelectedMenu("");
  }, [selectedApp]);

  // Filtered lists based on selections
  const filteredApps = apps.filter(
    (app) => app.Module?.name === selectedModule
  );
  const filteredMenus = menus.filter(
    (menu) =>
      menu.app.Module?.name === selectedModule && menu.app?.name === selectedApp
  );

  // Filter items for display based on all three selections
  const filteredItems = items.filter(
    (item) =>
      item.menu.app.Module?.name === selectedModule &&
      item.menu.app?.name === selectedApp &&
      item.menu?.name === selectedMenu
  );

  const handleAddItem = async () => {
    if (!selectedModule || !selectedApp || !selectedMenu) {
      toast.warn("Please select module, app, and menu.");
      return;
    }

    const trimmedItemName = itemName.trim();
    if (!trimmedItemName) {
      toast.warn("Please enter an item name.");
      return;
    }

    // Find selected objects for reference
    const selectedMod = modules.find((m) => m.name === selectedModule);
    const selectedAppObj = apps.find((a) => a.name === selectedApp);
    const selectedMenuObj = menus.find((m) => m.name === selectedMenu);

    if (!selectedMod || !selectedAppObj || !selectedMenuObj) {
      toast.error("Invalid selection for module/app/menu.");
      return;
    }

    try {
      // Call API to add new Item (assuming API expects {name, menuId} or similar)
      await addItem({
        name: trimmedItemName,
        menuId: selectedMenuObj.id,
      });

      toast.success("Item added successfully!");

      const newItem: Item = {
        id: Date.now(), // temp id
        name: trimmedItemName,
        menu: selectedMenuObj,
      };

      setItems((prev) => [...prev, newItem]);
      setItemName("");
    } catch (error) {
      console.error("Failed to add item:", error);
      toast.error("Failed to add item.");
    }
  };

return (
  <div className="p-4 ">
    <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center gap-2">
      <span className="text-green-600 text-2xl">📁</span> Item Manager
    </h2>

    {/* Form Layout */}
    <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-6 items-end">
      {/* Module */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Module</label>
        <select
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

      {/* App */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">App</label>
        <select
          value={selectedApp}
          onChange={(e) => setSelectedApp(e.target.value)}
          // disabled={!selectedModule}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select App --</option>
          {filteredApps.map((app) => (
            <option key={app.id} value={app.name}>
              {app.name}
            </option>
          ))}
        </select>
      </div>

      {/* Menu */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Menu</label>
        <select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          // disabled={!selectedApp}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">-- Select Menu --</option>
          {filteredMenus.map((menu) => (
            <option key={menu.id} value={menu.name}>
              {menu.name}
            </option>
          ))}
        </select>
      </div>

      {/* Item Name */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Item Name</label>
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Enter item name"
          // disabled={!selectedMenu}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Tier */}
      <div>
        <label className="block mb-1 text-sm font-semibold text-gray-700">Tier</label>
        <select
          value={selectedTier}
          onChange={(e) => setSelectedTier(e.target.value)}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
      <div className="">
        <button
          onClick={handleAddItem}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          + Add
        </button>
      </div>

    {/* Items Table */}
    <div className="bg-white p-6 mt-6  rounded shadow">
      <h3 className="text-xl font-semibold mb-4">Items List</h3>
      {filteredItems.length === 0 ? (
        <p>No items available for selected module/app/menu.</p>
      ) : (
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border-b text-left">Module</th>
              <th className="p-2 border-b text-left">App</th>
              <th className="p-2 border-b text-left">Menu</th>
              <th className="p-2 border-b text-left">Item</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2">{item.menu?.app?.Module?.name || "—"}</td>
                <td className="p-2">{item.menu?.app?.name || "—"}</td>
                <td className="p-2">{item.menu?.name || "—"}</td>
                <td className="p-2">{item.name}</td>
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

export default ItemManager;
