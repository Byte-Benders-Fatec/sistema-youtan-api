import AnswerController from "../../controllers/Answer";
import ormconfig from "../../ormconfig";
import AnswerRepository from "../../repositories/Answer";
import AnswerRouter from "../../routes/Answer";
import AnswerService from "../../services/Answer";
import Answer from '../../models/Answer';
import Form from '../../models/Form';
import FormRepository from "../../repositories/Form";
import FormService from "../../services/Form";

const formRepository = new FormRepository(ormconfig.getRepository(Form));
const formService = new FormService(formRepository);

const answerRepository = new AnswerRepository(ormconfig.getRepository(Answer));
const answerService = new AnswerService(answerRepository);
const answerController = new AnswerController(answerService, formService);
const answerRouter = new AnswerRouter(answerController);

export default answerRouter.getRouter();