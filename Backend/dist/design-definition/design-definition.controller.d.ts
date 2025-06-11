import { Request } from 'express';
export declare class DesignDefinitionController {
    uploadProfilePhoto(file: Express.Multer.File, req: Request): Promise<{
        message: string;
        photoUrl: string;
    }>;
}
