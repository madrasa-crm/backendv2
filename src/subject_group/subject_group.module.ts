import { Module } from '@nestjs/common';
import { SubjectGroupService } from './subject_group.service';
import { SubjectGroupController } from './subject_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubjectGroup } from './subject_group.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports: [SequelizeModule.forFeature([SubjectGroup]), JwtModule],
    controllers: [SubjectGroupController],
    providers: [SubjectGroupService],
    exports: [SubjectGroupService],
})
export class SubjectGroupModule {}
