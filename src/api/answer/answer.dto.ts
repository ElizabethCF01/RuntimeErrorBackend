import { IsEmpty, IsNotEmpty } from "class-validator"
import { Question } from "../question/question.entity"
import { User } from "../user/user.entity"

export class CreateAnswerDto {
        @IsEmpty()
        rating: number
        
        @IsNotEmpty()
        description: string

        @IsNotEmpty()
        user: User

        @IsNotEmpty()
        question: Question
}
