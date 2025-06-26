import { TemplateService } from './template.service';
import { CreateTemplateDto } from '../Template/dtos/template.dto';
export declare class TemplateController {
    private readonly templateService;
    constructor(templateService: TemplateService);
    create(dto: CreateTemplateDto): Promise<import("./entity/template").Template>;
    findAll(): Promise<import("./entity/template").Template[]>;
    findOne(id: string): Promise<import("./entity/template").Template>;
    update(id: string, dto: CreateTemplateDto): Promise<import("./entity/template").Template>;
    remove(id: string): Promise<void>;
}
