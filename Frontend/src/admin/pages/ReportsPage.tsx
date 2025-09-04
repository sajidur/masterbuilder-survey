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

import React, { useEffect, useMemo, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Hides, tiers } from "./data";

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
  "FG",
  // "Tier",
  "Sub Page",
  "SS Page",
  "SSS Page",
  "Field",
];

// Map display names to your key names used in your data/visibleColumns
const columnKeyMap = {
  Module: "module",
  Apps: "app",
  Menu: "menu",
  Item: "item",
  "FG": "DPGroupCode",
  // Tier: "tier",
  "Sub Page": "subItem",
  "SS Page": "subSubItem",
  "SSS Page": "subSubSubItem",
  Field: "Field",
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
  const [isHide, setIsHide] = useState("-1");

  const [selectedDataPoint, setSelectedDataPoint] = useState();
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
  const [selectediTier, setSelectediTier] = useState("");

  const [groupFields,setGroupFields] = useState<string[]>(["moduleserialNumber","modulename", "appname","appserialNumber","menuserialNumber","title","itemserialNumber","itemName","itemType","itemViewEntry","itemdescription","groupserialNumber","fieldGroupCode","dpgrouptier","dpgroupdisplay","dpgroupremarks","datapointMappingStatus","dpGroupMapStatus"]);
  const dropdownRef = useRef(null);
  const [disabledSubRadios, setDisabledSubRadios] = useState(true);
  const [viewEntry, setViewEntry] = useState("");
  const [mapping, setMapping] = useState("");
  const displayTypes = ["Tree", "Graph", "Table", "List"];

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
    { label: "ItemType", value: "itemType" },
    // { label: "RegName", value: "regName" },
    { label: "View/Entry", value: "itemViewEntry" },
    { label: "Layout", value: "layout" },
    { label: "Display", value: "display" },
    { label: "Remarks", value: "remarks" },
    { label: "S/SS/SSS Page", value: "S_SS_SSS" },
    { label: "Data Type", value: "extraDp" },
  ];
  const values = ["si", "intro","itemType","remarks"]; // This is your default checked list
  const [hiddenGroups, setHiddenGroups] = useState<string[]>(values);
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
  const filteredSubItems = subItems.filter((s) => s.itemId === selectedItem);
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
    return showDataPoint ? [...baseColumns, "Field"] : baseColumns;
  }, [selectedRadioKey, showDataPoint]);

  const distinctValues = useMemo(() => {
    if (!distinctColumn) return null;

    const key = columnKeyMap[distinctColumn];

    const valuesSet = new Set();

    dataFields.forEach((f) => {
      if (key === "Field") {
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
    subItem: "Sub Page",
    subSubItem: "SS Page",
    subSubSubItem: "SSS Page",
    DPGroupCode: "FG",
    Field: "Field",
  };
  const isHidden = (group: string) => hiddenGroups.includes(group);
  const modulename = modules.find(
    (module) => module?.id === selectedModule
  )?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const menuname = menus.find((menu) => menu.id === selectedMenu)?.title;
  const itemname = items.find((item) => item.id === selectedItem)?.name;
  const subitemname = subItems.find((s) => s.id === selectedSubItem)?.name;
  const subsubitemname = subSubItems.find((s) => s.id === selectedSubSubItem)?.name;
  const subsubSubitemname = subSubSubItems.find((s) => s.id === selectedSubSubSubItem)?.name;

  let filteredItemsdata = dataFields.filter((item) => {
    const matchModule = selectedModule ? item.modulename === modulename : true;
    const matchApp = selectedApp ? item.appname === appname : true;
    const matchMenu = selectedMenu ? item.title === menuname : true;
    const matchitem = selectedItem ? item.itemName === itemname : true;
    
    const matchdpGroup = selectedField? item.dpgroupid === selectedField: true;
    const matchDataPoint = selectedDataPoint? item.datapointId === selectedDataPoint: true;
    const matchsubitem = selectedSubItem ? item.siitem === subitemname : true;
    const matchsubSubItem = selectedSubSubItem ? item.ssiname === subsubitemname : true;
    const matchsubSubSubItem = selectedSubSubSubItem ? item.sssiname === subsubSubitemname : true;
    const matchDisplayType = selectedDisplayType ? item.dpgroupdisplay === selectedDisplayType : true;
    const matchViewEntry = viewEntry ? item.itemViewEntry === viewEntry : true;

    // const isHideFilter =
    //   isHide === "-1" ? item.isHide === 1 : item.isHide !== 1; // when false or null, show items where isHide is 0 or null
    const tierFilter = selectedTier ? item.dpgrouptier === selectedTier : true;
    const itierFilter = selectediTier ? item.itier === selectediTier : true;
      // Handle mapping condition
    let matchFilter = true;
    if (mapping) {
      if (mapping === "datapointMappingStatus") {
        matchFilter = item.datapointMappingStatus === "0";
      } else if (mapping === "dpGroupMapStatus") {
        matchFilter = item.dpGroupMapStatus === "0";
      } else if (mapping === "ok") {
        matchFilter = item.datapointMappingStatus === "1" && item.dpGroupMapStatus === "1";
      }
    }
    return (
      matchModule &&
      matchApp &&
      matchMenu &&
      matchitem &&
      matchsubitem &&
      matchdpGroup &&
      matchsubSubItem &&
      matchsubSubSubItem &&
     // isHideFilter &&
      tierFilter &&
      matchDisplayType &&
      matchViewEntry &&
      itierFilter &&
      matchDataPoint &&
      matchFilter
    );
  });

const moduleCount = [
    ...new Set(
      filteredItemsdata
        .map((item) => item.modulename)
    ),
  ];
  const appsCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedModule || item.modulename === modulename)
        .map((item) => item.appname)
    ),
  ];
  const menuCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedApp || item.appname === appname)
        .map((item) => item.title)
    ),
  ];
  const itemCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedMenu || item.title === menuname)
        .map((item) => item.itemName)
    ),
  ];
   const subitemCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedItem || item.itemName === itemname)
        .map((item) => item.siitem)
    ),
  ];
   const ssitemCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedSubItem || item.siitem === subitemname)
        .map((item) => item.ssiname)
    ),
  ];
   const sssitemCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedSubSubItem || item.ssiname === subsubitemname)
        .map((item) => item.sssiname)
    ),
  ];
  const dpgroupCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedItem || item.itemName === itemname)
        .map((item) => item.fieldGroupCode)
    ),
  ];
  const datapointCount = [
    ...new Set(
      filteredItemsdata
        .filter((item) => !selectedItem || item.itemName === itemname)
        .map((item) => item.dataPoint)
    ),
  ];

  //   const matchModule = selectedModule ? item.modulename === modulename : true;
  //   const matchApp = selectedApp ? item.appname === appname : true;
  //   const matchMenu = selectedMenu ? item.title === menuname : true;
  //   const matchitem = selectedItem ? item.itemName === itemname : true;
  //   const matchsubitem = selectedSubItem ? item.siitem === subitemname : true;

  //   return matchModule && matchApp && matchMenu && matchitem && matchsubitem;
  // });
  
