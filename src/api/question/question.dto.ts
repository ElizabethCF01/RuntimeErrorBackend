import { IsEmpty, IsNotEmpty } from "class-validator"

export class CreateQuestionDto {
        @IsNotEmpty()
        title: string
    
        @IsEmpty()
        rating: number
        
        @IsNotEmpty()
        description: string
}
