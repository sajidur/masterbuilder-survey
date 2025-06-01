import { SurveyConfigService } from './survey-config.service';
import { CreateSurveyDto, UpdateSurveyDto } from './survey-config.dto/survey.dto';
import { Survey } from './survey-config.entity/survey.entity';
export declare class SurveyConfigController {
    private readonly surveyService;
    constructor(surveyService: SurveyConfigService);
    create(createSurveyDto: CreateSurveyDto): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: string): Promise<Survey>;
    update(id: string, updateSurveyDto: UpdateSurveyDto): Promise<Survey>;
    remove(id: string): Promise<Survey>;
}
