import { Body,UseGuards, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Question } from './question.entity';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './question.dto';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller('question')
export class QuestionController {

    @Inject(QuestionService)
    private readonly service: QuestionService;

    @Get()
    public findAll(): Promise<Question[]> {
        return this.service.findAll();
    }

    @Get(':id')
    public get(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return this.service.get(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post(':id/question')
    public createQuestion(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateQuestionDto,
    ) {
        return this.service.createQuestion(id, body);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteQuestion(@Param('id', ParseIntPipe) id: number): Promise<Question> {
        return this.service.deleteQuestion(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateQuestion(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateQuestionDto,
    ): Promise<Question> {
        return this.service.updateQuestion(id, body);
    }
}
