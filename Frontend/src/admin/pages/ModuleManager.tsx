import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'modules';

const ModuleManager: React.FC = () => {
  const [value, setValue] = useState('');
  const [modules, setModules] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setModules(JSON.parse(stored));
    }
  }, []);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed && !modules.includes(trimmed)) {
      const updated = [...modules, trimmed];
      setModules(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setValue('');
    }
  };

  const handleDelete = (item: string) => {
    const updated = modules.filter((mod) => mod !== item);
    setModules(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">📦 Manage Modules</h2>
        <p className="text-sm text-gray-500">Create and manage modules for future use in dropdowns or routing.</p>
      </header>

      <div className="flex items-center space-x-3 mb-6">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. Settings, Analytics, Reports..."
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition text-sm"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {modules.length > 0 ? (
        <ul className="space-y-3">
          {modules.map((mod) => (
            <li
              key={mod}
              className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              <span className="text-gray-700 font-medium">{mod}</span>
              <button
                onClick={() => handleDelete(mod)}
                className="text-red-500 hover:text-red-700 transition"
                title="Delete module"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic text-sm">No modules created yet.</p>
      )}
    </section>
  );
};

export default ModuleManager;
