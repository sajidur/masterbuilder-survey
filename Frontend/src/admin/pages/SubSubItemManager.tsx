import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const SUB_ITEM_STORAGE_KEY = 'subItems';        // { [itemName]: string[] }
const SUB_SUB_ITEM_STORAGE_KEY = 'subSubItems'; // { [subItemName]: string[] }

type SubItemData = {
  [item: string]: string[];
};

type SubSubItemData = {
  [subItem: string]: string[];
};

const SubSubItemManager: React.FC = () => {
  const [subItems, setSubItems] = useState<SubItemData>({});
  const [subSubItems, setSubSubItems] = useState<SubSubItemData>({});
  const [selectedSubItem, setSelectedSubItem] = useState('');
  const [subSubItemName, setSubSubItemName] = useState('');

  useEffect(() => {
    const storedSubItems = localStorage.getItem(SUB_ITEM_STORAGE_KEY);
    const storedSubSubItems = localStorage.getItem(SUB_SUB_ITEM_STORAGE_KEY);

    if (storedSubItems) {
      const parsed: SubItemData = JSON.parse(storedSubItems);
      setSubItems(parsed);

      const firstSubItem = Object.values(parsed)[0]?.[0];
      if (firstSubItem) setSelectedSubItem(firstSubItem);
    }

    if (storedSubSubItems) {
      setSubSubItems(JSON.parse(storedSubSubItems));
    }
  }, []);

  const allSubSubItemEntries = Object.entries(subSubItems).flatMap(([subItem, list]) =>
    list.map((entry) => ({ subItem, subSubItem: entry }))
  );

  const handleAddSubSubItem = () => {
    const trimmed = subSubItemName.trim();
    if (!trimmed || !selectedSubItem) return;

    const list = subSubItems[selectedSubItem] || [];
    if (!list.includes(trimmed)) {
      const updated = {
        ...subSubItems,
        [selectedSubItem]: [...list, trimmed],
      };
      setSubSubItems(updated);
      localStorage.setItem(SUB_SUB_ITEM_STORAGE_KEY, JSON.stringify(updated));
      setSubSubItemName('');
    }
  };

  const handleDeleteSubSubItem = (subItem: string, subSubItem: string) => {
    const updated = {
      ...subSubItems,
      [subItem]: subSubItems[subItem].filter((i) => i !== subSubItem),
    };
    setSubSubItems(updated);
    localStorage.setItem(SUB_SUB_ITEM_STORAGE_KEY, JSON.stringify(updated));
  };

  const allSubItemsFlat = Object.values(subItems).flat();

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">🧩 Manage Sub-Sub-Items</h2>
        <p className="text-sm text-gray-500">Each sub-sub-item belongs to a sub-item.</p>
      </header>

      {/* Sub-Item Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Sub Item</label>
        <select
          value={selectedSubItem}
          onChange={(e) => setSelectedSubItem(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Select a Sub Item --</option>
          {allSubItemsFlat.map((subItem) => (
            <option key={subItem} value={subItem}>
              {subItem}
            </option>
          ))}
        </select>
      </div>

      {/* Sub-Sub-Item Input */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          value={subSubItemName}
          onChange={(e) => setSubSubItemName(e.target.value)}
          placeholder="e.g. Child Item"
          disabled={!selectedSubItem}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleAddSubSubItem}
          disabled={!selectedSubItem || !subSubItemName.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Table Display */}
      {allSubSubItemEntries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Sub Item</th>
                <th className="px-4 py-2">Sub-Sub Item</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allSubSubItemEntries.map(({ subItem, subSubItem }, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{subItem}</td>
                  <td className="px-4 py-2">{subSubItem}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDeleteSubSubItem(subItem, subSubItem)}
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
        <p className="text-gray-500 italic text-sm">No sub-sub-items added yet.</p>
      )}
    </section>
  );
};

export default SubSubItemManager;
