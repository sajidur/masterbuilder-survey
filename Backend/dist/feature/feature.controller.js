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
exports.FeatureController = void 0;
const common_1 = require("@nestjs/common");
const feature_service_1 = require("./feature.service");
const feature_entity_1 = require("./feature.entity/feature.entity");
const swagger_1 = require("@nestjs/swagger");
let FeatureController = class FeatureController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(+id);
    }
    create(feature) {
        return this.service.create(feature);
    }
    remove(id) {
        return this.service.remove(+id);
    }
};
exports.FeatureController = FeatureController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiBody)({ type: feature_entity_1.Feature }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Feature created', type: feature_entity_1.Feature }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FeatureController.prototype, "remove", null);
exports.FeatureController = FeatureController = __decorate([
    (0, swagger_1.ApiTags)('features'),
    (0, common_1.Controller)('feature'),
    __metadata("design:paramtypes", [feature_service_1.FeatureService])
], FeatureController);
//# sourceMappingURL=feature.controller.js.map