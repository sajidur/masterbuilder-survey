import { Repository } from 'typeorm/repository/Repository';
import { QuestionGroup } from './survey-config.entity/questionGroup.entity';
import { Question } from './survey-config.entity/question.entity';
import { Option } from './survey-config.entity/option.entity';
import { QuestionModel } from './survey-config.entity/question-model.entity';
import { Survey } from './survey-config.entity/survey.entity';
import { CreateSurveyDto, UpdateSurveyDto } from './survey-config.dto/survey.dto';
export declare class SurveyConfigService {
    private questionGroupRepo;
    private readonly questionRepo;
    private readonly optionRepository;
    private readonly questionModelRepository;
    private surveyRepository;
    constructor(questionGroupRepo: Repository<QuestionGroup>, questionRepo: Repository<Question>, optionRepository: Repository<Option>, questionModelRepository: Repository<QuestionModel>, surveyRepository: Repository<Survey>);
    create(createSurveyDto: CreateSurveyDto): Promise<Survey>;
    findAll(): Promise<Survey[]>;
    findOne(id: number): Promise<Survey>;
    update(id: number, updateSurveyDto: UpdateSurveyDto): Promise<Survey>;
    remove(id: number): Promise<Survey>;
}
