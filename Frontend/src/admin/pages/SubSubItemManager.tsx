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
  updateSubSubitem,
  // getAllTemplates,
  deleteSubSubItem,
} from "../../apiRequest/api";
import { layoutOptions, tiers } from "./data";
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
  name: string;
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
  tier?: string;
  templateId?: string;
}

// interface Template {
//   id: string;
//   name: string;
//   code: string;
//   description: string;
// }

const SubSubItemManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [subSubItems, setSubSubItems] = useState<SubSubItem[]>([]);
  // const [templates, setTemplates] = useState<Template[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [subSubItemName, setSubSubItemName] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  // const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [editSubSubItemId, setEditSubSubItemId] = useState<string | null>(null);
  const [layout, setLayout] = useState("");
  const [buttonType, setButtonType] = useState("");
  const [buttonLabel, setButtonLabel] = useState("");
  const [navigationTo, setNavigationTo] = useState("");

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
          // getAllTemplates(),
        ]);

        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        // setTemplates(templatesData);
      } catch (error) {
        toast.error("Failed to load data.");
        console.error(error);
      }
    };

    fetchAll();
    console.log({ subSubItems });
  }, []);

  const handleAdd = async () => {
    if (
      !selectedModule ||
      !selectedApp ||
      !selectedMenu ||
      !selectedItem ||
      !selectedSubItem ||
      !subSubItemName.trim() ||
      // !selectedTemplateId ||
      !selectedTier
    ) {
      toast.warn("Please fill all fields.");
      return;
    }

    const subItemObj = subItems.find((s) => s.id === selectedSubItem);
    if (!subItemObj) {
      toast.error("Invalid SubItem selected.");
      return;
    }

    const payload = {
      name: subSubItemName.trim(),
      subItemId: subItemObj.id,
      tier: selectedTier,
      templateId: null,
      serialNumber,
      layout,
      buttonType,
      buttonLabel,
      navigationTo,
    };

    try {
      if (editSubSubItemId) {
        await updateSubSubitem(editSubSubItemId, payload);
        toast.success("SS Item updated!");

        // Refresh list
        const updated = await getAllSubSubitems();
        setSubSubItems(updated);
        setEditSubSubItemId(null);
      } else {
        const newSubSubItem = await addSubSubitem(payload);
        setSubSubItems((prev) => [...prev, newSubSubItem]);
        toast.success("SS Item added!");
      }

      // Reset form
      setSubSubItemName("");
      setSelectedTier("");
      // setSelectedTemplateId("");
      setSerialNumber("");
      setLayout("");
      setButtonType("");
      setButtonLabel("");
      setNavigationTo("");
    } catch (error) {
      toast.error("Failed to save SSItem.");
      console.error(error);
    }
  };

  const handleDeleteSubSubItem = async (id: string) => {
    try {
      await deleteSubSubItem(id);
      toast.success("SSItem deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete SSItem.");
    }
  };

  return (
    <div className="">
      {/* Page Title */}

      {/* 🔹 Top Filter Layout: Module → App → Menu → Item → SubItem */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 p-4 rounded-lg mb-4 bg-white">
        <h2 className="font-light text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 ">📱</span> SS Item
        </h2>

        {/* Module */}
        <div className="">
          <label className="block font-medium text-gray-700">Module</label>
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
            <option value="">Select Module</option>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* App */}
        <div className="">
          <label className="block font-medium text-gray-700">App</label>
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
            <option value="">Select App</option>
            {apps
              .filter((a) => a.Module?.id === selectedModule)
              .map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
          </select>
        </div>

        {/* Menu */}
        <div className="">
          <label className="block font-medium text-gray-700">Menu</label>
          <select
            value={selectedMenu}
            onChange={(e) => {
              setSelectedMenu(e.target.value);
              setSelectedItem("");
              setSelectedSubItem("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Menu</option>
            {menus
              .filter((m) => m.app?.id === selectedApp)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
          </select>
        </div>

        {/* Item */}
        <div className="">
          <label className="block font-medium text-gray-700">Item</label>
          <select
            value={selectedItem}
            onChange={(e) => {
              setSelectedItem(e.target.value);
              setSelectedSubItem("");
            }}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Item</option>
            {items
              .filter((i) => i.menu?.id === selectedMenu)
              .map((i) => (
                <option key={i.id} value={i.id}>
                  {i.name}
                </option>
              ))}
          </select>
        </div>

        {/* SubItem */}
        <div className="">
          <label className="block font-medium text-gray-700">Sub Item</label>
          <select
            value={selectedSubItem}
            onChange={(e) => setSelectedSubItem(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Sub Item</option>
            {subItems
              .filter((s) => s.item?.id === selectedItem)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
        {/* </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-6"> */}
        {/* Serial Number */}
        <div>
          <label className="block mb-1 font-medium text-gray-700">
            Serial Number
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter serial number"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
          />
        </div>

        {/* SubSubItem Name */}
        <div>
          <label className="block mb-1 font-medium">SS Item Name</label>
          <input
            type="text"
            value={subSubItemName}
            onChange={(e) => setSubSubItemName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter SS Item"
          />
        </div>

        {/* Template */}
        {/* <div>
          <label className="block mb-1 font-medium">Template</label>
          <select
            value={selectedTemplateId}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Choose a Template --</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div> */}

        {/* Tier */}
        <div>
          <label className="block mb-1 font-medium">Tier</label>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose Tier</option>
            {tiers.map((tier) => (
              <option key={tier.value} value={tier.value}>
                {tier.label}
              </option>
            ))}
          </select>
        </div>

        {/* Layout */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Layout Type
          </label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="" disabled>Select layout</option>
            {layoutOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Button Type */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Button Type
          </label>
          <select
            value={buttonType}
            onChange={(e) => setButtonType(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Button Type</option>
            <option selected value="Edit Button">Edit Button</option>
            {/* <option value="Second Button">Second Button</option> */}
          </select>
        </div>

        {/* Button Label */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Button Name
          </label>
          <input
            type="text"
            value={buttonLabel}
            onChange={(e) => setButtonLabel(e.target.value)}
            placeholder="Enter button label"
            className="w-full px-3 py-2 border rounded"
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
            placeholder="Enter route or URL"
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        {/* 🔹 Buttons */}
        <div className="flex gap-4 ">
          <button
            onClick={handleAdd}
            className="px-6 py-2 mt-6 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editSubSubItemId ? "Update" : "+ Add"}
          </button>

          {editSubSubItemId && (
            <button
              onClick={() => {
                setEditSubSubItemId(null);
                setSubSubItemName("");
                setSelectedTier("");
                // setSelectedTemplateId("");
                setSerialNumber("");
              }}
              className="px-6 py-2 mt-6 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* SubSubItems Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">SS Items List</h3>
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Module</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">Menu</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Sub Item</th>
              <th className="p-2 text-left">SI</th>

              <th className="p-2 text-left">SS Item</th>
              {/* <th className="p-2 text-left">Template</th> */}
              <th className="p-2 text-left">Tier</th>
              <th className="p-2 text-left">Layout</th>
              <th className="p-2 text-left">P/S Button</th>
              <th className="p-2 text-left">Navigate To</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subSubItems.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">
                  {s.subItem?.item?.menu?.app?.Module?.name || "—"}
                </td>
                <td className="p-2">
                  {s.subItem?.item?.menu?.app?.name || "—"}
                </td>
                <td className="p-2">{s.subItem?.item?.menu?.title || "—"}</td>
                <td className="p-2">{s.subItem?.item?.name || "—"}</td>
                <td className="p-2">{s.subItem?.name || "—"}</td>
                <td className="p-2">{s.serialNumber}</td>

                <td className="p-2">{s.name}</td>
                {/* <td className="p-2">
                  {s.template?.name}
                </td> */}
                <td className="p-2">{s.tier}</td>
                <td className="p-2">{s.layout || "—"}</td>
                <td className="p-2">
                  {s.buttonType === "Primary Button"
                    ? `P-Button[${s.buttonLabel || ""}]`
                    : s.buttonType === "Second Button"
                    ? `S-Button[${s.buttonLabel || ""}]`
                    : ""}
                </td>
                <td className="p-2">{s.navigationTo || "—"}</td>

                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => {
                      setEditSubSubItemId(s.id);
                      setSubSubItemName(s.name);
                      setSelectedModule(
                        s.subItem?.item?.menu?.app?.Module?.id || ""
                      );
                      setSelectedApp(s.subItem?.item?.menu?.app?.id || "");
                      setSelectedMenu(s.subItem?.item?.menu?.id || "");
                      setSelectedItem(s.subItem?.item?.id || "");
                      setSelectedSubItem(s.subItem?.id || "");
                      // setSelectedTemplateId(s.template?.id || "");

                      setSelectedTier(s.tier || "");
                      setSerialNumber(s.serialNumber || "");
                      setLayout(s.layout || "");
                      setButtonType(s.buttonType || "");
                      setButtonLabel(s.buttonLabel || "");
                      setNavigationTo(s.navigationTo || "");
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteSubSubItem(s.id)}
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

export default SubSubItemManager;
