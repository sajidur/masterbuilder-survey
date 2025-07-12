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
  getAllDataPoints,
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
  fieldGroupCode?: string;
  subSubSubItem?: SubSubSubItem;
}

interface DataPoint {
  id: string;
  name: string;
  dbGroupCode: string;
}

const columnKeys = [
  "module",
  "app",
  "menu",
  "item",
  "subItem",
  "subSubItem",
  "subSubSubItem",
  "DPGroupCode",
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
  const [dataPoints, setDataPoints] = useState<DataPoint[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [selectedSubSubSubItem, setSelectedSubSubSubItem] = useState("");
  const [selectedDisplayType, setSelectedDisplayType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedRadioKey, setSelectedRadioKey] = useState<string>("");
  const [showDataPoint, setShowDataPoint] = useState<boolean>(false);
  const [dpGroups, setDpGroups] = useState<string[]>([]);
  const [lookups, setLookups] = useState<{
    subSubSubItemMap: Record<string, SubSubSubItem>;
    subSubItemMap: Record<string, SubSubItem>;
    subItemMap: Record<string, SubItem>;
    itemMap: Record<string, Item>;
    menuMap: Record<string, Menu>;
    appMap: Record<string, App>;
    moduleMap: Record<string, Module>;
  }>({
    subSubSubItemMap: {},
    subSubItemMap: {},
    subItemMap: {},
    itemMap: {},
    menuMap: {},
    appMap: {},
    moduleMap: {},
  });

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [
          mod,
          app,
          menu,
          item,
          subItem,
          subSub,
          subSubSub,
          field,
          dataPoint,
        ] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllMenus(),
          getAllItems(),
          getAllSubitems(),
          getAllSubSubitems(),
          getAllSubSubSubitems(),
          getAllFields(),
          getAllDataPoints(),
        ]);
        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        setSubSubSubItems(subSubSub);
        setFields(field);
        setDataPoints(dataPoint);

        const groupCodes = Array.from(
          new Set(field.map((f) => f.fieldGroupCode).filter(Boolean))
        );
        setDpGroups(groupCodes);
      } catch (err) {
        console.error("Data load failed", err);
      }
    };
    fetchAllData();
  }, []);

  // Build lookup maps once data is loaded
  useEffect(() => {
    if (
      modules.length &&
      apps.length &&
      menus.length &&
      items.length &&
      subItems.length &&
      subSubItems.length &&
      subSubSubItems.length
    ) {
      const mapById = <T extends { id: string }>(list: T[]) =>
        Object.fromEntries(list.map((item) => [item.id, item]));

      setLookups({
        subSubSubItemMap: mapById(subSubSubItems),
        subSubItemMap: mapById(subSubItems),
        subItemMap: mapById(subItems),
        itemMap: mapById(items),
        menuMap: mapById(menus),
        appMap: mapById(apps),
        moduleMap: mapById(modules),
      });
    }
  }, [modules, apps, menus, items, subItems, subSubItems, subSubSubItems]);

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

  const filteredFields = fields.filter((f) => {
    if (
      selectedSubSubSubItem &&
      f.subSubSubItem?.id !== selectedSubSubSubItem
    ) {
      return false;
    }
    if (selectedField && f.name !== selectedField) {
      return false;
    }
    return true;
  });

  let visibleColumns: string[] = [];

  if (selectedRadioKey) {
    const index = columnKeys.indexOf(selectedRadioKey);
    visibleColumns = columnKeys.slice(index);
  } else {
    visibleColumns = columnKeys;
  }

  if (showDataPoint) {
    visibleColumns.push("DataPoint");
  }

  const columnLabels: Record<string, string> = {
    module: "Module",
    app: "App",
    menu: "Menu",
    item: "Item",
    subItem: "Sub Item",
    subSubItem: "SS Item",
    subSubSubItem: "SSS Item",
    DPGroupCode: "DP Group",
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4 p-4 bg-white">
        <h2 className="font-light text-gray-800 flex items-center gap-2 col-span-6">
          <BarChart4 size={18} />
          Report
        </h2>

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
          label="DP Group"
          value={selectedDisplayType}
          options={dpGroups.map((code) => ({ label: code, value: code }))}
          onChange={setSelectedDisplayType}
        />
        <Dropdown
          label="Data Point"
          value={selectedField}
          options={dataPoints.map((dp) => ({
            label: dp.dbGroupCode,
            value: dp.dbGroupCode,
          }))}
          onChange={setSelectedField}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center mb-4">
        {columnKeys.map((key) => (
          <label key={key} className="flex items-center gap-1 text-sm">
            <input
              type="radio"
              name="columnSelector"
              checked={selectedRadioKey === key}
              onChange={() => setSelectedRadioKey(key)}
            />
            {columnLabels[key] || key}
          </label>
        ))}
        <label className="flex items-center gap-1 text-sm ml-4">
          <input
            type="checkbox"
            checked={showDataPoint}
            onChange={(e) => setShowDataPoint(e.target.checked)}
          />
          Data Point
        </label>
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
                {visibleColumns.includes("DPGroupCode") && (
                  <th className="p-2 text-left">DP Group</th>
                )}
                {visibleColumns.includes("DataPoint") && (
                  <th className="p-2 text-left">Data Point</th>
                )}
              </tr>
            </thead>
            <tbody>
  {filteredFields.map((f) => {
    const item = f.Item;
    const subItem = f.subItem;
    const subSubItem = f.subSubItem;
    const subSubSubItem = f.subSubSubItem;

    const menu = item?.menu;
    const app = menu?.app;
    const module = app?.Module;

    return (
      <tr key={f.id}>
        {visibleColumns.includes("module") && <td>{module?.name || ""}</td>}
        {visibleColumns.includes("app") && <td>{app?.name || ""}</td>}
        {visibleColumns.includes("menu") && <td>{menu?.title || ""}</td>}
        {visibleColumns.includes("item") && <td>{item?.name || ""}</td>}
        {visibleColumns.includes("subItem") && <td>{subItem?.name || ""}</td>}
        {visibleColumns.includes("subSubItem") && <td>{subSubItem?.name || ""}</td>}
        {visibleColumns.includes("subSubSubItem") && <td>{subSubSubItem?.name || ""}</td>}
        {visibleColumns.includes("DPGroupCode") && <td>{f.fieldGroupCode || ""}</td>}
        {visibleColumns.includes("DataPoint") && (
          <td>
            {dataPoints
              .filter((dp) => dp.DpGroup?.fieldGroupCode === f.fieldGroupCode)
              .map((dp) => dp.dataPoint)
              .join(", ") || ""}
          </td>
        )}
      </tr>
    );
  })}
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
