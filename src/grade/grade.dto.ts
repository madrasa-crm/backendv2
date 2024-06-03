import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
} from 'class-validator';

export class CreateGradeDto {
    @IsNotEmpty()
    @IsNumberString()
    subject_id!: number;

    @IsNotEmpty()
    @IsNumberString()
    student_id!: number;

    @IsNotEmpty()
    @IsString()
    grade: string;
}

export class UpdateGradeDto {
    @IsOptional()
    @IsNumberString()
    subject_id?: number;

    @IsOptional()
    @IsNumberString()
    student_id?: number;

    @IsOptional()
    @IsString()
    grade?: string;
}
