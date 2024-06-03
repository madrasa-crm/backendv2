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
import { Group } from 'src/group/group.model';
import { Teacher } from 'src/teacher/teacher.model';

@Table({
    tableName: 'teacherGroups',
    timestamps: true,
})
export class TeacherGroup extends Model<TeacherGroup> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Group)
    @Column(DataType.INTEGER)
    group_id: number;

    @ForeignKey(() => Teacher)
    @Column(DataType.INTEGER)
    teacher_id: number;

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Teacher)
    teacher: Teacher;
}
