import { AnswerController } from './answer.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from '../question/question.controller';
import { Question } from '../question/question.entity';
import { QuestionService } from '../question/question.service';
import { UserController } from '../user/user.controller';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer,Question, User])],
  providers: [AnswerService, QuestionService, UserService],
  controllers: [AnswerController,QuestionController, UserController],
})
export class AnswerModule {}
