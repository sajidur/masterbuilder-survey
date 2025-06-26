

//   useEffect(() => {
//     const fetchAll = async () => {
//       try {
//         const [mod, app, menu, item, subItem, subSub] = await Promise.all([
//           getAllModules(),
//           getAllApps(),
//           getAllMenus(),
//           getAllItems(),
//           getAllSubitems(),
//           getAllSubSubitems(),
//         ]);
//         setModules(mod);
//         setApps(app);
//         setMenus(menu);
//         setItems(item);
//         setSubItems(subItem);
//         setSubSubItems(subSub);
//       } catch (error) {
//         toast.error("Failed to fetch data.");
//       }
//     };
//     fetchAll();
//   }, []);




import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Module { id: number; name: string; }
interface App { id: number; name: string; Module?: Module; }
interface Menu { id: number; name: string; App?: App; Module?: Module; }
interface Item { id: number; name: string; Menu?: Menu; App?: App; Module?: Module; }
interface SubItem { id: number; name: string; Item?: Item; }
interface SubSubItem { id: number; name: string; SubItem?: SubItem; }
interface SubSubSubItem { id: number; name: string; SubSubItem?: SubSubItem; }
interface Field { id: number; name: string; SubSubSubItem?: SubSubSubItem; }

const fieldGroupOptions = ["tree", "graph", "table", "individual field"];

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
  const [selectedFieldGroup, setSelectedFieldGroup] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const [hiddenDropdownColumns, setHiddenDropdownColumns] = useState({
    module: false,
    app: false,
    menu: false,
    item: false,
    subItem: false,
    subSubItem: false,
    subSubSubItem: false,
    field: false,
  });

  useEffect(() => {
    const demoModules: Module[] = [
      { id: 1, name: "User Management" },
      { id: 2, name: "Inventory" },
    ];
    const demoApps: App[] = [
      { id: 1, name: "Admin Panel", Module: demoModules[0] },
      { id: 2, name: "Warehouse", Module: demoModules[1] },
    ];
    const demoMenus: Menu[] = [
      { id: 1, name: "Users", App: demoApps[0], Module: demoModules[0] },
      { id: 2, name: "Products", App: demoApps[1], Module: demoModules[1] },
    ];
    const demoItems: Item[] = [
      { id: 1, name: "User List", Menu: demoMenus[0], App: demoApps[0], Module: demoModules[0] },
      { id: 2, name: "Product List", Menu: demoMenus[1], App: demoApps[1], Module: demoModules[1] },
    ];
    const demoSubItems: SubItem[] = [
      { id: 1, name: "Basic Info", Item: demoItems[0] },
      { id: 2, name: "Stock Info", Item: demoItems[1] },
    ];
    const demoSubSubItems: SubSubItem[] = [
      { id: 1, name: "Profile", SubItem: demoSubItems[0] },
      { id: 2, name: "Stock Levels", SubItem: demoSubItems[1] },
    ];

    setModules(demoModules);
    setApps(demoApps);
    setMenus(demoMenus);
    setItems(demoItems);
    setSubItems(demoSubItems);
    setSubSubItems(demoSubSubItems);
  }, []);

  useEffect(() => {
    const demoSubSubSubItems: SubSubSubItem[] = subSubItems.flatMap((subSubItem) =>
      Array.from({ length: 2 }, (_, i) => ({
        id: parseInt(`${subSubItem.id}${i + 1}`),
        name: `${subSubItem.name}-Child-${i + 1}`,
        SubSubItem: subSubItem,
      }))
    );

    setSubSubSubItems(demoSubSubSubItems);

    const demoFields: Field[] = demoSubSubSubItems.flatMap((subSubSubItem) =>
      Array.from({ length: 3 }, (_, i) => ({
        id: parseInt(`${subSubSubItem.id}${i + 1}`),
        name: `${subSubSubItem.name}-Field-${i + 1}`,
        SubSubSubItem: subSubSubItem,
      }))
    );

    setFields(demoFields);
  }, [subSubItems]);

  const filteredApps = apps.filter(app => app.Module?.name === selectedModule);
  const filteredMenus = menus.filter(menu => menu.App?.name === selectedApp && menu.Module?.name === selectedModule);
  const filteredItems = items.filter(item => item.Menu?.name === selectedMenu && item.App?.name === selectedApp);
  const filteredSubItems = subItems.filter(si => si.Item?.name === selectedItem);
  const filteredSubSubItems = subSubItems.filter(ssi => ssi.SubItem?.name === selectedSubItem);
  const filteredSubSubSubItems = subSubSubItems.filter(sssi => sssi.SubSubItem?.name === selectedSubSubItem);
  const filteredFields = fields.filter(f => f.SubSubSubItem?.name === selectedSubSubSubItem && (selectedField ? f.name === selectedField : true));



  const renderDropdownWithCheckbox = (
    key: keyof typeof hiddenDropdownColumns,
    label: string,
    value: string,
    options: string[],
    onChange: (val: string) => void
  ) => (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-1 mt-6">
        <input
          type="checkbox"
          checked={hiddenDropdownColumns[key]}
          onChange={() =>
            setHiddenDropdownColumns(prev => ({ ...prev, [key]: !prev[key] }))
          }
        />
        Hide
      </label>
      <Dropdown label={label} value={value} options={options} onChange={onChange} />
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-blue-600">📄</span> Report Manager
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-6">
        {renderDropdownWithCheckbox("module", "Module", selectedModule, modules.map(m => m.name), setSelectedModule)}
        {renderDropdownWithCheckbox("app", "App", selectedApp, filteredApps.map(a => a.name), setSelectedApp)}
        {renderDropdownWithCheckbox("menu", "Menu", selectedMenu, filteredMenus.map(m => m.name), setSelectedMenu)}
        {renderDropdownWithCheckbox("item", "Item", selectedItem, filteredItems.map(i => i.name), setSelectedItem)}
        {renderDropdownWithCheckbox("subItem", "SubItem", selectedSubItem, filteredSubItems.map(s => s.name), setSelectedSubItem)}
        {renderDropdownWithCheckbox("subSubItem", "SubSubItem", selectedSubSubItem, filteredSubSubItems.map(ss => ss.name), setSelectedSubSubItem)}
        {renderDropdownWithCheckbox("subSubSubItem", "SubSubSubItem", selectedSubSubSubItem, filteredSubSubSubItems.map(sss => sss.name), setSelectedSubSubSubItem)}

        <Dropdown label="Field Group" value={selectedFieldGroup} options={fieldGroupOptions} onChange={setSelectedFieldGroup} />
        {renderDropdownWithCheckbox("field", "Field", selectedField, filteredFields.map(sss => sss.name), setSelectedField)}
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Fields List</h3>
        {filteredFields.length === 0 ? (
          <p className="text-gray-500">No fields found.</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {!hiddenDropdownColumns.module && <th className="p-2 text-left">Module</th>}
                {!hiddenDropdownColumns.app && <th className="p-2 text-left">App</th>}
                {!hiddenDropdownColumns.menu && <th className="p-2 text-left">Menu</th>}
                {!hiddenDropdownColumns.item && <th className="p-2 text-left">Item</th>}
                {!hiddenDropdownColumns.subItem && <th className="p-2 text-left">SubItem</th>}
                {!hiddenDropdownColumns.subSubItem && <th className="p-2 text-left">SubSubItem</th>}
                {!hiddenDropdownColumns.subSubSubItem && <th className="p-2 text-left">SubSubSubItem</th>}
                {!hiddenDropdownColumns.field && <th className="p-2 text-left">Field</th>}

              </tr>
            </thead>
            <tbody>
              {filteredFields.map((f) => (
                <tr key={f.id} className="border-t">
                  {!hiddenDropdownColumns.module && <td className="p-2">{selectedModule}</td>}
                  {!hiddenDropdownColumns.app && <td className="p-2">{selectedApp}</td>}
                  {!hiddenDropdownColumns.menu && <td className="p-2">{selectedMenu}</td>}
                  {!hiddenDropdownColumns.item && <td className="p-2">{selectedItem}</td>}
                  {!hiddenDropdownColumns.subItem && <td className="p-2">{selectedSubItem}</td>}
                  {!hiddenDropdownColumns.subSubItem && <td className="p-2">{selectedSubSubItem}</td>}
                  {!hiddenDropdownColumns.subSubSubItem && <td className="p-2">{selectedSubSubSubItem}</td>}
                  {!hiddenDropdownColumns.field && <td className="p-2">{selectedField}</td>}
                  
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
  options: string[];
  onChange: (val: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, value, options, onChange }) => (
  <div className="w-full">
    <label className="block text-sm font-medium mb-1">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border border-gray-300 rounded px-3 py-2"
    >
      <option value="">-- Select {label} --</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default ReportsPage;