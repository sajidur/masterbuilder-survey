import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  addApp,
  updateApps,
  deleteApp,
} from "../../apiRequest/api";
import { tiers } from "./data";
import { FaEdit, FaTrash } from "react-icons/fa";

interface Module {
  id: string;
  name: string;
}

interface AppItem {
  id: string;
  name: string;
  Module: Module;
  tier?: string;
  serialNumber: string;
}

const AppManager: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [appName, setAppName] = useState<string>("");
  const [selectedTier, setSelectedTier] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [editAppId, setEditAppId] = useState<string | null>(null);

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

    const selectedMod = modules.find((m) => m.name === selectedModule);
    if (!selectedMod) {
      toast.error("Selected module not found.");
      return;
    }

    const payload = {
      name: trimmedAppName,
      moduleId: selectedMod.id,
      tier: selectedTier,
      serialNumber,
    };

    try {
      if (editAppId) {
        await updateApps(editAppId, payload);
        toast.success("App updated successfully!");
      } else {
        const createdApp = await addApp(payload);
        setApps((prev) => [...prev, createdApp]);
        toast.success("App added successfully!");
      }

      // Reset form
      setAppName("");
      setSelectedModule("");
      setSelectedTier("");
      setSerialNumber("");
      setEditAppId(null);

      const refreshedApps = await getAllApps();
      setApps(refreshedApps);
    } catch (error) {
      console.error("Failed to save app:", error);
      toast.error("Failed to save app.");
    }
  };
  const handleEditApp = (app: AppItem) => {
    setEditAppId(app.id);
    setAppName(app.name);
    setSelectedModule(app.Module.name); // use name to match select option
    setSelectedTier(app.tier || "");
    setSerialNumber(app.serialNumber || "");
  };

  const handleDeleteApp = async (id: string) => {
    try {
      await deleteApp(id);
      toast.success("App deleted successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to delete app.");
    }
  };

  return (
    <div className="px-4">
      {/* Add App Form */}
      <div className="rounded-xl px-6">
        {/* Top Layout: Module Dropdown */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-6">
          {/* Header */}
          <h2 className="font-light text-gray-800 flex items-center gap-2">
            <span className="text-blue-600 ">📱</span> App
          </h2>

          <div className="flex">
            <label className="block mt-2 mr-2 font-medium text-gray-700">
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
        </div>

        {/* App Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6">
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

          {/* App Name */}
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

        {/* Buttons */}
        <div className="my-4 flex items-center gap-4">
          <button
            onClick={handleAddApp}
            className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors"
          >
            {editAppId ? "Update App" : "+ Add App"}
          </button>
          {editAppId && (
            <button
              onClick={() => {
                setEditAppId(null);
                setAppName("");
                setSelectedModule("");
                setSelectedTier("");
                setSerialNumber("");
              }}
              className="px-6 py-2.5 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* App List */}
      <div className="bg-white shadow-md rounded-xl p-6">
        {apps.length === 0 ? (
          <p className="text-gray-600">No apps available.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Module</th>
                  <th className="px-4 py-3 text-left">SI</th>

                  <th className="px-4 py-3 text-left">App</th>
                  <th className="px-4 py-3 text-left">Tier</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((app, index) => (
                  <tr
                    key={app.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {/* {app.Module.serialNumber} -  */}
                      {app.Module?.name || "—"}
                      {/* - {app.Module.tier} */}
                    </td>
                    <td className="px-4 py-3 text-gray-800">
                      {app.serialNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{app.name}</td>
                    <td className="px-4 py-3 text-gray-800">{app.tier}</td>

                    <td className="px-4 py-3 flex gap-3">
                      <button
                        onClick={() => {
                          handleEditApp(app);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteApp(app?.id)}
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
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default AppManager;
