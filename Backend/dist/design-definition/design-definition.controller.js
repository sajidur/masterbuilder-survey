"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDefinitionController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const fs = require("fs");
let DesignDefinitionController = class DesignDefinitionController {
    async uploadProfilePhoto(file, req) {
        if (!file || file.size === 0) {
            throw new common_1.BadRequestException('No file uploaded or file is empty.');
        }
        const protocol = req.headers['x-forwarded-proto'] ||
            (req.secure ? 'https' : 'http');
        const host = req.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;
        const publicUrl = `${baseUrl}/uploads/${file.filename}`;
        return {
            message: 'File uploaded successfully.',
            photoUrl: publicUrl,
        };
    }
};
exports.DesignDefinitionController = DesignDefinitionController;
__decorate([
    (0, common_1.Post)('uploadPhoto'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: (req, file, cb) => {
                const uploadPath = (0, path_1.join)(process.cwd(), 'uploads');
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const fileExt = (0, path_1.extname)(file.originalname).toLowerCase();
                const allowedExtensions = ['.png', '.jpg', '.jpeg', '.ico', '.gif'];
                if (!allowedExtensions.includes(fileExt)) {
                    return cb(new common_1.BadRequestException('Invalid file type. Only .png, .jpg, .jpeg, .ico, .gif files are allowed.'), '');
                }
                const uniqueName = `${(0, uuid_1.v4)()}${fileExt}`;
                cb(null, uniqueName);
            },
        }),
        fileFilter: (req, file, cb) => {
            const fileExt = (0, path_1.extname)(file.originalname).toLowerCase();
            const allowedExtensions = ['.png', '.jpg', '.jpeg', '.ico', '.gif', '.pdf', 'docx'];
            if (allowedExtensions.includes(fileExt)) {
                cb(null, true);
            }
            else {
                cb(new common_1.BadRequestException('Invalid file type. Only .png, .jpg, .jpeg, .ico, .gif files are allowed.'), false);
            }
        },
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "uploadProfilePhoto", null);
exports.DesignDefinitionController = DesignDefinitionController = __decorate([
    (0, swagger_1.ApiTags)('Design Definitions'),
    (0, common_1.Controller)('design-definitions')
], DesignDefinitionController);
//# sourceMappingURL=design-definition.controller.js.map