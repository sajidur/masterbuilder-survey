import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllModules, getAllApps, addApp } from "../../apiRequest/api";
import { tiers } from "./data";

interface Module {
  id: number;
  name: string;
}

interface AppItem {
  id: number;
  name: string;
  Module: Module;
}

const AppManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const modulesData = await getAllModules();
        const appsData = await getAllApps();
        setModules(modulesData);
        setApps(appsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data.");
      }
    };

    fetchData();
  }, []);

  const handleAddApp = async () => {
    if (!selectedModule) {
      toast.warn("Please select a module.");
      return;
    }

    const trimmedAppName = appName.trim();
    if (!trimmedAppName) {
      toast.warn("Please enter an app name.");
      return;
    }

    // Get moduleId by matching selected module name
    const selectedMod = modules.find((m) => m.name === selectedModule);
    if (!selectedMod) {
      toast.error("Selected module not found.");
      return;
    }

    try {
      await addApp({ name: trimmedAppName, moduleId: selectedMod.id, tier: selectedTier });
      toast.success("App added successfully!");

      // Optional: update local list (or refetch from server if needed)
      const newApp: AppItem = {
        id: Date.now(), // or get from response if available
        name: trimmedAppName,
        Module: selectedMod,
      };

      setApps((prev) => [...prev, newApp]);
      setAppName("");
    } catch (error) {
      console.error("Failed to add app:", error);
      toast.error("Failed to add app.");
    }
  };

  return (
    <div className=" p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-blue-600 text-2xl">📋</span> Survey App Management
      </h2>

      {/* Add App Form */}
      <div className="bg-white shadow-md rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Add New App
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Module Dropdown */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">-- Select Module --</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.name}>
                  {mod.name}
                </option>
              ))}
            </select>
          </div>

          {/* App Name Input */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              App Name
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Enter app name"
              className="w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <option value="">-- Choose Tier --</option>
              {tiers.map((tier) => (
                <option key={tier.value} value={tier.value}>
                  {tier.label}
                </option>
              ))}
            </select>
          </div>

          
        </div>

        {/* Add Button */}
          <div className="mt-6">
            <button
              onClick={handleAddApp}
              className=" px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              + Add App
            </button>
          </div>
      </div>

      {/* App List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Apps List</h3>

        {apps.length === 0 ? (
          <p className="text-gray-600">No apps available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Module</th>
                  <th className="px-4 py-3 text-left">App Name</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app, index) => (
                  <tr
                    key={app.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {app.Module?.name || "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{app.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AppManager;
