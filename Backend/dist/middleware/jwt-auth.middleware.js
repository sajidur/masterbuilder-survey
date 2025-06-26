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
exports.JwtAuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../user/user.entity/user.entity");
const user_role_1 = require("../user/user.entity/user.role");
let JwtAuthMiddleware = class JwtAuthMiddleware {
    jwtService;
    userRepo;
    roleRepo;
    constructor(jwtService, userRepo, roleRepo) {
        this.jwtService = jwtService;
        this.userRepo = userRepo;
        this.roleRepo = roleRepo;
    }
    async use(req, res, next) {
        const authHeader = req.headers['authorization'];
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new common_1.UnauthorizedException('Missing or invalid Authorization header');
        }
        const token = authHeader.split(' ')[1];
        try {
            const payload = this.jwtService.verify(token);
            const user = await this.userRepo.findOneBy({ id: payload.sub });
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const role = await this.roleRepo.findOneBy({ userId: user.id });
            req['user'] = user;
            req['role'] = role;
            next();
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtAuthMiddleware = JwtAuthMiddleware;
exports.JwtAuthMiddleware = JwtAuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(user_role_1.Role)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], JwtAuthMiddleware);
//# sourceMappingURL=jwt-auth.middleware.js.map