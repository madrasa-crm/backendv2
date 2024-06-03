import { IsNotEmpty, IsNumberString, IsOptional } from 'class-validator';

export class CreateTeacherGroupDto {
    @IsNotEmpty()
    @IsNumberString()
    group_id!: number;

    @IsNotEmpty()
    @IsNumberString()
    teacher_id!: number;
}

export class UpdateTeacherGroupDto {
    @IsOptional()
    @IsNumberString()
    group_id?: number;

    @IsOptional()
    @IsNumberString()
    teacher_id?: number;
}
