import { PartialType } from '@nestjs/mapped-types';
import { CreateQuestionDto } from './create-question.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateQuestionDto {
    @IsString()
    @IsOptional()
    questionText: string;

    @IsString()
    @IsOptional()
    category: string;
}
