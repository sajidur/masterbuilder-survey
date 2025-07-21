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
  // getAllSubitems,
  // getAllTemplates,
  deleteSubItem,
  getallsubitemBySP,
} from "../../apiRequest/api";
import { layoutOptions, tiers } from "./data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ListChecks } from "lucide-react";

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
          getallsubitemBySP(),
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

    const itemObj = items.find((i) => i.name === selectedItem);
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
      //setSelectedTier("");
      // setSelectedTemplateId("");
      setSerialNumber("");
      //setButtonType("");
      setNavigationTo("");
      setDescription("");
      setEditSubItemId(null);
      //setButtonLabel("");
      //setLayout("");

      const updated = await getallsubitemBySP();
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

  const filteredSubItems = subItems.filter((s) => {
  const matchModule = selectedModule ? s.moduleName === selectedModule : true;
  const matchApp = selectedApp ? s.appName === selectedApp : true;
  const matchMenu = selectedMenu ? s.menuTitle === selectedMenu : true;
  const matchItem = selectedItem ? s.itemName === selectedItem : true;
  return matchModule && matchApp && matchMenu && matchItem;
  });

  return (
    <div className="">
      <div className=" p-4 bg-white mb-4 rounded-lg">
        {/* Top Filter Row */}
        <div className="grid grid-cols-1  md:grid-cols-6 gap-4 pb-4">
          <h2 className="font-light text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 ">
              <ListChecks size={18} />
            </span>{" "}
            Sub Item
          </h2>

          {/* Module */}
          <div className="">
            <label className="block  font-medium text-gray-700">Module</label>
            {/* <select
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
            </select> */}
            <select
  value={selectedModule}
  onChange={(e) => {
    setSelectedModule(e.target.value);
    setSelectedApp("");
    setSelectedMenu("");
    setSelectedItem("");
  }}
                className="w-full px-3 py-2 border rounded"

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
          <div className="">
            <label className="block  font-medium text-gray-700">App</label>
            {/* <select
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
            </select> */}
            {/* App */}
<select
  value={selectedApp}
  onChange={(e) => {
    setSelectedApp(e.target.value);
    setSelectedMenu("");
    setSelectedItem("");
  }}
  className="w-full px-3 py-2 border rounded"
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
            </select> */}
            {/* Menu */}
          <select
            value={selectedMenu}
            onChange={(e) => {
              setSelectedMenu(e.target.value);
              setSelectedItem("");
            }}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="">Select Menu</option>
            {menus
              .filter((m) => m.app?.name === selectedApp)
              .map((m) => (
                <option key={m.id} value={m.title}>
                  {m.title}
                </option>
              ))}
          </select>
          </div>

          {/* Item */}
          <div className="">
            <label className="block font-medium text-gray-700">Item</label>
            {/* <select
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
            </select> */}
            {/* Item */}
<select
  value={selectedItem}
  onChange={(e) => setSelectedItem(e.target.value)}
  className="w-full px-3 py-2 border rounded"
>
  <option value="">Select Item</option>
  {items
    .filter((i) => i.menu?.title === selectedMenu)
    .map((i) => (
      <option key={i.id} value={i.name}>
        {i.name}
      </option>
    ))}
</select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 ">
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
              Sub Item Name
            </label>
            <input
              className="w-full px-3 py-2 border rounded"
              type="text"
              placeholder="Enter subitem name"
              value={subItemName}
              onChange={(e) => setSubItemName(e.target.value)}
            />
          </div>

          {/* Tier */}
                              {false && (

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
                              )}
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
              <option value="" disabled>
                Select layout
              </option>
              {layoutOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
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
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div></div>
          <div></div>

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
              <option value="P-Button">Primary Button</option>
              <option value="S-Button">Secondary Button</option>
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

          <div className="flex gap-4 items-center mb-2">
            <button
              onClick={handleAddSubItem}
              className="px-6 py-2 mt-6 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
            >
              {editSubItemId ? "Update" : "+ Add"}
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
                className="px-6 py-2 mt-6 bg-gray-500 text-white font-medium rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* SubItem List */}
      <div className="bg-white p-4 rounded-lg shadow">
        {subItems.length === 0 ? (
          <p>No subitems found.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Mod</th>
                <th className="p-2 text-left">App</th>
                <th className="p-2 text-left">Menu</th>
                <th className="p-2 text-left">Item</th>
                <th className="p-2 text-left">SI</th>

                <th className="p-2 text-left">Sub Item</th>
                <th className="p-2 text-left">Layout</th>
                <th className="p-2 text-left">Intro</th>
                {/* <th className="p-2 text-left">Tier</th> */}
                <th className="p-2 text-left">P/S Button</th>

                {/* <th className="p-2 text-left">Button Type</th> */}
                <th className="p-2 text-left">Navigate To</th>

                <th className="p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubItems.map((s) => (
                <tr key={s.id} className="border-t">
                  <td className="p-2">
                    {s.moduleName || "—"}
                  </td>
                  <td className="p-2">{s.appName || "—"}</td>
                  <td className="p-2">{s.menuTitle || "—"}</td>
                  <td className="p-2">{s.itemName || "—"}</td>
                  <td className="p-2">{s.serialNumber}</td>

                  <td className="p-2">{s.name}</td>
                  <td className="p-2">{s.layout || "—"}</td>
                  <td className="p-2">{s.description}</td>

                  {/* <td className="p-2">{s.tier}</td> */}

                  <td className="p-2">
                    {s.buttonType === "P-Button"
                      ? `P-Button[${s.buttonLabel || ""}]`
                      : s.buttonType === "S-Button"
                      ? `S-Button[${s.buttonLabel || ""}]`
                      : ""}
                  </td>

                  {/* <td className="p-2">{s.buttonLabel || "—"}</td>

                  <td className="p-2">{s.buttonType}</td> */}
                  <td className="p-2">{s.navigationTo}</td>

                  <td className="px-4 py-3 flex gap-3">
                    <button
                      onClick={() => {
                    const matchedItem = items.find((itm) => itm.name === s.itemName);
                    const matchedMenu = matchedItem?.menu;
                    const matchedApp = matchedMenu?.app;
                    const matchedModule = matchedApp?.Module;

                    setEditSubItemId(s.id);
                    setSubItemName(s.name);
                    setSelectedModule(s.moduleName || "");
                    setSelectedApp(s.appName || "");
                    setSelectedMenu(s.menuTitle || "");
                    setSelectedItem(s.itemName|| "");
                   // setSelectedTier(s.tier || "");
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
