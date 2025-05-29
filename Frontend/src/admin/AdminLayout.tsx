import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
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
} from 'lucide-react';


const navItems = [
  { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
  { label: 'Feature List', path: '/admin/feature-list', icon: <ClipboardCheck size={18} /> },
  { label: 'Module Manager', path: '/admin/module-manager', icon: <Puzzle size={18} /> },
  { label: 'App Manager', path: '/admin/app-manager', icon: <AppWindow size={18} /> },
  { label: 'Menu Manager', path: '/admin/menu-manager', icon: <List size={18} /> },
  { label: 'Item Manager', path: '/admin/item-manager', icon: <Layers size={18} /> },
  { label: 'Sub-Item Manager', path: '/admin/sub-item-manager', icon: <ListChecks size={18} /> },
  { label: 'Field Manager', path: '/admin/field-manager', icon: <ListTree size={18} /> },
    { label: 'Question Manager', path: '/admin/question-manager', icon: <MessageSquare size={18} /> }, 

];

const AdminLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-800">
      {/* Sidebar */}
      <aside
        className="w-64 bg-white shadow-md border-r border-gray-200 flex flex-col"
        style={{ position: 'sticky', top: 0, height: '100vh' }}
      >
        <div className="p-5 border-b border-gray-100 flex items-center gap-2 font-bold text-xl text-blue-700">
          {/* <MenuIcon className="text-blue-600" /> */}
          {/* Admin Panel */}

          <div className=" flex items-center ">
            <div className="">
              <ClipboardCheckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">MUKUT ERP</h1>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/admin'} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                 ${isActive ? 'bg-blue-50 text-blue-700 font-medium' : 'hover:bg-gray-100 text-gray-700'}`
              }
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 text-xs text-gray-400 border-t border-gray-100">
          © {new Date().getFullYear()} Mukut ERP
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6  overflow-y-auto" style={{ minHeight: '100vh' }}>
        {/* <div className='p-6 bg-gray-50 min-h-[89vh]'> */}
            <Outlet />
        {/* </div> */}
        
      </main>
    </div>
  );
};

export default AdminLayout;
