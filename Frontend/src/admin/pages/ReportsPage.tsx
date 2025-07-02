import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  getAllSubitems,
  getAllSubSubitems,
  getAllSubSubSubitems,
  getAllFields,
} from "../../apiRequest/api";

import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Module {
  id: string;
  name: string;
}
interface App {
  id: string;
  name: string;
  Module?: Module;
}
interface Menu {
  id: string;
  title: string;
  app?: App;
  Module?: Module;
}
interface Item {
  id: string;
  name: string;
  menu?: Menu;
}
interface SubItem {
  id: string;
  name: string;
  item?: Item;
}
interface SubSubItem {
  id: string;
  name: string;
  subItem?: SubItem;
}
interface SubSubSubItem {
  id: string;
  name: string;
  subSubItem?: SubSubItem;
}
interface Field {
  id: string;
  name: string;
  subSubSubItem?: SubSubSubItem;
}

const displayTypeOptions = ["tree", "graph", "table", "individual field"];

const columnKeys = [
  "module",
  "app",
  "menu",
  "item",
  "subItem",
  "subSubItem",
  "subSubSubItem",
  "field",
  "displayType",
];

const ReportsPage: React.FC = () => {
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
  const [selectedField, setSelectedField] = useState("");

  const [visibleColumns, setVisibleColumns] = useState<string[]>([...columnKeys]);

  useEffect(() => {
    const fetchAllData = async () => {
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
      } catch (err) {
        console.error("Data load failed", err);
      }
    };
    fetchAllData();
  }, []);

  const filteredApps = apps.filter((app) => app.Module?.id === selectedModule);
  const filteredMenus = menus.filter((menu) => menu.app?.id === selectedApp);
  const filteredItems = items.filter((item) => item.menu?.id === selectedMenu);
  const filteredSubItems = subItems.filter((s) => s.item?.id === selectedItem);
  const filteredSubSubItems = subSubItems.filter(
    (s) => s.subItem?.id === selectedSubItem
  );
  const filteredSubSubSubItems = subSubSubItems.filter(
    (s) => s.subSubItem?.id === selectedSubSubItem
  );
  const filteredFields = fields.filter(
    (f) =>
      f.subSubSubItem?.id === selectedSubSubSubItem &&
      (!selectedField || f.name === selectedField)
  );

  const toggleColumn = (column: string) => {
    setVisibleColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const columnLabels: Record<string, string> = {
    module: "Module",
    app: "App",
    menu: "Menu",
    item: "Item",
    subItem: "SubItem",
    subSubItem: "SubSubItem",
    subSubSubItem: "SubSubSubItem",
    field: "Field",
    displayType: "Display Type",
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Report Manager</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        <Dropdown
          label="Module"
          value={selectedModule}
          options={modules.map((m) => ({ label: m.name, value: m.id }))}
          onChange={setSelectedModule}
        />
        <Dropdown
          label="App"
          value={selectedApp}
          options={filteredApps.map((a) => ({ label: a.name, value: a.id }))}
          onChange={setSelectedApp}
        />
        <Dropdown
          label="Menu"
          value={selectedMenu}
          options={filteredMenus.map((m) => ({ label: m.title, value: m.id }))}
          onChange={setSelectedMenu}
        />
        <Dropdown
          label="Item"
          value={selectedItem}
          options={filteredItems.map((i) => ({ label: i.name, value: i.id }))}
          onChange={setSelectedItem}
        />
        <Dropdown
          label="SubItem"
          value={selectedSubItem}
          options={filteredSubItems.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          onChange={setSelectedSubItem}
        />
        <Dropdown
          label="SubSubItem"
          value={selectedSubSubItem}
          options={filteredSubSubItems.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          onChange={setSelectedSubSubItem}
        />
        <Dropdown
          label="SubSubSubItem"
          value={selectedSubSubSubItem}
          options={filteredSubSubSubItems.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          onChange={setSelectedSubSubSubItem}
        />
        <Dropdown
          label="Display Type"
          value={selectedDisplayType}
          options={displayTypeOptions.map((opt) => ({
            label: opt,
            value: opt,
          }))}
          onChange={setSelectedDisplayType}
        />
        <Dropdown
          label="Field"
          value={selectedField}
          options={filteredFields.map((f) => ({
            label: f.name,
            value: f.name,
          }))}
          onChange={setSelectedField}
        />
      </div>

      <details className="mb-4">
        <summary className="cursor-pointer font-medium">Show/Hide Columns</summary>
        <div className="flex flex-wrap gap-4 mt-2">
          {columnKeys.map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={visibleColumns.includes(key)}
                onChange={() => toggleColumn(key)}
              />
              {columnLabels[key]}
            </label>
          ))}
        </div>
      </details>
        <div className="bg-white p-4 rounded shadow">

          {filteredFields.length === 0 ? (
            <p className="text-gray-500">No fields found.</p>
          ) : (
            <table className="w-full border text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {visibleColumns.includes("module") && <th className="p-2 text-left">Module</th>}
                  {visibleColumns.includes("app") && <th className="p-2 text-left">App</th>}
                  {visibleColumns.includes("menu") && <th className="p-2 text-left">Menu</th>}
                  {visibleColumns.includes("item") && <th className="p-2 text-left">Item</th>}
                  {visibleColumns.includes("subItem") && <th className="p-2 text-left">SubItem</th>}
                  {visibleColumns.includes("subSubItem") && <th className="p-2 text-left">SubSubItem</th>}
                  {visibleColumns.includes("subSubSubItem") && <th className="p-2 text-left">SubSubSubItem</th>}
                  {visibleColumns.includes("field") && <th className="p-2 text-left">Field</th>}
                  {visibleColumns.includes("field") && <th className="p-2 text-left">Display Type</th>}
                </tr>
              </thead>
              <tbody>
                {filteredFields.map((f) => (
                  <tr key={f.id} className="border-t">
                    {visibleColumns.includes("module") && (
                      <td className="p-2">
                        {modules.find(m => m.id === selectedModule)?.name || ""}
                      </td>
                    )}
                    {visibleColumns.includes("app") && (
                      <td className="p-2">
                        {apps.find(a => a.id === selectedApp)?.name || ""}
                      </td>
                    )}
                    {visibleColumns.includes("menu") && (
                      <td className="p-2">
                        {menus.find(m => m.id === selectedMenu)?.title || ""}
                      </td>
                    )}
                    {visibleColumns.includes("item") && (
                      <td className="p-2">
                        {items.find(i => i.id === selectedItem)?.name || ""}
                      </td>
                    )}
                    {visibleColumns.includes("subItem") && (
                      <td className="p-2">
                        {subItems.find(s => s.id === selectedSubItem)?.name || ""}
                      </td>
                    )}
                    {visibleColumns.includes("subSubItem") && (
                      <td className="p-2">
                        {subSubItems.find(s => s.id === selectedSubSubItem)?.name || ""}
                      </td>
                    )}
                    {visibleColumns.includes("subSubSubItem") && (
                      <td className="p-2">
                        {subSubSubItems.find(s => s.id === selectedSubSubSubItem)?.name || ""}
                      </td>
                    )}
                    {visibleColumns.includes("field") && <td className="p-2">{f.name}</td>}
                    {visibleColumns.includes("displayType") && <td className="p-2">{selectedDisplayType}</td>}

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

interface DropdownProps {
  label: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  onChange,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2"
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

export default ReportsPage;
