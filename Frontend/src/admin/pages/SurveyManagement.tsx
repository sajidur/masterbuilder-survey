import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Row {
  id: number;
  module: string;
  app: string;
  menu: string;
  item: string;
  subItem: string;
  field: string;
}

const SurveyManagement: React.FC = () => {
  const [hierarchy, setHierarchy] = useState<any>({});
  const [rows, setRows] = useState<Row[]>(() => {
    const saved = localStorage.getItem("surveyRows");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState<Omit<Row, "id">>({
    module: "",
    app: "",
    menu: "",
    item: "",
    subItem: "",
    field: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<keyof Omit<Row, "id"> | null>(null);
  const [popupInput, setPopupInput] = useState("");

  const updateHierarchy = (path: string[], value: any) => {
    setHierarchy((prev: any) => {
      const copy = { ...prev };
      let current = copy;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];
        current[key] = current[key] || {};
        current = current[key];
      }

      const lastKey = path[path.length - 1];
      if (Array.isArray(current[lastKey])) {
        current[lastKey] = [...current[lastKey], value];
      } else if (typeof current[lastKey] === "object") {
        current[lastKey] = { ...current[lastKey], ...value };
      } else {
        current[lastKey] = value;
      }

      return copy;
    });
  };

  const triggerPopup = (type: keyof Omit<Row, "id">) => {
    setPopupType(type);
    setPopupInput("");
    setShowPopup(true);
  };

  const handleAddFromPopup = () => {
    const value = popupInput.trim();
    if (!value) return toast.error(`Please enter a ${popupType}`);

    switch (popupType) {
      case "module":
        setHierarchy((prev: any) => ({
          ...prev,
          [value]: {},
        }));
        setFormData({ module: value, app: "", menu: "", item: "", subItem: "", field: "" });
        break;
      case "app":
        if (!formData.module) return toast.error("Select a module first");
        updateHierarchy([formData.module, value], {});
        setFormData({ ...formData, app: value, menu: "", item: "", subItem: "", field: "" });
        break;
      case "menu":
        if (!formData.module || !formData.app) return toast.error("Select module and app first");
        updateHierarchy([formData.module, formData.app, value], {});
        setFormData({ ...formData, menu: value, item: "", subItem: "", field: "" });
        break;
      case "item":
        if (!formData.module || !formData.app || !formData.menu) return toast.error("Select module, app, and menu first");
        updateHierarchy([formData.module, formData.app, formData.menu, value], {});
        setFormData({ ...formData, item: value, subItem: "", field: "" });
        break;
      case "subItem":
        if (!formData.module || !formData.app || !formData.menu || !formData.item) return toast.error("Select module, app, menu, and item first");
        updateHierarchy([formData.module, formData.app, formData.menu, formData.item, value], []);
        setFormData({ ...formData, subItem: value, field: "" });
        break;
      case "field":
        if (!formData.module || !formData.app || !formData.menu || !formData.item || !formData.subItem) return toast.error("Select all previous levels first");
        updateHierarchy(
          [formData.module, formData.app, formData.menu, formData.item, formData.subItem],
          value
        );
        setFormData({ ...formData, field: value });
        break;
    }

    setShowPopup(false);
    setPopupType(null);
    setPopupInput("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "module" && { app: "", menu: "", item: "", subItem: "", field: "" }),
      ...(name === "app" && { menu: "", item: "", subItem: "", field: "" }),
      ...(name === "menu" && { item: "", subItem: "", field: "" }),
      ...(name === "item" && { subItem: "", field: "" }),
      ...(name === "subItem" && { field: "" }),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPopup(true);
    setPopupType(null); // trigger confirmation popup
  };

  const confirmAddRow = () => {
    const newRow = { id: Date.now(), ...formData };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    localStorage.setItem("surveyRows", JSON.stringify(updatedRows));
    setFormData({ module: "", app: "", menu: "", item: "", subItem: "", field: "" });
    setShowPopup(false);
  };

  const handleDelete = (id: number) => {
    const filtered = rows.filter((row) => row.id !== id);
    setRows(filtered);
    localStorage.setItem("surveyRows", JSON.stringify(filtered));
  };

  const getOptions = {
    app: () => formData.module ? Object.keys(hierarchy[formData.module] || {}) : [],
    menu: () => formData.app ? Object.keys(hierarchy[formData.module]?.[formData.app] || {}) : [],
    item: () =>
      formData.menu
        ? Object.keys(hierarchy[formData.module]?.[formData.app]?.[formData.menu] || {})
        : [],
    subItem: () =>
      formData.item
        ? Object.keys(
            hierarchy[formData.module]?.[formData.app]?.[formData.menu]?.[formData.item] || {}
          )
        : [],
    field: () =>
      formData.subItem
        ? hierarchy[formData.module]?.[formData.app]?.[formData.menu]?.[formData.item]?.[formData.subItem] || []
        : [],
  };

  const renderSelectWithAdd = (
    name: keyof Omit<Row, "id">,
    label: string,
    options: string[],
    value: string
  ) => (
    <div>
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-light mb-6">Survey Module Management</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderSelectWithAdd("module", "Module", Object.keys(hierarchy), formData.module)}
          {renderSelectWithAdd("app", "App", getOptions.app(), formData.app)}
          {renderSelectWithAdd("menu", "Menu", getOptions.menu(), formData.menu)}
          {renderSelectWithAdd("item", "Item", getOptions.item(), formData.item)}
          {renderSelectWithAdd("subItem", "Sub Item", getOptions.subItem(), formData.subItem)}
          {renderSelectWithAdd("field", "Field", getOptions.field(), formData.field)}
        </div>
        <button
          type="submit"
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Entry
        </button>
      </form>

      {/* Data Table */}
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
                <th className="p-2">Sub Item</th>
                <th className="p-2">Field</th>
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
                  <td className="p-2">{row.subItem}</td>
                  <td className="p-2">{row.field}</td>
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

      {/* Popup Modal */}
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

      {/* Confirmation Popup */}
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

export default SurveyManagement;
