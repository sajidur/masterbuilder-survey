import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardCheck,
  Puzzle,
  AppWindow,
  List,
  Layers,
  ListChecks,
  ListTree,
  ClipboardCheckIcon,
  MessageSquare,
  ListPlus,
  BarChart4,
  Menu as MenuIcon,
  ChevronLeft,
} from "lucide-react";

const navItems = [
  { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
  { label: 'Module', path: '/admin/module', icon: <Puzzle size={18} /> },
  { label: 'App', path: '/admin/app', icon: <AppWindow size={18} /> },
  { label: 'Menu', path: '/admin/menu', icon: <List size={18} /> },
  { label: 'Item', path: '/admin/item', icon: <Layers size={18} /> },
  { label: 'Sub Item', path: '/admin/sub-item', icon: <ListChecks size={18} /> },
  { label: 'SS Item', path: '/admin/sub-sub-item', icon: <ListPlus size={18} /> },
  { label: 'SSS Item', path: '/admin/sub-sub-sub-item', icon: <ListPlus size={18} /> },
  { label: 'DP Group Code', path: '/admin/field', icon: <ListTree size={18} /> },
      {
    label: "DataPoint", 
    path: "/admin/datapoint",
    icon: <ListTree size={18} />,
  },
  { label: 'Document Upload', path: '/admin/document-upload', icon: <ClipboardCheck size={18} /> },
  { label: 'Question', path: '/admin/question', icon: <MessageSquare size={18} /> },
  { label: 'Configuration', path: '/admin/template-configuration', icon: <ClipboardCheckIcon size={18} /> },
  { label: 'Reports', path: '/admin/reports', icon: <BarChart4 size={18} /> },
];

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? "w-52" : "w-16"
        } bg-[#304C7C] text-white shadow-md border-r border-gray-200 flex flex-col transition-all duration-300`}
        style={{ position: "sticky", top: 0, height: "100vh" }}
      >
        <div className="p-5 border-b border-blue-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {sidebarOpen && (
              <>
                <img src="/logo.jpeg" alt="Logo" className="h-6 w-6" />
                <h1 className="text-lg font-bold">MUKUT ERP</h1>
              </>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-white hover:text-gray-300"
          >
            {sidebarOpen ? <ChevronLeft size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center ${
                  sidebarOpen ? "gap-3 px-3 justify-start" : "justify-center"
                } py-2 rounded-lg transition-all text-sm
                ${
                  isActive
                    ? "bg-white text-[#304C7C] font-semibold"
                    : "hover:bg-[#3f5e8a] text-white"
                }`
              }
            >
              <div className={`${sidebarOpen ? "" : "text-xl"}`}>
                {" "}
                {/* 👈 HERE */}
                {item.icon}
              </div>
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>

        {sidebarOpen && (
          <div className="p-4 text-xs text-gray-300 border-t border-blue-900">
            © {new Date().getFullYear()} Mukut ERP
          </div>
        )}
      </aside>

      {/* Content */}
      <main
        className="flex-1 p-6 overflow-y-auto"
        style={{ minHeight: "100vh" }}
      >
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
