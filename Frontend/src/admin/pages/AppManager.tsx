import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const STORAGE_KEY = 'apps';

const AppManager: React.FC = () => {
  const [value, setValue] = useState('');
  const [apps, setApps] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApps(JSON.parse(stored));
  }, []);

  const handleAdd = () => {
    const trimmed = value.trim();
    if (trimmed && !apps.includes(trimmed)) {
      const updated = [...apps, trimmed];
      setApps(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      setValue('');
    }
  };

  const handleDelete = (item: string) => {
    const updated = apps.filter((a) => a !== item);
    setApps(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">🧩 Manage Apps</h2>
        <p className="text-sm text-gray-500">Create and manage applications within the system.</p>
      </header>

      <div className="flex items-center space-x-3 mb-6">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="e.g. HR, CRM, Finance"
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {apps.length > 0 ? (
        <ul className="space-y-3">
          {apps.map((app) => (
            <li key={app} className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg hover:bg-gray-100">
              <span className="text-gray-700 font-medium">{app}</span>
              <button onClick={() => handleDelete(app)} className="text-red-500 hover:text-red-700">
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 italic text-sm">No apps added yet.</p>
      )}
    </section>
  );
};

export default AppManager;
