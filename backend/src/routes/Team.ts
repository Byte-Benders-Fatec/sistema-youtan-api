import { Router } from "express";
import { ITeamController } from "../interfaces/Team";

class TeamRouter {
  path: string = "/teams";
  teamController: ITeamController;

  constructor(teamController: ITeamController) {
    this.teamController = teamController;
  }

  getRouter(): Router {
    const router: Router = Router();

    router
      .route(`${this.path}`)
      .post(this.teamController.add)
      .get(this.teamController.getMany);

    router
      .route(`${this.path}/:id`)
      .get(this.teamController.getById)
      .put(this.teamController.updateById)
      .delete(this.teamController.deleteById)

    return router;
    
  }
}

export default TeamRouter;