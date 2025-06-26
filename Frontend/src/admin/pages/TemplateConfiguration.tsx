import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Template {
  id: number;
  name: string;
  description: string;
  code: string;
}

const TemplateConfiguration: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');

  const handleAddTemplate = () => {
    if (!name.trim() || !description.trim() || !code.trim()) {
      toast.warn('Please fill all fields');
      return;
    }

    const newTemplate: Template = {
      id: Date.now(),
      name,
      description,
      code,
    };

    setTemplates(prev => [...prev, newTemplate]);

    toast.success('Template added successfully!');

    // Reset form
    setName('');
    setDescription('');
    setCode('');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Template Configuration</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 bg-white p-4 shadow rounded">
        <div>
          <label className="block mb-1 font-medium">Template Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter template name"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter template code"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter description"
            rows={4}
          />
        </div>

        <div className="md:col-span-2 text-right">
          <button
            onClick={handleAddTemplate}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            + Add Template
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white p-4 shadow rounded">
        <h3 className="text-lg font-semibold mb-4">Template List</h3>
        {templates.length === 0 ? (
          <p className="text-gray-500">No templates added yet.</p>
        ) : (
          <table className="w-full border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-left">Template Name</th>
                <th className="p-2 text-left">Code</th>
                <th className="p-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody>
              {templates.map((tpl) => (
                <tr key={tpl.id} className="border-t">
                  <td className="p-2">{tpl.name}</td>
                  <td className="p-2">{tpl.code}</td>
                  <td className="p-2">{tpl.description}</td>
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

export default TemplateConfiguration;
