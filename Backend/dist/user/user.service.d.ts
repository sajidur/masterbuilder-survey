import { Repository } from 'typeorm';
import { User } from './user.entity/user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto/UserDto';
import { JwtService } from '@nestjs/jwt';
import { Role } from './user.entity/user.role';
export declare class UserService {
    private userRepository;
    private roleRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, roleRepository: Repository<Role>, jwtService: JwtService);
    findAll(): Promise<User[]>;
    login(loginDto: LoginUserDto): Promise<any>;
    create(dto: CreateUserDto): Promise<{
        user: User;
        role: Role;
    }>;
    remove(id: number): Promise<void>;
}
