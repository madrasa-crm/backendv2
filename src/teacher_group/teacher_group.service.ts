import { Injectable, NotFoundException } from '@nestjs/common';
import {
    CreateTeacherGroupDto,
    UpdateTeacherGroupDto,
} from './teacher_group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { TeacherGroup } from './teacher_group.model';

@Injectable()
export class TeacherGroupService {
    constructor(
        @InjectModel(TeacherGroup) private repository: typeof TeacherGroup,
    ) {}
    async create(createTeacherGroupDto: CreateTeacherGroupDto) {
        return await this.repository.create(createTeacherGroupDto);
    }

    async findAll() {
        return await this.repository.findAll({ include: { all: true } });
    }

    async findOne(id: number) {
        const teacherGroup = await this.repository.findOne({
            where: { id },
            include: { all: true },
        });
        if (!teacherGroup) {
            throw new NotFoundException(`TeacherGroup with id-${id} not found`);
        }
        return teacherGroup;
    }

    async update(id: number, updateTeacherGroupDto: UpdateTeacherGroupDto) {
        const teacherGroup = await this.repository.findOne({ where: { id } });
        if (!teacherGroup) {
            throw new NotFoundException(`TeacherGroup with id-${id} not found`);
        }
        await teacherGroup.update(updateTeacherGroupDto);
        return {
            message: `TeacherGroup with id-${id} successfully updated!`,
            teacherGroup: await this.repository.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repository.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`TeacherGroup with id-${id} not found`);
        }
        return { message: `TeacherGroup with id-${id} successfully deleted!` };
    }
}
