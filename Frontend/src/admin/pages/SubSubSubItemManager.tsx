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
  getAllSubSubSubitems,
  addSubSubSubitem,
  // getAllTemplates,
  updateSubSubSubitem,
  deleteSubSubSubItem,
  getAllSubSubSubitemsBySP,
  //   getAllSubSubSubitems,
  //   addSubSubSubitem,
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
  serialNumber?: string;
  tier?: string;
  templateId?: string;
}

interface Template {
  id: string;
  name: string;
  code: string;
  description: string;
}

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
  const [selectedTier, setSelectedTier] = useState("");
  // const [selectedTemplateId, setSelectedTemplateId] = useState("");
  // const [templates, setTemplates] = useState<Template[]>([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [editSubSubSubItemId, setEditSubSubSubItemId] = useState<string | null>(
    null
  );
  const [layout, setLayout] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [
          mod,
          app,
          menu,
          item,
          subItem,
          subSub,
          subSubSub,
          // templatesData,
        ] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllSubitems(),
          getAllSubSubitems(),
          getAllSubSubSubitemsBySP(),
          // getAllTemplates(),
        ]);
        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        setSubSubSubItems(subSubSub);
        // setTemplates(templatesData);
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
      !selectedSubSubItem ||
      !subSubSubItemName.trim()
    ) {
      toast.warn("Please fill all fields.");
      return;
    }

    const subSubItemObj = subSubItems.find((s) => s.id === selectedSubSubItem);

    if (!subSubItemObj) {
      toast.error("Invalid SSItem selected.");
      return;
    }

    const payload = {
      name: subSubSubItemName.trim(),
      subSubItemId: subSubItemObj.id,
      tier: selectedTier? selectedTier.trim() : "",
      // templateId: null,
      serialNumber,
      layout,
    };

    try {
      if (editSubSubSubItemId) {
        // Update logic
        await updateSubSubSubitem(editSubSubSubItemId, payload);
        toast.success("SSSItem updated!");
        setEditSubSubSubItemId(null);
      } else {
        const newSubSubSubItem = await addSubSubSubitem(payload);
        toast.success("SSSItem added!");
        setSubSubSubItems((prev) => [...prev, newSubSubSubItem]);
      }

      // Refresh list
      const updated = await getAllSubSubSubitemsBySP();
      setSubSubSubItems(updated);

      // Reset fields
      setSubSubSubItemName("");
      setSerialNumber("");
      setSelectedTier("");
      // setSelectedTemplateId("");
      setLayout("");
    } catch (error) {
      toast.error("Failed to save SubSubSubItem.");
      console.error(error);
    }
  };

  const handleDeleteSubSubSubItem = async (id: string) => {
      const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

    try {
      await deleteSubSubSubItem(id);
      toast.success("SSSItem deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete SSSItem.");
    }
  };

  
  const modulename = modules.find((module) => module?.id === selectedModule)?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const menuname = menus.find((menu) => menu.id === selectedMenu)?.title;
  const itemname = items.find((item) => item.id === selectedItem)?.name;
  const subitemname = subItems.find((s) => s.id === selectedSubItem)?.name;

