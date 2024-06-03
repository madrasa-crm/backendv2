import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { StudentModule } from 'src/student/student.module';
import { TeacherModule } from 'src/teacher/teacher.module';

@Module({
    imports: [
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: (config: ConfigService) => ({
                global: true,
                secret: config.getOrThrow('SECRET_KEY'),
                signOptions: { expiresIn: '7d' },
            }),
            inject: [ConfigService],
        }),
        UserModule,
        StudentModule,
        TeacherModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
