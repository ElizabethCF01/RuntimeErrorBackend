import { Body,UseGuards, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { Answer } from './answer.entity';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './answer.dto';
import { AuthGuard } from '@nestjs/passport/dist';

@Controller('answer')
export class AnswerController {

    @Inject(AnswerService)
    private readonly service: AnswerService;

    @Get()
    public findAll(): Promise<Answer[]> {
        return this.service.findAll();
    }

    @Get(':id')
    public get(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
        return this.service.get(id);
    }
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public post(
        @Body() body: CreateAnswerDto,
    ) {
        return this.service.createAnswer(body);
    }
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    deleteQuestion(@Param('id', ParseIntPipe) id: number): Promise<Answer> {
        return this.service.deleteAnswer(id);
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    updateQuestion(
        @Param('id', ParseIntPipe) id: number,
        @Body() body: CreateAnswerDto,
    ): Promise<Answer> {
        return this.service.updateAnswer(id, body);
    }
}

