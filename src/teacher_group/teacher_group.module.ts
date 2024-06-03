import { Module } from '@nestjs/common';
import { TeacherGroupService } from './teacher_group.service';
import { TeacherGroupController } from './teacher_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { TeacherGroup } from './teacher_group.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([TeacherGroup]), JwtModule],
    controllers: [TeacherGroupController],
    providers: [TeacherGroupService],
    exports: [TeacherGroupService],
})
export class TeacherGroupModule {}
