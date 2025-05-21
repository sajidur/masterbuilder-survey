import React from 'react';
import { useSurvey } from '../context/SurveyContext';

const ProgressBar: React.FC = () => {
  const { getCurrentProgress } = useSurvey();
  const progress = getCurrentProgress();

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
        style={{ width: `${progress}%` }}
      ></div>
      <p className="text-xs text-gray-600 mt-1 text-right">{progress}% Complete</p>
    </div>
  );
};

export default ProgressBar;