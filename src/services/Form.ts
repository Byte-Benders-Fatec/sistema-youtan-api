import { DeleteResult } from "typeorm";
import { IFormRepository, IFormService } from "../interfaces/Form";
import { validationsUtils } from "../utils/Validation";
import Form from "../models/Form";
import User from "../models/User";
import { IAnswerService } from "../interfaces/Answer";

class FormService implements IFormService{
    formRepository: IFormRepository
    answerService: IAnswerService

    constructor(formRepository: IFormRepository, answerService: IAnswerService) {
        this.formRepository = formRepository;
        this.answerService = answerService;
    };

    async add(form: Form): Promise<Form> {
        await validationsUtils.validateObject(form, Form);
        form = await this.formRepository.add(form);

        return form;
    };

    async addAnswersForEvaluators(evaluators: User[], evaluatedUsers: User[] | null = null, newForm: Form) {
        const usersToEvaluate = evaluatedUsers ?? [null];
    
        await Promise.all(
            evaluators.flatMap(evaluator => 
                usersToEvaluate.map(user => {
                    if(user){
                        if (user.id !== evaluator.id) {
                            this.answerService.add({
                                userAnswers: "",
                                form: newForm,
                                user: evaluator,
                                userToEvaluate: user
                            })
                        }
                    } else {
                        this.answerService.add({
                            userAnswers: "",
                            form: newForm,
                            user: evaluator,
                            userToEvaluate: null
                        })
                    }
                })   
            )
        );
    };
    

    async getMany(skip: number=0, take: number=10, page: number=1): Promise<[Form[], Number]> {
        const [forms, total] = await this.formRepository.getMany(skip, take, page);

        return [forms, total];
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
        form.name = newFormData.name ? newFormData.name : form.name;
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
