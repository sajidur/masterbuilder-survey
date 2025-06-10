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
exports.DesignDefinition = void 0;
const typeorm_1 = require("typeorm");
let DesignDefinition = class DesignDefinition {
    id;
    subSubItemId;
    type;
    title;
    content;
    imageUrl;
    notes;
};
exports.DesignDefinition = DesignDefinition;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], DesignDefinition.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'int' }),
    __metadata("design:type", Number)
], DesignDefinition.prototype, "subSubItemId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'enum',
        enum: ['CLASS', 'ACTION', 'ACTIVITY_DIAGRAM', 'CLASS_DIAGRAM'],
    }),
    __metadata("design:type", String)
], DesignDefinition.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], DesignDefinition.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'json' }),
    __metadata("design:type", Object)
], DesignDefinition.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DesignDefinition.prototype, "imageUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], DesignDefinition.prototype, "notes", void 0);
exports.DesignDefinition = DesignDefinition = __decorate([
    (0, typeorm_1.Entity)("DesignDefinitions")
], DesignDefinition);
//# sourceMappingURL=design-definition.entity.js.map