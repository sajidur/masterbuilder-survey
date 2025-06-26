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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./user.entity/user.entity");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const user_role_1 = require("./user.entity/user.role");
let UserService = class UserService {
    userRepository;
    roleRepository;
    jwtService;
    constructor(userRepository, roleRepository, jwtService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.jwtService = jwtService;
    }
    findAll() {
        return this.userRepository.find();
    }
    async login(loginDto) {
        let user = await this.userRepository.findOneBy({ username: loginDto.username });
        if (!user) {
            user = await this.userRepository.findOneBy({ email: loginDto.username });
        }
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const passwordValid = await bcrypt.compare(loginDto.password, user.password);
        if (!passwordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const role = await this.roleRepository.findOneBy({ userId: user.id });
        const payload = {
            sub: user.id,
            username: user.username,
            email: user.email,
            role: role?.name || 'user',
        };
        const token = this.jwtService.sign(payload);
        return {
            user: user,
            role: role,
            token: token,
        };
    }
    async create(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = this.userRepository.create({
            username: dto.username,
            email: dto.email,
            password: hashedPassword,
        });
        const savedUser = await this.userRepository.save(user);
        const role = this.roleRepository.create({
            name: dto.userRole,
            userId: savedUser.id,
        });
        const savedRole = await this.roleRepository.save(role);
        return { user: savedUser, role: savedRole };
    }
    async remove(id) {
        await this.userRepository.delete(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(1, (0, typeorm_1.InjectRepository)(user_role_1.Role)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map