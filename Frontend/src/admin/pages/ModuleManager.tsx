import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addModule, getAllModules } from "../../apiRequest/api";

interface Module {
  id: number;
  name: string;
}

const ModuleManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [newModuleName, setNewModuleName] = useState("");

  useEffect(() => {
    fetchModules();
  }, []);

  const fetchModules = async () => {
    try {
      const res = await getAllModules();
      setModules(res);
    } catch (error) {
      console.error("Error fetching modules:", error);
      toast.error("Failed to load modules.");
    }
  };

  const handleAddModule = async () => {
    const trimmedName = newModuleName.trim();

    if (!trimmedName) {
      toast.warn("Please enter a module name.");
      return;
    }

    // Check for duplicate name (case-insensitive)
    const isDuplicate = modules.some(
      (module) => module.name.toLowerCase() === trimmedName.toLowerCase()
    );

    if (isDuplicate) {
      toast.warn("This module name already exists.");
      return;
    }

    try {
      await addModule({ name: trimmedName });
      toast.success("Module added successfully!");
      setNewModuleName("");
      fetchModules(); // refresh module list
    } catch (error) {
      console.error("Failed to add module:", error);
      toast.error("Failed to add module.");
    }
  };

  return (
    <div className="mx-auto px-4 ">
      <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-blue-600 text-2xl">📋</span> Survey Module
        Management
      </h2>

      {/* Add Module Inline */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-xl shadow-sm w-full w-[40%]">
          <input
            type="text"
            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter module name"
            value={newModuleName}
            onChange={(e) => setNewModuleName(e.target.value)}
          />
          <button
            onClick={handleAddModule}
            className="px-6 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
          >
            + Add Module
          </button>
        </div>
      </div>

      {/* Module List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Available Modules
        </h3>
        {modules.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Module Name</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => (
                  <tr
                    key={module.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-800">{module.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600">No modules found.</p>
        )}
      </div>
    </div>
  );
};

export default ModuleManager;
