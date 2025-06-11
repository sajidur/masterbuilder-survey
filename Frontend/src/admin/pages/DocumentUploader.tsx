import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getAllModules,
  getAllApps,
  getAllMenus,
  getAllItems,
  getAllSubitems,
  getAllSubSubitems,
  getAllFields,
  uploadDocument,
  getUploadedDocuments,
} from "../../apiRequest/api";

const demoUploadedDocuments = [
  {
    module: "HR",
    app: "Employee Portal",
    menu: "Profile Management",
    item: "Resume Upload",
    subItem: "Document Section",
    subSubItem: "CV",
    field: "CV File",
    fileType: "PDF",
    details: "Updated CV for John Doe",
    fileUrl: "https://example.com/uploads/john-doe-cv.pdf",
  },
  {
    module: "Finance",
    app: "Invoice System",
    menu: "Payments",
    item: "Vendor Invoices",
    subItem: "Monthly Bills",
    subSubItem: "Electricity",
    field: "Invoice File",
    fileType: "XLSX",
    details: "April 2025 electricity bill",
    fileUrl: "https://example.com/uploads/electricity-april.xlsx",
  },
  {
    module: "IT",
    app: "Asset Management",
    menu: "Hardware Inventory",
    item: "Laptops",
    subItem: "Procurement",
    subSubItem: "Warranty Docs",
    field: "Warranty Card",
    fileType: "JPG",
    details: "Lenovo ThinkPad warranty",
    fileUrl: "https://example.com/uploads/warranty-lenovo.jpg",
  },
];


