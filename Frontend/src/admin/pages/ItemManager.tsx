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
  getAllItemsBySP,
} from "../../apiRequest/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Layers } from "lucide-react";
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
  const [selectedItemType, setSelectedItemType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [tier, setTier] = useState("");

  // const [buttonType, setButtonType] = useState("");
  const [navigationTo, setNavigationTo] = useState("");
  const [description, setDescription] = useState("");
  const [editItemId, setEditItemId] = useState<string | null>(null);
  // const [buttonLabel, setButtonLabel] = useState("");
  const [regName, setRegName] = useState("");
  const [viewEntry, setViewEntry] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, appsData, menusData, itemsData] = await Promise.all(
          [getAllModules(), getAllApps(), getAllMenus(), getAllItemsBySP()]
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
      itemType: selectedItemType,
      serialNumber,
      buttonType:regName,
      buttonLabel:viewEntry,
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
      //setSelectedTier("");
      setSerialNumber("");
      //setButtonType("");
      setNavigationTo("");
      setDescription("");
      setEditItemId(null);

      const updatedItems = await getAllItemsBySP();
      setItems(updatedItems);
    } catch (error) {
      console.error("Failed to save item:", error);
      toast.error("Failed to save item.");
    }
  };

  const handleDeleteItem = async (id: string) => {
      const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

    try {
      await deleteItem(id);
      toast.success("Item deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete Item.");
    }
  };

  //    const filteredApps = selectedModule
  //   ? items.filter((app) => app.moduleName === selectedModule)
  //   : items;

  // const filteredMenus = selectedApp
  //   ? filteredApps.filter((app) => app.appName === selectedApp)
  //   : filteredApps;

  // const filteredItems = selectedMenu
  //   ? filteredMenus.filter((item) => item.menuTitle === selectedMenu)
  //   : filteredMenus;
  const availableApps = Array.from(
    new Set(
      items
        .filter((item) =>
          selectedModule ? item.moduleName === selectedModule : true
        )
        .map((item) => item.appName)
    )
  );

  const availableMenus = Array.from(
    new Set(
      items
        .filter(
          (item) =>
            (selectedModule ? item.moduleName === selectedModule : true) &&
            (selectedApp ? item.appName === selectedApp : true)
        )
        .map((item) => item.menuTitle)
    )
  );

  const filteredItems = items.filter((item) => {
    const matchModule = selectedModule
      ? item.moduleName === selectedModule
      : true;
    const matchApp = selectedApp ? item.appName === selectedApp : true;
    const matchMenu = selectedMenu ? item.menuTitle === selectedMenu : true;
    return matchModule && matchApp && matchMenu;
  });

  return (
    <div className="">
      {/* Top Row: Module, App, Menu */}
      <div className=" bg-white grid grid-cols-1 sm:grid-cols-6 gap-4 rounded-lg p-4">
        <div>
        <h2 className="font-light text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 ">
            <Layers size={18} />
          </span>{" "}
          Item
        </h2>
              <p className="text-gray-700 font-medium mt-1">
          Total Item: {items.length}
        </p>
        </div>
        {/* Module */}
        <div className="">
          <label className="block font-medium text-gray-700">Module</label>
          <select
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedModule ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Module</option>
            {modules.map((mod) => (
              <option key={mod.id} value={mod.name}>
                {mod.name}
              </option>
            ))}
          </select>
        </div>

        {/* App */}
        <div className="">
          <label className="block font-medium text-gray-700">App</label>
          {/* <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select App</option>
            {filteredApps.map((app) => (
              <option key={app.id} value={app.name}>
                {app.name}
              </option>
            ))}
          </select> */}
          {/* App Dropdown */}
          <select
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedApp ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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
        <div className="">
          <label className="block font-medium text-gray-700">Menu</label>
          {/* <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Menu</option>
            {filteredMenus.map((menu) => (
              <option key={menu.id} value={menu.title}>
                {menu.title}
              </option>
            ))}
          </select> */}
          {/* Menu Dropdown */}
          <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedMenu ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Menu</option>
            {menus
              .filter(
                (m) =>
                  m.app?.name === selectedApp &&
                  m.app?.Module?.name === selectedModule
              )
              .map((m) => (
                <option key={m.id} value={m.title}>
                  {m.title}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-7 gap-4 items-end bg-white  rounded-lg px-4 pb-4">
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

        {/* Button Type */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Item Type
          </label>
          <select
            value={selectedItemType}
            onChange={(e) => setSelectedItemType(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedItemType ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Type</option>
            <option value="GP">GP</option>
            <option value="IS">IS</option>
          </select>
        </div>
        {false &&
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            I Tier
          </label>
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${tier ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Choose I Tier</option>
            {tiers.map((tierOption) => (
              <option key={tierOption.value} value={tierOption.value}>
                {tierOption.label}
              </option>
            ))}
          </select>
        </div>
        }
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            View/Entry
          </label>
          <select
            value={viewEntry}
            onChange={(e) => setViewEntry(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${viewEntry ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select</option>
            <option value="View">View</option>
            <option value="Entry">Entry</option>
          </select>
        </div>
        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Intro
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
          />
        </div>
{false && 
<div>
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
            <option value="">Select Button</option>
            <option value="P-Button">Primary Button</option>
            <option value="S-Button">Secondary Button</option>
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
}
        {/* Add Button */}
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleAddItem}
            className="px-6 py-2 mt-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editItemId ? "Update" : "+ Add"}
          </button>

          {editItemId && (
            <button
              onClick={() => {
                setEditItemId(null);
                setItemName("");
                // setSelectedModule("");
                // setSelectedApp("");
                // setSelectedMenu("");
                setSelectedItemType("");
                setSerialNumber("");
                setButtonType("");
                setNavigationTo("");
                setDescription("");
              }}
              className="px-6 py-2 mt-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white p-6 mt-6 rounded shadow">
        {filteredItems.length === 0 ? (
          <p>No items available for selected module/app/menu.</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border-b text-left">Mod</th>
                <th className="p-2 border-b text-left">App</th>
                <th className="p-2 border-b text-left">Menu</th>
                <th className="p-2 border-b text-left">SI</th>

                <th className="p-2 border-b text-left">Item</th>
                <th className="p-2 border-b text-left">Item Type</th>
              
                {/* <th className="p-2 border-b text-left">I Tier</th> */}
                <th className="p-2 border-b text-left">View/Entry</th>
                <th className="p-2 border-b text-left">Intro</th>
                <th className="p-2 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id} className="border-t">
                  <td className="p-2">{item.moduleName}</td>
                  <td className="p-2">{item.appName}</td>
                  <td className="p-2">{item.menuTitle}</td>
                  <td className="p-2">{item.serialNumber}</td>

                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.itemType}</td>
{/*                   
                  <td className="p-2">
                      {item.buttonType}
                  </td> */}
                  <td className="p-2">{item.buttonLabel}</td>
                  <td className="p-2">{item.description}</td>

                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditItemId(item.id);
                        setItemName(item.name);
                        setSelectedModule(item.moduleName);
                        // setSelectedApp(item.menu.app.name);
                        // setSelectedMenu(item.menu.title);
                        setTimeout(() => {
                          setSelectedApp(item.appName);
                          setTimeout(() => {
                            setSelectedMenu(item.menuTitle);
                          }, 50);
                        }, 50);

                        setSelectedItemType(item.itemType);
                        setSerialNumber(item.serialNumber);
                        setRegName(item.buttonType);
                        setViewEntry(item.buttonLabel);
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
