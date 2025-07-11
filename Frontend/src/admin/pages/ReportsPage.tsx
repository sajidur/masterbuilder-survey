import { BarChart4 } from "lucide-react";
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

const displayTypeOptions = ["Tree", "Graph", "Table", "DP","Card"];

const columnKeys = [
  "module",
  "app",
  "menu",
  "item",
  "subItem",
  "subSubItem",
  "subSubSubItem",
  "DPGroupCode",
  "DataPoint"
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

const [hiddenColumns, setHiddenColumns] = useState<string[]>([]);
const [rangeSelection, setRangeSelection] = useState<string[]>([]);
const [showHideDropdown, setShowHideDropdown] = useState(false);


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

  // const visibleColumns = columnKeys.slice(columnKeys.indexOf(selectedColumn));

let visibleColumns: string[] = [];

if (rangeSelection.length === 2) {
  const [first, second] = rangeSelection;
  const firstIndex = columnKeys.indexOf(first);
  const secondIndex = columnKeys.indexOf(second);

  const startIndex = Math.min(firstIndex, secondIndex);
  const endIndex = Math.max(firstIndex, secondIndex);

  visibleColumns = columnKeys.slice(startIndex + 1, endIndex + 1);
} else if (rangeSelection.length === 1) {
  const index = columnKeys.indexOf(rangeSelection[0]);
  visibleColumns = columnKeys.slice(index + 1);
} else {
  visibleColumns = columnKeys;
}

// ❗️Remove any hidden columns from visibleColumns
visibleColumns = visibleColumns.filter((col) => !hiddenColumns.includes(col));




  const columnLabels: Record<string, string> = {
    module: "Module",
    app: "App",
    menu: "Menu",
    item: "Item",
    subItem: "Sub Item",
    subSubItem: "SS Item",
    subSubSubItem: "SSS Item",
    field: "Data Point",
    displayType: "DP Group Code",
  };

  return (
    <div className="">
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4 p-4 bg-white">
        <h2 className="font-light text-gray-800 flex items-center gap-2"><BarChart4 size={18} />Report</h2>

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
          label="Sub Item"
          value={selectedSubItem}
          options={filteredSubItems.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          onChange={setSelectedSubItem}
        />
        <Dropdown
          label="SS Item"
          value={selectedSubSubItem}
          options={filteredSubSubItems.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          onChange={setSelectedSubSubItem}
        />
        <Dropdown
          label="SSS Item"
          value={selectedSubSubSubItem}
          options={filteredSubSubSubItems.map((s) => ({
            label: s.name,
            value: s.id,
          }))}
          onChange={setSelectedSubSubSubItem}
        />
        <Dropdown
          label="DP Group Code"
          value={selectedDisplayType}
          options={displayTypeOptions.map((opt) => ({
            label: opt,
            value: opt,
          }))}
          onChange={setSelectedDisplayType}
        />
        <Dropdown
          label="Data Point"
          value={selectedField}
          options={filteredFields.map((f) => ({
            label: f.name,
            value: f.name,
          }))}
          onChange={setSelectedField}
        />
      </div>


      <div className="flex">
        <div className="mb-4">
  <div className="flex flex-wrap gap-4">
    {columnKeys.map((key) => (
      <label key={key} className="flex items-center gap-1 text-sm">
        <input
          type="radio"
          checked={rangeSelection.includes(key)}
          onChange={() => {
            if (rangeSelection.includes(key)) {
              setRangeSelection(rangeSelection.filter((k) => k !== key));
            } else if (rangeSelection.length < 2) {
              setRangeSelection([...rangeSelection, key]);
            }
          }}
        />
        {columnLabels[key]}
      </label>
    ))}
  </div>
</div>


      </div>

      <div className="bg-white p-4 rounded shadow">
        {filteredFields.length === 0 ? (
          <p className="text-gray-500">No fields found.</p>
        ) : (
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                {visibleColumns.includes("module") && (
                  <th className="p-2 text-left">Module</th>
                )}
                {visibleColumns.includes("app") && (
                  <th className="p-2 text-left">App</th>
                )}
                {visibleColumns.includes("menu") && (
                  <th className="p-2 text-left">Menu</th>
                )}
                {visibleColumns.includes("item") && (
                  <th className="p-2 text-left">Item</th>
                )}
                {visibleColumns.includes("subItem") && (
                  <th className="p-2 text-left">Sub Item</th>
                )}
                {visibleColumns.includes("subSubItem") && (
                  <th className="p-2 text-left">SS Item</th>
                )}
                {visibleColumns.includes("subSubSubItem") && (
                  <th className="p-2 text-left">SSS Item</th>
                )}
                {visibleColumns.includes("DataPoint") && (
                  <th className="p-2 text-left">Data Point</th>
                )}
                {visibleColumns.includes("DPGroupCode") && (
                  <th className="p-2 text-left">DP Group Code</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filteredFields.map((f) => (
                <tr key={f.id} className="border-t">
                  {visibleColumns.includes("module") && (
                    <td className="p-2">
                      {modules.find((m) => m.id === selectedModule)?.name || ""}
                    </td>
                  )}
                  {visibleColumns.includes("app") && (
                    <td className="p-2">
                      {apps.find((a) => a.id === selectedApp)?.name || ""}
                    </td>
                  )}
                  {visibleColumns.includes("menu") && (
                    <td className="p-2">
                      {menus.find((m) => m.id === selectedMenu)?.title || ""}
                    </td>
                  )}
                  {visibleColumns.includes("item") && (
                    <td className="p-2">
                      {items.find((i) => i.id === selectedItem)?.name || ""}
                    </td>
                  )}
                  {visibleColumns.includes("subItem") && (
                    <td className="p-2">
                      {subItems.find((s) => s.id === selectedSubItem)?.name ||
                        ""}
                    </td>
                  )}
                  {visibleColumns.includes("subSubItem") && (
                    <td className="p-2">
                      {subSubItems.find((s) => s.id === selectedSubSubItem)
                        ?.name || ""}
                    </td>
                  )}
                  {visibleColumns.includes("subSubSubItem") && (
                    <td className="p-2">
                      {subSubSubItems.find(
                        (s) => s.id === selectedSubSubSubItem
                      )?.name || ""}
                    </td>
                  )}
                  {visibleColumns.includes("DataPoint") && (
                    <td className="p-2">{f.name}</td>
                  )}
                  {visibleColumns.includes("DP Group Code") && (
                    <td className="p-2">{selectedDisplayType}</td>
                  )}
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
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default ReportsPage;
