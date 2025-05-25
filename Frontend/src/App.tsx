import React from 'react';
import { SurveyProvider } from './context/SurveyContext';
import Survey from './components/Survey';
import { ClipboardCheckIcon } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <header className="mb-8">
        <div className="max-w-3xl mx-auto px-4 flex items-center justify-center">
          <div className="bg-white rounded-full p-3 shadow-sm mr-3">
            <ClipboardCheckIcon className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">MUKUT ERP</h1>
        </div>
      </header>
      
      <main>
        <SurveyProvider>
          <Survey />
        </SurveyProvider>
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} WorkspaceIQ • All Rights Reserved
      </footer>
    </div>
  );
}

export default App;