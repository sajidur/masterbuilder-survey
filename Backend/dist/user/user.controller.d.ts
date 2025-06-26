import { UserService } from './user.service';
import { User } from './user.entity/user.entity';
import { CreateUserDto, LoginUserDto } from './user.dto/UserDto';
import { Role } from './user.entity/user.role';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    login(loginDto: LoginUserDto): Promise<any>;
    create(dto: CreateUserDto): Promise<{
        user: User;
        role: Role;
    }>;
    remove(id: string): Promise<void>;
}
