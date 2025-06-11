import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  addSubitem,
  getAllSubitems, // If you have subitem fetching
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
  title: string;
  app: AppItem;
}

interface Item {
  id: number;
  name: string;
  menu: MenuItem;

}

interface SubItem {
  id: number;
  name: string;
  item: Item;
}

const SubItemManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [subItemName, setSubItemName] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, appsData, menusData, itemsData, subItemsData] =
          await Promise.all([
            getAllModules(),
            getAllApps(),
            getAllMenus(),
            getAllItems(),
            getAllSubitems?.() || [],
          ]);

        setModules(modulesData);
        setApps(appsData);
        setMenus(menusData);
        setItems(itemsData);
        setSubItems(subItemsData);
      } catch (error) {
        toast.error("Failed to load data.");
        console.error("Fetch error:", error);
      }
    };

    fetchData();
  }, []);

  const handleAddSubItem = async () => {
    if (!selectedModule || !selectedApp || !selectedMenu || !selectedItem) {
      toast.warn("Please select all fields.");
      return;
    }

    const trimmedName = subItemName.trim();
    if (!trimmedName) {
      toast.warn("Please enter subitem name.");
      return;
    }

    const itemObj = items.find((i) => i.name === selectedItem);

    if (!itemObj) {
      toast.error("Invalid item selected.");
      return;
    }

    try {
      await addSubitem({
        label: trimmedName,
        itemId: itemObj.id,
      });

      toast.success("SubItem added successfully!");

      setSubItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: trimmedName,
          item: itemObj,
        },
      ]);

      setSubItemName("");
    } catch (error) {
      console.error("Add subitem error:", error);
      toast.error("Failed to add subitem.");
    }
  };

  return (
    <div className="p-4 ">
      <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-purple-600 text-2xl">📦</span> SubItem Manager
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-6">
        {/* Module */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Module
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedModule}
            onChange={(e) => {
              setSelectedModule(e.target.value);
              setSelectedApp("");
              setSelectedMenu("");
              setSelectedItem("");
            }}
          >
            <option value="">Select Module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* App */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            App
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedApp}
            onChange={(e) => {
              setSelectedApp(e.target.value);
              setSelectedMenu("");
              setSelectedItem("");
            }}
          >
            <option value="">Select App</option>
            {apps
              .filter((a) => a.Module?.name === selectedModule)
              .map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
          </select>
        </div>

        {/* Menu */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Menu
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedMenu}
            onChange={(e) => {
              setSelectedMenu(e.target.value);
              setSelectedItem("");
            }}
          >
            <option value="">Select Menu</option>
            {menus
              .filter((m) => m.app?.name === selectedApp)
              .map((m) => (
                <option key={m.id} value={m.title}>
                  {m.title}
                </option>
              ))}
          </select>
        </div>

        {/* Item */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Item
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
          >
            <option value="">Select Item</option>
            {items
              .filter((i) => {
                const selectedMenuObj = menus.find((m) => m.title === selectedMenu);
                return i.menu?.id === selectedMenuObj?.id;
              })
              .map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}

          </select>

        </div>

        {/* SubItem Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            SubItem Name
          </label>
          <input
            className="w-full px-3 py-2 border rounded"
            type="text"
            placeholder="Enter subitem name"
            value={subItemName}
            onChange={(e) => setSubItemName(e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleAddSubItem}
        className="mb-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
      >
        + Add SubItem
      </button>

      {/* SubItem List */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-3">SubItem List</h3>
        {subItems.length === 0 ? (
          <p>No subitems found.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Module</th>
                <th className="p-2 text-left">App</th>
                <th className="p-2 text-left">Menu</th>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">SubItem</th>
              </tr>
            </thead>
            <tbody>
              {subItems.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">{s.item?.menu?.app?.Module?.name || "—"}</td>
                  <td className="p-2">{s.item?.menu?.app?.name || "—"}</td>
                  <td className="p-2">{s.item?.menu?.title || "—"}</td>
                  <td className="p-2">{s.item?.name || "—"}</td>
                  <td className="p-2">{s.name}</td>
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

export default SubItemManager;
