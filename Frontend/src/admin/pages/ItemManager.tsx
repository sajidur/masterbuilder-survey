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
  app: AppItem;
}

interface Item {
  id: string;
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

  const [loading, setLoading] = useState<boolean>(false);
  const [adding, setAdding] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [moduleData, appData, menuData, itemData] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
        ]);
        setModules(moduleData);
        setApps(appData);
        setMenus(menuData);
        setItems(itemData);
      } catch (error) {
        console.error("Failed to load data", error);
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Filter apps by selected module
  const filteredApps = selectedModule
    ? apps.filter((app) => app.Module.id === selectedModule)
    : [];

  // Filter menus by selected app
  const filteredMenus = selectedApp
    ? menus.filter((menu) => menu.app.id === selectedApp)
    : [];

  const handleAddItem = async () => {
    if (!selectedModule || !selectedApp || !selectedMenu || !itemName.trim()) {
      toast.warn("All fields are required.");
      return;
    }
    setAdding(true);
    try {
      await addItem({
        name: itemName.trim(),
        menuId: selectedMenu,
      });

      toast.success("Item added successfully!");

      const addedMenu = menus.find((m) => m.id === selectedMenu);
      if (!addedMenu) {
        toast.error("Selected menu not found.");
        setAdding(false);
        return;
      }

      const newItem: Item = {
        id: Date.now().toString(), // ideally get from backend response
        name: itemName.trim(),
        menu: addedMenu,
      };

      setItems((prevItems) => [...prevItems, newItem]);
      setItemName("");
    } catch (error) {
      console.error("Add item error:", error);
      toast.error("Failed to add item.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-blue-600">📦</span> Item Manager
      </h2>

      {loading ? (
        <div className="text-center py-6 text-gray-600">Loading data...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            {/* Module */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Module
              </label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedModule}
                onChange={(e) => {
                  setSelectedModule(e.target.value);
                  setSelectedApp("");
                  setSelectedMenu("");
                }}
              >
                <option value="">-- Select Module --</option>
                {modules.map((mod) => (
                  <option key={mod.id} value={mod.id}>
                    {mod.name}
                  </option>
                ))}
              </select>
            </div>

            {/* App */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                App
              </label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedApp}
                onChange={(e) => {
                  setSelectedApp(e.target.value);
                  setSelectedMenu("");
                }}
                disabled={!selectedModule}
              >
                <option value="">-- Select App --</option>
                {filteredApps.map((app) => (
                  <option key={app.id} value={app.id}>
                    {app.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Menu */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Menu
              </label>
              <select
                className="w-full border px-3 py-2 rounded"
                value={selectedMenu}
                onChange={(e) => setSelectedMenu(e.target.value)}
                disabled={!selectedApp}
              >
                <option value="">-- Select Menu --</option>
                {filteredMenus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Item Name */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Item Name
              </label>
              <input
                className="w-full border px-3 py-2 rounded"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="Enter item name"
              />
            </div>

            {/* Add Button */}
            <div className="flex items-end">
              <button
                onClick={handleAddItem}
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-green-400"
                disabled={adding}
              >
                {adding ? "Adding..." : "+ Add"}
              </button>
            </div>
          </div>

          {/* Item List Table */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Item List</h3>

            <table className="w-full border-collapse border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-3 py-2 text-left">Module</th>
                  <th className="border px-3 py-2 text-left">App</th>
                  <th className="border px-3 py-2 text-left">Menu</th>
                  <th className="border px-3 py-2 text-left">Item</th>
                </tr>
              </thead>
              <tbody>
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center p-4">
                      No items to show.
                    </td>
                  </tr>
                ) : (
                  items.map((item) => (
                    <tr key={item.id} className="border-t">
                      <td className="p-2">
                        {item.menu?.app?.Module?.name || "—"}
                      </td>
                      <td className="p-2">{item.menu?.app?.name || "—"}</td>
                      <td className="p-2">{item.menu?.title || "—"}</td>
                      <td className="p-2">{item.name}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      <ToastContainer />
    </div>
  );
};

export default ItemManager;
