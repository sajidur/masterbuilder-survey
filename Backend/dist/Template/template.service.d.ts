import { Repository } from 'typeorm';
import { Template } from '../Template/entity/template';
import { CreateTemplateDto } from '../Template/dtos/template.dto';
export declare class TemplateService {
    private templateRepo;
    constructor(templateRepo: Repository<Template>);
    create(dto: CreateTemplateDto): Promise<Template>;
    findAll(): Promise<Template[]>;
    findOne(id: string): Promise<Template>;
    update(id: string, dto: CreateTemplateDto): Promise<Template>;
    remove(id: string): Promise<void>;
}
