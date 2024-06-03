import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './subject.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Subject } from './subject.model';
import { SubjectGroup } from 'src/subject_group/subject_group.model';
import { Group } from 'src/group/group.model';

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel(Subject) private readonly repostiroy: typeof Subject,
    ) {}

    async create(createSubjectDto: CreateSubjectDto) {
        const subject = await this.repostiroy.create(createSubjectDto);
        return {
            message: `Subject "${createSubjectDto.name}" successfully created!`,
            id: subject.id,
        };
    }

    async findAll() {
        return await this.repostiroy.findAll({
            include: [{ model: SubjectGroup, include: [{ model: Group }] }],
            order: [['id', 'ASC']],
        });
    }

    async findOne(id: number) {
        const subject = await this.repostiroy.findOne({
            where: { id },
            include: [{ model: SubjectGroup, include: [{ model: Group }] }],
        });
        if (!subject) {
            throw new Error(`Subject with id-${id} not found`);
        }
        return subject;
    }

    async update(id: number, updateSubjectDto: CreateSubjectDto) {
        const subject = await this.repostiroy.findOne({ where: { id } });
        if (!subject) {
            throw new Error(`Subject with id-${id} not found`);
        }
        await subject.update(updateSubjectDto);
        return {
            message: `Subject with id-${id} successfully updated!`,
            subject: await this.repostiroy.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repostiroy.destroy({ where: { id } });
        if (!isDeleted) {
            throw new Error(`Subject with id-${id} not found`);
        }

        return { message: `Subject with id-${id} successfully deleted!` };
    }
}
