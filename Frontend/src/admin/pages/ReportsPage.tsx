import { BarChart4, Check } from "lucide-react";
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
  ReportsData,
} from "../../apiRequest/api";

import React, { useEffect, useMemo, useState,useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { tiers } from "./data";

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
  "DPGroupCode",
  "subItem",
  "subSubItem",
  "subSubSubItem",
];

const mainColumns = [
  "Module",
  "Apps",
  "Menu",
  "Item",
  "DP Group",
  // "Tier",
  "Sub Item",
  "SS Item",
  "SSS Item",
  "Datapoint",
];

// Map display names to your key names used in your data/visibleColumns
const columnKeyMap = {
  Module: "module",
  Apps: "app",
  Menu: "menu",
  Item: "item",
  "DP Group": "DPGroupCode",
  // Tier: "tier",
  "Sub Item": "subItem",
  "SS Item": "subSubItem",
  "SSS Item": "subSubSubItem",
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
  const [isHide, setIsHide] = useState(false);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [selectedSubSubSubItem, setSelectedSubSubSubItem] = useState("");
  const [selectedDisplayType, setSelectedDisplayType] = useState("");
  const [selectedField, setSelectedField] = useState("");
  const [selectedRadioKey, setSelectedRadioKey] = useState<string>("module");
  const [showDataPoint, setShowDataPoint] = useState<boolean>(false);
  const [showSSS, setShowSSS] = useState<boolean>(false);
  const [dpGroups, setDpGroups] = useState<string[]>([]);
  const [dataFields, setDataFields] = useState<any[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTier, setSelectedTier] = useState("");

  const dropdownRef = useRef(null);

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
    { label: "itemType", value: "itemType" },
    { label: "Button", value: "button" },
    { label: "Navigation", value: "navigation" },
    { label: "Layout", value: "layout" },
    { label: "Display", value: "display" },
    { label: "Remarks", value: "remarks" },
    { label: "S/SS/SSS Items", value: "S_SS_SSS" },
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
          ReportsData(),
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
  const filteredDpGroups = fields.filter((s) => s.Item?.id === selectedItem);

  const filteredSubSubItems = subSubItems.filter(
    (s) => s.subItem?.id === selectedSubItem
  );
  const filteredSubSubSubItems = subSubSubItems.filter(
    (s) => s.subSubItem?.id === selectedSubSubItem
  );

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
      if (key === "Datapoint") {
        if (f.dataPoint) valuesSet.add(f.dataPoint);
      } else if (key === "tier") {
        if (f.tier) valuesSet.add(f.tier);
      } else if (key === "DPGroupCode") {
        if (f.fieldGroupCode) valuesSet.add(f.fieldGroupCode);
      } else {
        let val = null;
        switch (key) {
          case "module":
            val = f.modulename;
            break;
          case "app":
            val = f.appname;
            break;
          case "menu":
            val = f.title;
            break;
          case "item":
            val = f.itemName;
            break;
          case "subItem":
            val = f.subitem;
            break;
          case "subSubItem":
            val = f.subsubItem;
            break;
          case "subSubSubItem":
            val = f.subsubsubItem;
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
    DataPoint: "Data Point",
  };
  const isHidden = (group: string) => hiddenGroups.includes(group);
  const modulename = modules.find((module) => module?.id === selectedModule)?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const menuname = menus.find((menu) => menu.id === selectedMenu)?.title;
  const itemname = items.find((item) => item.id === selectedItem)?.name;
  const subitemname = subItems.find((s) => s.id === selectedSubItem)?.name;

  const filteredItemsdata = dataFields.filter((item) => {
  const matchModule = selectedModule ? item.modulename === modulename : true;
  const matchApp = selectedApp ? item.appname === appname : true;
  const matchMenu = selectedMenu ? item.title === menuname : true;
  const matchitem = selectedItem ? item.itemName === itemname : true;
  const matchdpGroup = selectedDisplayType ? item.dpgroupid === selectedDisplayType : true;
  const matchsubitem = selectedSubItem ? item.siitem === subitemname : true;
  const isHideFilter = isHide === true
  ? item.isHide === 1
  : item.isHide !== 1; // when false or null, show items where isHide is 0 or null
  const tierFilter = selectedTier ? item.tier === selectedTier : true;
  return matchModule && matchApp && matchMenu && matchitem && matchsubitem && matchdpGroup && isHideFilter && tierFilter;
});

const appsCount = [...new Set(filteredItemsdata.filter(item => !selectedModule || item.modulename === modulename).map(item => item.appname))];
const menuCount = [...new Set(filteredItemsdata.filter(item => !selectedApp || item.appname === appname).map(item => item.title))];
const itemCount = [...new Set(filteredItemsdata.filter(item => !selectedMenu || item.title === menuname).map(item => item.itemName))];
const dpgroupCount = [...new Set(filteredItemsdata.filter(item => !selectedItem || item.itemName === itemname).map(item => item.dpGroupCode))];

//   const matchModule = selectedModule ? item.modulename === modulename : true;
//   const matchApp = selectedApp ? item.appname === appname : true;
//   const matchMenu = selectedMenu ? item.title === menuname : true;
//   const matchitem = selectedItem ? item.itemName === itemname : true;
//   const matchsubitem = selectedSubItem ? item.siitem === subitemname : true;

//   return matchModule && matchApp && matchMenu && matchitem && matchsubitem;
// });
  return (
    <>
<div className="mb-2 px-4 flex justify-between items-center">
  <button
    onClick={() => setShowFilters(!showFilters)}
    className="flex items-center gap-2 text-blue-600 font-semibold"
  >
    {showFilters ? (
      <svg
        className="w-5 h-5 rotate-90"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    ) : (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5l7 7-7 7"
        />
      </svg>
    )}
    {showFilters ? "Hide Filters" : "Show Filters"}
  </button>

    <div className="flex flex-wrap gap-2 text-sm">
        <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>Module:</strong> {modules.length}
        </span>
        <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>App:</strong> {appsCount.length}
        </span>
        <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>Menu:</strong> {menuCount.length}
        </span>
        <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>Item:</strong> {itemCount.length}
        </span>
        <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>DPGroup:</strong> {dpgroupCount.length}
        </span>
        
        <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>Total Row Count:</strong> {filteredItemsdata.length}
        </span>
        {/* <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>Sub Item:</strong> {filteredSubItems.length}
        </span> */}
      </div>
    </div>

      <div>
        {showFilters && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mb-4 p-4 bg-white rounded shadow transition-all duration-300">
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
                options={filteredApps.map((a) => ({
                  label: a.name,
                  value: a.id,
                }))}
                onChange={setSelectedApp}
              />
              <Dropdown
                label="Menu"
                value={selectedMenu}
                options={filteredMenus.map((m) => ({
                  label: m.title,
                  value: m.id,
                }))}
                onChange={setSelectedMenu}
              />
              <Dropdown
                label="Item"
                value={selectedItem}
                options={filteredItems.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))}
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
                options={filteredDpGroups.map((code) => ({ label: code.fieldGroupCode, value: code.id }))}
                onChange={setSelectedDisplayType}
              />
              <Dropdown
              label="Tier"
              value={selectedTier}
              options={tiers.map((t) => ({ label: t.label, value: t.value }))}
              onChange={setSelectedTier}
            />

              <Dropdown
                label="Datapoint"
                value={selectedField}
                options={dataPoints.map((dp) => ({
                  label: dp.dbGroupCode,
                  value: dp.dbGroupCode,
                }))}
                onChange={setSelectedField}
              />
{/*               
              <Dropdown
              label="Regional"
              value={selectedTier}
              options={tiers.map((t) => ({ label: t.label, value: t.value }))}
              onChange={setSelectedTier}
            /> */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isHide}
                onChange={(e) => setIsHide(e.target.checked)}
              />
              Hide
            </label>

            </div>
            <div className="flex flex-wrap gap-4 items-center mb-4">
                              {/* <label className="mr-2 font-semibold">Hide:</label> */}
                <div className="relative " ref={dropdownRef}>
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
                    <div className="absolute mt-2 w-64 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1 max-h-96 overflow-y-auto">
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
                  checked={showSSS}
                  onChange={(e) => setShowSSS(e.target.checked)}
                />
                S/SS/SSS Items
              </label>

              {/* Separate checkbox for DataPoint */}
              <label className="flex items-center gap-1 text-sm ml-4">
                <input
                  type="checkbox"
                  checked={showDataPoint}
                  onChange={(e) => setShowDataPoint(e.target.checked)}
                />
                Datapoint
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
                    setDistinctColumn(
                      e.target.value === "" ? null : e.target.value
                    )
                  }
                >
                  <option value="">Distinct column</option>
                  {mainColumns.map((col) => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <div className="bg-white p-4 rounded shadow relative">
          {filteredItemsdata.length === 0 ? (
            <p className="text-gray-500">No fields found.</p>
          ) : (
            <div className="overflow-auto max-h-[70vh] max-w-full" style={{ scrollbarWidth: 'auto' }}>
              {/* If distinctColumn is NOT selected, render your full detailed existing table */}
              {!distinctColumn && (
                <table className="min-w-[2000px] border border-gray-300 text-sm font-sans text-gray-700">
                  <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-300">
                    <tr>
                      {visibleColumns.includes("module") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            Mod
                          </th>
                        </>
                      )}

                      {visibleColumns.includes("app") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            App
                          </th>
                        </>
                      )}

                      {visibleColumns.includes("menu") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            Menu
                          </th>
                        </>
                      )}

                      {visibleColumns.includes("item") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            Item
                          </th>

                          {!isHidden("itemType") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Item Type
                            </th>
                          )}
                          {!isHidden("intro") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Intro
                            </th>
                          )}

                          {!isHidden("button") && (
                            <th className="px-4 py-2 text-left font-semibold  tracking-wide">
                              Button
                            </th>
                          )}

                          {!isHidden("navigation") && (
                            <th className="px-4 py-2 text-left font-semibold  tracking-wide">
                              Navigate
                            </th>
                          )}
                        </>
                      )}

                      {visibleColumns.includes("DPGroupCode") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            DP_Group
                          </th>
                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            Tier
                          </th>

                          {!isHidden("display") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Display
                            </th>
                          )}

                          {!isHidden("remarks") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Remarks
                            </th>
                          )}
                        </>
                      )}

                      {visibleColumns.includes("subItem") && !isHidden("S_SS_SSS") && showSSS && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            Sub_Item
                          </th>

                          {!isHidden("layout") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Layout
                            </th>
                          )}
                          {!isHidden("intro") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Intro
                            </th>
                          )}
                          {!isHidden("button") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Button
                            </th>
                          )}
                          {!isHidden("navigation") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Navigate
                            </th>
                          )}
                        </>
                      )}

                      {visibleColumns.includes("subSubItem") && !isHidden("S_SS_SSS") && showSSS && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            SS_Item
                          </th>
                          {!isHidden("layout") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Layout
                            </th>
                          )}

                          {!isHidden("button") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Button
                            </th>
                          )}


                          {!isHidden("navigation") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Navigate
                            </th>
                          )}

                        </>
                      )}

                      {visibleColumns.includes("subSubSubItem") && !isHidden("S_SS_SSS") && showSSS && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Sl
                            </th>
                          )}

                          <th className="px-4 py-2 text-left font-semibold tracking-wide">
                            SSS_Item
                          </th>

                          {!isHidden("layout") && (
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Layout
                            </th>
                          )}
                        </>
                      )}


                      {visibleColumns.includes("DataPoint") && (
                        <>
                          {
                            <>
                              <th className="px-4 py-2 text-left font-semibold tracking-wide">
                                Sl
                              </th>
                              <th className="px-4 py-2 text-left font-semibold tracking-wide">
                                Datapoint
                              </th>
                            </>
                          }

                          {!isHidden("extraDp") && (
                              <>                       
                            <th className="px-4 py-2 text-left font-semibold tracking-wide">
                              Tier
                            </th> 
                              <th className="px-4 py-2 text-left font-semibold tracking-wide">
                                Hide
                              </th>
                              <th className="px-4 py-2 text-left font-semibold tracking-wide">
                                Reqd
                              </th>
                              <th className="px-4 py-2 text-left font-semibold tracking-wide">
                                Data_Type
                              </th>
                            </>
                          )}
                        </>
                      )}
                    </tr>
                  </thead>
              <tbody>
                {filteredItemsdata.map((f, i) => (
                  <tr
                    key={`${f.id}-${i}`}
                    className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition-colors duration-200"
                  >
                    {visibleColumns.includes("module") && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.moduleserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.modulename || ""}
                        </td>
                      </>
                    )}

                    {visibleColumns.includes("app") && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.appserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.appname || ""}
                        </td>
                      </>
                    )}

                    {visibleColumns.includes("menu") && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.menuserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.title || ""}
                        </td>
                      </>
                    )}

                    {visibleColumns.includes("item") && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.itemserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.itemName || ""}
                        </td>
                        {!isHidden("intro") && (
                          <td
                            className="border-t border-gray-200 px-4 py-2 whitespace-nowrap max-w-xs truncate"
                            title={f.itemdescription || ""}
                          >
                            {f.itemdescription || ""}
                          </td>
                        )}
                        {!isHidden("itemType") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.itemType || ""}
                          </td>
                        )}
                        {!isHidden("button") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.itembuttonLabel || ""}
                          </td>
                        )}
                        {!isHidden("navigation") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.itemnavigationTo || ""}
                          </td>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("DPGroupCode") && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.groupserialNumber}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.fieldGroupCode || ""}
                        </td>
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f?.dpgrouptier || ""}
                        </td>
                        {!isHidden("display") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.dpgroupdisplay || ""}
                          </td>
                        )}
                        {!isHidden("remarks") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.dpgroupremarks || ""}
                          </td>
                        )}
                      </>
                    )}
                    {visibleColumns.includes("subItem") && !isHidden("S_SS_SSS") && showSSS && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.siserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.siitem || ""}
                        </td>
                        {!isHidden("layout") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.silayout || ""}
                          </td>
                        )}
                        {!isHidden("intro") && (
                          <td
                            className="border-t border-gray-200 px-4 py-2 whitespace-nowrap max-w-xs truncate"
                            title={f.sidescription || ""}
                          >
                            {f.sidescription || ""}
                          </td>
                        )}
                        {!isHidden("button") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.sibuttonLabel || ""}
                          </td>
                        )}
                        {!isHidden("navigation") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.sinavigationTo || ""}
                          </td>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("subSubItem") && !isHidden("S_SS_SSS") && showSSS && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.ssiserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.ssiname || ""}
                        </td>
                        {!isHidden("layout") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.ssilayout || ""}
                          </td>
                        )}
                        {!isHidden("button") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.ssibuttonLabel || ""}
                          </td>
                        )}
                        {!isHidden("navigation") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.ssinavigationTo || ""}
                          </td>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("subSubSubItem") && !isHidden("S_SS_SSS") && showSSS && (
                      <>
                        {!isHidden("si") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.sssiserialNumber || ""}
                          </td>
                        )}
                        <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                          {f.sssiname || ""}
                        </td>
                        {!isHidden("layout") && (
                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                            {f.sssilayout || ""}
                          </td>
                        )}
                      </>
                    )}

                    {visibleColumns.includes("DataPoint") && (
                                      <>
                                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                                {f.serialNumber || ""}
                                              </td>             
                                              <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                                {f.dataPoint || ""}
                                              </td>

                                        {!isHidden("extraDp") && (
                                          <>
                                          <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                            {f.tier}
                                          </td> 
                                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                                  {f.isHide === 1 ? "true" : "false"}
                                            </td>
                                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                              {f.isRequired}
                                            </td>
                                            <td className="border-t border-gray-200 px-4 py-2 whitespace-nowrap">
                                              {f.dataType}
                                            </td>
                                          </>
                                        )}
                                      </>
                                    )}

                    {/* DataPoint-related columns removed since dp is undefined */}
                  </tr>
                ))}
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
    </>
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
