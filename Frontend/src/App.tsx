import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Survey from "./components/Survey";
import { SurveyProvider } from "./context/SurveyContext";
import AdminLayout from "././admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import { ClipboardCheckIcon } from "lucide-react";
import SurveyManagement from "./admin/pages/SurveyManagement";
import ModuleManager from "./admin/pages/ModuleManager";
import AppManager from "./admin/pages/AppManager";
import MenuManager from "./admin/pages/MenuManager";
import ItemManager from "./admin/pages/ItemManager";
import SubItemManager from "./admin/pages/SubItemManager";
import FieldManager from "./admin/pages/FieldManager";
import { ToastContainer } from "react-toastify";
import SurveyBuilder from "./admin/pages/SurveyBuilder";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-gray-100">
      {!isAdminRoute && (
        <header className="mb-8 py-12">
          <div className="max-w-3xl mx-auto px-4 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 shadow-sm mr-3">
              <ClipboardCheckIcon className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">MUKUT ERP</h1>
          </div>
        </header>
      )}

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <SurveyProvider>
                <Survey />
              </SurveyProvider>
            }
          />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="feature-list" element={<SurveyManagement />} />
            <Route path="module-manager" element={<ModuleManager />} />
            <Route path="app-manager" element={<AppManager />} />
            <Route path="menu-manager" element={<MenuManager />} />
            <Route path="item-manager" element={<ItemManager />} />
            <Route path="sub-item-manager" element={<SubItemManager />} />
            <Route path="field-manager" element={<FieldManager />} />
            <Route path="question-manager" element={<SurveyBuilder />} />
          </Route>
        </Routes>
      </main>

      <ToastContainer />

      {!isAdminRoute && (
        <footer className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} WorkspaceIQ • All Rights Reserved
        </footer>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
