import { User } from './../user/user.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../question/question.entity';
import { Answer } from './answer.entity';
import { CreateAnswerDto } from './answer.dto';

@Injectable()
export class AnswerService { 
  @InjectRepository(Answer)
  private readonly repository: Repository<Answer>;
  @InjectRepository(User)
  private readonly userRepository: Repository<User>;
  @InjectRepository(Question)
  private readonly questionRepository: Repository<Question>;

  public async get(id: number): Promise<Answer> {
    return await this.repository.findOne({where: {id}, relations: ['user', 'question']});
  }
  public async findAll(): Promise<Answer[]> {
    return await this.repository.find({ relations: ['user', 'question'] })
  }

  public async createAnswer(body: CreateAnswerDto): Promise<Answer> {
    const uid = body.user.id
    const qid = body.question.id
    const user = await this.userRepository.findOneBy({id: uid});
    const question = await this.questionRepository.findOneBy({id: qid});
    console.log(user, question);
    if (user && question) {
      const answer = this.repository.create(body);
      answer.user = user;
       
      return await this.repository.save(answer);
    }else if(!user)
        throw new NotFoundException(`No encontramos el usuario ${uid}`)
    else 
        throw new NotFoundException(`No encontramos la pregunta con el id ${qid}`)
  }
  async updateAnswer(id: number, body: CreateAnswerDto): Promise<Answer> { 
    let toUpdate = await this.repository.findOneBy({id}); 

    let updated = Object.assign(toUpdate, body); 

    return this.repository.save(updated); 
  }

  public async deleteAnswer(id: number): Promise<any> {
    return await this.repository.delete({id})
  }
}
