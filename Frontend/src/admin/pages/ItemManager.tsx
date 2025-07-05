import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
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
  app: AppItem;
}

interface Item {
  id: string;
  name: string;
  menu: MenuItem;
  tier: string;
  serialNumber: string;
  buttonType: string;
  navigationTo: string;
  description: string;
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
  const [serialNumber, setSerialNumber] = useState("");
  const [buttonType, setButtonType] = useState("");
  const [navigationTo, setNavigationTo] = useState("");
  const [description, setDescription] = useState("");
  const [editItemId, setEditItemId] = useState<string | null>(null);
  const [buttonLabel, setButtonLabel] = useState("");

  useEffect(() => {
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

  useEffect(() => {
    setSelectedApp("");
    setSelectedMenu("");
  }, [selectedModule]);

  useEffect(() => {
    setSelectedMenu("");
  }, [selectedApp]);

  const filteredApps = apps.filter(
    (app) => app.Module?.name === selectedModule
  );
  const filteredMenus = menus.filter(
    (menu) =>
      menu.app?.Module?.name === selectedModule &&
      menu.app?.name === selectedApp
  );

  const filteredItems =
    selectedModule || selectedApp || selectedMenu
      ? items.filter(
          (item) =>
            (!selectedModule ||
              item.menu?.app?.Module?.name === selectedModule) &&
            (!selectedApp || item.menu?.app?.name === selectedApp) &&
            (!selectedMenu || item.menu?.title === selectedMenu)
        )
      : items;

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

    const selectedMenuObj = menus.find((menu) => menu.title === selectedMenu);
    if (!selectedMenuObj) {
      toast.error("Invalid selection for menu.");
      return;
    }

    const payload = {
      name: trimmedItemName,
      menuId: selectedMenuObj.id,
      tier: selectedTier,
      serialNumber,
      buttonType,

      buttonLabel,
      navigationTo,
      description,
    };
    console.log({ payload });

    try {
      if (editItemId) {
        await updateItem(editItemId, payload);
        toast.success("Item updated successfully!");
      } else {
        const newItem = await addItem(payload);
        setItems((prev) => [...prev, newItem]);
        toast.success("Item added successfully!");
      }

      // Reset form
      setItemName("");
      setSelectedTier("");
      setSerialNumber("");
      setButtonType("");
      setNavigationTo("");
      setDescription("");
      setEditItemId(null);

      const updatedItems = await getAllItems();
      setItems(updatedItems);
    } catch (error) {
      console.error("Failed to save item:", error);
      toast.error("Failed to save item.");
    }
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteItem(id);
      toast.success("Item deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete Item.");
    }
  };

  return (
    <div className="px-4">
      {/* Top Row: Module, App, Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-6">
        <h2 className="font-liight text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 ">📁</span> Item Manager
        </h2>
        {/* Module */}
        <div className="flex">
          <label className="block mt-2 mr-2 font-medium text-gray-700">
            Module
          </label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
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
        <div className="flex">
          <label className="block mt-2 mr-2 font-medium text-gray-700">
            App
          </label>
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
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
        <div className="flex">
          <label className="block mt-2 mr-2 font-medium text-gray-700">
            Menu
          </label>
          <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Menu --</option>
            {filteredMenus.map((menu) => (
              <option key={menu.id} value={menu.title}>
                {menu.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-end">
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

        {/* Item Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Item Name
          </label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Enter item name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tier */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Tier
          </label>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Choose Tier --</option>
            {tiers.map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.label}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button Type */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Button Type
          </label>
          <select
            value={buttonType}
            onChange={(e) => setButtonType(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Button Type --</option>
            <option value="Primary Button">Primary Button</option>
            <option value="Second Button">Second Button</option>
          </select>
        </div>

        {/* Button Name */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Button Name
          </label>
          <input
            type="text"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            placeholder="Enter button name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Navigate To */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Navigate To
          </label>
          <input
            type="text"
            value={navigationTo}
            onChange={(e) => setNavigationTo(e.target.value)}
            placeholder="Enter path or URL"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Add Button */}
      <div className="mt-4 flex gap-4">
        <button
          onClick={handleAddItem}
          className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          {editItemId ? "Update Item" : "+ Add item"}
        </button>

        {editItemId && (
          <button
            onClick={() => {
              setEditItemId(null);
              setItemName("");
              setSelectedModule("");
              setSelectedApp("");
              setSelectedMenu("");
              setSelectedTier("");
              setSerialNumber("");
              setButtonType("");
              setNavigationTo("");
              setDescription("");
            }}
            className="px-6 py-2.5 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Items Table */}
      <div className="bg-white p-6 mt-6 rounded shadow">
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
                <th className="p-2 border-b text-left">SI</th>

                <th className="p-2 border-b text-left">Item</th>
                <th className="p-2 border-b text-left">Tier</th>
                <th className="p-2 border-b text-left">Description</th>

                <th className="p-2 border-b text-left">Button Type</th>
                <th className="p-2 border-b text-left">Navigate To</th>
                <th className="p-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.menu.app.Module?.name}</td>
                  <td className="p-2">{item.menu.app?.name}</td>
                  <td className="p-2">{item.menu?.title}</td>
                  <td className="p-2">{item.serialNumber}</td>

                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.tier}</td>
                  <td className="p-2">{item.description}</td>

                  <td className="p-2">{item.buttonType}</td>
                  <td className="p-2">{item.navigationTo}</td>

                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditItemId(item.id);
                        setItemName(item.name);
                        setSelectedModule(item.menu.app.Module.name);
                        // setSelectedApp(item.menu.app.name);
                        // setSelectedMenu(item.menu.title);
                        setTimeout(() => {
                          setSelectedApp(item.menu.app.name);
                          setTimeout(() => {
                            setSelectedMenu(item.menu.title);
                          }, 50);
                        }, 50);

                        setSelectedTier(item.tier);
                        setSerialNumber(item.serialNumber);
                        setButtonType(item.buttonType);
                        setNavigationTo(item.navigationTo);
                        setDescription(item.description);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item?.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
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
