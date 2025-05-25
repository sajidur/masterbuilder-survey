import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Survey from "./components/Survey";
import { SurveyProvider } from "./context/SurveyContext";
import AdminLayout from "./admin/AdminLayout";
import Dashboard from "./admin/pages/Dashboard";
import SurveyTable from "./admin/pages/survey/SurveyTable";
import { ClipboardCheckIcon } from "lucide-react";
import SurveyForm from "./admin/pages/survey/SurveyForm";

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
            <Route path="feature-list" element={<SurveyTable />} />
            <Route path="add" element={<SurveyForm />} />
          </Route>
        </Routes>
      </main>

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
