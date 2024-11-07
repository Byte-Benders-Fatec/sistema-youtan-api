import { Router } from "express";
import { IAnswerController } from "../interfaces/Answer";

class AnswerRouter {
  path: string = "/answers";
  answerController: IAnswerController;

  constructor(answerController: IAnswerController) {
    this.answerController = answerController;
  }

  getRouter(): Router {
    const router: Router = Router();

    router
      .route(`${this.path}`)
      .post(this.answerController.add)

    router
      .route(`${this.path}/:id`)
      .get(this.answerController.getById)
      .put(this.answerController.updateById)
      .delete(this.answerController.deleteById)
    
    router
      .route(`${this.path}/:take?/:page?`)
      .get(this.answerController.getMany);

    return router;
    
  }
}

export default AnswerRouter;