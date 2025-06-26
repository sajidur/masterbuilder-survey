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
//   getAllSubSubSubitems,
//   addSubSubSubitem,
} from "../../apiRequest/api";
import { tiers } from "./data";

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

interface SubSubSubItem {
  id: number;
  name: string;
  SubSubItem: SubSubItem;
}

const templates = [
  { id: 1, name: 'Invoice Template' },
  { id: 2, name: 'Prescription Template' },
  { id: 3, name: 'Report Template' },
];

const SubSubSubItemManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [subSubItems, setSubSubItems] = useState<SubSubItem[]>([]);
  const [subSubSubItems, setSubSubSubItems] = useState<SubSubSubItem[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [subSubSubItemName, setSubSubSubItemName] = useState("");
    const [selectedTier, setSelectedTier] = useState('');
  

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mod, app, menu, item, subItem, subSub] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllSubitems(),
          getAllSubSubitems(),
        //   getAllSubSubSubitems(),
        ]);
        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        // setSubSubSubItems(subSubSub);
      } catch (error) {
        toast.error("Failed to load data.");
        console.error(error);
      }
    };

    fetchAll();
  }, []);

  const handleAdd = async () => {
    if (!selectedModule || !selectedApp || !selectedMenu || !selectedItem || !selectedSubItem || !selectedSubSubItem || !subSubSubItemName.trim()) {
      toast.warn("Please fill all fields.");
      return;
    }

    const subSubItemObj = subSubItems.find((s) => s.name === selectedSubSubItem);

    if (!subSubItemObj) {
      toast.error("Invalid SubSubItem selected.");
      return;
    }

    try {
    //   await addSubSubSubitem({
    //     label: subSubSubItemName.trim(),
    //     subSubItemId: subSubItemObj.id,
    //   });

      toast.success("SubSubSubItem added!");
      setSubSubSubItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          name: subSubSubItemName.trim(),
          SubSubItem: subSubItemObj,
        },
      ]);
      setSubSubSubItemName("");
    } catch (error) {
      toast.error("Failed to add SubSubSubItem.");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">SubSubSubItem Manager</h2>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-6">
        {/* Module to SubSubItem Selects */}
        {[
          { label: "Module", value: selectedModule, setter: setSelectedModule, options: modules.map(m => m.name), reset: () => {
            setSelectedApp("");
            setSelectedMenu("");
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }},
          { label: "App", value: selectedApp, setter: setSelectedApp, options: apps.filter(a => a.Module?.name === selectedModule).map(a => a.name), reset: () => {
            setSelectedMenu("");
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }},
          { label: "Menu", value: selectedMenu, setter: setSelectedMenu, options: menus.filter(m => m.App?.name === selectedApp && m.Module?.name === selectedModule).map(m => m.name), reset: () => {
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }},
          { label: "Item", value: selectedItem, setter: setSelectedItem, options: items.filter(i => i.Menu?.name === selectedMenu).map(i => i.name), reset: () => {
            setSelectedSubItem("");
            setSelectedSubSubItem("");
          }},
          { label: "SubItem", value: selectedSubItem, setter: setSelectedSubItem, options: subItems.filter(s => s.Item?.name === selectedItem).map(s => s.name), reset: () => {
            setSelectedSubSubItem("");
          }},
          { label: "SubSubItem", value: selectedSubSubItem, setter: setSelectedSubSubItem, options: subSubItems.filter(s => s.SubItem?.name === selectedSubItem).map(s => s.name) },
        ].map(({ label, value, setter, options, reset }, idx) => (
          <div key={idx}>
            <label className="block mb-1 font-medium">{label}</label>
            <select
              value={value}
              onChange={(e) => {
                setter(e.target.value);
                reset?.();
              }}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">{`-- Select ${label} --`}</option>
              {options.map((opt, i) => (
                <option key={i} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        {/* SubSubSubItem Name */}
        <div>
          <label className="block mb-1 font-medium">SubSubSubItem Name</label>
          <input
            type="text"
            value={subSubSubItemName}
            onChange={(e) => setSubSubSubItemName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter SubSubSubItem"
          />
        </div>


        {/* template */}
       <div>
        <label className="block mb-1 font-medium">Template</label>
        <select
            className="w-full border px-3 py-2 rounded"
        >
            <option value="">-- Choose a Template --</option>
            {templates.map((template) => (
            <option key={template.id} value={template.id}>
                {template.name}
            </option>
            ))}
        </select>
        </div>


                {/* Tire */}
                <div>
                  <label className="block mb-1 font-medium">Tier</label>
                  <select
                    value={selectedTier}
                    onChange={(e) => setSelectedTier(e.target.value)}
                    className="w-full border px-3 py-2 rounded"
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

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        + Add SubSubSubItem
      </button>

      {/* Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">SubSubSubItems List</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">Menu</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">SubItem</th>
              <th className="p-2 text-left">SubSubItem</th>
              <th className="p-2 text-left">SubSubSubItem</th>
            </tr>
          </thead>
          <tbody>
            {subSubSubItems.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.SubSubItem?.SubItem?.Item?.Module?.name || "—"}</td>
                <td className="p-2">{s.SubSubItem?.SubItem?.Item?.App?.name || "—"}</td>
                <td className="p-2">{s.SubSubItem?.SubItem?.Item?.Menu?.name || "—"}</td>
                <td className="p-2">{s.SubSubItem?.SubItem?.Item?.name || "—"}</td>
                <td className="p-2">{s.SubSubItem?.SubItem?.name || "—"}</td>
                <td className="p-2">{s.SubSubItem?.name || "—"}</td>
                <td className="p-2">{s.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ToastContainer />
    </div>
  );
};

export default SubSubSubItemManager;
