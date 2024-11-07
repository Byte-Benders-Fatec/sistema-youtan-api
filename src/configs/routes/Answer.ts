import AnswerController from "../../controllers/Answer";
import ormconfig from "../../ormconfig";
import AnswerRepository from "../../repositories/Answer";
import AnswerRouter from "../../routes/Answer";
import AnswerService from "../../services/Answer";
import Answer from '../../models/Answer';

const answerRepository = new AnswerRepository(ormconfig.getRepository(Answer));
const answerService = new AnswerService(answerRepository);
const answerController = new AnswerController(answerService);
const answerRouter = new AnswerRouter(answerController);

export default answerRouter.getRouter();