const groupedResult = groupByAndProject(filteredItemsdata, groupFields);
filteredItemsdata = groupedResult;
console.log("Filtered Items Data:", filteredItemsdata);

function groupByAndProject(data, groupFields) {
  const map = new Map();

  // For grouping, ignore fields that can have multiple values (we'll aggregate them)
  // Here we assume all groupFields are possible in output, but grouping should only happen on unique identifier fields
  const baseFields = groupFields;

  for (const item of data) {
    // Generate group key using all groupFields (or you can choose a subset if needed)
    const groupKey = baseFields.map((f) => item[f] ?? "NULL").join("__");

    if (!map.has(groupKey)) {
      // Initialize new object
      const groupObject = {};
      groupFields.forEach((f) => {
        groupObject[f] = item[f] ?? null;
      });
      map.set(groupKey, groupObject);
    } else {
      const existing = map.get(groupKey);

      // Merge values dynamically: if different value, convert to array and add
      groupFields.forEach((f) => {
        const currentVal = existing[f];
        const newVal = item[f];

        if (currentVal == null) {
          existing[f] = newVal ?? null;
        } else if (currentVal !== newVal) {
          // If already array, push unique values
          if (Array.isArray(currentVal)) {
            if (newVal && !currentVal.includes(newVal)) {
              currentVal.push(newVal);
            }
          } else {
            // Convert to array with both values
            if (newVal && currentVal !== newVal) {
              existing[f] = [currentVal, newVal];
            }
          }
        }
      });
    }
  }

  return Array.from(map.values());
}

