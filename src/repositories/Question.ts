import { IQuestionRepository } from "../interfaces/Question";
import { DeleteResult, Repository } from "typeorm";
import Question from "../models/Questions";
import QuestionTypes from "../domain/Question";

class questionRepository implements IQuestionRepository {
    questionRepository: Repository<Question>;

    constructor(questionRepository: Repository<Question>) {
        this.questionRepository = questionRepository;
    };

    async add(question: Question): Promise<Question> {
        question = await this.questionRepository.save(question);
    
        return question;
    };
    
    async getMany(skip: number, take: number, _page: number): Promise<[Question[], number]> {
        const [question, total] = await this.questionRepository.findAndCount({
            relations: {
                form: true
            },
            skip,
            take
        });
        
        return [question, total];
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

    async getTypes(): Promise<string[]> {
        return QuestionTypes;
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
