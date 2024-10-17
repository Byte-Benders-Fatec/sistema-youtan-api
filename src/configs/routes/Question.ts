import QuestionController from "../../controllers/Question";
import ormconfig from "../../ormconfig";
import QuestionRepository from "../../repositories/Question";
import QuestionRouter from "../../routes/Question";
import QuestionService from "../../services/Question";
import Question from '../../models/Questions';

const questionRepository = new QuestionRepository(ormconfig.getRepository(Question));
const questionService = new QuestionService(questionRepository);
const questionController = new QuestionController(questionService);
const questionRouter = new QuestionRouter(questionController);

export default questionRouter.getRouter();