// const toggleGroupField = (field: string) => {
//   setGroupFields(prev =>
//     prev.includes(field)
//       ? prev.filter(f => f !== field) // remove if exists
//       : [...prev, field] // add if not exists
//   );
// };

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
            <strong>Module:</strong> {moduleCount.length}
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
            <strong>Sub Page:</strong> {subitemCount.length}
          </span>
          
          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
            <strong>SS Page:</strong> {ssitemCount.length}
          </span>
          
          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
            <strong>SSS Page:</strong> {sssitemCount.length}
          </span>
          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
            <strong>FG:</strong> {dpgroupCount.length}
          </span>
          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
            <strong>Field:</strong> {datapointCount.length}
          </span>
          <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
            <strong>Total Row:</strong> {filteredItemsdata.length}
          </span>
          {/* <span className="bg-blue-50 text-blue-800 px-2 py-1 rounded-md shadow-sm">
          <strong>Sub Item:</strong> {filteredSubItems.length}
        </span> */}
        </div>
      </div>

      <div>
        {showFilters && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 mb-4 p-4 bg-white rounded shadow transition-all duration-300">
              <h2 className="font-light text-gray-800 flex items-center gap-2 col-span-7">
                <BarChart4 size={18} />
                Report
              </h2>

              <Dropdown
                label="Module"
                value={selectedModule}
                options={modules.map((m) => ({ label: m.name, value: m.id }))}
                // onChange={setSelectedModule}
                onChange={(val) => {
                        setSelectedModule(val);
                        setSelectedApp("");
                        setSelectedMenu("");
                        setSelectedItem("");
                        setSelectedSubItem("");
                        setSelectedSubSubItem("");
                        setSelectedSubSubSubItem("");
                      }}
              />
              <Dropdown
                label="App"
                value={selectedApp}
                options={filteredApps.map((a) => ({
                  label: a.name,
                  value: a.id,
                }))}
              onChange={(val) => {
                          setSelectedApp(val);
                          setSelectedMenu("");
                          setSelectedItem("");
                          setSelectedSubItem("");
                          setSelectedSubSubItem("");
                          setSelectedSubSubSubItem("");
                        }}              />
              <Dropdown
                label="Menu"
                value={selectedMenu}
                options={filteredMenus.map((m) => ({
                  label: m.title,
                  value: m.id,
                }))}
            onChange={(val) => {
            setSelectedMenu(val);
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }} />
            { false &&

              <Dropdown
                label="iTier"
                disabled={!showSSS} // false allows interaction
                value={selectediTier}
                options={tiers.map((t) => ({ label: t.label, value: t.value }))}
                onChange={setSelectediTier}
              />
              }
              <Dropdown
                label="Item"
                value={selectedItem}
                options={filteredItems.map((i) => ({
                  label: i.name,
                  value: i.id,
                }))}
              onChange={(val) => {
                setSelectedItem(val);
                setSelectedSubItem("");
                setSelectedSubSubItem("");
                setSelectedSubSubSubItem("");
              }}              />

            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                View/Entry
              </label>
              <select
                value={viewEntry}
                onChange={(e) => setViewEntry(e.target.value)}
                  className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${viewEntry ? 'border-blue-600 border-2' : 'border-gray-300'}`}
              >
                <option value="">Select</option>
                <option value="View">View</option>
                <option value="Entry">Entry</option>
              </select>
          </div>
              <Dropdown
                label="Sub Page"
                value={selectedSubItem}
                options={filteredSubItems.map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
                onChange={(val) => {
                    setSelectedSubItem(val);
                    setSelectedSubSubItem("");
                    setSelectedSubSubSubItem("");
                }}
              />
              <Dropdown
                label="SS Page"
                value={selectedSubSubItem}
                options={filteredSubSubItems.map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
                onChange={(val) => {
                    setSelectedSubSubItem(val);
                    setSelectedSubSubSubItem("");
                }}              />
              <Dropdown
                label="SSS Page"
                value={selectedSubSubSubItem}
                options={filteredSubSubSubItems.map((s) => ({
                  label: s.name,
                  value: s.id,
                }))}
                onChange={setSelectedSubSubSubItem}
              />
              <Dropdown
                label="FG"
                value={selectedField}
                options={filteredDpGroups.map((code) => ({
                  label: code.fieldGroupCode,
                  value: code.id,
                }))}
                onChange={setSelectedField}
              />
              <Dropdown
                label="fTier"
                value={selectedTier}
                options={tiers.map((t) => ({ label: t.label, value: t.value }))}
                onChange={setSelectedTier}
              />
        <div>
          <label>Display</label>
          <select
            value={selectedDisplayType}
            onChange={(e) => setSelectedDisplayType(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${selectedDisplayType ? 'border-blue-600 border-2' : 'border-gray-300'}`}
          >
            <option value="">Select Display Type</option>
            {displayTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
              <Dropdown
                label="Field"
                value={selectedDataPoint}
                options={dataPoints.map((dp) => ({
                  label: dp.dataPoint,
                  value: dp.id,
                }))}
                onChange={setSelectedDataPoint}
              />
              
              
            <div>
              <label className="block mb-1 text-sm font-semibold text-gray-700">
                Page Mapping
              </label>
              <select
                value={mapping}
                onChange={(e) => setMapping(e.target.value)}
                  className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${mapping ? 'border-blue-600 border-2' : 'border-gray-300'}`}
              >
                <option value="">Select</option>
                {/* <option value="FG w/o Field">FG w/o Field</option> */}
                {/* <option value="Field w/o FG">Field w/o FG</option> */}
                <option value="dpGroupMapStatus">FG w/o Page</option>
                <option value="datapointMappingStatus">FG w/o Field</option>
                <option value="ok">Mapping OK</option>
              </select>
          </div>              
              {/* <Dropdown
              label="Hide"
              value={isHide}
              options={Hides.map((t) => ({ label: t.label, value: t.value }))}
              onChange={setIsHide}
            /> */}
              {/* <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isHide}
                  onChange={(e) => setIsHide(e.target.checked)}
                />
                Hide
              </label> */}
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
                key !== "Field" ? (
                  <label key={key} className="flex items-center gap-1 text-sm">
                    <input
                      type="radio"
                      name="columnSelector"
                      checked={selectedRadioKey === key}
                      onChange={() => setSelectedRadioKey(key)}
                      disabled={ disabledSubRadios && ["subItem", "subSubItem", "subSubSubItem"].includes(key)} // 👈 disable these
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
                  onChange={(e) => {
                     const checked = e.target.checked;
                    setShowSSS(checked);
                    setDisabledSubRadios(e.target.checked==false);
                    if (checked) {
                      setGroupFields(prev => {
                        const next = new Set(prev);
                        next.add("siserialNumber");
                        next.add("siitem");
                        next.add("sssiname");
                        next.add("silayout");
                        next.add("sitier");
                        next.add("sidescription");
                        next.add("ssiserialNumber");
                        next.add("ssiname");
                        next.add("ssilayout");
                        next.add("sssiserialNumber");
                        next.add("sssiname");
                        next.add("sssilayout");
                        return Array.from(next);
                      });
                    } else {
                      setGroupFields(prev => prev.filter(
                        f=>f!=="siserialNumber"
                        && f!== "siitem" 
                        && f!== "silayout" 
                        && f !== "sitier"
                        && f!== "sidescription" 
                        && f !== "ssiserialNumber" 
                        && f !== "ssiname" 
                        && f !== "ssilayout"
                        && f !== "sssiserialNumber"
                        && f!=="sssiname"
                        && f!=="sssilayout"
                      ));
                    }
                  
                  }}
                />
                Page
              </label>

              {/* Separate checkbox for DataPoint */}
              <label className="flex items-center gap-1 text-sm ml-4">
                <input
                  type="checkbox"
                  checked={showDataPoint}
                  onChange={(e) =>{ 
                    const checked = e.target.checked;
                    setShowDataPoint(checked);
                    if (checked) {
                      setGroupFields(prev => {
                        const next = new Set(prev);
                        next.add("dataPoint");
                        next.add("datapointSerialNumber");
                        next.add("dataType")
                        return Array.from(next);
                      });
                    } else {
                      setGroupFields(prev => prev.filter(f => 
                        f !== "dataPoint" 
                        && f !== "datapointSerialNumber"
                        && f !=="dataType"));
                    }

                  }}
                />
                Field
              </label>

              {false && (
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
              )}
            </div>
          </>
        )}

        <div className="bg-white p-4 rounded shadow relative">
          {filteredItemsdata.length === 0 ? (
            <p className="text-gray-500">No fields found.</p>
          ) : (
            <div
              className={`overflow-auto ${showFilters ? "max-h-[55vh]" : "max-h-[87vh]"} max-w-full`}
              style={{ scrollbarWidth: "auto" }}
            >
              {/* If distinctColumn is NOT selected, render your full detailed existing table */}
              {!distinctColumn && (
                // <div className="overflow-x-auto max-h-[calc(100vh-45vh)]">
                <table className="min-w-[1000px] border border-gray-300 text-sm font-sans text-gray-700">
                  <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-300">
                    <tr>
                      {visibleColumns.includes("module") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                              Sl
                            </th>
                          )}

                          <th className="px-2 py-2 text-left font-semibold tracking-wide" style={{width:"50px"}}>
                            Mod
                          </th>
                        </>
                      )}

                      {visibleColumns.includes("app") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                              Sl
                            </th>
                          )}

                          <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"90px"}}>
                            App
                          </th>
                        </>
                      )}

                      {visibleColumns.includes("menu") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                              Sl
                            </th>
                          )}

                          <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"150px"}}>
                            Menu
                          </th>
                        </>
                      )}

                      {visibleColumns.includes("item") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                              Sl
                            </th>
                          )}

                          {visibleColumns.includes("subItem") &&
                            !isHidden("S_SS_SSS") &&
                            showSSS && false && (
                              <>                           
                                {!isHidden("sitier") && (
                                  <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                    iTier
                                  </th>
                                )}
                            </>
                          )}
                          <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"200px"}}>
                            Item
                          </th>

                        {/* 
                          {!isHidden("regName") && (
                            <th className="px-1 py-2 text-left font-semibold  tracking-wide">
                              Reg Name
                            </th>
                          )} */}

                          {!isHidden("itemType") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"50px"}}>
                              Item Type
                            </th>
                          )}
                          {!isHidden("itemViewEntry") && (
                            <th className="px-1 py-2 text-left font-semibold  tracking-wide" style={{width:"50px"}}>
                              View/ Entry
                            </th>
                          )}
                          
                          {!isHidden("intro") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"150px"}}>
                              Intro
                            </th>
                          )}
                        </>
                      )}

                      {visibleColumns.includes("DPGroupCode") && (
                        <>
                          {!isHidden("si") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                              Sl
                            </th>
                          )}

                          <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"200px"}}>
                            FG
                          </th>
                          <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"39px"}}>
                            fTier
                          </th>

                          {!isHidden("display") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"81px"}}>
                              Display
                            </th>
                          )}

                          {!isHidden("remarks") && (
                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"200px"}}>
                              Remarks
                            </th>
                          )}
                        </>
                      )}

                      {visibleColumns.includes("subItem") &&
                        !isHidden("S_SS_SSS") &&
                        showSSS && (
                          <>
                            {!isHidden("si") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                                Sl
                              </th>
                            )}

                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"150px"}}>
                              Sub_Page
                            </th>

                            {!isHidden("layout") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"78px"}}>
                                Layout
                              </th>
                            )}
                            {!isHidden("intro") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"150px"}}>
                                Intro
                              </th>
                            )}
                            {/* {!isHidden("button") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Button
                              </th>
                            )}
                            {!isHidden("navigation") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Navigate
                              </th>
                            )} */}
                          </>
                        )}

                      {visibleColumns.includes("subSubItem") &&
                        !isHidden("S_SS_SSS") &&
                        showSSS && (
                          <>
                            {!isHidden("si") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                                Sl
                              </th>
                            )}

                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"150px"}}>
                              SS_Page
                            </th>
                            {!isHidden("layout") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"82px"}}>
                                Layout
                              </th>
                            )}
                          {/* 
                            {!isHidden("button") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Button
                              </th>
                            )}

                            {!isHidden("navigation") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Navigate
                              </th>
                            )} */}
                          </>
                        )}

                      {visibleColumns.includes("subSubSubItem") &&
                        !isHidden("S_SS_SSS") &&
                        showSSS && (
                          <>
                            {!isHidden("si") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                                Sl
                              </th>
                            )}

                            <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"115px"}}>
                              SSS_Page
                            </th>

                            {!isHidden("layout") && (
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"82px"}}>
                                Layout
                              </th>
                            )}
                          </>
                        )}

                      {visibleColumns.includes("Field") && (
                        <>
                          {
                            <>
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"25px"}}>
                                Sl
                              </th>
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"150px"}}>
                                Field
                              </th>
                            </>
                          }

                          {!isHidden("extraDp") && (
                            <>
                              {/* <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Reg DF
                              </th>
                              <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Hide
                              </th>
                              <th className="px-1 py-2 text-left font-semibold tracking-wide">
                                Reqd
                              </th> */}
                              <th className="px-1 py-2 text-left font-semibold tracking-wide" style={{width:"100px"}}>
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
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.moduleserialNumber || ""}
                              </td>
                            )}
                            <td className="border-t border-gray-200 px-2 py-2 whitespace-nowrap">
                              {f.modulename || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("app") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.appserialNumber || ""}
                              </td>
                            )}
                            <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                              {f.appname || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("menu") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.menuserialNumber || ""}
                              </td>
                            )}
                            <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                              {f.title || ""}
                            </td>
                          </>
                        )}

                        {visibleColumns.includes("item") && (
                          <>
                            {!isHidden("si") && (
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.itemserialNumber || ""}
                              </td>
                            )}
                            {visibleColumns.includes("subItem") &&
                              !isHidden("S_SS_SSS") && false &&
                              showSSS && (
                                <>
                                  {!isHidden("sitier") && (
                                  <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                    {f.itier || ""}
                                  </td>
                                  )}
                              </>
                            )}
                            <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                              {f.itemName || ""}
                            </td>

                            {!isHidden("itemType") && (
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.itemType || ""}
                              </td>
                            )}
                            {/* {!isHidden("regName") && (
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.regName || ""}
                              </td>
                            )} */}
                            {!isHidden("itemViewEntry") && (
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.itemViewEntry || ""}
                              </td>
                            )}
                            
                            {!isHidden("intro") && (
                              <td
                                className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.itemdescription || ""}                              
                              </td>
                            )}
                          </>
                        )}

                        {visibleColumns.includes("DPGroupCode") && (
                          <>
                      {!isHidden("si") && (
                          <td
                            className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${ showSSS?
                              f.dpGroupMapStatus == "1"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                :""
                            }`}
                          >
                            {f.groupserialNumber}
                          </td>
                        )}

                        <td
                           className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${ showSSS?
                              f.dpGroupMapStatus == "1"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                :""
                            }`}
                        >
                          {f.fieldGroupCode || ""}
                        </td>

                        <td
                          className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${ showSSS?
                              f.dpGroupMapStatus == "1"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                :""
                            }`}
                        >
                          {f?.dpgrouptier || ""}
                        </td>

                        {!isHidden("display") && (
                          <td
                            className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${ showSSS?
                              f.dpGroupMapStatus == "1"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                :""
                            }`}
                          >
                            {f.dpgroupdisplay || ""}
                          </td>
                        )}

                        {!isHidden("remarks") && (
                          <td
                            className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${ showSSS?
                              f.dpGroupMapStatus == "1"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                :""
                            }`}
                          >
                            {f.dpgroupremarks || ""}
                          </td>
                        )}

                          </>
                        )}
                        {visibleColumns.includes("subItem") &&
                          !isHidden("S_SS_SSS") &&
                          showSSS && (
                            <>
                              {!isHidden("si") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.siserialNumber || ""}
                                </td>
                              )}
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.siitem || ""}
                              </td>
                              {!isHidden("layout") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.silayout || ""}
                                </td>
                              )}
                              {!isHidden("intro") && (
                                <td
                                  className="border-t border-gray-200 px-1 py-2 whitespace-nowrap max-w-xs truncate"
                                  title={f.sidescription || ""}
                                >
                                  {f.sidescription || ""}
                                </td>
                              )}
                              {/* {!isHidden("button") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.sibuttonLabel || ""}
                                </td>
                              )}
                              {!isHidden("navigation") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.sinavigationTo || ""}
                                </td>
                              )} */}
                            </>
                          )}

                        {visibleColumns.includes("subSubItem") &&
                          !isHidden("S_SS_SSS") &&
                          showSSS && (
                            <>
                              {!isHidden("si") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.ssiserialNumber || ""}
                                </td>
                              )}
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.ssiname || ""}
                              </td>
                              {!isHidden("layout") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.ssilayout || ""}
                                </td>
                              )}
                              {/* {!isHidden("button") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.ssibuttonLabel || ""}
                                </td>
                              )}
                              {!isHidden("navigation") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.ssinavigationTo || ""}
                                </td>
                              )} */}
                            </>
                          )}

                        {visibleColumns.includes("subSubSubItem") &&
                          !isHidden("S_SS_SSS") &&
                          showSSS && (
                            <>
                              {!isHidden("si") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.sssiserialNumber || ""}
                                </td>
                              )}
                              <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                {f.sssiname || ""}
                              </td>
                              {!isHidden("layout") && (
                                <td className="border-t border-gray-200 px-1 py-2 whitespace-nowrap">
                                  {f.sssilayout || ""}
                                </td>
                              )}
                            </>
                          )}

                        {visibleColumns.includes("Field") && (
                          <>
                            <td
                              className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${showSSS?
                                f.datapointMappingStatus == "1"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                                  :""
                              }`}
                            >
                              {f.datapointSerialNumber || ""}
                            </td>

                            <td
                              className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${showSSS?
                                f.datapointMappingStatus == "1"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                                  :""
                              }`}
                            >
                              {f.dataPoint || ""}
                            </td>

                            {!isHidden("extraDp") && (
                              <>
                                {/* <td
                                  className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${showSSS?
                                    f.datapointMappingStatus == "1"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                      :""
                                  }`}
                                >
                                  {f.regional}
                                </td>
                                <td
                                  className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${showSSS?
                                    f.datapointMappingStatus == "1"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                      :""
                                  }`}
                                >
                                  {f.isHide === 1 ? "true" : ""}
                                </td>
                                <td
                                  className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${showSSS?
                                    f.datapointMappingStatus == "1"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                      :""
                                  }`}
                                >
                                  {f.isRequired}
                                </td> */}
                                <td
                                  className={`border-t border-gray-200 px-1 py-2 whitespace-nowrap ${showSSS?
                                    f.datapointMappingStatus == "1"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                      :""
                                  }`}
                                >
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
                // </div>
              )}

              {/* If distinctColumn is selected, show only the distinct values column */}
              {distinctColumn && (
                <table className="min-w-[800px] border border-gray-300 text-sm font-sans text-gray-700">
                  <thead className="bg-gray-50 sticky top-0 z-10 border-b border-gray-300">
                    <tr>
                      <th className="px-1 py-2 text-left font-semibold uppercase tracking-wide">
                        {distinctColumn}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {distinctValues?.map((val, i) => (
                      <tr key={i} className="odd:bg-white even:bg-gray-50">
                        <td className="px-1 py-2 whitespace-nowrap">{val}</td>
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
  disabled?: boolean;   // fully disabled
  options: { label: string; value: string }[];
  onChange: (val: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  value,
  options,
  disabled = false,
  onChange,
}) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      disabled={disabled} // true disables interaction completely
      onChange={(e) => onChange(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${value ? 'border-blue-600 border-2' : 'border-gray-300'}`}
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
