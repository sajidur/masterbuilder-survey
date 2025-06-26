import { SurveyConfigService } from './survey-config.service';
import { CreateSurveyDto } from './survey-config.dto/survey.dto';
import { Survey } from './survey-config.entity/survey.entity';
import { CreateAnswerDto, UpdateAnswerDto } from './survey-config.dto/create-answer.dto';
import { Answer } from './survey-config.entity/answer.entity';
import { SubSubItemAnswerResponseDto, CreateSubSubItemAnswerDto } from './survey-config.dto/CreateSubSubItemAnswer.dto';
export declare class SurveyConfigController {
    private readonly surveyService;
    constructor(surveyService: SurveyConfigService);
    create(createSurveyDto: CreateSurveyDto, req: Request): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: string): Promise<Survey>;
    update(id: string, updateSurveyDto: CreateSurveyDto, req: Request): Promise<Survey>;
    remove(id: string): Promise<Survey>;
    createAnswer(createAnswerDto: CreateAnswerDto, req: Request): Promise<Answer>;
    findOneAnswer(id: string): Promise<Answer>;
    updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto, req: Request): Promise<Answer>;
    removeAnswer(id: string): Promise<void>;
    createSubAns(dto: CreateSubSubItemAnswerDto, req: Request): Promise<SubSubItemAnswerResponseDto>;
    findAllSubAns(): Promise<SubSubItemAnswerResponseDto[]>;
    findByIdSubAns(id: string): Promise<SubSubItemAnswerResponseDto>;
    deleteSubAns(id: string): Promise<{
        message: string;
    }>;
}
