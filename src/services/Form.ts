import { DeleteResult } from "typeorm";
import { IFormRepository, IFormService } from "../interfaces/Form";
import Form from "../models/Form";
import { validationsUtils } from "../utils/Validation";

class FormService implements IFormService{
    FormRepository: IFormRepository

    constructor(FormRepository: IFormRepository) {
        this.FormRepository = FormRepository;
    };

    async add(Form: Form): Promise<Form> {
        await validationsUtils.validateObject(Form, Form);
        Form = await this.FormRepository.add(Form);


        return Form;
    };

    async getMany(): Promise<Form[]> {
        const Forms = await this.FormRepository.getMany();

        return Forms;
    };

    async getByCategory(category: string): Promise<Form[]> {
        const Form = await this.FormRepository.getByCategory(category);

        return Form;
    };

    async getById(id: number): Promise<Form> {
        const Form = await this.FormRepository.getById(id);

        return Form;
    };



    async updateById(Form: Form, newFormData: Form): Promise<Form> {
        Form.category = newFormData.category ? newFormData.category : Form.category;

        await validationsUtils.validateObject(Form, Form);
        const updatedForm = await this.FormRepository.updateById(Form);

        return updatedForm;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.FormRepository.deleteById(id);

        return deletedRow;
    }
};

export default FormService;