const DocumentUploader: React.FC = () => {
  const [modules, setModules] = useState<any[]>([]);
  const [apps, setApps] = useState<any[]>([]);
  const [menus, setMenus] = useState<any[]>([]);
  const [items, setItems] = useState<any[]>([]);
  const [subItems, setSubItems] = useState<any[]>([]);
  const [subSubItems, setSubSubItems] = useState<any[]>([]);
  const [fields, setFields] = useState<any[]>([]);

  const [selectedModule, setSelectedModule] = useState("");
  const [selectedApp, setSelectedApp] = useState("");
  const [selectedMenu, setSelectedMenu] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedSubItem, setSelectedSubItem] = useState("");
  const [selectedSubSubItem, setSelectedSubSubItem] = useState("");
  const [selectedField, setSelectedField] = useState("");

  const [fileType, setFileType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [details, setDetails] = useState("");
  const [uploadedDocuments, setUploadedDocuments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [mod, app, menu, item, subItem, subSub, field] =
          await Promise.all([
            getAllModules(),
            getAllApps(),
            getAllMenus(),
            getAllItems(),
            getAllSubitems(),
            getAllSubSubitems(),
            getAllFields(),
          ]);

        setModules(mod);
        setApps(app);
        setMenus(menu);
        setItems(item);
        setSubItems(subItem);
        setSubSubItems(subSub);
        setFields(field);

        setUploadedDocuments(demoUploadedDocuments);

      } catch (error) {
        toast.error("Error loading data");
        console.error(error);
      }
    };

    fetchAll();
    fetchUploadedDocuments();
  }, []);

  const fetchUploadedDocuments = async () => {
    try {
      const response = await getUploadedDocuments(); // you must define this in `apiRequest/api`
      setUploadedDocuments(response);
    } catch (error) {
      toast.error("Failed to load uploaded documents.");
      console.error(error);
    }
  };

  const handleUpload = async () => {
    if (
      !selectedModule ||
      !selectedApp ||
      !selectedMenu ||
      !selectedItem ||
      !selectedSubItem ||
      !selectedSubSubItem ||
      !selectedField ||
      !fileType ||
      !file ||
      !details.trim()
    ) {
      toast.warn("Please fill in all fields and select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("module", selectedModule);
    formData.append("app", selectedApp);
    formData.append("menu", selectedMenu);
    formData.append("item", selectedItem);
    formData.append("subItem", selectedSubItem);
    formData.append("subSubItem", selectedSubSubItem);
    formData.append("field", selectedField);
    formData.append("fileType", fileType);
    formData.append("file", file);
    formData.append("details", details);

    try {
      await uploadDocument(formData);
      toast.success("Document uploaded successfully!");
      setFile(null);
      setDetails("");
      setFileType("");

      fetchUploadedDocuments();
    } catch (error) {
      toast.error("Upload failed");
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Document Upload
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left section - dropdowns */}
        <div className="grid grid-cols-1 gap-4">
          <Dropdown
            label="Module"
            value={selectedModule}
            options={modules.map((m) => m.name)}
            onChange={(val) => {
              setSelectedModule(val);
              setSelectedApp("");
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
              setSelectedSubSubItem("");
              setSelectedField("");
            }}
          />

          <Dropdown
            label="App"
            value={selectedApp}
            options={apps
              .filter((a) => a.Module?.name === selectedModule)
              .map((a) => a.name)}
            onChange={(val) => {
              setSelectedApp(val);
              setSelectedMenu("");
              setSelectedItem("");
              setSelectedSubItem("");
              setSelectedSubSubItem("");
              setSelectedField("");
            }}
          />

          <Dropdown
            label="Menu"
            value={selectedMenu}
            options={menus
              .filter(
                (m) =>
                  m.App?.name === selectedApp &&
                  m.Module?.name === selectedModule
              )
              .map((m) => m.name)}
            onChange={(val) => {
              setSelectedMenu(val);
              setSelectedItem("");
              setSelectedSubItem("");
              setSelectedSubSubItem("");
              setSelectedField("");
            }}
          />

          <Dropdown
            label="Item"
            value={selectedItem}
            options={items
              .filter((i) => i.Menu?.name === selectedMenu)
              .map((i) => i.name)}
            onChange={(val) => {
              setSelectedItem(val);
              setSelectedSubItem("");
              setSelectedSubSubItem("");
              setSelectedField("");
            }}
          />

          <Dropdown
            label="SubItem"
            value={selectedSubItem}
            options={subItems
              .filter((s) => s.Item?.name === selectedItem)
              .map((s) => s.name)}
            onChange={(val) => {
              setSelectedSubItem(val);
              setSelectedSubSubItem("");
              setSelectedField("");
            }}
          />

          <Dropdown
            label="SubSubItem"
            value={selectedSubSubItem}
            options={subSubItems
              .filter((s) => s.SubItem?.name === selectedSubItem)
              .map((s) => s.name)}
            onChange={(val) => {
              setSelectedSubSubItem(val);
              setSelectedField("");
            }}
          />

          <Dropdown
            label="Field"
            value={selectedField}
            options={fields
              .filter((f) => f.SubSubItem?.name === selectedSubSubItem)
              .map((f) => f.name)}
            onChange={setSelectedField}
          />
        </div>

        {/* Right section - file input, type and details */}
        <div className="grid grid-cols-1 gap-4">
          <Dropdown
            label="File Type"
            value={fileType}
            options={["PDF", "DOCX", "XLSX", "JPG", "PNG", "TXT"]}
            onChange={setFileType}
          />

          <div>
            <label className="block mb-1 font-medium">Choose File</label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">File Details</label>
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              rows={6}
              placeholder="Describe the file content or purpose"
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            onClick={handleUpload}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Upload Document
          </button>
        </div>
      </div>

      {uploadedDocuments.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Uploaded Documents
          </h3>
          <div className="overflow-auto rounded border">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">Module</th>
                  <th className="px-4 py-2 border">App</th>
                  <th className="px-4 py-2 border">Menu</th>
                  <th className="px-4 py-2 border">Item</th>
                  <th className="px-4 py-2 border">SubItem</th>
                  <th className="px-4 py-2 border">SubSubItem</th>
                  <th className="px-4 py-2 border">Field</th>
                  <th className="px-4 py-2 border">File Type</th>
                  <th className="px-4 py-2 border">Details</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedDocuments.map((doc, idx) => (
                  <tr
                    key={idx}
                    className="text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <td className="px-4 py-2 border">{doc.module}</td>
                    <td className="px-4 py-2 border">{doc.app}</td>
                    <td className="px-4 py-2 border">{doc.menu}</td>
                    <td className="px-4 py-2 border">{doc.item}</td>
                    <td className="px-4 py-2 border">{doc.subItem}</td>
                    <td className="px-4 py-2 border">{doc.subSubItem}</td>
                    <td className="px-4 py-2 border">{doc.field}</td>
                    <td className="px-4 py-2 border">{doc.fileType}</td>
                    <td className="px-4 py-2 border">{doc.details}</td>
                    <td className="px-4 py-2 border">
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

const Dropdown = ({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border px-3 py-2 rounded"
    >
      <option value="">-- Select {label} --</option>
      {options.map((opt, idx) => (
        <option key={idx} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);

export default DocumentUploader;
