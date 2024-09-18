import { IAuthService } from "../interfaces/Auth";
import jwt from "jsonwebtoken";
import { IUserRepository } from "../interfaces/User";
import User from "../models/User";

class AuthService implements IAuthService {
  userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  generateToken(user: User): string {
    return jwt.sign({role: user.role}, process.env.SECRET_KEY, { expiresIn: "24h" });
  }

  getUserByLogin(login: User): Promise<User> {
    return this.userRepository.getByLogin(login);
  }
}

export default AuthService;