import FormController from "../../controllers/Form";
import ormconfig from "../../ormconfig";
import FormRepository from "../../repositories/Form";
import FormRouter from "../../routes/Form";
import FormService from "../../services/Form";
import Form from '../../models/Form';

const formRepository = new FormRepository(ormconfig.getRepository(Form));
const formService = new FormService(formRepository);
const formController = new FormController(formService);
const formRouter = new FormRouter(formController);

export default formRouter.getRouter();