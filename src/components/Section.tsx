import React from 'react';
import { SurveySection } from '../types';
import Question from './Question';
import { useSurvey } from '../context/SurveyContext';
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface SectionProps {
  section: SurveySection;
  index: number;
}

const Section: React.FC<SectionProps> = ({ section, index }) => {
  const { 
    nextSection, 
    prevSection, 
    isSectionComplete,
    currentSectionIndex
  } = useSurvey();

  const isCurrentSectionComplete = isSectionComplete(index);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6 animate-fadeIn">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">{section.title}</h2>
        {section.description && (
          <p className="text-gray-600">{section.description}</p>
        )}
      </div>

      <div className="space-y-8">
        {section.questions.map(question => (
          <Question key={question.id} question={question} />
        ))}
      </div>

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <button
          onClick={prevSection}
          disabled={index === 0}
          className={`
            flex items-center px-4 py-2 rounded-lg transition-colors
            ${index === 0 
              ? 'text-gray-400 cursor-not-allowed' 
              : 'text-gray-700 hover:bg-gray-100'}
          `}
        >
          <ArrowLeftIcon size={16} className="mr-2" />
          Previous
        </button>

        <button
          onClick={nextSection}
          disabled={!isCurrentSectionComplete}
          className={`
            flex items-center px-4 py-2 rounded-lg transition-colors
            ${!isCurrentSectionComplete
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'}
          `}
        >
          {currentSectionIndex === section.questions.length - 1 ? 'Submit' : 'Next'}
          <ArrowRightIcon size={16} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Section;