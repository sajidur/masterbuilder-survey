/* eslint-disable @typescript-eslint/no-unused-vars */
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
  getAllFields,
  addField,
  deleteField,
  getAllSubSubSubitems,
  updateField,
  getAllFieldsBySP,
  updateDpGroupMap,
  addDpGroupMap,
  deleteDPGroupMap,
  getAllDPGroupmapsBySP,
} from "../../apiRequest/api";
import { FaEdit, FaTrash } from "react-icons/fa";
import { tiers, ViewEntrys } from "./data";
import { ListTree } from "lucide-react";

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
}

interface Field {
  id?: string;
  // name: string;
  displayType: string;
  // dataType: string;
  // isRequired: boolean;
  // isHide: boolean;
  subSubSubItem: SubSubSubItem;
  serialNumber?: string;
  // fieldGroupCode?: string;
  tier?: string;
}

const PageFGMap:  React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<App[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [subItems, setSubItems] = useState<SubItem[]>([]);
  const [subSubItems, setSubSubItems] = useState<SubSubItem[]>([]);
  const [subSubSubItems, setSubSubSubItems] = useState<SubSubSubItem[]>([]);
  const [fields, setFields] = useState<Field[]>([]);
  const [dpgroupmaps,setDpGroupMaps] = useState<Field[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [selectedSubSubSubItem, setSelectedSubSubSubItem] = useState("");
  const [selectedDisplayType, setSelectedDisplayType] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [editFieldId, setEditFieldId] = useState<string | null>(null);
  const [dpgroup, setFieldGroupCode] = useState("");
  const [tier, setTier] = useState("");
  const [itier, setITier] = useState("");
  const [remarks, setRemarks] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [viewEntry, setViewEntry] = useState("");

  // const fieldTypes = ["text", "number", "date", "boolean", "dropdown"];
  const displayTypes = ["Tree", "Graph", "Table", "List"];

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mod, app, menu, item, subItem, subSub, subSubSub, field,dpgroupmaps] =
          await Promise.all([
            getAllModules(),
            getAllApps(),
            getAllMenus(),
            getAllItems(),
            getAllSubitems(),
            getAllSubSubitems(),
            getAllSubSubSubitems(),
            getAllFieldsBySP(),
            getAllDPGroupmapsBySP(),
          ]);
        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        setSubSubSubItems(subSubSub);
        setFields(field);
        setDpGroupMaps(dpgroupmaps);

      } catch (error) {
        toast.error("Failed to fetch data.");
      }
    };

    fetchAll();
  }, []);

  const handleAddOrUpdateField = async () => {
    if (
      !selectedModule ||
      !selectedApp ||
      !selectedMenu ||
      !selectedItem //||
     // !selectedDisplayType
    ) {
      toast.warn("Please fill all required fields.");
      return;
    }

    if(itier!=tier){  
      toast.warn("ftier and itier should match.");
      return;
    }
    const payload: {
      itemId: string;
      // displayType: string;
      // serialNumber: string;
      dpGroupId: string;
      tier?: string;
      itier?: string;
      // remarks: string;
      subItemId?: string | null;
      subSubItemId?: string | null;
      subSubSubItemId?: string | null;
    } = {
      itemId: selectedItem,
      displayType: "", //selectedDisplayType,
      // serialNumber,
      dpGroupId:dpgroup,
      tier: "0",
      itier: itier||"",
      // remarks,
      subItemId: selectedSubItem || null,
      subSubItemId: selectedSubSubItem || null,
      subSubSubItemId: selectedSubSubSubItem || null,
    };



    try {
      if (editFieldId) {
        await updateDpGroupMap(editFieldId, payload);
        toast.success("DP updated successfully!");
        const updatedFields = await getAllDPGroupmapsBySP();
        setDpGroupMaps(updatedFields);
        setEditFieldId(null);
        setDisabled(false);
      } else {
        await addDpGroupMap(payload);
        toast.success("DP added successfully!");
        const updatedFields = await getAllDPGroupmapsBySP();
        setDpGroupMaps(updatedFields);
      }

      // Reset form
      setSerialNumber("");
      setSelectedDisplayType("");
      setSelectedSubSubSubItem("");

            // Refresh list
      const updated = await getAllFieldsBySP();
      setFields(updated);
    } catch (e) {
      toast.error("Failed to save DP Group map.");
    }
  };

  const handleDeleteField = async (id: string) => {
      const confirm = window.confirm("Are you sure you want to delete this item?");
  if (!confirm) return;

    try {
      await deleteDPGroupMap(id);
      toast.success("FG map deleted successfully!");
      const updatedFields = await getAllDPGroupmapsBySP();
      setDpGroupMaps(updatedFields);
    } catch (error) {
      toast.error("Failed to delete field.");
    }
  };

  const modulename = modules.find((module) => module?.id === selectedModule)?.name;
  const appname = apps.find((app) => app.id === selectedApp)?.name;
  const subitemname = subItems.find((s) => s.id === selectedSubItem)?.name;

  const filteredItemsdata = dpgroupmaps.filter((item) => {
  const matchModule = selectedModule ? item.moduleName === modulename : true;
  const matchApp = selectedApp ? item.appName === appname : true;
  const matchMenu = selectedMenu ? item.menuid === selectedMenu : true;
  const matchItier = itier ? item.itier === itier : true;
  const matchitem = selectedItem ? item.itemId === selectedItem : true;
  const matchsubitem = selectedSubItem ? item.subItemName === subitemname : true;
  const matchsubsubitem = selectedSubSubItem ? item.subsubitemid === selectedSubSubItem : true;

  return matchModule && matchApp && matchMenu && matchitem && matchsubitem && matchsubsubitem && matchItier;
});
const filteredDpGroup = fields.filter((dp) =>dp.itemid=== selectedItem);
  return (
    <div className="">
      {/* 🔹 Top Filter Section: Hierarchy Dropdowns */}
      <div className="grid grid-cols-1 md:grid-cols-9 gap-4 p-4 bg-white">
        <div>
        <h2 className="font-light text-gray-800 flex items-center gap-2">
          <span className="text-blue-600 ">
            <ListTree size={18} />
          </span>
          Page - FG Map
        </h2>
        <p> 
          Total: {filteredItemsdata.length}
        </p>
      </div>
        <Dropdown
          label="Module"
          value={selectedModule}
          disabled={disabled}
          options={modules.map((m) => ({ label: m.name, value: m.id }))}
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
          disabled={disabled}
          options={apps
            .filter((a) => a.Module?.id === selectedModule)
            .map((a) => ({ label: a.name, value: a.id }))}
          onChange={(val) => {
            setSelectedApp(val);
            setSelectedMenu("");
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="Menu"
          value={selectedMenu}
          disabled={disabled}
          options={menus
            .filter((m) => m.app?.id === selectedApp)
            .map((m) => ({ label: m.title, value: m.id }))}
          onChange={(val) => {
            setSelectedMenu(val);
            setSelectedItem("");
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="Page"
          value={selectedItem}
          disabled={disabled}
          options={items
            .filter((i) => i.menu?.id === selectedMenu)
            .map((i) => ({ label: i.name, value: i.id }))}
          onChange={(val) => {
            setSelectedItem(val);
            setSelectedSubItem("");
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");

            const selectedItemObj = items.find((i) => i.id === val);
            if (selectedItemObj) {
              const prefix = `${selectedItemObj.name}/`;
             // setFieldGroupPrefix(prefix);
              setFieldGroupCode(prefix); // sets full fieldGroupCode
            }
          }}
        />
                <div>
                  <label className="block mb-1 text-sm font-semibold text-gray-700">
                    View/Entry
                  </label>
                  <select
                    value={viewEntry}
                    onChange={(e) => setViewEntry(e.target.value)}
                      className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${viewEntry ? 'border-blue-600 border-2' : 'border-gray-300'}`}
                  >
                    <option value="">Choose</option>
                    {ViewEntrys.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
        
                  </select>
                </div>
          <Dropdown
            label="iTier"
            disabled={disabled}
            value={itier}
            options={tiers.map((t) => ({ label: t.label, value: t.value }))}
            onChange={setITier}
          />
        <Dropdown
          label="Sub Page"
          value={selectedSubItem}
          options={subItems
            .filter((s) => s.itemId === selectedItem)
            .map((s) => ({ label: s.name, value: s.id }))}
          onChange={(val) => {
            setSelectedSubItem(val);
            setSelectedSubSubItem("");
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="SS Page"
          value={selectedSubSubItem}
          options={subSubItems
            .filter((s) => s.subItem?.id === selectedSubItem)
            .map((s) => ({ label: s.name, value: s.id }))}
          onChange={(val) => {
            setSelectedSubSubItem(val);
            setSelectedSubSubSubItem("");
          }}
        />
        <Dropdown
          label="SSS Page"
          value={selectedSubSubSubItem}
          options={subSubSubItems
            .filter((s) => s.subSubItem?.id === selectedSubSubItem)
            .map((s) => ({ label: s.name, value: s.id }))}
          onChange={(val) => setSelectedSubSubSubItem(val)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-4 bg-white pb-4 px-4">
        { false &&
        <div>
          <label className="block mb-1 font-medium">Serial Number</label>
          <input
            type="text"
            value={serialNumber}
            onChange={(e) => setSerialNumber(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter serial number"
          />
        </div>
      }
        {/* Field Group Code */}
         <div>
            <label className="block mb-1 font-medium">FG</label>
            <select
              value={dpgroup}
              disabled={disabled}
              onChange={(e) => {
                setFieldGroupCode(e.target.value);               
                const selectedDpGroupObj = fields.find((dpgroup) => dpgroup.id === e.target.value);
                setTier(selectedDpGroupObj?.tier || "");
                setSelectedDisplayType(selectedDpGroupObj?.displayType);
              }}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select FG</option>
              {filteredDpGroup.map((dp) => (
                <option key={dp.id} value={dp.id}>
                  {dp.fieldGroupCode}
                </option>
              ))}
            </select>
          </div>

        {/* <div>
          <label className="block mb-1 font-medium">Field Group Code</label>
          <input
            type="text"
            value={fieldGroupCode}
            onChange={(e) => setFieldGroupCode(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter field group code"
          />
        </div> */}

        {/* Tier */}
        

        <div>
          <label className="block mb-1 font-medium">Tier</label>
          <select
            value={tier}
            disabled
            onChange={(e) => setTier(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Choose Tier</option>
            {tiers.map((tierOption) => (
              <option key={tierOption.value} value={tierOption.value}>
                {tierOption.label}
              </option>
            ))}
          </select>
        </div>
      

        {/* Display Type */}
      
        <div>
          <label className="block mb-1 font-medium">Display Type</label>
          <select
            value={selectedDisplayType}
            disabled
            onChange={(e) => setSelectedDisplayType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Display Type</option>
            {displayTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>


        {/* Remarks */}
        { false &&
        <div>
          <label className="block mb-1 font-medium">Remarks</label>
          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter field name"
          />
        </div>
      }       
        {/* Field Type */}
        {/* <div>
          <label className="block mb-1 font-medium">Data Type</label>
          <select
            value={selectedFieldType}
            onChange={(e) => setSelectedFieldType(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Field Type</option>
            {fieldTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div> */}

        {/* <Dropdown
          label="Display Type"
          value={selectedDisplayType}
          options={displayTypes.map((f) => ({ label: f, value: f }))}
          onChange={(val) => setSelectedDisplayType(val)}
        />

        <div>
          <label className="block mb-1 font-medium">Field Name</label>
          <input
            type="text"
            value={fieldName}
            onChange={(e) => setFieldName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter field name"
          />
        </div>

        <Dropdown
          label="Field Type"
          value={selectedFieldType}
          options={fieldTypes.map((f) => ({ label: f, value: f }))}
          onChange={(val) => setSelectedFieldType(val)}
        /> */}
        {/* <div className="flex justify-bwteen items-center space-x-2 mt-2">
          <input
            type="checkbox"
            checked={isHide}
            onChange={(e) => setIsHide(e.target.checked)}
            className="w-4 h-4"
            id="ishide-checkbox"
          />
          <label
            htmlFor="ishide-checkbox"
            className="text-sm font-medium text-gray-700"
          >
            Is Hide
          </label>

          <input
            type="checkbox"
            checked={isRequired}
            onChange={(e) => setIsRequired(e.target.checked)}
            className="w-4 h-4"
            id="required-checkbox"
          />
          <label
            htmlFor="required-checkbox"
            className="text-sm font-medium text-gray-700"
          >
            Required
          </label>
        </div> */}

        {/* 🔹 Action Buttons */}
        <div className="">
          <button
            onClick={handleAddOrUpdateField}
            className="px-6 py-2 mt-6 mr-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            {editFieldId ? "Update" : "+ Map"}
          </button>

          {editFieldId && (
            <button
              onClick={() => {
                setEditFieldId(null);
                // setFieldName("");
                setSerialNumber("");
                setSelectedDisplayType("");
                setDisabled(false);
                // setSelectedFieldType("");
                // setIsRequired(false);
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
              <th className="p-2 text-left">Page</th>
              <th className="p-2 text-left">View/Entry</th>
              <th className="p-2 text-left">iTier</th>

              <th className="p-2 text-left">Sub Page</th>
              <th className="p-2 text-left">SS Page</th>
              <th className="p-2 text-left">SSS Page</th>
              {/* <th className="p-2 text-left">SI</th> */}

              <th className="p-2 text-left">FG</th>
              <th className="p-2 text-left">fTier</th>
              <th className="p-2 text-left">Display</th>
              {/* <th className="p-2 text-left">Remarks</th> */}
              {/* <th className="p-2 text-left">Required</th> */}
              {/* <th className="p-2 text-left">Hide</th> */}
              {/* <th className="p-2 text-left">Data Type</th> */}
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItemsdata.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-2">
                  {f.moduleName || "—"}
                </td>
                <td className="p-2">{f.appName || "—"}</td>
                <td className="p-2">{f.menuTitle || "—"}</td>
                <td className="p-2">{f.itemName || "—"}</td>
                <td className="p-2">{f.itier || "—"}</td>
                <td className="p-2">{f.itier || "—"}</td>

                <td className="p-2">{f.subItemName || "—"}</td>
                <td className="p-2">{f.subSubItemName || "—"}</td>
                <td className="p-2">{f.subsubsubItemName || "—"}</td>
                {/* <td className="p-2">{f.serialNumber || "—"}</td> */}

                <td className="p-2">{f.fieldGroupCode || "—"}</td>
                <td className="p-2">{f.tier || "—"}</td>

                <td className="p-2">{f.dpgroupDisplayType}</td>

                {/* <td className="p-2">{f.remarks || "-"}</td> */}
                {/* <td className="p-2">{f.isRequired ? "Yes" : "No"}</td> */}
                {/* <td className="p-2">{f.isHide ? "Yes" : "No"}</td> */}
                {/* <td className="p-2">{f.dataType}</td> */}

                <td className="px-4 py-3 flex gap-3">
                  <button
                    onClick={() => {
                      setEditFieldId(f.id || "");
                      // setFieldName(f.name);
                     // setSelectedDisplayType(f.displayType);
                      // setSelectedFieldType(f.dataType);
                      // setIsRequired(f.isRequired);
                     // setSerialNumber(f.serialNumber || "");

                      // Pre-select the hierarchy for edit
                      setSelectedModule(f.moduleid || "");
                      setSelectedApp(f.appid || "");
                      setSelectedMenu(f.menuid || "");
                      setSelectedItem(f.itemId || "");
                      setFieldGroupCode(f.dpGroupId || "");
                      setSelectedSubItem(f.subitemid || "");
                      setSelectedSubSubItem(f.subsubitemid || "");
                      setSelectedSubSubSubItem(f.subsubsubitemid || "");
                      setDisabled(true);

                    }}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => handleDeleteField(f?.id)}
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

const Dropdown = ({
  label,
  value,
  disabled,
  options,
  onChange,
}: {
  label: string;
  value: string;
  disabled?: boolean;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) => (
  <div className="">
    <label className="block font-medium text-gray-700">{label}</label>
    <select
      value={value}
      disabled={disabled}
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
export default PageFGMap;
