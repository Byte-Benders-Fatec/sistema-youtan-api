import { IAnswerRepository } from "../interfaces/Answer";
import Answer from "../models/Answer";
import { DeleteResult, Repository } from "typeorm";

class AnswerRepository implements IAnswerRepository {
    answerRepository: Repository<Answer>;

    constructor(answerRepository: Repository<Answer>) {
        this.answerRepository = answerRepository;
    };

    async add(answer: Answer): Promise<Answer> {
        answer = await this.answerRepository.save(answer);
    
        return answer;
    };
    
    async getMany(skip: number, take: number, _page: number): Promise<[Answer[], number]> {
        const [answers, total] = await this.answerRepository.findAndCount({
            relations: {
                form: true,
                user: true
            },
            skip,
            take
        });
        
        return [answers, total];
    };

    async getById(id: number): Promise<Answer> {
        const answer = await this.answerRepository.findOneBy({
            id
        });
    
        return answer;
    };

    async updateById(newAnswerData: Answer): Promise<Answer> {
        const updatedAnswer = await this.answerRepository.save(newAnswerData);

        return updatedAnswer;
    };

    async deleteById(id: number): Promise<DeleteResult> {
        const deletedRow = await this.answerRepository.delete({
            id
        });

        return deletedRow;
    };
};

export default AnswerRepository;