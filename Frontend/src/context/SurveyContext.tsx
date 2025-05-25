import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserAnswer, SurveyResult, QuestionType, ResultCategory } from '../types';
import { surveyData, resultCategories } from '../data/surveyData';

type SurveyContextType = {
  currentSectionIndex: number;
  answers: UserAnswer[];
  result: SurveyResult | null;
  isComplete: boolean;
  setAnswer: (questionId: string, value: (string | number)[]) => void;
  nextSection: () => void;
  prevSection: () => void;
  submitSurvey: () => void;
  resetSurvey: () => void;
  isQuestionVisible: (question: QuestionType) => boolean;
  isQuestionAnswered: (questionId: string) => boolean;
  isSectionComplete: (sectionIndex: number) => boolean;
  getCurrentProgress: () => number;
};

const SurveyContext = createContext<SurveyContextType | undefined>(undefined);

export const SurveyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [result, setResult] = useState<SurveyResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  // Set an answer for a question
  const setAnswer = (questionId: string, value: (string | number)[]) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(a => a.questionId === questionId);
      
      if (existingAnswerIndex >= 0) {
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionId, value };
        return newAnswers;
      } else {
        return [...prev, { questionId, value }];
      }
    });
  };

  // Navigate to next section
  const nextSection = () => {
    if (currentSectionIndex < surveyData.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      window.scrollTo(0, 0);
    } else {
      submitSurvey();
    }
  };

  // Navigate to previous section
  const prevSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
      window.scrollTo(0, 0);
    }
  };

  // Check if question should be visible based on dependencies
  const isQuestionVisible = (question: QuestionType): boolean => {
    if (!question.dependsOn) return true;

    const parentAnswer = answers.find(a => a.questionId === question.dependsOn?.questionId);
    if (!parentAnswer) return false;

    return question.dependsOn.values.some(value => 
      parentAnswer.value.includes(value)
    );
  };

  // Check if a question has been answered
  const isQuestionAnswered = (questionId: string): boolean => {
    return answers.some(a => a.questionId === questionId);
  };

  // Check if all required questions in a section are answered
  const isSectionComplete = (sectionIndex: number): boolean => {
    const section = surveyData.sections[sectionIndex];
    
    // Function to check if a question and its visible subquestions are answered
    const isQuestionAndSubsAnswered = (question: QuestionType): boolean => {
      // If question is not visible, it doesn't need to be answered
      if (!isQuestionVisible(question)) return true;
      
      // If question is required and not answered, section is not complete
      if (question.required && !isQuestionAnswered(question.id)) return false;
      
      // Check subquestions if they exist
      if (question.subQuestions && question.subQuestions.length > 0) {
        return question.subQuestions.every(subQ => isQuestionAndSubsAnswered(subQ));
      }
      
      return true;
    };
    
    return section.questions.every(q => isQuestionAndSubsAnswered(q));
  };

  // Calculate current progress percentage
  const getCurrentProgress = (): number => {
    const totalSections = surveyData.sections.length;
    const completedSections = surveyData.sections
      .filter((_, index) => index < currentSectionIndex || isSectionComplete(index))
      .length;
    
    return Math.round((completedSections / totalSections) * 100);
  };

  // Process and determine results based on answers
  const processResults = (): SurveyResult => {
    const matchingCategories = resultCategories.filter(category => {
      return category.conditions.every(condition => {
        const userAnswer = answers.find(a => a.questionId === condition.questionId);
        if (!userAnswer) return false;
        
        return condition.values.some(value => 
          userAnswer.value.includes(value)
        );
      });
    });
    
    return {
      categories: matchingCategories.length > 0 ? matchingCategories : [
        {
          id: "general",
          title: "Custom Workspace Mix",
          description: "Your preferences indicate a unique combination of workspace needs.",
          conditions: [],
          recommendation: "Consider creating a personalized workspace that combines elements from different styles to match your specific needs."
        }
      ],
      answers: answers
    };
  };

  // Submit the survey and calculate results
  const submitSurvey = () => {
    const surveyResult = processResults();
    setResult(surveyResult);
    setIsComplete(true);
  };

  // Reset the survey to initial state
  const resetSurvey = () => {
    setCurrentSectionIndex(0);
    setAnswers([]);
    setResult(null);
    setIsComplete(false);
  };

  return (
    <SurveyContext.Provider value={{
      currentSectionIndex,
      answers,
      result,
      isComplete,
      setAnswer,
      nextSection,
      prevSection,
      submitSurvey,
      resetSurvey,
      isQuestionVisible,
      isQuestionAnswered,
      isSectionComplete,
      getCurrentProgress
    }}>
      {children}
    </SurveyContext.Provider>
  );
};

export const useSurvey = () => {
  const context = useContext(SurveyContext);
  if (context === undefined) {
    throw new Error('useSurvey must be used within a SurveyProvider');
  }
  return context;
};