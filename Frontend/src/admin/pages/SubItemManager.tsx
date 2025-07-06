import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  addSubitem,
  updateSubitem,
  getAllSubitems,
  // getAllTemplates,
  deleteSubItem,
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
}

interface Template {
  id: string;
  name: string;
  code: string;
  description: string;
}

interface SubItem {
  id: string;
  name: string;
  item: Item;
  tier: string;
  Template?: Template;
  serialNumber: string;
  buttonType: string;
  navigationTo: string;
  description: string;
}

const SubItemManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  // const [templates, setTemplates] = useState<Template[]>([]);

  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [subItemName, setSubItemName] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState<string>("");
  // const [selectedTemplateId, setSelectedTemplateId] = useState<string>("");
  const [serialNumber, setSerialNumber] = useState("");
  const [buttonType, setButtonType] = useState("");
  const [navigationTo, setNavigationTo] = useState("");
  const [description, setDescription] = useState("");
  const [editSubItemId, setEditSubItemId] = useState<string | null>(null);
  const [buttonLabel, setButtonLabel] = useState("");
  const [layout, setLayout] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          modulesData,
          appsData,
          menusData,
          itemsData,
          subItemsData,
          // templatesData,
        ] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllSubitems(),
          // getAllTemplates(),
        ]);

        setModules(modulesData);
        setApps(appsData);
        setMenus(menusData);
        setItems(itemsData);
        setSubItems(subItemsData);
        // setTemplates(templatesData);
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

    // if (!selectedTemplateId) {
    //   toast.warn("Please select a template.");
    //   return;
    // }

    const trimmedName = subItemName.trim();
    if (!trimmedName) {
      toast.warn("Please enter subitem name.");
      return;
    }

    const itemObj = items.find((i) => i.id === selectedItem);
    if (!itemObj) {
      toast.error("Invalid item selected.");
      return;
    }

    const payload = {
      name: trimmedName,
      itemId: itemObj.id,
      tier: selectedTier,
      templateId: null,
      serialNumber,
      buttonType,
      navigationTo,
      description,
      buttonLabel,
      layout,
    };

    try {
      if (editSubItemId) {
        await updateSubitem(editSubItemId, payload);
        toast.success("SubItem updated successfully!");
      } else {
        const newSubItem = await addSubitem(payload);
        setSubItems((prev) => [...prev, newSubItem]);
        toast.success("SubItem added successfully!");
      }

      // Reset form
      setSubItemName("");
      setSelectedTier("");
      // setSelectedTemplateId("");
      setSerialNumber("");
      setButtonType("");
      setNavigationTo("");
      setDescription("");
      setEditSubItemId(null);
      setButtonLabel("");
      setLayout("");

      const updated = await getAllSubitems();
      setSubItems(updated);
    } catch (error) {
      console.error("Subitem save error:", error);
      toast.error("Failed to save subitem.");
    }
  };

  const handleDeleteSubItem = async (id: string) => {
    try {
      await deleteSubItem(id);
      toast.success("SubItem deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete SubItem.");
    }
  };

  return (
    <div className="px-4">
      {/* Top Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 pb-6">
        <h2 className="font-liight text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 ">📦</span> Sub Item
        </h2>

        {/* Module */}
        <div className="flex">
          <label className="block mt-2 mr-2 font-medium text-gray-700">
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
        <div className="flex">
          <label className="block mt-2 mr-2 font-medium text-gray-700">
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
                <option key={a.id} value={a.id}>
                  {a.name}
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
            className="w-full px-3 py-2 border rounded"
            value={selectedMenu}
            onChange={(e) => {
              setSelectedMenu(e.target.value);
              setSelectedItem("");
            }}
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
        <div className="flex">
          <label className="block mt-2 mr-2 font-medium text-gray-700">
            Item
          </label>
          <select
            className="w-full px-3 py-2 border rounded"
            value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
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
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-6">
        {/* Serial Number */}
        <div>
          <label className="block mb-1 text-sm font-semibold text-gray-700">
            Serial Number
          </label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Enter serial number"
            className="w-full px-3 py-2 border rounded"
          />
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
            <option value="">-- Choose Tier --</option>
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
            Layout
          </label>
          <input
            type="text"
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
            placeholder="Enter layout info"
            className="w-full px-3 py-2 border rounded"
          />
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
            className="w-full px-3 py-2 border rounded"
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
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">-- Select Button Type --</option>
            <option value="Primary Button">Primary Button</option>
            <option value="Second Button">Second Button</option>
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
      </div>

      <div className="flex gap-4 items-center mb-4">
        <button
          onClick={handleAddSubItem}
          className="px-6 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
        >
          {editSubItemId ? "Update SubItem" : "+ Add SubItem"}
        </button>

        {editSubItemId && (
          <button
            onClick={() => {
              setEditSubItemId(null);
              setSubItemName("");
              setSelectedTier("");
              // setSelectedTemplateId("");
              setSerialNumber("");
              setButtonType("");
              setNavigationTo("");
              setDescription("");
            }}
            className="px-6 py-2 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>

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
                <th className="p-2 text-left">SI</th>

                <th className="p-2 text-left">SubItem</th>
                <th className="p-2 text-left">Layout</th>
                <th className="p-2 text-left">Description</th>
                <th className="p-2 text-left">Tier</th>
                <th className="p-2 text-left">P/S Button Name</th>

                {/* <th className="p-2 text-left">Button Type</th> */}
                <th className="p-2 text-left">Navigate To</th>


                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subItems.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">
                    {s.item?.menu?.app?.Module?.name || "—"}
                  </td>
                  <td className="p-2">{s.item?.menu?.app?.name || "—"}</td>
                  <td className="p-2">{s.item?.menu?.title || "—"}</td>
                  <td className="p-2">{s.item?.name || "—"}</td>
                  <td className="p-2">{s.serialNumber}</td>

                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.layout || "—"}</td>
                  <td className="p-2">{s.description}</td>

                  <td className="p-2">{s.tier}</td>

                                    <td className="p-2">
                    {s.buttonType === "Primary Button"
                      ? `P-Button[${s.buttonLabel || ""}]`
                      : s.buttonType === "Second Button"
                      ? `S-Button[${s.buttonLabel || ""}]`
                      : ""}
                  </td>

                  {/* <td className="p-2">{s.buttonLabel || "—"}</td>

                  <td className="p-2">{s.buttonType}</td> */}
                  <td className="p-2">{s.navigationTo}</td>





                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => {
                        setEditSubItemId(s.id);
                        setSubItemName(s.name);
                        setSelectedModule(
                          s.item?.menu?.app?.Module?.name || ""
                        );
                        setSelectedApp(s.item?.menu?.app?.id || "");
                        setSelectedMenu(s.item?.menu?.id || "");
                        setSelectedItem(s.item?.id || "");
                        // setSelectedTemplateId(s.template?.id || "");
                        setSelectedTier(s.tier || "");
                        setSerialNumber(s.serialNumber || "");
                        setButtonType(s.buttonType || "");
                        setNavigationTo(s.navigationTo || "");
                        setDescription(s.description || "");
                        setButtonLabel(s.buttonLabel || "");
                        setLayout(s.layout || "");
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteSubItem(s?.id)}
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

export default SubItemManager;
