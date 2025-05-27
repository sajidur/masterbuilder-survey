import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  module: string;
  app: string;
  menu: string;
  item: string;
  subItem: string;
  field: string;
}

// Sample options arrays; replace with API data
const modules = ['Sales', 'Inventory', 'Support', 'Finance'];
const apps = ['CRM', 'Warehouse', 'Helpdesk', 'Accounting'];
const menus: string[] = []; 
const items: string[] = []; 
// const items = ['John Doe', 'Item #223', 'Ticket #556', 'Report #123'];
const subItems = ['SubItem A', 'SubItem B', 'SubItem C', 'SubItem D'];
const fields = ['Field 1', 'Field 2', 'Field 3', 'Field 4'];

const SurveyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    module: '',
    app: '',
    menu: '',
    item: '',
    subItem: '',
    field: '',
  });

  const navigate = useNavigate();

  // Unified change handler for both input and select
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newRow = { id: Date.now(), ...formData };
    // Normally send newRow to server here
    navigate('/admin/feature-list', { state: { newRow } });
  };

  const handleCancel = () => {
    navigate('/admin/feature-list');
  };

  // Helper function to render field: either select or input if options empty
  const renderField = (
    name: keyof FormData,
    options: string[],
    label: string
  ) => {
    const value = formData[name];
    if (options.length === 0) {
      // No options: render input
      return (
        <input
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={`Enter ${label}`}
          className="border border-gray-300 rounded-md px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent transition"
          required
        />
      );
    } else {
      // Options available: render select dropdown
      return (
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2
            focus:outline-none focus:ring-2 focus:ring-blue-500
            focus:border-transparent transition"
          required
        >
          <option value="" disabled>
            Select {label}
          </option>
          {options.map(opt => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      );
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
        Add New Entry
      </h2>

      <form
        onSubmit={e => {
          e.preventDefault();
          handleSubmit();
        }}
        className="space-y-5"
      >
        <div className="flex flex-col">
          <label
            htmlFor="module"
            className="mb-1 font-medium text-gray-700 capitalize"
          >
            Module
          </label>
          {renderField('module', modules, 'Module')}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="app"
            className="mb-1 font-medium text-gray-700 capitalize"
          >
            App
          </label>
          {renderField('app', apps, 'App')}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="menu"
            className="mb-1 font-medium text-gray-700 capitalize"
          >
            Menu
          </label>
          {renderField('menu', menus, 'Menu')}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="item"
            className="mb-1 font-medium text-gray-700 capitalize"
          >
            Item
          </label>
          {renderField('item', items, 'Item')}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="subItem"
            className="mb-1 font-medium text-gray-700 capitalize"
          >
            Sub Item
          </label>
          {renderField('subItem', subItems, 'Sub Item')}
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="field"
            className="mb-1 font-medium text-gray-700 capitalize"
          >
            Field
          </label>
          {renderField('field', fields, 'Field')}
        </div>

        <div className="flex justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={handleCancel}
            className="px-5 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-5 py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyForm;
