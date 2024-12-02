import FormController from "../../controllers/Form";
import ormconfig from "../../ormconfig";
import FormRepository from "../../repositories/Form";
import FormRouter from "../../routes/Form";
import FormService from "../../services/Form";
import Form from '../../models/Form';
import UserRepository from './../../repositories/User';
import User from '../../models/User';
import Answers from "../../models/Answer";
import AnswerRepository from "../../repositories/Answer";
import UserService from "../../services/User";
import AnswerService from "../../services/Answer";

const userRepository = new UserRepository(ormconfig.getRepository(User));
const userService = new UserService(userRepository);

const answerRepository = new AnswerRepository(ormconfig.getRepository(Answers));
const answerService = new AnswerService(answerRepository);

const formRepository = new FormRepository(ormconfig.getRepository(Form));
const formService = new FormService(formRepository, answerService);
const formController = new FormController(formService, userService);
const formRouter = new FormRouter(formController);

export default formRouter.getRouter();