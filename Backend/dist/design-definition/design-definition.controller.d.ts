import { DesignDefinitionService } from './design-definition.service';
import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
import { Request } from 'express';
export declare class DesignDefinitionController {
    private readonly designDefService;
    constructor(designDefService: DesignDefinitionService);
    uploadFile(file: Express.Multer.File, req: Request): Promise<{
        imageUrl: string;
    }>;
    create(dto: CreateDesignDefinitionDto): Promise<DesignDefinitionResponseDto>;
    findAll(): Promise<DesignDefinitionResponseDto[]>;
    findOne(id: number): Promise<DesignDefinitionResponseDto>;
    update(id: number, dto: Partial<CreateDesignDefinitionDto>): Promise<DesignDefinitionResponseDto>;
    remove(id: number): Promise<void>;
}
