import { IFormRepository } from "../interfaces/Form";
import { DeleteResult, Repository } from "typeorm";
import Form from "../models/Form";
import FormCategories from "../domain/Form";

class formRepository implements IFormRepository {
    formRepository: Repository<Form>;

    constructor(formRepository: Repository<Form>) {
        this.formRepository = formRepository;
    };

    async add(form: Form): Promise<Form> {
        form = await this.formRepository.save(form);
    
        return form;
    };
    
    async getMany(): Promise<Form[]> {
        const form = await this.formRepository.find({
            select: {
                id: true,
                category: true,
            },
            relations: ['questions'],
        });
        
        return form;
    };

    async getByCategory(category: string): Promise<Form[]> {
        const form = await this.formRepository.findBy({category});
    
        return form;
    };
    

    async getById(id: number): Promise<Form> {
        const form = await this.formRepository.findOne({
            where: { id },
            relations: ['questions'],
        });
    
        return form;
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