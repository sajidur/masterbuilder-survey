import { SurveyConfig } from './survey-config.entity/survey-config.entity';
import { SurveyConfigService } from './survey-config.service';
import { QuestionGroupDto } from './survey-config.dto/questionGroup.dto';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';
import { Question } from './survey-config.entity/question.entity';
import { Option } from './survey-config.entity/option.entity';
import { QuestionModel } from './survey-config.entity/question-model.entity';
export declare class SurveyConfigController {
    private readonly surveyService;
    constructor(surveyService: SurveyConfigService);
    create(createSurveyDto: SurveyConfig): Promise<SurveyConfig>;
    findAll(): Promise<SurveyConfig[]>;
    findOne(id: string): Promise<SurveyConfig>;
    update(id: string, updateSurveyDto: SurveyConfig): Promise<SurveyConfig>;
    remove(id: string): Promise<void>;
    createquestionGroup(dto: QuestionGroup): Promise<QuestionGroupDto>;
    getAllQuestionGroups(): Promise<QuestionGroupDto[]>;
    getQuestionGroupById(id: string): Promise<QuestionGroupDto>;
    updateQuestionGroup(id: string, dto: QuestionGroup): Promise<QuestionGroupDto>;
    deleteQuestionGroup(id: string): Promise<{
        message: string;
    }>;
    createQuestion(question: Question): Promise<Question>;
    getAllQuestions(): Promise<Question[]>;
    getQuestionById(id: string): Promise<Question>;
    updateQuestion(id: string, updatedQuestion: Question): Promise<Question>;
    deleteQuestion(id: string): Promise<void>;
    createOption(option: Option): Promise<Option>;
    getAllOptions(): Promise<Option[]>;
    getOptionById(id: string): Promise<Option>;
    updateOption(id: string, update: Option): Promise<Option>;
    deleteOption(id: string): Promise<void>;
    createQuestionModel(model: QuestionModel): Promise<QuestionModel>;
    getAllQuestionModel(): Promise<QuestionModel[]>;
    getByIdQuestionModel(id: string): Promise<QuestionModel>;
    updateQuestionModel(id: string, model: QuestionModel): Promise<QuestionModel>;
    deleteQuestionModel(id: string): Promise<void>;
}
