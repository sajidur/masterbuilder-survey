import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import { BarChart, CheckCircleIcon, RefreshCwIcon, ArrowRightIcon, ArrowDownIcon } from 'lucide-react';

const Results: React.FC = () => {
  const { result, resetSurvey } = useSurvey();

  if (!result) return null;

  return (
    <div className="max-w-4xl mx-auto animate-fadeIn pb-12">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Your Recommended ERP Features</h2>
            <BarChart size={32} />
          </div>
          <p className="mt-2 opacity-90">Based on your business requirements</p>
        </div>

        <div className="p-6">
          {result.categories.map((category, index) => (
            <div key={category.id} className="relative mb-12 last:mb-0">
              {/* Category Header */}
              <div className="flex items-start">
                <div className="bg-blue-100 rounded-full p-2 mr-4 mt-1">
                  <CheckCircleIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{category.title}</h3>
                  <p className="text-gray-600">{category.description}</p>
                </div>
              </div>

              {/* Connected Flow Sections */}
              <div className="mt-6 ml-8 relative">
                {/* Vertical connector line */}
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-purple-500"></div>

                {/* Requirements Section */}
                <div className="relative pl-8 mb-8">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-blue-500"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <h4 className="font-medium text-gray-800 mb-3">Selected Requirements</h4>
                    <div className="space-y-2">
                      {category.conditions.map((condition, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <ArrowRightIcon size={16} className="text-blue-500 mr-2 flex-shrink-0" />
                          <span className="capitalize">
                            {condition.values.map(v => v.replace(/-/g, ' ')).join(', ')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Solution Details Section */}
                <div className="relative pl-8 mb-8">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-blue-500"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500"></div>
                  <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                    <h4 className="font-medium text-blue-800 mb-2">Solution Details</h4>
                    <p className="text-gray-700">{category.recommendation}</p>
                  </div>
                </div>

                {/* Implementation Path Section */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-purple-500"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-purple-500"></div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                    <h4 className="font-medium text-purple-800 mb-3">Implementation Path</h4>
                    <div className="space-y-4">
                      {['Setup', 'Migration', 'Training', 'Support'].map((phase, i) => (
                        <div key={i} className="flex items-center">
                          <div className="relative">
                            <div className="w-8 h-8 rounded-full bg-purple-200 flex items-center justify-center">
                              <span className="text-purple-800 text-sm font-medium">{i + 1}</span>
                            </div>
                            {i < 3 && (
                              <div className="absolute top-full left-1/2 w-0.5 h-4 bg-purple-200 -translate-x-1/2"></div>
                            )}
                          </div>
                          <div className="ml-3">
                            <h5 className="font-medium text-purple-900">{phase}</h5>
                            <p className="text-sm text-purple-700">
                              {phase === 'Setup' && 'Initial configuration and system setup'}
                              {phase === 'Migration' && 'Data migration and validation'}
                              {phase === 'Training' && 'User training and onboarding'}
                              {phase === 'Support' && 'Ongoing support and maintenance'}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {index < result.categories.length - 1 && (
                <div className="border-b border-gray-200 my-8"></div>
              )}
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <button 
            onClick={resetSurvey}
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            <RefreshCwIcon size={16} className="mr-2" />
            Start Over
          </button>
          
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
            Request Demo
            <ArrowRightIcon size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;