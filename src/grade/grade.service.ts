import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradeDto, UpdateGradeDto } from './grade.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Grade } from './grade.model';
import { CustomRequest } from 'src/auth/guards/custom-request.interface';
import { Student } from 'src/student/student.model';
import { Teacher } from 'src/teacher/teacher.model';

@Injectable()
export class GradeService {
    constructor(
        @InjectModel(Grade) private repository: typeof Grade,
        @InjectModel(Student) private studentRepository: typeof Student,
        @InjectModel(Teacher) private teacherRepository: typeof Teacher,
    ) {}

    async create(req: CustomRequest, createGradeDto: CreateGradeDto) {
        const student = await this.studentRepository.findOne({
            where: { id: createGradeDto.student_id },
        });

        if (!student.rating) {
            student.rating = Number(createGradeDto.grade);
        } else {
            student.rating =
                Number(student.rating) + Number(createGradeDto.grade);
        }
        console.log(typeof student.rating);
        await student.save();
        const teacher = await this.teacherRepository.findOne({
            where: { user_id: req.user },
        });
        return await this.repository.create({
            ...createGradeDto,
            subject_group_id: createGradeDto.subject_id,
            teacher_id: teacher.id,
        });
    }

    async findAll() {
        return await this.repository.findAll({ include: { all: true } });
    }

    async findOne(id: number) {
        const grade = await this.repository.findOne({
            where: { id },
            include: { all: true },
        });
        if (!grade) {
            throw new NotFoundException(`Grade with id-${id} not found`);
        }
        return grade;
    }

    async update(id: number, updateGradeDto: UpdateGradeDto) {
        const grade = await this.repository.findOne({ where: { id } });
        if (!grade) {
            throw new NotFoundException(`Grade with id-${id} not found`);
        }
        await grade.update({ ...updateGradeDto });
        return {
            message: `Grade with id-${id} successfully updated!`,
            grade: await this.repository.findOne({ where: { id } }),
        };
    }

    async remove(id: number) {
        const isDeleted = await this.repository.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`Grade with id-${id} not found`);
        }
        return { message: `Grade with id-${id} successfully deleted!` };
    }
}
