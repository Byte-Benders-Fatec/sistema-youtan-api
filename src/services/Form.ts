import { DeleteResult } from "typeorm";
import { IFormRepository, IFormService } from "../interfaces/Form";
import { validationsUtils } from "../utils/Validation";
import Form from "../models/Form";

class FormService implements IFormService{
    formRepository: IFormRepository

    constructor(formRepository: IFormRepository) {
        this.formRepository = formRepository;
    };

    async add(form: Form): Promise<Form> {
        await validationsUtils.validateObject(form, Form);
        form = await this.formRepository.add(form);


        return form;
    };

    async getMany(): Promise<Form[]> {
        const form = await this.formRepository.getMany();

        return form;
    };

    async getByCategory(category: string): Promise<Form[]> {
        const form = await this.formRepository.getByCategory(category);

        return form;
    };

    async getById(id: number): Promise<Form> {
        const form = await this.formRepository.getById(id);

        return form;
    };

    async getCategories(): Promise<string[]> {
        const categories = await this.formRepository.getCategories();

        return categories;
    };

    async updateById(form: Form, newFormData: Form): Promise<Form> {
        form.category = newFormData.category ? newFormData.category : form.category;

        await validationsUtils.validateObject(form, Form);
        const updatedForm = await this.formRepository.updateById(form);

        return updatedForm;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.formRepository.deleteById(id);

        return deletedRow;
    }
};

export default FormService;
