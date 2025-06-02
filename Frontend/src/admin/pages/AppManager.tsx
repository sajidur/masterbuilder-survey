import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllModules, getAllApps, addApp } from "../../apiRequest/api";

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
    await addApp({ name: trimmedAppName, moduleId: selectedMod.id });
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
    <div className="p-4  mx-auto">
      <h2 className="text-2xl font-light mb-6 text-gray-800 flex items-center gap-2">
        <span className="text-blue-600 text-2xl">📋</span> Survey App Management
      </h2>

      <div className="flex flex-col sm:flex-row sm:items-end gap-4 pb-6 ">
        {/* Dropdown - 33% */}
        <div className="w-full sm:w-1/3">
          <label
            htmlFor="module"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            Select Module
          </label>
          <select
            id="module"
            value={selectedModule}
            onChange={(e) => setSelectedModule(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">-- Select Module --</option>
            {modules.map((mod) => (
              <option key={mod.id} value={mod.name}>
                {mod.name}
              </option>
            ))}
          </select>
        </div>

        {/* Input - 25% */}
        <div className="w-full sm:w-1/4">
          <label
            htmlFor="appName"
            className="block mb-2 text-sm font-semibold text-gray-700"
          >
            App Name
          </label>
          <input
            id="appName"
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            placeholder="Enter app name"
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Button - 8% */}
        <div className="w-full sm:w-[8%]">
          <button
            onClick={handleAddApp}
            className="w-full py-2.5 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            + Add
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Apps List</h3>

        {apps.length === 0 ? (
          <p>No apps available.</p>
        ) : (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border-b border-gray-300 text-left">
                  Module
                </th>
                <th className="p-2 border-b border-gray-300 text-left">App</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app) => (
                <tr key={app.id} className="border-t border-gray-300">
                  <td className="p-2">{app.Module.name}</td>
                  <td className="p-2">{app.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AppManager;
