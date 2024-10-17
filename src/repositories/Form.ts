import { IFormRepository } from "../interfaces/Form";
import { DeleteResult, Repository } from "typeorm";
import Form from "../models/Form";
import FormCategories from "../domain/Form";

class formRepository implements IFormRepository {
    formRepository: Repository<Form>;

    constructor(formRepository: Repository<Form>) {
        this.formRepository = formRepository;
    };

    async add(Form: Form): Promise<Form> {
        Form = await this.formRepository.save(Form);
    
        return Form;
    };
    
    async getMany(): Promise<Form[]> {
        const Form = await this.formRepository.find({
            select: {
                id: true,
                category: true,

            },
        });
        
        return Form;
    };

    async getByCategory(category: string): Promise<Form[]> {
        const Form = await this.formRepository.findBy({category});
    
        return Form;
    };
    

    async getById(id: number): Promise<Form> {
        const Form = await this.formRepository.findOneBy({
            id
        });
    
        return Form;
    };

    async getCategories(): Promise<string[]> {
        return FormCategories;
    };


    async updateById(newFormData: Form): Promise<Form> {
        const updatedForm = await this.formRepository.save(newFormData);

        return updatedForm;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.formRepository.delete({
            id
        });

        return deletedRow;
    };
};

export default formRepository;