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
const design_definition_service_1 = require("./design-definition.service");
const swagger_1 = require("@nestjs/swagger");
const design_dto_1 = require("./design-definition.dto/design.dto");
const platform_express_1 = require("@nestjs/platform-express");
const path_1 = require("path");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
let DesignDefinitionController = class DesignDefinitionController {
    designDefService;
    constructor(designDefService) {
        this.designDefService = designDefService;
    }
    async uploadFile(file, req) {
        const protocol = req.headers['x-forwarded-proto'] ||
            (req.secure ? 'https' : 'http');
        const host = req.get('host') || 'localhost:3000';
        const baseUrl = `${protocol}://${host}`;
        const imageUrl = `${baseUrl}/uploads/${file.filename}`;
        return { imageUrl };
    }
    async create(dto) {
        return this.designDefService.create(dto);
    }
    async findAll() {
        return this.designDefService.findAll();
    }
    async findOne(id) {
        return this.designDefService.findOne(id);
    }
    async update(id, dto) {
        return this.designDefService.update(id, dto);
    }
    async remove(id) {
        return this.designDefService.remove(id);
    }
};
exports.DesignDefinitionController = DesignDefinitionController;
__decorate([
    (0, common_1.Post)('upload'),
    (0, swagger_1.ApiOperation)({ summary: 'Upload file and return public URL' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'File uploaded and public URL returned.' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (_, file, cb) => {
                const uniqueName = `${(0, uuid_1.v4)()}${(0, path_1.extname)(file.originalname)}`;
                cb(null, uniqueName);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)("add"),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new Design Definition' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Design Definition created.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [design_dto_1.CreateDesignDefinitionDto]),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("getAll"),
    (0, swagger_1.ApiOperation)({ summary: 'Get all Design Definitions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('get:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a Design Definition by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)('update:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update a Design Definition by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('delete:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a Design Definition by ID' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], DesignDefinitionController.prototype, "remove", null);
exports.DesignDefinitionController = DesignDefinitionController = __decorate([
    (0, swagger_1.ApiTags)('Design Definitions'),
    (0, common_1.Controller)('design-definitions'),
    __metadata("design:paramtypes", [design_definition_service_1.DesignDefinitionService])
], DesignDefinitionController);
//# sourceMappingURL=design-definition.controller.js.map