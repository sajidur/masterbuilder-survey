import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Row {
  id: number;
  module: string;
  app: string;
  menu: string;
  item: string;
  subItem: string;
  field: string;
}

const SurveyTable: React.FC = () => {
  const [rows, setRows] = useState<Row[]>(() => {
    // Load saved data from localStorage or start empty
    const saved = localStorage.getItem("surveyRows");
    return saved ? JSON.parse(saved) : [];
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Listen for data passed via navigation state (from form page)
  useEffect(() => {
    if (location.state && (location.state as any).newRow) {
      const newRow: Row = (location.state as any).newRow;
      setRows((prev) => {
        const updated = [...prev, newRow];
        localStorage.setItem("surveyRows", JSON.stringify(updated));
        return updated;
      });
      // Clear navigation state so it doesn't re-add on back/forth
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  const handleDelete = (id: number) => {
    const filtered = rows.filter((row) => row.id !== id);
    setRows(filtered);
    localStorage.setItem("surveyRows", JSON.stringify(filtered));
  };

  return (
    <div className="">
      <h2 className="text-2xl font-light mb-10">Survey Module Management</h2>

      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/admin/add")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add New Entry
        </button>
      </div>

      <div className="overflow-auto bg-white rounded shadow">
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Module</th>
              <th className="border px-4 py-2">App</th>
              <th className="border px-4 py-2">Menu</th>
              <th className="border px-4 py-2">Item</th>
              <th className="border px-4 py-2">Sub-item</th>
              <th className="border px-4 py-2">Field</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row) => (
                <tr key={row.id} className="text-sm">
                  <td className="border px-4 py-2">{row.module}</td>
                  <td className="border px-4 py-2">{row.app}</td>
                  <td className="border px-4 py-2">{row.menu}</td>
                  <td className="border px-4 py-2">{row.item}</td>
                  <td className="border px-4 py-2">{row.subItem}</td>
                  <td className="border px-4 py-2">{row.field}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      onClick={() => handleDelete(row.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyTable;
