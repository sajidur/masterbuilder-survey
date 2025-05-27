import React, { useState } from "react";

interface Row {
  id: number;
  module: string;
  app: string;
  menu: string;
  item: string;
  subItem: string;
  field: string;
}

// Sample options (replace with API data)
const modules = ['Sales', 'Inventory', 'Support', 'Finance'];
const apps = ['CRM', 'Warehouse', 'Helpdesk', 'Accounting'];
const menus: string[] = [];
const items: string[] = [];
const subItems = ['SubItem A', 'SubItem B', 'SubItem C', 'SubItem D'];
const fields = ['Field 1', 'Field 2', 'Field 3', 'Field 4'];

const SurveyManagement: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(() => {
    const saved = localStorage.getItem("surveyRows");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState<Omit<Row, "id">>({
    module: '',
    app: '',
    menu: '',
    item: '',
    subItem: '',
    field: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRow = { id: Date.now(), ...formData };
    const updatedRows = [...rows, newRow];
    setRows(updatedRows);
    localStorage.setItem("surveyRows", JSON.stringify(updatedRows));
    setFormData({
      module: '',
      app: '',
      menu: '',
      item: '',
      subItem: '',
      field: ''
    });
  };

  const handleDelete = (id: number) => {
    const filtered = rows.filter((row) => row.id !== id);
    setRows(filtered);
    localStorage.setItem("surveyRows", JSON.stringify(filtered));
  };

  const renderField = (
    name: keyof Omit<Row, "id">,
    options: string[],
    label: string
  ) => {
    const value = formData[name];
    if (options.length === 0) {
      return (
        <input
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${label}`}
          className="border border-gray-300 rounded-md px-4 py-2"
          required
        />
      );
    } else {
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2"
          required
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
  };

  return (
    <div className="">
      <h2 className="text-2xl font-light mb-6">Survey Module Management</h2>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="bg-white shadow rounded p-6 mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderField('module', modules, 'Module')}
          {renderField('app', apps, 'App')}
          {renderField('menu', menus, 'Menu')}
          {renderField('item', items, 'Item')}
          {renderField('subItem', subItems, 'Sub Item')}
          {renderField('field', fields, 'Field')}
        </div>
        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </form>

      {/* Table Section */}
      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Module</th>
              <th className="border px-4 py-2">App</th>
              <th className="border px-4 py-2">Menu</th>
              <th className="border px-4 py-2">Item</th>
              <th className="border px-4 py-2">Sub-item</th>
              <th className="border px-4 py-2">Field</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="text-sm">
                  <td className="border px-4 py-2">{row.module}</td>
                  <td className="border px-4 py-2">{row.app}</td>
                  <td className="border px-4 py-2">{row.menu}</td>
                  <td className="border px-4 py-2">{row.item}</td>
                  <td className="border px-4 py-2">{row.subItem}</td>
                  <td className="border px-4 py-2">{row.field}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyManagement;
