import { IQuestionRepository } from "../interfaces/Question";
import { DeleteResult, Repository } from "typeorm";
import Question from "../models/Questions";

class questionRepository implements IQuestionRepository {
    questionRepository: Repository<Question>;

    constructor(questionRepository: Repository<Question>) {
        this.questionRepository = questionRepository;
    };

    async add(question: Question): Promise<Question> {
        question = await this.questionRepository.save(question);
    
        return question;
    };
    
    async getMany(): Promise<Question[]> {
        const question = await this.questionRepository.find({
            relations: ['form'],
        });
        
        return question;
    };

    async getByTitle(title: string): Promise<Question[]> {
        const question = await this.questionRepository.findBy({title});
    
        return question;
    };
    

    async getById(id: number): Promise<Question> {
        const question = await this.questionRepository.findOne({
            where: { id },
            relations: ['form'],
        });
    
        return question;
    };

    async getByType(type: string): Promise<Question[]> {
        const question = await this.questionRepository.findBy({type});
    
        return question;
    };


    async updateById(newQuestionData: Question): Promise<Question> {
        const updatedQuestion = await this.questionRepository.save(newQuestionData);

        return updatedQuestion;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.questionRepository.delete({
            id
        });

        return deletedRow;
    };
};

export default questionRepository;
