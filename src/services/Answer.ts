import { DeleteResult } from "typeorm";
import { IAnswerRepository, IAnswerService } from "../interfaces/Answer";
import Answer from "../models/Answer";
import { validationsUtils } from "../utils/Validation";

class AnswerService implements IAnswerService{
    answerRepository: IAnswerRepository

    constructor(answerRepository: IAnswerRepository) {
        this.answerRepository = answerRepository;
    };

    async add(answer: Answer): Promise<Answer> {
        await validationsUtils.validateObject(Answer, answer);
        answer = await this.answerRepository.add(answer);

        return answer;
    };

    async getMany(skip: number=0, take: number=10, page: number=1): Promise<[Answer[], Number]> {
        const [answers, total] = await this.answerRepository.getMany(skip, take, page);

        return [answers, total];
    };

    async getById(id: number): Promise<Answer> {
        const answer = await this.answerRepository.getById(id);

        return answer;
    };

    async updateById(answer: Answer, newAnswerData: Answer): Promise<Answer> {
        answer.userAnswers = newAnswerData.userAnswers ? newAnswerData.userAnswers : answer.userAnswers;
        answer.form = newAnswerData.form ? newAnswerData.form : answer.form;
        answer.user = newAnswerData.user ? newAnswerData.user : answer.user;
        answer.userHasAnswered = newAnswerData.userHasAnswered ? newAnswerData.userHasAnswered : answer.userHasAnswered;

        await validationsUtils.validateObject(Answer, answer);
        const updatedAnswer = await this.answerRepository.updateById(answer);

        return updatedAnswer;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.answerRepository.deleteById(id);

        return deletedRow;
    }
};

export default AnswerService;
