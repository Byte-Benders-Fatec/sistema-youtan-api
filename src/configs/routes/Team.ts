import TeamController from "../../controllers/Team";
import Team from "../../models/Team";
import ormconfig from "../../ormconfig";
import TeamRepository from "../../repositories/Team";
import TeamRouter from './../../routes/Team';
import TeamService from "../../services/Team";

const teamRepository = new TeamRepository(ormconfig.getRepository(Team));
const teamService = new TeamService(teamRepository);
const teamController = new TeamController(teamService);
const teamRouter = new TeamRouter(teamController);

export default teamRouter.getRouter();