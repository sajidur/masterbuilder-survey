export type OptionType = {
  id: string;
  text: string;
  value: string | number;
};

export type QuestionType = {
  id: string;
  text: string;
  type: 'single' | 'multiple';
  options: OptionType[];
  required: boolean;
  dependsOn?: {
    questionId: string;
    values: (string | number)[];
  };
  subQuestions?: QuestionType[];
};

export type SurveySection = {
  id: string;
  title: string;
  description?: string;
  questions: QuestionType[];
};

export type SurveyConfig = {
  title: string;
  description?: string;
  sections: SurveySection[];
};

export type ResultCategory = {
  id: string;
  title: string;
  description: string;
  conditions: {
    questionId: string;
    values: (string | number)[];
  }[];
  recommendation: string;
};

export type UserAnswer = {
  questionId: string;
  value: (string | number)[];
};

export type SurveyResult = {
  categories: ResultCategory[];
  answers: UserAnswer[];
};