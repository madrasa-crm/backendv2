import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import {
    CreateSubjectGroupDto,
    UpdateSubjectGroupDto,
} from './subject_group.dto';
import { InjectModel } from '@nestjs/sequelize';
import { SubjectGroup } from './subject_group.model';

@Injectable()
export class SubjectGroupService {
    constructor(
        @InjectModel(SubjectGroup) private repository: typeof SubjectGroup,
    ) {}
    async create(createSubjectGroupDto: CreateSubjectGroupDto) {
        const isExists = await this.repository.findOne({
            where: {
                group_id: createSubjectGroupDto.group_id,
                subject_id: createSubjectGroupDto.subject_id,
            },
        });
        if (isExists) {
            throw new BadRequestException(
                `SubjectGroup with group_id-${createSubjectGroupDto.group_id} and subject_id-${createSubjectGroupDto.subject_id} already exists`,
            );
        }
        return await this.repository.create(createSubjectGroupDto);
    }

    async findAll() {
        return await this.repository.findAll({ include: { all: true } });
    }

    async findOne(id: number) {
        const subjectGroup = await this.repository.findOne({
            where: { id },
            include: { all: true },
        });
        if (!subjectGroup) {
            throw new NotFoundException(`SubjectGroup with id-${id} not found`);
        }
        return subjectGroup;
    }

    async update(id: number, updateSubjectGroupDto: UpdateSubjectGroupDto) {
        const subjectGroup = await this.repository.findOne({ where: { id } });
        if (!subjectGroup) {
            throw new NotFoundException(`SubjectGroup with id-${id} not found`);
        }
        await subjectGroup.update(updateSubjectGroupDto);
        return {
            message: `SubjectGroup with id-${id} successfully updated!`,
            subjectGroup: await this.repository.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repository.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`SubjectGroup with id-${id} not found`);
        }
        return { message: `SubjectGroup with id-${id} successfully deleted!` };
    }
}
