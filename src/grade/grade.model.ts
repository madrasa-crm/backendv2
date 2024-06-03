import {
    Model,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    PrimaryKey,
    Table,
} from 'sequelize-typescript';
import { Student } from 'src/student/student.model';
import { SubjectGroup } from 'src/subject_group/subject_group.model';
import { Teacher } from 'src/teacher/teacher.model';

@Table({
    tableName: 'grade',
    timestamps: true,
})
export class Grade extends Model<Grade> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Teacher)
    @Column(DataType.INTEGER)
    teacher_id: number;

    @ForeignKey(() => SubjectGroup)
    @Column(DataType.INTEGER)
    subject_group_id: number;

    @ForeignKey(() => Student)
    @Column(DataType.INTEGER)
    student_id: number;

    @Column(DataType.STRING)
    grade: string;

    @BelongsTo(() => Teacher)
    teacher: Teacher;

    @BelongsTo(() => SubjectGroup)
    subject: SubjectGroup;

    @BelongsTo(() => Student)
    student: Student;
}
