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
  getallsubsubitemBySP,
  getAllSubSubSubitemsBySP,
} from "../../apiRequest/api";
import { layoutOptions, tiers } from "./data";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ListPlus } from "lucide-react";

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
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mod, app, menu, item, subItem, subSub] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllSubitems(),
          getallsubsubitemBySP(),
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
      !subSubItemName.trim() //||
      // !selectedTemplateId ||
     // !selectedTier
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
       // const updated = await getallsubsubitemBySP();
       // setSubSubItems(updated);
        setEditSubSubItemId(null);
        setDisabled(false);
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
      //setLayout("");
      //setButtonType("");
      setButtonLabel("");
      setNavigationTo("");
      const updated = await getallsubsubitemBySP();
      setSubSubItems(updated);
    } catch (error) {
      toast.error("Failed to save SSItem.");
      console.error(error);
    }
  };

  const handleDeleteSubSubItem = async (id: string) => {
      const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

    try {
      await deleteSubSubItem(id);
      toast.success("SSItem deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete SSItem.");
    }
  };

  const modulename = modules.find((module) => module?.id === selectedModule)?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const menuname = menus.find((menu) => menu.id === selectedMenu)?.title;
  const itemname = items.find((item) => item.id === selectedItem)?.name;
  const subitemname = subItems.find((s) => s.id === selectedSubItem)?.name;

const filteredSubSUbItems = subSubItems.filter((item) => {
  const matchModule = selectedModule ? item.moduleName === modulename : true;
  const matchApp = selectedApp ? item.appName === appname : true;
  const matchMenu = selectedMenu ? item.menuTitle === menuname : true;
  const matchitem = selectedItem ? item.itemName === itemname : true;
  const matchsubitem = selectedSubItem ? item.subitem === subitemname : true;
  const matchTier = selectedTier ? item.tier === selectedTier : true;
  return matchModule && matchApp && matchMenu && matchitem && matchsubitem && matchTier;
});
  return (
    <div className="">
      {/* Page Title */}

      {/* 🔹 Top Filter Layout: Module → App → Menu → Item → SubItem */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 p-4 rounded-lg bg-white">
        <div>
        <h2 className="font-light text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 "><ListPlus size={18} /></span> SS Page
        </h2>
        <p>
          Total SS Page: {filteredSubSUbItems.length}
        </p>
      </div>
        {/* Module */}
        <div className="">
          <label className="block font-medium text-gray-700">Module</label>
          <select
            value={selectedModule}
            disabled={disabled}
            onChange={(e) => {
              setSelectedModule(e.target.value);
              setSelectedApp("");
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
            }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedModule ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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
          <label className="block font-medium text-gray-700">Category</label>
          <select
            value={selectedApp}
            disabled={disabled}
            onChange={(e) => {
              setSelectedApp(e.target.value);
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
            }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedApp ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Category</option>
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
          <label className="block font-medium text-gray-700">App</label>
          <select
            value={selectedMenu}
            disabled={disabled}
            onChange={(e) => {
              setSelectedMenu(e.target.value);
              setSelectedItem("");
              setSelectedSubItem("");
            }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedMenu ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select App</option>
            {menus
              .filter((m) => m.app?.id === selectedApp)
              .map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title}
                </option>
              ))}
          </select>
        </div>

                  <div>
                    <label className="block mb-1 text-sm font-semibold text-gray-700">
                      iTier
                    </label>
                    <select
                      value={selectedTier}
                      disabled={disabled}
                      onChange={(e) => setSelectedTier(e.target.value)}
                        className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedTier ? 'border-blue-600 border-2' : 'border-gray-300'}`}
                    >
                      <option value="">iTier</option>
                      {tiers.map((tierOption) => (
                        <option key={tierOption.value} value={tierOption.value}>
                          {tierOption.label}
                        </option>
                      ))}
                    </select>
                  </div>
        {/* Item */}
        <div className="">
          <label className="block font-medium text-gray-700">Aggregate</label>
          <select
            value={selectedItem}
            disabled={disabled}
            onChange={(e) => {
              setSelectedItem(e.target.value);
              setSelectedSubItem("");
            }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedItem ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Aggregate</option>
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
          <label className="block font-medium text-gray-700">Sub Page</label>
          <select
            value={selectedSubItem}
            disabled={disabled}
            onChange={(e) => setSelectedSubItem(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedSubItem ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Sub Page</option>
            {subItems
              .filter((s) => s.itemId === selectedItem)
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-8 gap-4  rounded-lg mb-4 px-4 pb-4 bg-white">
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
          <label className="block mb-1 font-medium">SS Page</label>
          <input
            type="text"
            value={subSubItemName}
            onChange={(e) => setSubSubItemName(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter SS Page"
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
                            {false && (

        <div>
          <label className="block mb-1 font-medium">Tier</label>
          <select
            value={selectedTier}
            onChange={(e) => setSelectedTier(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose iTier</option>
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
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${layout ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="" disabled>Select layout</option>
            {layoutOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
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

</div>
}
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
                setDisabled(false);
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
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Mod</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">iTier</th>
              <th className="p-2 text-left">Aggregate</th>
              <th className="p-2 text-left">Sub Page</th>
              <th className="p-2 text-left">SI</th>

              <th className="p-2 text-left">SS Page</th>
              {/* <th className="p-2 text-left">Template</th> */}
              <th className="p-2 text-left">Layout</th>
              {/* <th className="p-2 text-left">P/S Button</th>
              <th className="p-2 text-left">Navigate To</th> */}
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSubSUbItems.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">
                  {s.moduleName || "—"}
                </td>
                <td className="p-2">
                  {s.appName|| "—"}
                </td>
                <td className="p-2">{s.menuTitle || "—"}</td>
                <td className="p-2">{s.tier}</td>
                <td className="p-2">{s.itemName || "—"}</td>
                <td className="p-2">{s.subitem|| "—"}</td>
                <td className="p-2">{s.serialNumber}</td>

                <td className="p-2">{s.name}</td>
                {/* <td className="p-2">
                  {s.template?.name}
                </td> */}
                <td className="p-2">{s.layout || "—"}</td>
                {/* <td className="p-2">
                  {s.buttonType === "Edit Button"
                    ? `Edit-[${s.buttonLabel || ""}]`
                    : s.buttonType === "Second Button"
                    ? `S-[${s.buttonLabel || ""}]`
                    : ""}
                </td>
                <td className="p-2">{s.navigationTo || "—"}</td> */}

                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => {
                      setEditSubSubItemId(s.id);
                      setSubSubItemName(s.name);
                      setSelectedModule(
                        s.moduleid || ""
                      );
                      setSelectedApp(s.appid || "");
                      setSelectedMenu(s.menuid || "");
                      setSelectedItem(s.itemid || "");
                      setSelectedSubItem(s.subitemid || "");
                      // setSelectedTemplateId(s.template?.id || "");

                      setSelectedTier(s.tier || "");
                      setSerialNumber(s.serialNumber || "");
                      setLayout(s.layout || "");
                      setButtonType(s.buttonType || "");
                      setButtonLabel(s.buttonLabel || "");
                      setNavigationTo(s.navigationTo || "");
                      setDisabled(true);
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
