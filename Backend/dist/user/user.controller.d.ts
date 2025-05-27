import { UserService } from './user.service';
import { User } from './user.entity/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(user: Partial<User>): Promise<User>;
    remove(id: string): Promise<void>;
}
