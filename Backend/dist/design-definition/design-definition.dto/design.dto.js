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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignDefinitionResponseDto = exports.CreateDesignDefinitionDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class CreateDesignDefinitionDto {
    contentTypeId;
    contentTypeName;
    fileType;
    type;
    title;
    content;
    imageUrl;
    notes;
}
exports.CreateDesignDefinitionDto = CreateDesignDefinitionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content type ID as a string UUID',
        example: 'df82427e-4b99-4d6e-b839-8e5e99c2a9c2',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "contentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content type name',
        example: 'Flowchart',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "contentTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'File type or format (e.g., svg, png, json)',
        example: 'json',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the design definition',
        enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
        example: 'CLASS',
    }),
    (0, class_validator_1.IsEnum)(['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM']),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the design',
        example: 'Login Flow Design',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Design content in JSON format',
        type: Object,
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateDesignDefinitionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Public URL of the uploaded image or photo',
        example: 'https://cdn.example.com/uploads/design1.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes or comments for the design',
        example: 'Needs review from the frontend team',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "notes", void 0);
class DesignDefinitionResponseDto {
    id;
    contentTypeId;
    contentTypeName;
    fileType;
    type;
    title;
    content;
    imageUrl;
    notes;
}
exports.DesignDefinitionResponseDto = DesignDefinitionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'UUID of the design definition',
        example: 'a1b2c3d4-5678-90ab-cdef-1234567890ab',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content type ID associated with the design',
        example: 'df82427e-4b99-4d6e-b839-8e5e99c2a9c2',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "contentTypeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Content type name associated with the design',
        example: 'Flowchart',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "contentTypeName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'File type or format of the design',
        example: 'json',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "fileType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Type of the design definition',
        enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
        example: 'CLASS',
    }),
    (0, class_validator_1.IsEnum)(['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM']),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Title of the design',
        example: 'Login Flow Design',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Design content in JSON format',
        example: { nodes: [], edges: [] },
        type: Object,
    }),
    __metadata("design:type", Object)
], DesignDefinitionResponseDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Public URL of the uploaded image or photo',
        example: 'https://cdn.example.com/uploads/design1.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes or comments for the design',
        example: 'Needs review from the frontend team',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], DesignDefinitionResponseDto.prototype, "notes", void 0);
//# sourceMappingURL=design.dto.js.map