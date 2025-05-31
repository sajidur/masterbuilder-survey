import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const APP_STORAGE_KEY = 'apps'; // stores array of { module, app }
const MENU_STORAGE_KEY = 'menus'; // stores { [appName]: string[] }

type AppEntry = {
  module: string;
  app: string;
};

type MenuData = {
  [app: string]: string[];
};

const MenuManager: React.FC = () => {
  const [apps, setApps] = useState<AppEntry[]>([]);
  const [menus, setMenus] = useState<MenuData>({});
  const [selectedApp, setSelectedApp] = useState('');
  const [menuName, setMenuName] = useState('');

  useEffect(() => {
    const storedApps = localStorage.getItem(APP_STORAGE_KEY);
    const storedMenus = localStorage.getItem(MENU_STORAGE_KEY);

    if (storedApps) {
      const parsedApps = JSON.parse(storedApps);
      setApps(parsedApps);
      setSelectedApp(parsedApps[0]?.app || '');
    }
    if (storedMenus) {
      setMenus(JSON.parse(storedMenus));
    }
  }, []);

  const handleAddMenu = () => {
    const trimmed = menuName.trim();
    if (!trimmed || !selectedApp) return;

    const appMenus = menus[selectedApp] || [];
    if (!appMenus.includes(trimmed)) {
      const updatedMenus = {
        ...menus,
        [selectedApp]: [...appMenus, trimmed],
      };
      setMenus(updatedMenus);
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(updatedMenus));
      setMenuName('');
    }
  };

  const handleDeleteMenu = (app: string, menu: string) => {
    const updated = {
      ...menus,
      [app]: menus[app].filter((m) => m !== menu),
    };
    setMenus(updated);
    localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(updated));
  };

  const allMenuEntries = Object.entries(menus).flatMap(([app, menuList]) =>
    menuList.map((menu) => ({ app, menu }))
  );

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">📋 Manage Menus</h2>
        <p className="text-sm text-gray-500">Each menu belongs to an app. Select an app before adding menus.</p>
      </header>

      {/* App Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select App</label>
        <select
          value={selectedApp}
          onChange={(e) => setSelectedApp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Select an App --</option>
          {apps.map(({ app }) => (
            <option key={app} value={app}>
              {app}
            </option>
          ))}
        </select>
      </div>

      {/* Menu Name Input */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          value={menuName}
          onChange={(e) => setMenuName(e.target.value)}
          placeholder="e.g. Dashboard, Reports"
          disabled={!selectedApp}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleAddMenu}
          disabled={!selectedApp || !menuName.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Table */}
      {allMenuEntries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">App</th>
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allMenuEntries.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{entry.app}</td>
                  <td className="px-4 py-2">{entry.menu}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDeleteMenu(entry.app, entry.menu)}
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
        <p className="text-gray-500 italic text-sm">No menus added yet.</p>
      )}
    </section>
  );
};

export default MenuManager;
