import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTeacherDto {
    @IsNotEmpty()
    @IsString()
    fullname!: string;

    @IsNotEmpty()
    @IsNumber()
    user_id!: number;
}

export class UpdateTeacherDto {
    @IsOptional()
    @IsString()
    fullname?: string;

    @IsOptional()
    @IsNumber()
    user_id?: number;
}
