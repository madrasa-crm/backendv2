import {
    BadRequestException,
    ForbiddenException,
    Injectable,
} from '@nestjs/common';
import {
    ChangePasswordDto,
    LoginUserDto,
    RegisterDto,
    RegisterStudentDto,
    RegisterTeacherDto,
} from './auth.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CustomRequest } from './guards/custom-request.interface';
import { StudentService } from 'src/student/student.service';
import { TeacherService } from 'src/teacher/teacher.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private studentService: StudentService,
        private teacherService: TeacherService,
        private jwtService: JwtService,
    ) {}
    private async hashPassword(password: string) {
        return await bcrypt.hash(password, 7);
    }

    private async checkPassword(password: string, hashedPassword: string) {
        return await bcrypt.compare(password, hashedPassword);
    }

    async loginUser(loginUserDto: LoginUserDto) {
        const user = await this.findUserByPhone(loginUserDto.phone);
        if (!user) {
            throw new BadRequestException(
                'You have not registered, please register!',
            );
        }
        const isPasswordCorrect = await this.checkPassword(
            loginUserDto.password,
            user.password,
        );

        if (!isPasswordCorrect) {
            throw new ForbiddenException('Wrong password!');
        }

        return {
            token: this.generateToken(user.id, user.role_id),
            message: 'You have successfully logged in!',
        };
    }

    private generateToken(user_id: number, role: number) {
        const payload = { sub: user_id, role };
        return this.jwtService.sign(payload);
    }

    async register(registerUserDto: RegisterDto) {
        if (await this.findUserByPhone(registerUserDto.phone)) {
            throw new BadRequestException(
                `User with this phone (${registerUserDto.phone}) already exists! Please login!`,
            );
        }
        const hashedPassword = await this.hashPassword(
            registerUserDto.password,
        );
        const user = await this.userService.create({
            ...registerUserDto,
            password: hashedPassword,
            role_id: 3,
        });

        return {
            token: this.generateToken(user.id, user.role_id),
            message: 'You have successfully registered admin!',
            id: user.id,
        };
    }

    async registerStudent(registerUserDto: RegisterStudentDto) {
        if (await this.findUserByPhone(registerUserDto.phone)) {
            throw new BadRequestException(
                `User with this phone (${registerUserDto.phone}) already exists! Please login!`,
            );
        }
        const hashedPassword = await this.hashPassword(
            registerUserDto.password,
        );
        const user = await this.userService.create({
            ...registerUserDto,
            password: hashedPassword,
            role_id: 1,
        });

        const student = await this.studentService.create({
            ...registerUserDto,
            user_id: user.id,
        });
        return {
            token: this.generateToken(user.id, user.role_id),
            message: 'You have successfully registered student!',
            id: student.id,
        };
    }

    async registerTeacher(registerTeacherDto: RegisterTeacherDto) {
        if (await this.findUserByPhone(registerTeacherDto.phone)) {
            throw new BadRequestException(
                `User with this phone (${registerTeacherDto.phone}) already exists! Please login!`,
            );
        }
        const hashedPassword = await this.hashPassword(
            registerTeacherDto.password,
        );
        const user = await this.userService.create({
            ...registerTeacherDto,
            password: hashedPassword,
            role_id: 2,
        });

        const teacher = await this.teacherService.create({
            ...registerTeacherDto,
            user_id: user.id,
        });
        return {
            token: this.generateToken(user.id, user.role_id),
            message: 'You have successfully registered teacher!',
            id: teacher.id,
        };
    }

    private async findUserByPhone(phone: string) {
        return await this.userService.findByPhone(phone);
    }

    async changePassword(
        req: CustomRequest,
        changePasswordDto: ChangePasswordDto,
    ) {
        const user = await this.userService.findOne(req.user);
        if (changePasswordDto.oldPassword == changePasswordDto.newPassword) {
            throw new BadRequestException(
                'New password cannot be the same as old password!',
            );
        }
        const isPasswordCorrect = await this.checkPassword(
            changePasswordDto.oldPassword,
            user.password,
        );
        if (!isPasswordCorrect) {
            throw new ForbiddenException('Wrong password!');
        }
        const hashedPassword = await this.hashPassword(
            changePasswordDto.newPassword,
        );
        await this.userService.update(user.id, {
            password: hashedPassword,
        });

        return {
            message: 'Password successfully changed!',
        };
    }
}
