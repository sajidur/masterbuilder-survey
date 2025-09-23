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
import ModuleManager from "./admin/pages/ModuleManager";
import AppManager from "./admin/pages/AppManager";
import MenuManager from "./admin/pages/MenuManager";
import ItemManager from "./admin/pages/ItemManager";
import PageManager from "./admin/pages/PageManager";
import SubItemManager from "./admin/pages/SubItemManager";
import FieldManager from "./admin/pages/FieldManager";
import { ToastContainer } from "react-toastify";
import SurveyBuilder from "./admin/pages/SurveyBuilder";
import SubSubItemManager from "./admin/pages/SubSubItemManager";
import DocumentUploader from "./admin/pages/DocumentUploader";
import DocumentDetails from "./admin/pages/DocumentDetails";
import SubSubSubItemManager from "./admin/pages/SubSubSubItemManager";
import TemplateConfiguration from "./admin/pages/TemplateConfiguration";
import ReportsPage from "./admin/pages/ReportsPage";
import LoginPage from "./pages/Login";
import DataPointManager from "./admin/pages/DataPointManager";
import RegistrationForm from "./pages/RegistrationForm";
import UserList from "./pages/UserList";
import DPGroupMap from "./admin/pages/PageFGMap";
import DataPointMap from "./admin/pages/DataPointMap";
import Button from "./admin/pages/Button";
import TemplateButtonMap from "./admin/pages/TemplateButtonMap";
import PageFGMap from "./admin/pages/PageFGMap";

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAuthPage = location.pathname === "/login"; // You can add /register here too if needed

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Hide header if login or admin route */}
      {!isAdminRoute && !isAuthPage && (
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

          <Route path="/login" element={<LoginPage />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="module" element={<ModuleManager />} />
            <Route path="app" element={<AppManager />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="page" element={<PageManager />} />
            <Route path="item" element={<ItemManager />} />
            <Route path="sub-item" element={<SubItemManager />} />
            <Route path="sub-sub-item" element={<SubSubItemManager />} />
            <Route path="sub-sub-sub-item" element={<SubSubSubItemManager />} />
            <Route path="field" element={<FieldManager />} />
            <Route path="datapoint" element={<DataPointManager />} />
            <Route path="datapointmap" element={<DataPointMap />} />
            <Route path="button" element={<Button />} />
            <Route path="pagefgmap" element={<PageFGMap />} />
            <Route path="dpbuttonmap" element={<TemplateButtonMap />} />

            <Route path="template-configuration" element={<TemplateConfiguration />} />
            <Route path="question" element={<SurveyBuilder />} />
            <Route path="document-upload" element={<DocumentUploader />} />
            <Route path="document-details" element={<DocumentDetails />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="register" element={<RegistrationForm />} />
            <Route path="user-list" element={<UserList />} />
          </Route>
        </Routes>
      </main>

      <ToastContainer />

      {/* ✅ Hide footer if login or admin route */}
      {!isAdminRoute && !isAuthPage && (
        <footer className="mt-12 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} MukutERP • All Rights Reserved
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
