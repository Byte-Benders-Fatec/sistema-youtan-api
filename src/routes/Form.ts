import { Router } from "express";
import { IFormController } from "../interfaces/Form";

class FormRouter {
  path: string = "/Forms";
  FormController: IFormController;

  constructor(FormController: IFormController) {
    this.FormController = FormController;
  }

  getRouter(): Router {
    const router: Router = Router();

    router
      .route(`${this.path}`)
      .post(this.FormController.add)
      .get(this.FormController.getMany);
    
    router
      .route(`${this.path}/category`)

    router
      .route(`${this.path}/:id`)
      .get(this.FormController.getById)
      .put(this.FormController.updateById)
      .delete(this.FormController.deleteById)

    return router;
    
  }
}

export default FormRouter;