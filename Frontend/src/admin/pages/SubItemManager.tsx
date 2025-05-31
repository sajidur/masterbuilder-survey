import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const ITEM_STORAGE_KEY = 'items'; // from ItemManager
const SUBITEM_STORAGE_KEY = 'subItems'; // new storage for subItems

type ItemData = {
  [menu: string]: string[]; // from ItemManager
};

type SubItemData = {
  [item: string]: string[]; // key: item, value: subItems
};

const SubItemManager: React.FC = () => {
  const [items, setItems] = useState<ItemData>({});
  const [subItems, setSubItems] = useState<SubItemData>({});
  const [selectedItem, setSelectedItem] = useState('');
  const [subItemName, setSubItemName] = useState('');

  useEffect(() => {
    const storedItems = localStorage.getItem(ITEM_STORAGE_KEY);
    const storedSubItems = localStorage.getItem(SUBITEM_STORAGE_KEY);

    if (storedItems) {
      setItems(JSON.parse(storedItems));
    }

    if (storedSubItems) {
      setSubItems(JSON.parse(storedSubItems));
    }
  }, []);

  const allItemsFlat = Object.values(items).flat();

  const allSubItemEntries = Object.entries(subItems).flatMap(([item, subs]) =>
    subs.map((sub) => ({ item, sub }))
  );

  const handleAddSubItem = () => {
    const trimmed = subItemName.trim();
    if (!trimmed || !selectedItem) return;

    const existing = subItems[selectedItem] || [];
    if (!existing.includes(trimmed)) {
      const updated = {
        ...subItems,
        [selectedItem]: [...existing, trimmed],
      };
      setSubItems(updated);
      localStorage.setItem(SUBITEM_STORAGE_KEY, JSON.stringify(updated));
      setSubItemName('');
    }
  };

  const handleDeleteSubItem = (item: string, sub: string) => {
    const updated = {
      ...subItems,
      [item]: subItems[item].filter((s) => s !== sub),
    };
    setSubItems(updated);
    localStorage.setItem(SUBITEM_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">🔹 Manage Sub Items</h2>
        <p className="text-sm text-gray-500">Each sub-item belongs to an item (which was added in Item Manager).</p>
      </header>

      {/* Item Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Item</label>
        <select
          value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Select an Item --</option>
          {allItemsFlat.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* SubItem Name Input */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          value={subItemName}
          onChange={(e) => setSubItemName(e.target.value)}
          placeholder="e.g. Edit, View"
          disabled={!selectedItem}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleAddSubItem}
          disabled={!selectedItem || !subItemName.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Table */}
      {allSubItemEntries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Sub Item</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allSubItemEntries.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{entry.item}</td>
                  <td className="px-4 py-2">{entry.sub}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDeleteSubItem(entry.item, entry.sub)}
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
        <p className="text-gray-500 italic text-sm">No sub-items added yet.</p>
      )}
    </section>
  );
};

export default SubItemManager;