const filteredSubSUbItems = subSubSubItems.filter((item) => {
  const matchModule = selectedModule ? item.moduleName === modulename : true;
  const matchApp = selectedApp ? item.appName === appname : true;
  const matchMenu = selectedMenu ? item.menuTitle === menuname : true;
  const matchitem = selectedItem ? item.itemName === itemname : true;
  const matchsubitem = selectedSubItem ? item.subitem === subitemname : true;

  return matchModule && matchApp && matchMenu && matchitem && matchsubitem;
  });
  return (
    <div className="">
      {/* 🔹 Top Filter Section: Module → SubSubItem */}
      <div className="grid grid-cols-1 md:grid-cols-8 gap-4 p-4 mb-4 bg-white">
        <div>
        <h2 className="font-liight text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 "><ListPlus size={18} /></span> SSS Item
        </h2>
        <p> 
          Total SSS Item: {subSubSubItems.length}
        </p>
        </div>
        {[
          {
            label: "Module",
            value: selectedModule,
            setter: setSelectedModule,
            options: modules.map((m) => ({ id: m.id, label: m.name })),
            reset: () => {
              setSelectedApp("");
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
              setSelectedSubSubItem("");
            },
          },
          {
            label: "App",
            value: selectedApp,
            setter: setSelectedApp,
            options: apps
              .filter((a) => a.Module?.id === selectedModule)
              .map((a) => ({ id: a.id, label: a.name })),
            reset: () => {
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
              setSelectedSubSubItem("");
            },
          },
          
          {
            label: "Menu",
            value: selectedMenu,
            setter: setSelectedMenu,
            options: menus
              .filter((m) => m.app?.id === selectedApp)
              .map((m) => ({ id: m.id, label: m.title })),
            reset: () => {
              setSelectedItem("");
              setSelectedSubItem("");
              setSelectedSubSubItem("");
            },
          },
          
          {
            label: "iTier",
            value: selectedTier,
            setter: setSelectedTier,
            options: tiers
            .map((m) => ({ id: m.value, label: m.value })),
            reset: () => {
            },
          },
          {
            label: "Item",
            value: selectedItem,
            setter: setSelectedItem,
            options: items
              .filter((i) => i.menu?.id === selectedMenu)
              .map((i) => ({ id: i.id, label: i.name })),
            reset: () => {
              setSelectedSubItem("");
              setSelectedSubSubItem("");
            },
          },
          {
            label: "SubItem",
            value: selectedSubItem,
            setter: setSelectedSubItem,
            options: subItems
              .filter((s) => s.itemId === selectedItem)
              .map((s) => ({ id: s.id, label: s.name })),
            reset: () => {
              setSelectedSubSubItem("");
            },
          },
          {
            label: "SSItem",
            value: selectedSubSubItem,
            setter: setSelectedSubSubItem,
            options: subSubItems
              .filter((s) => s.subItem?.id === selectedSubItem)
              .map((s) => ({ id: s.id, label: s.name })),
          },
        ].map(({ label, value, setter, options, reset }, idx) => (
          <div key={idx} className="">
            <label className="block font-medium text-gray-700">{label}</label>
            <select
              value={value}
              onChange={(e) => {
                setter(e.target.value);
                reset?.();
              }}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${value ? 'border-blue-600 border-2' : 'border-gray-300'}`}
            >
              <option value="">{`Select ${label}`}</option>
              {options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        {/* </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 pb-6"> */}
        {/* Serial Number */}
        <div>
          <label className="block mb-1 font-medium">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            placeholder="Enter serial number"
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* SubSubSubItem Name */}
        <div>
          <label className="block mb-1 font-medium">SSS Item Name</label>
          <input
            type="text"
            value={subSubSubItemName}
            onChange={(e) => setSubSubSubItemName(e.target.value)}
            placeholder="Enter SSSItem"
            className="w-full border px-3 py-2 rounded"
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
        {/* Layout */}
        <div>
          <label className="block mb-1 font-medium">Layout Type</label>
          <select
            value={layout}
            onChange={(e) => setLayout(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${layout ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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

        {/* 🔹 Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleAdd}
            className="px-6 py-2 mt-6 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editSubSubSubItemId ? "Update" : "+ Add"}
          </button>

          {editSubSubSubItemId && (
            <button
              onClick={() => {
                setEditSubSubSubItemId(null);
                setSubSubSubItemName("");
                setSerialNumber("");
                setSelectedTier("");
                // setSelectedTemplateId("");
                setLayout("");
              }}
              className="px-6 py-2 mt-6 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Mod</th>
              <th className="p-2 text-left">App</th>
              <th className="p-2 text-left">Menu</th>
              <th className="p-2 text-left">iTier</th>
              <th className="p-2 text-left">Item</th>
              <th className="p-2 text-left">Sub Item</th>
              <th className="p-2 text-left">SS Item</th>
              <th className="p-2 text-left">SI</th>

              <th className="p-2 text-left">SSS Item</th>
              <th className="p-2 text-left">Layout</th>

              {/* <th className="p-2 text-left">Template</th> */}
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSubSUbItems.map((s) => (
              <tr key={s.id} className="border-t">
                <td className="p-2">
                  {s.moduleName || "—"}
                </td>
                <td className="p-2">
                  {s.appName || "—"}
                </td>
                <td className="p-2">
                  {s.menuTitle || "—"}
                </td>
                <td className="p-2">{s.tier || "—"}</td>
                <td className="p-2">
                  {s.itemName || "—"}
                </td>
                <td className="p-2">{s.subitem || "—"}</td>
                <td className="p-2">{s.subsubitem || "—"}</td>
                <td className="p-2">{s.serialNumber || "—"}</td>

                <td className="p-2">{s.name}</td>
                <td className="p-2">{s.layout || "—"}</td>

                {/* <td className="p-2">
                  {templates.find((t) => t.id.toString() === s.templateId)
                    ?.name || "—"}
                </td> */}

                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => {
                      setEditSubSubSubItemId(s.id);
                      setSubSubSubItemName(s.name);
                      setSerialNumber(s.serialNumber || "");
                      setSelectedTier(s.tier || "");
                      // setSelectedTemplateId(s.templateId || "");

                      setSelectedSubSubItem(s.subSubItem?.id || "");
                      setLayout(s.layout || "");

                      setSelectedModule(
                        s.moduleid || ""
                      );
                      setSelectedApp(s.appid || "");
                      setSelectedMenu(s.menuid || "");
                      setSelectedItem(s.itemid || "");
                      setSelectedSubItem(s.subitemid || "");
                      // setSelectedTemplateId(s.template?.id || "");
                      setSelectedSubSubItem(s.subsubitemid || "");

                      // setButtonType(s.buttonType || "");
                      // setButtonLabel(s.buttonLabel || "");
                      // setNavigationTo(s.navigationTo || "");
                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteSubSubSubItem(s?.id)}
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

export default SubSubSubItemManager;
