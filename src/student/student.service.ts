import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto, UpdateStudentDto } from './student.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Student } from './student.model';

@Injectable()
export class StudentService {
    constructor(@InjectModel(Student) private repository: typeof Student) {}
    async create(createStudentDto: CreateStudentDto) {
        return await this.repository.create(createStudentDto);
    }

    async findAll(byRating: string) {
        if (byRating === 'true') {
            return await this.repository.findAll({
                include: { all: true },
                order: ['rating', 'ASC'],
            });
        }
        return await this.repository.findAll({ include: { all: true } });
    }

    async findOne(id: number) {
        const student = await this.repository.findOne({
            where: { id },
            include: { all: true },
        });
        if (!student) {
            throw new NotFoundException(`Student with id-${id} not found`);
        }
        return student;
    }

    async update(id: number, updateStudentDto: UpdateStudentDto) {
        const student = await this.repository.findOne({ where: { id } });
        if (!student) {
            throw new NotFoundException(`Student with id-${id} not found`);
        }
        await student.update(updateStudentDto);
        return {
            message: `Student with id-${id} successfully updated!`,
            student: await this.repository.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repository.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`Student with id-${id} not found`);
        }
        return { message: `Student with id-${id} successfully deleted!` };
    }
}
