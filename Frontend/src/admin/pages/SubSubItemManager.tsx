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
  addSubSubitem,
} from "../../apiRequest/api";
import { tiers } from "./data";

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
  name: string;
  app: App;
}

interface Item {
  id: string;
  name: string;
  menu: Menu;

}

interface SubItem {
  id: number;
  name: string;
  item: Item;
}

interface SubSubItem {
  id: number;
  name: string;
  subItem: SubItem;
  tier?: string;
  templateId?: string;
}


const templates = [
  { id: 1, name: "Invoice Template" },
  { id: 2, name: "Prescription Template" },
  { id: 3, name: "Report Template" },
];

const SubSubItemManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [subSubItems, setSubSubItems] = useState<SubSubItem[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [subSubItemName, setSubSubItemName] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [selectedTemplateId, setSelectedTemplateId] = useState("");


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
        ]);

        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
      } catch (error) {
        toast.error("Failed to load data.");
        console.error(error);
      }
    };

    fetchAll();
  }, []);

  const handleAdd = async () => {
    if (
  !selectedModule ||
  !selectedApp ||
  !selectedMenu ||
  !selectedItem ||
  !selectedSubItem ||
  !subSubItemName.trim() ||
  !selectedTemplateId ||
  !selectedTier
) {
  toast.warn("Please fill all fields.");
  return;
}

const subItemObj = subItems.find((s) => s.name === selectedSubItem);

if (!subItemObj) {
  toast.error("Invalid SubItem selected.");
  return;
}

try {
  await addSubSubitem({
    name: subSubItemName.trim(),
    subItemId: subItemObj.id.toString(),
    tier: selectedTier,
    templateId: selectedTemplateId,
  });

  toast.success("SubSubItem added!");

  setSubSubItems((prev) => [
    ...prev,
    {
      id: Date.now(),
      name: subSubItemName.trim(),
      subItem: subItemObj,
    },
  ]);

  // Reset
  setSubSubItemName("");
  setSelectedTemplateId("");
  setSelectedTier("");
} catch (error) {
  toast.error("Failed to add SubSubItem.");
  console.error(error);
}

  };

  return (
    <div className="p-6 ">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        SubSubItem Manager
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-6">
        {/* Module */}
        <div>
          <label className="block mb-1 font-medium">Module</label>
          <select
            value={selectedModule}
            onChange={(e) => {
              setSelectedModule(e.target.value);
              setSelectedApp("");
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Module --</option>
            {modules.map((m) => (
              <option key={m.id} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* App */}
        <div>
          <label className="block mb-1 font-medium">App</label>
          <select
            value={selectedApp}
            onChange={(e) => {
              setSelectedApp(e.target.value);
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select App --</option>
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
          <label className="block mb-1 font-medium">Menu</label>
          <select
            value={selectedMenu}
            onChange={(e) => {
              setSelectedMenu(e.target.value);
              setSelectedItem("");
              setSelectedSubItem("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Menu --</option>
            {menus
              .filter(
                (m) =>
                  m.App?.name === selectedApp &&
                  m.Module?.name === selectedModule
              )
              .map((m) => (
                <option key={m.id} value={m.name}>
                  {m.name}
                </option>
              ))}
          </select>
        </div>

        {/* Item */}
        <div>
          <label className="block mb-1 font-medium">Item</label>
          <select
            value={selectedItem}
            onChange={(e) => {
              setSelectedItem(e.target.value);
              setSelectedSubItem("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Item --</option>
            {items
              .filter(
                (i) =>
                  i.Menu?.name === selectedMenu &&
                  i.App?.name === selectedApp &&
                  i.Module?.name === selectedModule
              )
              .map((i) => (
                <option key={i.id} value={i.name}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>

        {/* SubItem */}
        <div>
          <label className="block mb-1 font-medium">SubItem</label>
          <select
            value={selectedSubItem}
            onChange={(e) => setSelectedSubItem(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select SubItem --</option>
            {subItems
              .filter((s) => s.Item?.name === selectedItem)
              .map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>

        {/* SubSubItem Input */}
        <div>
          <label className="block mb-1 font-medium">SubSubItem Name</label>
          <input
            type="text"
            value={subSubItemName}
            onChange={(e) => setSubSubItemName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter SubSubItem"
          />
        </div>

        {/* template */}
        <div>
          <label className="block mb-1 font-medium">Template</label>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Choose a Template --</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id.toString()}>
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
        + Add SubSubItem
      </button>

      {/* Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">SubSubItems List</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">Menu</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">SubItem</th>
              <th className="p-2 text-left">SubSubItem</th>
              <th className="p-2 text-left">Template</th>

            </tr>
          </thead>
          <tbody>
            {subSubItems.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">{s.subItem?.item?.menu?.app?.Module?.name || "—"}</td>
                <td className="p-2">{s.subItem?.item?.menu?.app?.name || "—"}</td>
                <td className="p-2">{s.subItem?.item?.menu?.title || "—"}</td>
                <td className="p-2">{s.subItem?.item?.name || "—"}</td>
                <td className="p-2">{s.subItem?.name || "—"}</td>
                <td className="p-2">{s.name}</td>
                <td className="p-2">
                  {templates.find((t) => t.id.toString() === s.templateId)?.name || "—"}
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

export default SubSubItemManager;
