/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import { SurveyConfig } from "../survey-config.entity/survey-config.entity";


export class QuestionGroupDto {

  title: string;

 
  description: string;

  surveyConfig: SurveyConfig;
}

