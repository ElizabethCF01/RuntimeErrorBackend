import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { QuestionModule } from './question/question.module';
import { AuthModule } from './auth/auth.module';
import { AnswerController } from './answer/answer.controller';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [UserModule, QuestionModule, AuthModule, AnswerModule],
})
export class ApiModule {}
