import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTeacherDto, UpdateTeacherDto } from './teacher.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './teacher.model';
import { TeacherGroup } from 'src/teacher_group/teacher_group.model';
import { Group } from 'src/group/group.model';

@Injectable()
export class TeacherService {
    constructor(@InjectModel(Teacher) private repository: typeof Teacher) {}
    async create(createTeacherDto: CreateTeacherDto) {
        return await this.repository.create(createTeacherDto);
    }

    async findAll() {
        return await this.repository.findAll({
            include: [
                {
                    model: TeacherGroup,
                    include: [{ model: Group }],
                },
            ],
        });
    }

    async findOne(id: number) {
        const teacher = await this.repository.findOne({
            where: { id },
            include: [
                {
                    model: TeacherGroup,
                    include: [{ model: Group }],
                },
            ],
        });
        if (!teacher) {
            throw new NotFoundException(`Teacher with id-${id} not found`);
        }
        return teacher;
    }

    async update(id: number, updateTeacherDto: UpdateTeacherDto) {
        const teacher = await this.repository.findOne({ where: { id } });
        if (!teacher) {
            throw new NotFoundException(`Teacher with id-${id} not found`);
        }
        await teacher.update(updateTeacherDto);
        return {
            message: `Teacher with id-${id} successfully updated!`,
            teacher: await this.repository.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repository.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`Teacher with id-${id} not found`);
        }
        return { message: `Teacher with id-${id} successfully deleted!` };
    }
}
