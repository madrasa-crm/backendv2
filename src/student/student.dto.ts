import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateStudentDto {
    @IsNotEmpty()
    @IsNumber()
    group_id!: number;

    @IsNotEmpty()
    @IsNumber()
    user_id!: number;
}

export class UpdateStudentDto {
    @IsOptional()
    @IsNumber()
    group_id?: number;

    @IsOptional()
    @IsNumber()
    user_id?: number;
}
