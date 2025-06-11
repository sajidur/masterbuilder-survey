import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface Document {
  module: string;
  app: string;
  menu: string;
  item: string;
  subItem: string;
  subSubItem: string;
  field: string;
  fileType: string;
  details: string;
  fileUrl: string;
}

const DocumentDetails: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const document: Document | undefined = location.state?.document;

  if (!document) {
    return (
      <div className="p-6 text-red-600 text-center">
        <p>No document data found.</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Document Details</h1>

      <div className="grid grid-cols-2 gap-4 text-gray-800">
        <Detail label="Module" value={document.module} />
        <Detail label="App" value={document.app} />
        <Detail label="Menu" value={document.menu} />
        <Detail label="Item" value={document.item} />
        <Detail label="Sub Item" value={document.subItem} />
        <Detail label="Sub Sub Item" value={document.subSubItem} />
        <Detail label="Field" value={document.field} />
        <Detail label="File Type" value={document.fileType} />
        <div className="col-span-2">
          <Detail label="Details" value={document.details} />
        </div>
        <div className="col-span-2 mt-4">
          <a
            href={document.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            View / Download File
          </a>
        </div>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        Back
      </button>
    </div>
  );
};

const Detail: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <div>
    <span className="font-semibold">{label}:</span> {value || "-"}
  </div>
);

export default DocumentDetails;
