import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const MENU_STORAGE_KEY = 'menus'; // stores { [appName]: string[] }
const ITEM_STORAGE_KEY = 'items'; // stores { [menuName]: string[] }

type MenuData = {
  [app: string]: string[];
};

type ItemData = {
  [menu: string]: string[];
};

const ItemManager: React.FC = () => {
  const [menus, setMenus] = useState<MenuData>({});
  const [items, setItems] = useState<ItemData>({});
  const [selectedMenu, setSelectedMenu] = useState('');
  const [itemName, setItemName] = useState('');

  useEffect(() => {
    const storedMenus = localStorage.getItem(MENU_STORAGE_KEY);
    const storedItems = localStorage.getItem(ITEM_STORAGE_KEY);

    if (storedMenus) {
      const parsedMenus: MenuData = JSON.parse(storedMenus);
      setMenus(parsedMenus);
      const firstMenu = Object.values(parsedMenus)[0]?.[0];
      if (firstMenu) setSelectedMenu(firstMenu);
    }

    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }
  }, []);

  const allItemEntries = Object.entries(items).flatMap(([menu, itemList]) =>
    itemList.map((item) => ({ menu, item }))
  );

  const handleAddItem = () => {
    const trimmed = itemName.trim();
    if (!trimmed || !selectedMenu) return;

    const menuItems = items[selectedMenu] || [];
    if (!menuItems.includes(trimmed)) {
      const updatedItems = {
        ...items,
        [selectedMenu]: [...menuItems, trimmed],
      };
      setItems(updatedItems);
      localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(updatedItems));
      setItemName('');
    }
  };

  const handleDeleteItem = (menu: string, item: string) => {
    const updated = {
      ...items,
      [menu]: items[menu].filter((i) => i !== item),
    };
    setItems(updated);
    localStorage.setItem(ITEM_STORAGE_KEY, JSON.stringify(updated));
  };

  const allMenusFlat = Object.values(menus).flat();

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">🧩 Manage Items</h2>
        <p className="text-sm text-gray-500">Each item belongs to a menu. Select a menu before adding items.</p>
      </header>

      {/* Menu Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Menu</label>
        <select
          value={selectedMenu}
          onChange={(e) => setSelectedMenu(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Select a Menu --</option>
          {allMenusFlat.map((menu) => (
            <option key={menu} value={menu}>
              {menu}
            </option>
          ))}
        </select>
      </div>

      {/* Item Name Input */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. Profile, Settings"
          disabled={!selectedMenu}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleAddItem}
          disabled={!selectedMenu || !itemName.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Table */}
      {allItemEntries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Menu</th>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allItemEntries.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{entry.menu}</td>
                  <td className="px-4 py-2">{entry.item}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDeleteItem(entry.menu, entry.item)}
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
        <p className="text-gray-500 italic text-sm">No items added yet.</p>
      )}
    </section>
  );
};

export default ItemManager;
