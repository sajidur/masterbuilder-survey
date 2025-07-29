import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

interface ButtonEntry {
  id: number;
  serialNumber: string;
  name: string;
  action: string;
}

const Button: React.FC = () => {
  const [buttons, setButtons] = useState<ButtonEntry[]>([]);
  const [serialNumber, setSerialNumber] = useState("");
  const [buttonName, setButtonName] = useState("");
  const [buttonAction, setButtonAction] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const resetForm = () => {
    setSerialNumber("");
    setButtonName("");
    setButtonAction("");
    setEditId(null);
  };

  const handleAddButton = () => {
    const trimmedName = buttonName.trim();
    const trimmedAction = buttonAction.trim();
    const trimmedSerial = serialNumber.trim();

    if (!trimmedSerial || !trimmedName || !trimmedAction) {
      toast.warn("Please fill all fields.");
      return;
    }

    if (editId !== null) {
      setButtons((prev) =>
        prev.map((btn) =>
          btn.id === editId
            ? {
                ...btn,
                serialNumber: trimmedSerial,
                name: trimmedName,
                action: trimmedAction,
              }
            : btn
        )
      );
      toast.success("Button updated!");
    } else {
      const newEntry: ButtonEntry = {
        id: Date.now(),
        serialNumber: trimmedSerial,
        name: trimmedName,
        action: trimmedAction,
      };
      setButtons((prev) => [...prev, newEntry]);
      toast.success("Button added!");
    }

    resetForm();
  };

  const handleDeleteButton = (id: number) => {
    setButtons((prev) => prev.filter((btn) => btn.id !== id));
    toast.success("Button deleted.");
  };

  return (
    <div className="">
      {/* Form */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-3">
        <h2 className="font-light mb-6 text-gray-800 flex items-center gap-2">
          <span className="text-blue-600">🎛</span> Button Manager
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 pb-4">
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

          {/* Button Name */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Button Name
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter button name"
              value={buttonName}
              onChange={(e) => setButtonName(e.target.value)}
            />
          </div>

          {/* Button Action */}
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Button Action
            </label>
            <input
              type="text"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter button action"
              value={buttonAction}
              onChange={(e) => setButtonAction(e.target.value)}
            />
          </div>

          {/* Buttons */}
          <div className="mt-4 flex gap-4">
            <button
              onClick={handleAddButton}
              className="px-6 py-2 mt-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
            >
              {editId !== null ? "Update" : "+ Add"}
            </button>
            {editId !== null && (
              <button
                onClick={resetForm}
                className="px-6 py-2 mt-3 bg-gray-500 text-white font-medium rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white shadow-md rounded-xl p-4">
        {buttons.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">SI</th>
                  <th className="px-4 py-3 text-left">Button</th>
                  <th className="px-4 py-3 text-left">Button Action</th>
                  <th className="px-4 py-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {buttons.map((btn, index) => (
                  <tr
                    key={btn.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-4 py-3 text-gray-800">
                      {btn.serialNumber}
                    </td>
                    <td className="px-4 py-3 text-gray-800">{btn.name}</td>
                    <td className="px-4 py-3 text-gray-800">{btn.action}</td>
                    <td className="px-4 py-3 flex gap-3">
                      <button
                        onClick={() => {
                          setEditId(btn.id);
                          setSerialNumber(btn.serialNumber);
                          setButtonName(btn.name);
                          setButtonAction(btn.action);
                        }}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteButton(btn.id)}
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
          <p className="text-gray-600">No buttons found.</p>
        )}
      </div>
    </div>
  );
};

export default Button;
