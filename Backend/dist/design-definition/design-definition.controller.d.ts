import { CreateDesignDefinitionDto } from './design-definition.dto/design.dto';
import { Request } from 'express';
import { DesignDefinitionService } from './design-definition.service';
import { DesignDefinition } from './design-defination.entity/design-definition.entity';
export declare class DesignDefinitionController {
    private readonly designDefService;
    constructor(designDefService: DesignDefinitionService);
    uploadProfilePhoto(file: Express.Multer.File, req: Request): Promise<{
        message: string;
        photoUrl: string;
    }>;
    create(dto: CreateDesignDefinitionDto, req: Request): Promise<DesignDefinition>;
    findAll(): Promise<DesignDefinition[]>;
    findOne(id: string): Promise<DesignDefinition>;
    update(id: string, dto: CreateDesignDefinitionDto, req: Request): Promise<DesignDefinition>;
    remove(id: string): Promise<void>;
}
