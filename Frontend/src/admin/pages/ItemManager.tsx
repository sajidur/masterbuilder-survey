import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,

} from '../../apiRequest/api';

interface Row {
  id: number;
  module: string;
  app: string;
  menu: string;
  item: string;

}

const ItemManager: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(() => {
    const saved = localStorage.getItem("ItemRows");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState<Omit<Row, "id">>({
    module: "",
    app: "",
    menu: "",
    item: "",

  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<keyof Omit<Row, "id"> | null>(null);
  const [popupInput, setPopupInput] = useState("");

  const [dropdownData, setDropdownData] = useState<{
    modules: string[];
    apps: string[];
    menus: string[];
    items: string[];

  }>({
    modules: [],
    apps: [],
    menus: [],
    items: [],

  });

  useEffect(() => {
    const fetchDropdownData = async () => {
      try {
        const [modules, apps, menus, items] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
        ]);

        setDropdownData({
          modules: Array.from(new Set(modules.map((m: any) => m.name))),
          apps: Array.from(new Set(apps.map((a: any) => a.name))),
          menus: Array.from(new Set(menus.map((m: any) => m.name))),
          items: Array.from(new Set(items.map((i: any) => i.name))),
        });
      } catch (error) {
        console.error('Failed to fetch dropdown data:', error);
      }
    };

    fetchDropdownData();
  }, []);


  const triggerPopup = (type: keyof Omit<Row, "id">) => {
    setPopupType(type);
    setPopupInput("");
    setShowPopup(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "module" && { app: "", menu: "", item: "", subItem: "", subSubItem: "", field: "" }),
      ...(name === "app" && { menu: "", item: "", subItem: "", subSubItem: "", field: "" }),
      ...(name === "menu" && { item: "", subItem: "", subSubItem: "", field: "" }),
      ...(name === "item" && { subItem: "", subSubItem: "", field: "" }),

    }));
  };

  const renderSelectWithAdd = (
    name: keyof Row,
    label: string,
    options: string[],
    value: string
  ) => (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      <div className="flex gap-2 items-center">
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 w-2/3"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => triggerPopup(name)}
          className="px-3 py-1 bg-blue-500 text-white rounded"
          title={`Add new ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
    setPopupType(null);
  };

  const confirmAddRow = () => {
    const newRow = { id: Date.now(), ...formData };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    localStorage.setItem("ItemRows", JSON.stringify(updatedRows));
    setFormData({ module: "", app: "", menu: "", item: "" });
    setShowPopup(false);
  };

  const handleDelete = (id: number) => {
    const filtered = rows.filter((row) => row.id !== id);
    setRows(filtered);
    localStorage.setItem("ItemRows", JSON.stringify(filtered));
  };
  const handleAddFromPopup = () => {
  if (!popupType || !popupInput.trim()) {
    toast.error("Input cannot be empty.");
    return;
  }

  // Because dropdownData keys are plural, add 's' to popupType
  const key = (popupType + "s") as keyof typeof dropdownData;

  // Check if the popupInput already exists in the dropdown list
  if (!dropdownData[key].includes(popupInput.trim())) {
    const updatedDropdown = {
      ...dropdownData,
      [key]: [...dropdownData[key], popupInput.trim()],
    };

    setDropdownData(updatedDropdown);
    setFormData((prev) => ({
      ...prev,
      [popupType]: popupInput.trim(),
    }));

    toast.success(`${popupType} added successfully!`);
  } else {
    toast.warning(`${popupType} already exists.`);
  }

  setPopupInput("");
  setShowPopup(false);
  setPopupType(null);
};




  return (
    <div className="p-4">
      <h2 className="text-2xl font-light mb-6">Survey Module Management</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {renderSelectWithAdd('module', 'Module', dropdownData.modules, formData.module)}
          {renderSelectWithAdd('app', 'App', dropdownData.apps, formData.app)}
          {renderSelectWithAdd('menu', 'Menu', dropdownData.menus, formData.menu)}
          {renderSelectWithAdd('item', 'Item', dropdownData.items, formData.item)}

        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Entry
        </button>
      </form>

      <div className="bg-white shadow rounded p-4">
        <h3 className="text-xl font-medium mb-4">Entries</h3>
        {rows.length > 0 ? (
          <table className="w-full border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">Module</th>
                <th className="p-2">App</th>
                <th className="p-2">Menu</th>
                <th className="p-2">Item</th>

                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t">
                  <td className="p-2">{row.module}</td>
                  <td className="p-2">{row.app}</td>
                  <td className="p-2">{row.menu}</td>
                  <td className="p-2">{row.item}</td>

                  <td className="p-2">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No entries added yet.</p>
        )}
      </div>

      {showPopup && popupType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add New {popupType}</h3>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded mb-4"
              value={popupInput}
              onChange={(e) => setPopupInput(e.target.value)}
              placeholder={`Enter new ${popupType}`}
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPopup(false)} className="text-gray-600 px-4 py-2">
                Cancel
              </button>
              <button
                onClick={handleAddFromPopup}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {showPopup && !popupType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 shadow-md">
            <h3 className="text-lg font-medium mb-4">Confirm Add Entry</h3>
            <p className="mb-4">Are you sure you want to add this entry?</p>
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowPopup(false)} className="text-gray-600 px-4 py-2">
                Cancel
              </button>
              <button
                onClick={confirmAddRow}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



export default ItemManager;
