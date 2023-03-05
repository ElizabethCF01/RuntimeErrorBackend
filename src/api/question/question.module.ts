import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { Question } from './question.entity';
import { User } from '../user/user.entity';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
@Module({
  imports: [TypeOrmModule.forFeature([Question, User])],
  controllers: [QuestionController, UserController],
  providers: [QuestionService, UserService]
})
export class QuestionModule {}
