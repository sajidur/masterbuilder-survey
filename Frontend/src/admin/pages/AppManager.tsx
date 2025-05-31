import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const MODULE_STORAGE_KEY = 'modules';
const APP_STORAGE_KEY = 'apps';

type AppEntry = {
  module: string;
  app: string;
};

const AppManager: React.FC = () => {
  const [modules, setModules] = useState<string[]>([]);
  const [selectedModule, setSelectedModule] = useState('');
  const [appName, setAppName] = useState('');
  const [apps, setApps] = useState<AppEntry[]>([]);

  // Load modules and apps from localStorage
  useEffect(() => {
    const storedModules = localStorage.getItem(MODULE_STORAGE_KEY);
    const storedApps = localStorage.getItem(APP_STORAGE_KEY);

    if (storedModules) setModules(JSON.parse(storedModules));
    if (storedApps) setApps(JSON.parse(storedApps));
  }, []);

  const handleAddApp = () => {
    const trimmedApp = appName.trim();
    if (!selectedModule || !trimmedApp) return;

    const exists = apps.some(
      (entry) => entry.module === selectedModule && entry.app === trimmedApp
    );
    if (!exists) {
      const updated = [...apps, { module: selectedModule, app: trimmedApp }];
      setApps(updated);
      localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(updated));
      setAppName('');
    }
  };

  const handleDelete = (target: AppEntry) => {
    const updated = apps.filter(
      (entry) => !(entry.module === target.module && entry.app === target.app)
    );
    setApps(updated);
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">🧩 Manage Apps</h2>
        <p className="text-sm text-gray-500">Each app belongs to a module. Select a module before adding apps.</p>
      </header>

      {/* Module Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Module</label>
        <select
          value={selectedModule}
          onChange={(e) => setSelectedModule(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Select a Module --</option>
          {modules.map((module) => (
            <option key={module} value={module}>
              {module}
            </option>
          ))}
        </select>
      </div>

      {/* App Name Input */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          value={appName}
          onChange={(e) => setAppName(e.target.value)}
          placeholder="e.g. HR, CRM, Finance"
          disabled={!selectedModule}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleAddApp}
          disabled={!selectedModule || !appName.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Apps Table */}
      {apps.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Module</th>
                <th className="px-4 py-2">App</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{entry.module}</td>
                  <td className="px-4 py-2">{entry.app}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDelete(entry)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 italic text-sm">No apps added yet.</p>
      )}
    </section>
  );
};

export default AppManager;
