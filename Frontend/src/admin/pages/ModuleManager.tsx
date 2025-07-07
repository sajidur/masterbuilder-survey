import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addModule, deleteModule, getAllModules, updateModule } from "../../apiRequest/api";
import { tiers } from "./data";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Module {
  id: number;
  name: string;
  serialNumber: string;
}

const ModuleManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [newModuleName, setNewModuleName] = useState("");
  const [selectedTier, setSelectedTier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [editId, setEditId] = useState<string | null>(null);



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

  const isDuplicate = modules.some(
    (module) =>
      module.name.toLowerCase() === trimmedName.toLowerCase() &&
      module.id.toString() !== editId // allow current edit
  );

  if (isDuplicate) {
    toast.warn("This module name already exists.");
    return;
  }

  const payload = {
    name: trimmedName,
    tier: selectedTier,
    serialNumber,
  };

  try {
    if (editId) {
      await updateModule(editId, payload);
      toast.success("Module updated successfully!");
    } else {
      await addModule(payload);
      toast.success("Module added successfully!");
    }

    // Reset form
    setNewModuleName("");
    setSelectedTier("");
    setSerialNumber("");
    setEditId(null);

    fetchModules();
  } catch (error) {
    console.error("Failed to save module:", error);
    toast.error("Failed to save module.");
  }
};



 const handleDeleteModule = async (id: string) => {
  try {
    await deleteModule(id);
    toast.success("Module deleted successfully!");
    window.location.reload()
  } catch (error) {
    toast.error("Failed to delete module.");
  }
};


  return (
    <div className=" ">
      {/* Add Module Form Card */}
      <div className=" rounded-xl px-4 bg-white mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-6 gap-4 py-6">
          <h2 className=" font-light mb-6 text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 ">📋</span> Survey Module Management
          </h2>

          {/* Serial Number */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Serial Number
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter serial number"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
            />
          </div>

          {/* Module Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Module Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter module name"
              value={newModuleName}
              onChange={(e) => setNewModuleName(e.target.value)}
            />
          </div>

          {/* Tier Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">Tier</label>
            <select
              value={selectedTier}
              onChange={(e) => setSelectedTier(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose Tier</option>
              {tiers.map((tier) => (
                <option key={tier.value} value={tier.value}>
                  {tier.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <button
              onClick={handleAddModule}
              className="px-6 py-2 mt-7 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow"
            >
              {editId ? "Update" : "+ Add"}
            </button>
            {editId !== null && (
              <button
                onClick={() => {
                  setEditId(null);
                  setNewModuleName("");
                  setSerialNumber("");
                  setSelectedTier("");
                }}
                className="ml-4 px-6 py-2 mt-7 bg-gray-400 text-white font-medium rounded-lg hover:bg-gray-500 transition-colors shadow"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Module List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        {modules.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">SI</th>
                  <th className="px-4 py-3 text-left">Module Name</th>
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {modules.map((module, index) => (
                  <tr
                    key={module.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {module.serialNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{module.name}</td>
                    <td className="px-4 py-3 text-gray-800">{module.tier}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditId(module.id.toString());
                          setNewModuleName(module.name);
                          setSerialNumber(module.serialNumber);
                          setSelectedTier(module.tier);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteModule(module.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash />
                      </button>
                    </td>
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
