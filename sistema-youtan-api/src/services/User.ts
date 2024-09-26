import { DeleteResult } from "typeorm";
import { IUserRepository, IUserService } from "../interfaces/User";
import User from "../models/User";
import { passwordUtils } from "../utils/Password";
import { validationsUtils } from "../utils/Validation";

class UserService implements IUserService{
    userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    };

    async add(user: User): Promise<User> {
        // user.password = passwordUtils.generatePass();
        await validationsUtils.validateObject(User, user);
        user = await this.userRepository.add(user);

        // emailUtils.sendEmail(user.email, user.password);

        return user;
    };

    async getMany(): Promise<User[]> {
        const users = await this.userRepository.getMany();

        return users;
    };

    async getByEmail(email: string): Promise<User> {
        const user = await this.userRepository.getByEmail(email);

        return user;
    };

    async getByLogin(login: User): Promise<User> {
        const user = await this.userRepository.getByLogin(login);
    
        return user;
    };

    async getById(id: number): Promise<User> {
        const user = await this.userRepository.getById(id);

        return user;
    };

    async getRoles(): Promise<string[]> {
        const roles = await this.userRepository.getRoles();

        return roles;
    };

    async updateById(user: User, newUserData: User): Promise<User> {
        user.email = newUserData.email ? newUserData.email : user.email;
        user.password = newUserData.password ? newUserData.password : user.password;
        user.role = newUserData.role ? newUserData.role : user.role;
        user.team = newUserData.team ? newUserData.team : user.team;

        await validationsUtils.validateObject(User, user);
        const updatedUser = await this.userRepository.updateById(user);

        return updatedUser;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.userRepository.deleteById(id);

        return deletedRow;
    }
};

export default UserService;
