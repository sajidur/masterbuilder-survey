import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2 } from 'lucide-react';

const SUB_SUB_ITEM_STORAGE_KEY = 'subSubItems'; // from SubSubItemManager
const FIELD_STORAGE_KEY = 'fields'; // new: { [subSubItem]: string[] }

type SubSubItemData = {
  [subItem: string]: string[];
};

type FieldData = {
  [subSubItem: string]: string[];
};

const FieldManager: React.FC = () => {
  const [subSubItems, setSubSubItems] = useState<SubSubItemData>({});
  const [fields, setFields] = useState<FieldData>({});
  const [selectedSubSubItem, setSelectedSubSubItem] = useState('');
  const [fieldName, setFieldName] = useState('');

  useEffect(() => {
    const storedSubSubItems = localStorage.getItem(SUB_SUB_ITEM_STORAGE_KEY);
    const storedFields = localStorage.getItem(FIELD_STORAGE_KEY);

    if (storedSubSubItems) {
      try {
        const parsed: SubSubItemData = JSON.parse(storedSubSubItems);
        setSubSubItems(parsed);

        const first = Object.values(parsed)[0]?.[0];
        if (first) setSelectedSubSubItem(first);
      } catch {
        setSubSubItems({});
      }
    }

    if (storedFields) {
      try {
        const parsed = JSON.parse(storedFields);
        if (typeof parsed === 'object' && parsed !== null) {
          const cleaned = Object.fromEntries(
            Object.entries(parsed).map(([key, val]) => [
              key,
              Array.isArray(val) ? val : [],
            ])
          );
          setFields(cleaned);
        }
      } catch {
        setFields({});
      }
    }
  }, []);

  const allSubSubItemsFlat = Object.values(subSubItems).flat();

  const allFieldEntries = Object.entries(fields).flatMap(([subSub, list]) =>
    Array.isArray(list) ? list.map((field) => ({ subSub, field })) : []
  );

  const handleAddField = () => {
    const trimmed = fieldName.trim();
    if (!trimmed || !selectedSubSubItem) return;

    const current = fields[selectedSubSubItem] || [];
    if (!current.includes(trimmed)) {
      const updated = {
        ...fields,
        [selectedSubSubItem]: [...current, trimmed],
      };
      setFields(updated);
      localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(updated));
      setFieldName('');
    }
  };

  const handleDeleteField = (subSub: string, field: string) => {
    const updated = {
      ...fields,
      [subSub]: fields[subSub].filter((f) => f !== field),
    };
    setFields(updated);
    localStorage.setItem(FIELD_STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
      <header className="mb-6">
        <h2 className="text-2xl font-light text-gray-800">🧪 Manage Fields</h2>
        <p className="text-sm text-gray-500">Each field is added under a sub-sub-item.</p>
      </header>

      {/* SubSubItem Dropdown */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Sub-SubItem</label>
        <select
          value={selectedSubSubItem}
          onChange={(e) => setSelectedSubSubItem(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">-- Select a SubSubItem --</option>
          {allSubSubItemsFlat.map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      {/* Input to Add Field */}
      <div className="flex items-center space-x-3 mb-6">
        <input
          value={fieldName}
          onChange={(e) => setFieldName(e.target.value)}
          placeholder="e.g. Label, Placeholder"
          disabled={!selectedSubSubItem}
          className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm disabled:opacity-50"
        />
        <button
          onClick={handleAddField}
          disabled={!selectedSubSubItem || !fieldName.trim()}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50"
        >
          <PlusCircle size={18} />
          Add
        </button>
      </div>

      {/* Table to View Fields */}
      {allFieldEntries.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-600">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-4 py-2">SubSubItem</th>
                <th className="px-4 py-2">Field</th>
                <th className="px-4 py-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {allFieldEntries.map((entry, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{entry.subSub}</td>
                  <td className="px-4 py-2">{entry.field}</td>
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => handleDeleteField(entry.subSub, entry.field)}
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
        <p className="text-gray-500 italic text-sm">No fields added yet.</p>
      )}
    </section>
  );
};

export default FieldManager;
