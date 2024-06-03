import { Module } from '@nestjs/common';
import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Grade } from './grade.model';
import { JwtModule } from '@nestjs/jwt';
import { Student } from 'src/student/student.model';
import { Teacher } from 'src/teacher/teacher.model';

@Module({
    imports: [SequelizeModule.forFeature([Grade, Student, Teacher]), JwtModule],
    controllers: [GradeController],
    providers: [GradeService],
    exports: [GradeService],
})
export class GradeModule {}
