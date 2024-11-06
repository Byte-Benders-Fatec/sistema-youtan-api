import { Router } from "express";
import { IFormController } from "../interfaces/Form";

class FormRouter {
  path: string = "/forms";
  formController: IFormController;

  constructor(formController: IFormController) {
    this.formController = formController;
  }

  getRouter(): Router {
    const router: Router = Router();

    router
      .route(`${this.path}`)
      .post(this.formController.add)
    
    router
      .route(`${this.path}/categories`)
      .get(this.formController.getCategories);

    router
      .route(`${this.path}/:id`)
      .get(this.formController.getById)
      .put(this.formController.updateById)
      .delete(this.formController.deleteById)


    router
      .route(`${this.path}/:take?/:page?`)
      .get(this.formController.getMany);

    return router;
    
  }
}

export default FormRouter;