import roles from "../domain/Form";
import { IFormRepository } from "../interfaces/Form";
import Form from "../models/Form";
import { DeleteResult, Repository } from "typeorm";

class FormRepository implements IFormRepository {
    FormRepository: Repository<Form>;

    constructor(FormRepository: Repository<Form>) {
        this.FormRepository = FormRepository;
    };

    async add(Form: Form): Promise<Form> {
        Form = await this.FormRepository.save(Form);
    
        return Form;
    };
    
    async getMany(): Promise<Form[]> {
        const Forms = await this.FormRepository.find({
            select: {
                id: true,
                category: true,

            },
        });
        
        return Forms;
    };

    async getByCategory(category: string): Promise<Form[]> {
        const Form = await this.FormRepository.findBy({category});
    
        return Form;
    };
    

    async getById(id: number): Promise<Form> {
        const Form = await this.FormRepository.findOneBy({
            id
        });
    
        return Form;
    };


    async updateById(newFormData: Form): Promise<Form> {
        const updatedForm = await this.FormRepository.save(newFormData);

        return updatedForm;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.FormRepository.delete({
            id
        });

        return deletedRow;
    };
};

export default FormRepository;