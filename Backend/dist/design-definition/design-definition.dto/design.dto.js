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
    subSubItemId;
    type;
    title;
    content;
    imageUrl;
    notes;
}
exports.CreateDesignDefinitionDto = CreateDesignDefinitionDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'ID of the related SubSubItem',
        example: 42,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateDesignDefinitionDto.prototype, "subSubItemId", void 0);
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
        example: 'User Authentication Flow',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Design content in JSON format',
        example: { nodes: [], edges: [] },
    }),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Object)
], CreateDesignDefinitionDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Public URL of the uploaded image or photo',
        example: 'https://cdn.example.com/images/design123.png',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        description: 'Additional notes or comments for the design',
        example: 'Initial draft version for review',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateDesignDefinitionDto.prototype, "notes", void 0);
class DesignDefinitionResponseDto {
    id;
    subSubItem;
    type;
    title;
    content;
    imageUrl;
    notes;
}
exports.DesignDefinitionResponseDto = DesignDefinitionResponseDto;
//# sourceMappingURL=design.dto.js.map