import {
    Model,
    AutoIncrement,
    Column,
    DataType,
    PrimaryKey,
    Table,
    HasMany,
} from 'sequelize-typescript';
import { Student } from 'src/student/student.model';
import { SubjectGroup } from 'src/subject_group/subject_group.model';
import { TeacherGroup } from 'src/teacher_group/teacher_group.model';

@Table({ tableName: 'groups', timestamps: true })
export class Group extends Model<Group> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    name: string;

    @HasMany(() => Student)
    students: Student[];

    @HasMany(() => TeacherGroup)
    teachers: TeacherGroup[];

    @HasMany(() => SubjectGroup)
    subjects: SubjectGroup[];
}
