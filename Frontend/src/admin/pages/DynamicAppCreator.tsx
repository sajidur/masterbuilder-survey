import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllItemsBySP,
} from "../../apiRequest/api";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface Module {
  id: string;
  name: string;
  serialNumber: string;
}

interface AppItem {
  id: string;
  name: string;
  Module: Module;
  serialNumber: string;
}

interface Item {
  id: string;
  name: string;
  moduleName: string;
  appName: string;
  menuTitle: string;
  serialNumber: string;
  itemType: string;
  description: string;
}

interface SelectedItem extends Item {
  quantity: number;
}

const DynamicAppCreator: React.FC = () => {
  const [modules, setModules] = useState<Module[]>([]);
  const [apps, setApps] = useState<AppItem[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [selectedModule, setSelectedModule] = useState<string>("");
  const [selectedApp, setSelectedApp] = useState<string>("");
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [appName, setAppName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [modulesData, appsData, itemsData] = await Promise.all([
          getAllModules(),
          getAllApps(),
          getAllItemsBySP(),
        ]);
        setModules(modulesData);
        setApps(appsData);
        setItems(itemsData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        toast.error("Failed to load data.");
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    setSelectedApp("");
  }, [selectedModule]);

  const filteredApps = selectedModule
    ? apps.filter((app) => app.Module?.name === selectedModule)
    : [];

  const filteredItems = items.filter((item) => {
    const matchModule = selectedModule ? item.moduleName === selectedModule : false;
    const matchApp = selectedApp ? item.appName === selectedApp : false;
    const matchSearch = searchTerm
      ? item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.menuTitle.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    return matchModule && matchApp && matchSearch;
  });

  const handleAddItem = (item: Item) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      toast.info("Item already added");
      return;
    }
    setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    toast.success(`${item.name} added to configuration`);
  };

  const handleRemoveItem = (itemId: string) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== itemId));
    toast.success("Item removed from configuration");
  };

  const handleQuantityChange = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    setSelectedItems(
      selectedItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const handleCreateApp = () => {
    if (!appName.trim()) {
      toast.warn("Please enter an app name");
      return;
    }
    if (selectedItems.length === 0) {
      toast.warn("Please select at least one item");
      return;
    }

    const configuration = {
      appName: appName.trim(),
      module: selectedModule,
      app: selectedApp,
      items: selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        menuTitle: item.menuTitle,
        quantity: item.quantity,
        itemType: item.itemType,
      })),
      createdAt: new Date().toISOString(),
    };

    console.log("Dynamic App Configuration:", configuration);
    toast.success("Dynamic app created successfully!");

    setAppName("");
    setSelectedModule("");
    setSelectedApp("");
    setSelectedItems([]);
    setSearchTerm("");
  };

  const handleReset = () => {
    setAppName("");
    setSelectedModule("");
    setSelectedApp("");
    setSelectedItems([]);
    setSearchTerm("");
    toast.info("Form reset");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl p-6 shadow-md">
        <h2 className="text-xl font-light text-gray-800 flex items-center gap-2 mb-6">
          <span className="text-blue-600">
            <Sparkles size={24} />
          </span>
          Dynamic App Creator
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select Module
            </label>
            <select
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedModule ? "border-blue-600 border-2" : "border-gray-300"
              }`}
            >
              <option value="">Choose Module</option>
              {modules.map((mod) => (
                <option key={mod.id} value={mod.name}>
                  {mod.serialNumber} - {mod.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Select App
            </label>
            <select
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
              disabled={!selectedModule}
              className={`w-full border px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                selectedApp ? "border-blue-600 border-2" : "border-gray-300"
              } ${!selectedModule ? "bg-gray-100 cursor-not-allowed" : ""}`}
            >
              <option value="">Choose App</option>
              {filteredApps.map((app) => (
                <option key={app.id} value={app.name}>
                  {app.serialNumber} - {app.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium text-gray-700">
              Dynamic App Name
            </label>
            <input
              type="text"
              value={appName}
              onChange={(e) => setAppName(e.target.value)}
              placeholder="Enter app name"
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {selectedApp && (
          <div className="mb-6">
            <label className="block mb-2 font-medium text-gray-700">
              Search Items
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by item name or menu..."
              className="w-full border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Available Items
          </h3>
          {!selectedModule || !selectedApp ? (
            <p className="text-gray-500 text-center py-8">
              Please select a module and app to view items
            </p>
          ) : filteredItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No items found for selected criteria
            </p>
          ) : (
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        Menu: {item.menuTitle}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Type: {item.itemType} | SN: {item.serialNumber}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-600 mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleAddItem(item)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <CheckCircle2 size={20} className="text-green-600" />
            Selected Items ({selectedItems.length})
          </h3>
          {selectedItems.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No items selected yet
            </p>
          ) : (
            <>
              <div className="space-y-2 max-h-80 overflow-y-auto mb-4">
                {selectedItems.map((item) => (
                  <div
                    key={item.id}
                    className="border border-green-200 bg-green-50 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {item.name}
                        </h4>
                        <p className="text-sm text-gray-600">
                          Menu: {item.menuTitle}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <label className="text-xs text-gray-600">
                            Quantity:
                          </label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id,
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                          />
                        </div>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="ml-4 px-3 py-1 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    Configuration Summary
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">App Name:</span>{" "}
                      {appName || "Not set"}
                    </p>
                    <p>
                      <span className="font-medium">Module:</span>{" "}
                      {selectedModule || "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Base App:</span>{" "}
                      {selectedApp || "Not selected"}
                    </p>
                    <p>
                      <span className="font-medium">Total Items:</span>{" "}
                      {selectedItems.length}
                    </p>
                    <p>
                      <span className="font-medium">Total Quantity:</span>{" "}
                      {selectedItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleCreateApp}
                    className="flex-1 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition-colors"
                  >
                    Create Dynamic App
                  </button>
                  <button
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg shadow hover:bg-gray-600 transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default DynamicAppCreator;
