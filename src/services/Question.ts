import { DeleteResult } from "typeorm";
import { IQuestionRepository, IQuestionService } from "../interfaces/Question";
import { validationsUtils } from "../utils/Validation";
import Question from "../models/Questions";

class QuestionService implements IQuestionService{
    questionRepository: IQuestionRepository

    constructor(questionRepository: IQuestionRepository) {
        this.questionRepository = questionRepository;
    };

    async add(question: Question): Promise<Question> {
        await validationsUtils.validateObject(question, Question);
        question = await this.questionRepository.add(question);


        return question;
    };

    async getMany(skip: number=0, take: number=10, page: number=1): Promise<[Question[], Number]> {
        const [questions, total] = await this.questionRepository.getMany(skip, take, page);

        return [questions, total];
    };

    async getByTitle(title: string): Promise<Question[]> {
        const question = await this.questionRepository.getByTitle(title);

        return question;
    };

    async getById(id: number): Promise<Question> {
        const question = await this.questionRepository.getById(id);

        return question;
    };

    async getByType(type: string): Promise<Question[]> {
        const question = await this.questionRepository.getByType(type);

        return question;
    };

    async getTypes(): Promise<string[]> {
        const types = await this.questionRepository.getTypes();

        return types;
    };

    async updateById(question: Question, newQuestionData: Question): Promise<Question> {
        question.title = newQuestionData.title ? newQuestionData.title : question.title;
        question.type = newQuestionData.type ? newQuestionData.type : question.type;
        question.alternatives = newQuestionData.alternatives ? newQuestionData.alternatives : [""];
        question.form = newQuestionData.form ? newQuestionData.form : question.form;


        await validationsUtils.validateObject(question, Question);
        const updatedQuestion = await this.questionRepository.updateById(question);

        return updatedQuestion;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.questionRepository.deleteById(id);

        return deletedRow;
    }
};

export default QuestionService;