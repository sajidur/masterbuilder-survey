/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  getAllSubitems,
  getAllSubSubitems,
  getAllFields,
  addField,
  deleteField,
  getAllSubSubSubitems,
  updateField,
} from "../../apiRequest/api";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Module {
  id: string;
  name: string;
}
interface App {
  id: string;
  name: string;
  Module: Module;
}
interface Menu {
  id: string;
  title: string;
  app: App;
}
interface Item {
  id: string;
  name: string;
  menu: Menu;
}
interface SubItem {
  id: string;
  name: string;
  item: Item;
}
interface SubSubItem {
  id: string;
  name: string;
  subItem: SubItem;
}
interface SubSubSubItem {
  id: string;
  name: string;
  subSubItem: SubSubItem;
}

interface Field {
  id?: string;
  name: string;
  displayType: string;
  dataType: string;
  isRequired: boolean;
  subSubSubItem: SubSubSubItem;
  serialNumber?: string;
  fieldGroupCode?: string;
  tier?: string;
}

const FieldManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [subSubItems, setSubSubItems] = useState<SubSubItem[]>([]);
  const [subSubSubItems, setSubSubSubItems] = useState<SubSubSubItem[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [selectedSubSubSubItem, setSelectedSubSubSubItem] = useState("");
  const [selectedDisplayType, setSelectedDisplayType] = useState("");
  const [fieldName, setFieldName] = useState("");
  const [selectedFieldType, setSelectedFieldType] = useState("");
  const [isRequired, setIsRequired] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [editFieldId, setEditFieldId] = useState<string | null>(null);
  const [fieldGroupCode, setFieldGroupCode] = useState("");
  const [tier, setTier] = useState("");

  const fieldTypes = ["text", "number", "date", "boolean", "dropdown"];
  const displayTypes = ["tree", "graph", "table", "individual field"];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mod, app, menu, item, subItem, subSub, subSubSub, field] =
          await Promise.all([
            getAllModules(),
            getAllApps(),
            getAllMenus(),
            getAllItems(),
            getAllSubitems(),
            getAllSubSubitems(),
            getAllSubSubSubitems(),
            getAllFields(),
          ]);
        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        setSubSubSubItems(subSubSub);
        setFields(field);
      } catch (error) {
        toast.error("Failed to fetch data.");
      }
    };

    fetchAll();
  }, []);

  const handleAddOrUpdateField = async () => {
    if (
      !selectedModule ||
      !selectedApp ||
      !selectedMenu ||
      !selectedItem ||
      !selectedSubItem ||
      !selectedSubSubItem ||
      !selectedSubSubSubItem ||
      !selectedDisplayType ||
      !fieldName.trim()
    ) {
      toast.warn("Please fill all fields.");
      return;
    }

    const subSubSubObj = subSubSubItems.find(
      (s) => s.id === selectedSubSubSubItem
    );
    if (!subSubSubObj) {
      toast.error("Invalid SubSubSubItem.");
      return;
    }

    if (!selectedFieldType) {
      toast.warn("Please select field type.");
      return;
    }

    const payload = {
      name: fieldName.trim(),
      displayType: selectedDisplayType,
      dataType: selectedFieldType,
      isRequired,
      subSubSubItemId: subSubSubObj.id,
      serialNumber,
      fieldGroupCode,
      tier,
    };

    try {
      if (editFieldId) {
        await updateField(editFieldId, payload);
        toast.success("Field updated successfully!");

        // Update local list
        const updatedFields = await getAllFields();
        setFields(updatedFields);
        setEditFieldId(null);
      } else {
        await addField(payload);
        toast.success("Field added successfully!");
        const updatedFields = await getAllFields();
        setFields(updatedFields);
      }

      // Clear form
      setFieldName("");
      setSerialNumber("");
      setSelectedDisplayType("");
      setSelectedFieldType("");
      setIsRequired(false);
      setSelectedSubSubSubItem("");
    } catch (e) {
      toast.error("Failed to save field.");
    }
  };

  const handleDeleteField = async (id: string) => {
    try {
      await deleteField(id);
      toast.success("Field deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete field.");
    }
  };

  return (
    <div className="px-4">
      {/* 🔹 Top Filter Section: Hierarchy Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <h2 className="font-light text-gray-800 flex items-center gap-2">
          Field Manager
        </h2>

        <Dropdown
          label="Module"
          value={selectedModule}
          options={modules.map((m) => ({ label: m.name, value: m.id }))}
          onChange={(val) => {
            setSelectedModule(val);
            setSelectedApp("");
            setSelectedMenu("");
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="App"
          value={selectedApp}
          options={apps
            .filter((a) => a.Module?.id === selectedModule)
            .map((a) => ({ label: a.name, value: a.id }))}
          onChange={(val) => {
            setSelectedApp(val);
            setSelectedMenu("");
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="Menu"
          value={selectedMenu}
          options={menus
            .filter((m) => m.app?.id === selectedApp)
            .map((m) => ({ label: m.title, value: m.id }))}
          onChange={(val) => {
            setSelectedMenu(val);
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="Item"
          value={selectedItem}
          options={items
            .filter((i) => i.menu?.id === selectedMenu)
            .map((i) => ({ label: i.name, value: i.id }))}
          onChange={(val) => {
            setSelectedItem(val);
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="SubItem"
          value={selectedSubItem}
          options={subItems
            .filter((s) => s.item?.id === selectedItem)
            .map((s) => ({ label: s.name, value: s.id }))}
          onChange={(val) => {
            setSelectedSubItem(val);
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="SubSubItem"
          value={selectedSubSubItem}
          options={subSubItems
            .filter((s) => s.subItem?.id === selectedSubItem)
            .map((s) => ({ label: s.name, value: s.id }))}
          onChange={(val) => {
            setSelectedSubSubItem(val);
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="SubSubSubItem"
          value={selectedSubSubSubItem}
          options={subSubSubItems
            .filter((s) => s.subSubItem?.id === selectedSubSubItem)
            .map((s) => ({ label: s.name, value: s.id }))}
          onChange={(val) => setSelectedSubSubSubItem(val)}
        />
      </div>

      {/* 🔹 Field Configuration Section */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block mb-1 font-medium">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter serial number"
          />
        </div>

        {/* Field Group Code */}
        <div>
          <label className="block mb-1 font-medium">Field Group Code</label>
          <input
            type="text"
            value={fieldGroupCode}
            onChange={(e) => setFieldGroupCode(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter field group code"
          />
        </div>

        {/* Tier */}
        <div>
          <label className="block mb-1 font-medium">Tier</label>
          <input
            type="text"
            value={tier}
            onChange={(e) => setTier(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter tier"
          />
        </div>

        {/* Display Type */}
        <div>
          <label className="block mb-1 font-medium">Display Type</label>
          <select
            value={selectedDisplayType}
            onChange={(e) => setSelectedDisplayType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Display Type --</option>
            {displayTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Field Name */}
        <div>
          <label className="block mb-1 font-medium">Field Name</label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter field name"
          />
        </div>

        {/* Field Type */}
        <div>
          <label className="block mb-1 font-medium">Data Type</label>
          <select
            value={selectedFieldType}
            onChange={(e) => setSelectedFieldType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Field Type --</option>
            {fieldTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* <Dropdown
          label="Display Type"
          value={selectedDisplayType}
          options={displayTypes.map((f) => ({ label: f, value: f }))}
          onChange={(val) => setSelectedDisplayType(val)}
        />

        <div>
          <label className="block mb-1 font-medium">Field Name</label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter field name"
          />
        </div>

        <Dropdown
          label="Field Type"
          value={selectedFieldType}
          options={fieldTypes.map((f) => ({ label: f, value: f }))}
          onChange={(val) => setSelectedFieldType(val)}
        /> */}

        <div className="flex items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            className="w-4 h-4"
            id="required-checkbox"
          />
          <label
            htmlFor="required-checkbox"
            className="text-sm font-medium text-gray-700"
          >
            Required Field
          </label>
        </div>
      </div>

      {/* 🔹 Action Buttons */}
      <div className="mb-4">
        <button
          onClick={handleAddOrUpdateField}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {editFieldId ? "Update Field" : "+ Add Field"}
        </button>

        {editFieldId && (
          <button
            onClick={() => {
              setEditFieldId(null);
              setFieldName("");
              setSerialNumber("");
              setSelectedDisplayType("");
              setSelectedFieldType("");
              setIsRequired(false);
            }}
            className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 ml-4"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Fields List</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              {/* <th className="p-2 text-left">SI</th> */}
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">Menu</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">SubItem</th>
              <th className="p-2 text-left">SubSubItem</th>
              <th className="p-2 text-left">SubSubSubItem</th>
              <th className="p-2 text-left">Field Group Code</th>
              <th className="p-2 text-left">Tier</th>

              <th className="p-2 text-left">Display Type</th>
              <th className="p-2 text-left">Field Name</th>
              <th className="p-2 text-left">Data Type</th>
              <th className="p-2 text-left">Required</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.id} className="border-t">
                {/* <td className="p-2">{f.serialNumber || "—"}</td> */}
                <td className="p-2">
                  {f.subSubSubItem?.subSubItem?.subItem?.item?.menu?.app?.Module
                    ?.name || "—"}
                </td>
                <td className="p-2">
                  {f.subSubSubItem?.subSubItem?.subItem?.item?.menu?.app
                    ?.name || "—"}
                </td>
                <td className="p-2">
                  {f.subSubSubItem?.subSubItem?.subItem?.item?.menu?.title ||
                    "—"}
                </td>
                <td className="p-2">
                  {f.subSubSubItem?.subSubItem?.subItem?.item?.name || "—"}
                </td>
                <td className="p-2">
                  {f.subSubSubItem?.subSubItem?.subItem?.name || "—"}
                </td>
                <td className="p-2">
                  {f.subSubSubItem?.subSubItem?.name || "—"}
                </td>
                <td className="p-2">{f.subSubSubItem?.name || "—"}</td>
                <td className="p-2">{f.fieldGroupCode || "—"}</td>
                <td className="p-2">{f.tier || "—"}</td>

                <td className="p-2">{f.displayType}</td>
                <td className="p-2">{f.name}</td>
                <td className="p-2">{f.dataType}</td>
                <td className="p-2">{f.isRequired ? "Yes" : "No"}</td>

                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => {
                      setEditFieldId(f.id || "");
                      setFieldName(f.name);
                      setSelectedDisplayType(f.displayType);
                      setSelectedFieldType(f.dataType);
                      setIsRequired(f.isRequired);
                      setSerialNumber(f.serialNumber || "");

                      // Pre-select the hierarchy for edit
                      setSelectedModule(
                        f.subSubSubItem?.subSubItem?.subItem?.item?.menu?.app
                          ?.Module?.id || ""
                      );
                      setSelectedApp(
                        f.subSubSubItem?.subSubItem?.subItem?.item?.menu?.app
                          ?.id || ""
                      );
                      setSelectedMenu(
                        f.subSubSubItem?.subSubItem?.subItem?.item?.menu?.id ||
                          ""
                      );
                      setSelectedItem(
                        f.subSubSubItem?.subSubItem?.subItem?.item?.id || ""
                      );
                      setSelectedSubItem(
                        f.subSubSubItem?.subSubItem?.subItem?.id || ""
                      );
                      setSelectedSubSubItem(
                        f.subSubSubItem?.subSubItem?.id || ""
                      );
                      setSelectedSubSubSubItem(f.subSubSubItem?.id || "");

                      setFieldGroupCode(f.fieldGroupCode || "");
                      setTier(f.tier || "");
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteField(f?.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

const Dropdown = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) => (
  <div className="flex">
    <label className="block mt-2 mr-2 font-medium text-gray-700">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">-- Select {label} --</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default FieldManager;
