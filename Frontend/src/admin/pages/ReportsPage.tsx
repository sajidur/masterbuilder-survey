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
  getAllDataFields,
} from "../../apiRequest/api";

import React, { useEffect, useMemo, useState } from "react";
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

const mainColumns = [
  "Module",
  "Apps",
  "Menu",
  "Item",
  "Sub-Item",
  "SS Item",
  "SSS Item",
  "DP Group",
  "Tier",
  "Datapoint",
];

// Map display names to your key names used in your data/visibleColumns
const columnKeyMap = {
  Module: "module",
  Apps: "app",
  Menu: "menu",
  Item: "item",
  "Sub-Item": "subItem",
  "SS Item": "subSubItem",
  "SSS Item": "subSubSubItem",
  "DP Group": "DPGroupCode",
  Tier: "tier",
  Datapoint: "DataPoint",
};

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
  const [dataFields, setDataFields] = useState<any[]>([]);

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
  const [distinctColumn, setDistinctColumn] = useState(null);
  const hideOptions = [
    { label: "SI", value: "si" },
    { label: "Intro", value: "intro" },
    { label: "Button", value: "button" },
    { label: "Navigation", value: "navigation" },
    { label: "Layout", value: "layout" },
    { label: "Display", value: "display" },
    { label: "Remarks", value: "remarks" },
    { label: "DP Extra", value: "extraDp" },
  ];

  const [hiddenGroups, setHiddenGroups] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

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
          dataField,
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
          getAllDataFields(),
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
        setDataFields(dataField);

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

  const visibleColumns = React.useMemo(() => {
    const index = selectedRadioKey ? columnKeys.indexOf(selectedRadioKey) : 0;

    const baseColumns = columnKeys.slice(index);
    return showDataPoint ? [...baseColumns, "DataPoint"] : baseColumns;
  }, [selectedRadioKey, showDataPoint]);

  const distinctValues = useMemo(() => {
    if (!distinctColumn) return null;

    const key = columnKeyMap[distinctColumn];

    const valuesSet = new Set();

    dataFields.forEach((f) => {
      if (key === "DataPoint") {
        (f.dataPoints || []).forEach((dp) => {
          if (dp.dataPoint) valuesSet.add(dp.dataPoint);
        });
      } else if (key === "tier") {
        if (f.tier) valuesSet.add(f.tier);
      } else if (key === "DPGroupCode") {
        if (f.fieldGroupCode) valuesSet.add(f.fieldGroupCode);
      } else {
        let val = null;
        switch (key) {
          case "module":
            val = f?.Item?.menu?.app?.Module?.name;
            break;
          case "app":
            val = f?.Item?.menu?.app?.name;
            break;
          case "menu":
            val = f?.Item?.menu?.title;
            break;
          case "item":
            val = f?.Item?.name;
            break;
          case "subItem":
            val = f?.subItem?.name;
            break;
          case "subSubItem":
            val = f?.subSubItem?.name;
            break;
          case "subSubSubItem":
            val = f?.subSubSubItem?.name;
            break;
          default:
            val = null;
        }
        if (val) valuesSet.add(val);
      }
    });

    return Array.from(valuesSet);
  }, [distinctColumn, dataFields]);

  const columnLabels: Record<string, string> = {
    module: "Module",
    app: "App",
    menu: "Menu",
    item: "Item",
    subItem: "Sub Item",
    subSubItem: "SS Item",
    subSubSubItem: "SSS Item",
    DPGroupCode: "DP Group",
    // DataPoint: "Data Point",
  };

  const isHidden = (group: string) => hiddenGroups.includes(group);

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
        {columnKeys.map((key) =>
          key !== "DataPoint" ? (
            <label key={key} className="flex items-center gap-1 text-sm">
              <input
                type="radio"
                name="columnSelector"
                checked={selectedRadioKey === key}
                onChange={() => setSelectedRadioKey(key)}
              />
              {columnLabels[key] || key}
            </label>
          ) : null
        )}

        {/* Separate checkbox for DataPoint */}
        <label className="flex items-center gap-1 text-sm ml-4">
          <input
            type="checkbox"
            checked={showDataPoint}
            onChange={(e) => setShowDataPoint(e.target.checked)}
          />
          Data Point
        </label>

        <div className="flex gap-2">
          {/* <label htmlFor="distinct-select" className="mt-2 font-semibold">
            Distinct:
          </label> */}
          <select
            id="distinct-select"
            className="border rounded px-3 py-2 mb-4"
            value={distinctColumn || ""}
            onChange={(e) =>
              setDistinctColumn(e.target.value === "" ? null : e.target.value)
            }
          >
            <option value="">Distinct column</option>
            {mainColumns.map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>

          {/* <label className="mr-2 font-semibold">Hide:</label> */}
          <div className="relative ">
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="inline-flex justify-between w-40 border px-3 py-2 rounded bg-white shadow-sm"
            >
              Hide Columns
              <svg
                className="ml-2 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {showDropdown && (
              <div className="absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1 max-h-60 overflow-y-auto">
                  {hideOptions.map((option) => (
                    <label
                      key={option.value}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <input
                        type="checkbox"
                        value={option.value}
                        checked={hiddenGroups.includes(option.value)}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (hiddenGroups.includes(value)) {
                            setHiddenGroups(
                              hiddenGroups.filter((g) => g !== value)
                            );
                          } else {
                            setHiddenGroups([...hiddenGroups, value]);
                          }
                        }}
                        className="mr-2"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow">
        {filteredFields.length === 0 ? (
          <p className="text-gray-500">No fields found.</p>
        ) : (
          <div className="overflow-x-auto max-w-full">
            {/* If distinctColumn is NOT selected, render your full detailed existing table */}
            {!distinctColumn && (
              <table className="min-w-[2000px] border border-gray-300 text-sm font-sans text-gray-700">
                <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-300">
                  <tr>
                    {visibleColumns.includes("module") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Module (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Module (Name)
                        </th>
                      </>
                    )}

                    {visibleColumns.includes("app") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            App (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          App (Name)
                        </th>
                      </>
                    )}

                    {visibleColumns.includes("menu") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Menu (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Menu (Title)
                        </th>
                      </>
                    )}

                    {visibleColumns.includes("item") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Item (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Item (Name)
                        </th>

                        {!isHidden("intro") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Intro
                          </th>
                        )}

                        {!isHidden("button") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Button
                          </th>
                        )}

                        {!isHidden("navigation") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Navigate to
                          </th>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("subItem") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Sub Item (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Sub Item (Name)
                        </th>

                        {!isHidden("layout") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Layout
                          </th>
                        )}
                        {!isHidden("intro") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Intro
                          </th>
                        )}
                        {!isHidden("button") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Button
                          </th>
                        )}
                        {!isHidden("navigation") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Navigate to
                          </th>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("subSubItem") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            SS Item (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          SS Item (Name)
                        </th>
                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Layout
                        </th>
                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Button
                        </th>
                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Navigate to
                        </th>
                      </>
                    )}

                    {visibleColumns.includes("subSubSubItem") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            SSS Item (SL)
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          SSS Item (Name)
                        </th>
                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Layout
                        </th>
                      </>
                    )}

                    {visibleColumns.includes("DPGroupCode") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            SL
                          </th>
                        )}

                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          DP Group
                        </th>
                        <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                          Tier
                        </th>

                        {!isHidden("display") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Display
                          </th>
                        )}

                        {!isHidden("remarks") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            Remarks
                          </th>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("DataPoint") && (
                      <>
                        {!isHidden("si") && (
                          <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                            SL
                          </th>
                        )}

                        {!isHidden("extraDp") && (
                          <>
                            <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                              Datapoint
                            </th>
                            <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                              Hide
                            </th>
                            <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                              Required
                            </th>
                            <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                              Data Type
                            </th>
                          </>
                        )}
                      </>
                    )}
                  </tr>
                </thead>

                <tbody>
                  {dataFields.map((f, i) => {
                    const dpList = f?.dataPoints ?? [{}];
                    return dpList.map((dp, j) => (
                      <tr
                        key={`${f.id}-${j}`}
                        className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                      >
                        {visibleColumns.includes("module") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.Item?.menu?.app?.Module?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.Item?.menu?.app?.Module?.name || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("app") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.Item?.menu?.app?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.Item?.menu?.app?.name || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("menu") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.Item?.menu?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.Item?.menu?.title || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("item") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.Item?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.Item?.name || ""}
                            </td>

                            {!isHidden("intro") && (
                              <td
                                className="border-t border-gray-200 px-4 py-2 whitespace-nowrap max-w-xs truncate"
                                title={f?.Item?.description || ""}
                              >
                                {f?.Item?.description || ""}
                              </td>
                            )}

                            {!isHidden("button") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.Item?.buttonLabel || ""}
                              </td>
                            )}

                            {!isHidden("navigation") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.Item?.navigationTo || ""}
                              </td>
                            )}
                          </>
                        )}

                        {visibleColumns.includes("subItem") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.subItem?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subItem?.name || ""}
                            </td>

                            {!isHidden("layout") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.subItem?.layout || ""}
                              </td>
                            )}

                            {!isHidden("intro") && (
                              <td
                                className="border-t border-gray-200 px-4 py-2 whitespace-nowrap max-w-xs truncate"
                                title={f?.subItem?.description || ""}
                              >
                                {f?.subItem?.description || ""}
                              </td>
                            )}

                            {!isHidden("button") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.subItem?.buttonLabel || ""}
                              </td>
                            )}

                            {!isHidden("navigation") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.subItem?.navigationTo || ""}
                              </td>
                            )}
                          </>
                        )}

                        {visibleColumns.includes("subSubItem") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.subSubItem?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subSubItem?.name || ""}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subSubItem?.layout || ""}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subSubItem?.buttonLabel || ""}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subSubItem?.navigationTo || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("subSubSubItem") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.subSubSubItem?.serialNumber || ""}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subSubSubItem?.name || ""}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.subSubSubItem?.layout || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("DPGroupCode") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {j + 1}
                              </td>
                            )}

                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.fieldGroupCode || ""}
                            </td>
                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {f?.tier || ""}
                            </td>

                            {!isHidden("display") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.displayType || ""}
                              </td>
                            )}

                            {!isHidden("remarks") && (
                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                {f?.remarks || ""}
                              </td>
                            )}
                          </>
                        )}

                        {visibleColumns.includes("DataPoint") && (
                          <>
                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                              {dp?.serialNumber || ""}
                            </td>

                            {!isHidden("extraDp") && (
                              <>
                                <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                  {dp?.dataPoint || ""}
                                </td>
                                <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                  {dp?.isHide ? "Yes" : "No"}
                                </td>
                                <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                  {dp?.isRequired ? "Yes" : "No"}
                                </td>
                                <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                  {dp?.dataType || ""}
                                </td>
                              </>
                            )}
                          </>
                        )}
                      </tr>
                    ));
                  })}
                </tbody>
              </table>
            )}

            {/* If distinctColumn is selected, show only the distinct values column */}
            {distinctColumn && (
              <table className="min-w-[800px] border border-gray-300 text-sm font-sans text-gray-700">
                <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-300">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold uppercase tracking-wide">
                      {distinctColumn}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {distinctValues?.map((val, i) => (
                    <tr key={i} className="odd:bg-white even:bg-gray-50">
                      <td className="px-4 py-2 whitespace-nowrap">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
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
