import { CreateDesignDefinitionDto, DesignDefinitionResponseDto } from './design-definition.dto/design.dto';
import { Request } from 'express';
import { DesignDefinitionService } from './design-definition.service';
export declare class DesignDefinitionController {
    private readonly designDefService;
    constructor(designDefService: DesignDefinitionService);
    uploadProfilePhoto(file: Express.Multer.File, req: Request): Promise<{
        message: string;
        photoUrl: string;
    }>;
    create(dto: CreateDesignDefinitionDto): Promise<DesignDefinitionResponseDto>;
    findAll(): Promise<DesignDefinitionResponseDto[]>;
    findOne(id: string): Promise<DesignDefinitionResponseDto>;
    update(id: string, dto: Partial<CreateDesignDefinitionDto>): Promise<DesignDefinitionResponseDto>;
    remove(id: string): Promise<void>;
}
