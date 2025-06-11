



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
} from "../../apiRequest/api";

interface Module {
  id: number;
  name: string;
}

interface App {
  id: number;
  name: string;
  Module: Module;
}

interface Menu {
  id: number;
  name: string;
  App: App;
  Module: Module;
}

interface Item {
  id: number;
  name: string;
  Menu: Menu;
  App: App;
  Module: Module;
}

interface SubItem {
  id: number;
  name: string;
  Item: Item;
}

interface SubSubItem {
  id: number;
  name: string;
  SubItem: SubItem;
}

interface Field {
  id: number;
  name: string;
  SubSubItem: SubSubItem;
}

const FieldManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [subSubItems, setSubSubItems] = useState<SubSubItem[]>([]);
  const [fields, setFields] = useState<Field[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [fieldName, setFieldName] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mod, app, menu, item, subItem, subSub, field] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllSubitems(),
          getAllSubSubitems(),
          getAllFields(),
        ]);

        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        setFields(field);
      } catch (error) {
        toast.error("Failed to fetch data.");
        console.error(error);
      }
    };

    fetchAll();
  }, []);

  const handleAddField = async () => {
    if (
      !selectedModule ||
      !selectedApp ||
      !selectedMenu ||
      !selectedItem ||
      !selectedSubItem ||
      !selectedSubSubItem ||
      !fieldName.trim()
    ) {
      toast.warn("Please fill all fields.");
      return;
    }

    const subSubObj = subSubItems.find((s) => s.name === selectedSubSubItem);
    if (!subSubObj) {
      toast.error("Invalid SubSubItem.");
      return;
    }

    try {
      await addField({
        name: fieldName.trim(),
        subSubItemId: subSubObj.id,
      });

      toast.success("Field added successfully!");

      setFields((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: fieldName.trim(),
          SubSubItem: subSubObj,
        },
      ]);

      setFieldName("");
    } catch (error) {
      toast.error("Failed to add field.");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Field Manager</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Dropdowns */}
        <Dropdown label="Module" value={selectedModule} options={modules.map((m) => m.name)} onChange={(val) => {
          setSelectedModule(val);
          setSelectedApp("");
          setSelectedMenu("");
          setSelectedItem("");
          setSelectedSubItem("");
          setSelectedSubSubItem("");
        }} />

        <Dropdown label="App" value={selectedApp}
          options={apps.filter(a => a.Module?.name === selectedModule).map(a => a.name)}
          onChange={(val) => {
            setSelectedApp(val);
            setSelectedMenu("");
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }}
        />

        <Dropdown label="Menu" value={selectedMenu}
          options={menus.filter(m => m.App?.name === selectedApp && m.Module?.name === selectedModule).map(m => m.name)}
          onChange={(val) => {
            setSelectedMenu(val);
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }}
        />

        <Dropdown label="Item" value={selectedItem}
          options={items.filter(i => i.Menu?.name === selectedMenu && i.App?.name === selectedApp && i.Module?.name === selectedModule).map(i => i.name)}
          onChange={(val) => {
            setSelectedItem(val);
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }}
        />

        <Dropdown label="SubItem" value={selectedSubItem}
          options={subItems.filter(s => s.Item?.name === selectedItem).map(s => s.name)}
          onChange={(val) => {
            setSelectedSubItem(val);
            setSelectedSubSubItem("");
          }}
        />

        <Dropdown label="SubSubItem" value={selectedSubSubItem}
          options={subSubItems.filter(s => s.SubItem?.name === selectedSubItem).map(s => s.name)}
          onChange={setSelectedSubSubItem}
        />

        {/* Field Input */}
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
      </div>

      <button
        onClick={handleAddField}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        + Add Field
      </button>

      {/* Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Fields List</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">Menu</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">SubItem</th>
              <th className="p-2 text-left">SubSubItem</th>
              <th className="p-2 text-left">Field</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-2">{f.SubSubItem?.SubItem?.Item?.Module?.name || "—"}</td>
                <td className="p-2">{f.SubSubItem?.SubItem?.Item?.App?.name || "—"}</td>
                <td className="p-2">{f.SubSubItem?.SubItem?.Item?.Menu?.name || "—"}</td>
                <td className="p-2">{f.SubSubItem?.SubItem?.Item?.name || "—"}</td>
                <td className="p-2">{f.SubSubItem?.SubItem?.name || "—"}</td>
                <td className="p-2">{f.SubSubItem?.name || "—"}</td>
                <td className="p-2">{f.name}</td>
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
  options: string[];
  onChange: (value: string) => void;
}) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="">-- Select {label} --</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default FieldManager;
