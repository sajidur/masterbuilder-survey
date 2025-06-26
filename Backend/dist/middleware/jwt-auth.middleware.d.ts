import { NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity/user.entity';
import { Role } from '../user/user.entity/user.role';
export declare class JwtAuthMiddleware implements NestMiddleware {
    private readonly jwtService;
    private readonly userRepo;
    private readonly roleRepo;
    constructor(jwtService: JwtService, userRepo: Repository<User>, roleRepo: Repository<Role>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
