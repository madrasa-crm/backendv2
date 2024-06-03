import {
    IsNotEmpty,
    IsString,
    IsPhoneNumber,
    IsNumber,
    IsOptional,
} from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    username!: string;

    @IsNotEmpty()
    @IsString()
    password!: string;

    @IsNotEmpty()
    @IsNumber()
    role_id!: number;

    @IsNotEmpty()
    @IsPhoneNumber(null)
    phone!: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    username?: string;

    @IsOptional()
    @IsString()
    password?: string;

    @IsOptional()
    @IsNumber()
    role_id?: number;

    @IsOptional()
    @IsPhoneNumber(null)
    phone?: string;
}
