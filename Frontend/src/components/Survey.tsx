import React from 'react';
import { useSurvey } from '../context/SurveyContext';
import { surveyData } from '../data/surveyData';
import Section from './Section';
import ProgressBar from './ProgressBar';
import Results from './Results';

const Survey: React.FC = () => {
  const { currentSectionIndex, isComplete } = useSurvey();

  // Show results when survey is complete
  if (isComplete) {
    return <Results />;
  }

  const currentSection = surveyData.sections[currentSectionIndex];

  return (
    <div className="max-w-3xl mx-auto px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          {surveyData.title}
        </h1>
        {surveyData.description && (
          <p className="text-center text-gray-600 mb-6">{surveyData.description}</p>
        )}
        <ProgressBar />
      </div>

      <Section 
        section={currentSection} 
        index={currentSectionIndex} 
      />
    </div>
  );
};

export default Survey;