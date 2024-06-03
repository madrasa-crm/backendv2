import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
    ChangePasswordDto,
    LoginUserDto,
    RegisterDto,
    RegisterStudentDto,
    RegisterTeacherDto,
} from './auth.dto';
import { CustomRequest } from './guards/custom-request.interface';
import { selfGuard } from './guards/self.guard';
// TODO:
// import { superAdminGuard } from './guards/superadmin.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    // TODO: add guard after adding superadmin!
    // @UseGuards(superAdminGuard)
    @Post('admin/register')
    async adminRegister(@Body() registerUserDto: RegisterDto) {
        return await this.authService.register(registerUserDto);
    }

    // @UseGuards(superAdminGuard)
    @Post('student/register')
    async userRegister(@Body() registerUserDto: RegisterStudentDto) {
        return await this.authService.registerStudent(registerUserDto);
    }

    // @UseGuards(superAdminGuard)
    @Post('teacher/register')
    async teacherRegister(@Body() registerTeacherDto: RegisterTeacherDto) {
        return await this.authService.registerTeacher(registerTeacherDto);
    }

    @Post('login')
    async userLogin(@Body() loginUserDto: LoginUserDto) {
        return await this.authService.loginUser(loginUserDto);
    }

    @UseGuards(selfGuard)
    @Post('change-password')
    async changePassword(
        @Body() changePasswordDto: ChangePasswordDto,
        @Req() req: CustomRequest,
    ) {
        return await this.authService.changePassword(req, changePasswordDto);
    }
}
