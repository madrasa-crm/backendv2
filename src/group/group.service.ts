import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './group.model';
import { CreateGroupDto, UpdateGroupDto } from './group.dto';
import { TeacherGroup } from 'src/teacher_group/teacher_group.model';
import { Teacher } from 'src/teacher/teacher.model';
import { Student } from 'src/student/student.model';
import { SubjectGroup } from 'src/subject_group/subject_group.model';
import { Subject } from 'src/subject/subject.model';
// import { CreateGroupDto, UpdateGroupDto } from './group.dto';

@Injectable()
export class GroupService {
    constructor(
        @InjectModel(Group) private readonly repository: typeof Group,
    ) {}

    async create(createGroupDto: CreateGroupDto) {
        return await this.repository.create<Group>(createGroupDto);
    }

    async findAll() {
        return await this.repository.findAll({
            include: [
                {
                    model: TeacherGroup,
                    include: [{ model: Teacher }],
                },
                {
                    model: Student,
                },
                {
                    model: SubjectGroup,
                    include: [{ model: Subject }],
                },
            ],
        });
    }

    async findOne(id: number) {
        const group = await this.repository.findOne({
            where: { id },
            include: [
                {
                    model: TeacherGroup,
                    include: [{ model: Teacher }],
                },
                {
                    model: Student,
                },
            ],
        });
        if (!group) {
            throw new NotFoundException(`Group with id-${id} not found`);
        }
        return group;
    }

    async update(id: number, updateGroupDto: UpdateGroupDto) {
        const group = await this.repository.findOne({ where: { id } });
        if (!group) {
            throw new NotFoundException(`Group with id-${id} not found`);
        }
        await group.update(updateGroupDto);
        return {
            message: `Group with id-${id} successfully updated!`,
            group: await this.repository.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repository.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`Group with id-${id} not found`);
        }
        return { message: `Group with id-${id} successfully deleted!` };
    }
}
