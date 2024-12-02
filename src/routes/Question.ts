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
    
    router
      .route(`${this.path}/types`)
      .get(this.questionController.getTypes);
    
    router
      .route(`${this.path}/categories`)
      .get(this.questionController.getCategories);

    router
      .route(`${this.path}/:formId/:take?/:page?`)
      .get(this.questionController.getByFormId);

    router
      .route(`${this.path}/:id`)
      .get(this.questionController.getById)
      .put(this.questionController.updateById)
      .delete(this.questionController.deleteById)
    
      return router;
    
  }
}

export default QuestionRouter;