import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import { StudentModule } from './student/student.module';
import { GroupModule } from './group/group.module';
import { TeacherGroupModule } from './teacher_group/teacher_group.module';
import { SubjectModule } from './subject/subject.module';
import { SubjectGroupModule } from './subject_group/subject_group.module';
import { GradeModule } from './grade/grade.module';
@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get('POSTGRES_HOST') || 'localhost',
                port: configService.get<number>('POSTGRES_PORT') || 5432,
                username: configService.get('POSTGRES_USER') || 'postgres',
                password: configService.getOrThrow('POSTGRES_PASSWORD'),
                database: configService.getOrThrow('POSTGRES_DB'),
                autoLoadModels: true,
                synchronize: true,
                logging: false,
                // models: [User],
            }),
            inject: [ConfigService],
        }),
        UserModule,
        AuthModule,
        RoleModule,
        StudentModule,
        GroupModule,
        TeacherGroupModule,
        SubjectModule,
        SubjectGroupModule,
        GradeModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
