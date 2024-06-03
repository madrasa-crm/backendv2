import {
    IsNotEmpty,
    IsNumberString,
    IsPhoneNumber,
    IsString,
} from 'class-validator';

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;
}

export class RegisterStudentDto extends RegisterDto {
    @IsNotEmpty()
    @IsNumberString()
    group_id: number;
}

export class RegisterTeacherDto extends RegisterDto {
    @IsNotEmpty()
    @IsString()
    fullname: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('UZ')
    phone: string;
}

export class ChangePasswordDto {
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
