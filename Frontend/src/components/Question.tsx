import React from 'react';
import { QuestionType, OptionType } from '../types';
import { useSurvey } from '../context/SurveyContext';
import { CheckIcon } from 'lucide-react';

interface QuestionProps {
  question: QuestionType;
}

const Question: React.FC<QuestionProps> = ({ question }) => {
  const { 
    setAnswer, 
    answers, 
    isQuestionVisible,
    isQuestionAnswered
  } = useSurvey();

  // If the question should not be visible based on dependencies, don't render it
  if (!isQuestionVisible(question)) {
    return null;
  }

  // Get current answer for this question
  const currentAnswer = answers.find(a => a.questionId === question.id);
  const selectedValues = currentAnswer?.value || [];

  // Handle option selection
  const handleOptionSelect = (option: OptionType) => {
    if (question.type === 'single') {
      // For single select, just set the one value
      setAnswer(question.id, [option.value]);
    } else {
      // For multi-select, toggle the value
      const newValues = selectedValues.includes(option.value)
        ? selectedValues.filter(v => v !== option.value)
        : [...selectedValues, option.value];
      
      setAnswer(question.id, newValues);
    }
  };

  // Determine if an option is selected
  const isOptionSelected = (option: OptionType) => {
    return selectedValues.includes(option.value);
  };

  return (
    <div className="mb-8 animate-fadeIn">
      <div className="flex items-start mb-4">
        <h3 className="text-lg font-medium text-gray-800">
          {question.text}
          {question.required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {isQuestionAnswered(question.id) && (
          <span className="ml-2 text-green-500 flex items-center">
            <CheckIcon size={16} />
          </span>
        )}
      </div>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleOptionSelect(option)}
            className={`
              p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
              ${isOptionSelected(option) 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}
            `}
          >
            <div className="flex items-center">
              <div className={`
                w-5 h-5 mr-3 flex-shrink-0 rounded-${question.type === 'single' ? 'full' : 'sm'} border
                ${isOptionSelected(option) 
                  ? 'bg-blue-500 border-blue-500' 
                  : 'border-gray-400'}
                flex items-center justify-center
              `}>
                {isOptionSelected(option) && (
                  <CheckIcon size={14} className="text-white" />
                )}
              </div>
              <span className="text-gray-800">{option.text}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Render sub-questions if there are any */}
      {question.subQuestions && question.subQuestions.map(subQuestion => (
        <div key={subQuestion.id} className="ml-6 mt-6">
          <Question question={subQuestion} />
        </div>
      ))}
    </div>
  );
};

export default Question;