import { DeleteResult } from "typeorm";
import { IUserRepository, IUserService } from "../interfaces/User";
import User from "../models/User";
import { validationsUtils } from "../utils/Validation";
import Team from "../models/Team";

class UserService implements IUserService{
    userRepository: IUserRepository

    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository;
    };

    async add(user: User): Promise<User> {
        await validationsUtils.validateObject(User, user);
        user = await this.userRepository.add(user);

        return user;
    };

    async getMany(skip: number=0, take: number=10, page: number=1): Promise<[User[], Number]> {
        const [users, total] = await this.userRepository.getMany(skip, take, page);

        return [users, total];
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

    async getByRoles(roles: string[], team: Team): Promise<User[]> {
        const users = await this.userRepository.getByRoles(roles, team);

        return users;
    };

    async getByTeam(teamId: number): Promise<User[]> {
        const users = await this.userRepository.getByTeam(teamId);

        return users;
    };

    async getRoles(): Promise<string[]> {
        const roles = await this.userRepository.getRoles();

        return roles;
    };

    async updateById(user: User, newUserData: User): Promise<User> {
        user.name = newUserData.name ? newUserData.name : user.name;
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
