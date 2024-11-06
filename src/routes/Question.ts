import { Router } from "express";
import { IQuestionController } from "../interfaces/Question";

class QuestionRouter {
  path: string = "/questions";
  questionController: IQuestionController;

  constructor(questionController: IQuestionController) {
    this.questionController = questionController;
  }

  getRouter(): Router {
    const router: Router = Router();

    router
      .route(`${this.path}`)
      .post(this.questionController.add)
      .get(this.questionController.getMany);
    
    router
      .route(`${this.path}/types`)
      .get(this.questionController.getTypes);

    router
      .route(`${this.path}/:id`)
      .get(this.questionController.getById)
      .put(this.questionController.updateById)
      .delete(this.questionController.deleteById)
    
      
    router
      .route(`${this.path}/:take?/:page?`)
      .get(this.questionController.getMany);
    
    
      return router;
    
  }
}

export default QuestionRouter;