import { User } from './../user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './question.entity';
import { CreateQuestionDto } from './question.dto';

@Injectable()
export class QuestionService {
  @InjectRepository(Question)
  private readonly repository: Repository<Question>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  public async get(id: number): Promise<Question> {
    return await this.repository.findOne({where: {id}, relations: ['user', 'answers']});
  }
  public async findAll(): Promise<Question[]> {
    return await this.repository.find({relations: ['user', 'answers']})
  }

  public async createQuestion(id: number, body: CreateQuestionDto): Promise<Question> {
    const user = await this.userRepository.findOneBy({id});
    console.log(user, id);
    if (user) {
      const question = this.repository.create(body);
      question.user = user;
       
      return await this.repository.save(question);
    }
    throw new NotFoundException(`No encontramos el usuario ${id}`)
  }
  async updateQuestion(id: number, body: CreateQuestionDto): Promise<Question> { 
    let toUpdate = await this.repository.findOneBy({id}); 

    let updated = Object.assign(toUpdate, body); 

    return this.repository.save(updated); 
  }

  public async deleteQuestion(id: number): Promise<any> {
    return await this.repository.delete({id})
  }
}
