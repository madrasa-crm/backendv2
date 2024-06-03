import {
    Model,
    AutoIncrement,
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    PrimaryKey,
    Table,
    HasMany,
} from 'sequelize-typescript';
import { TeacherGroup } from 'src/teacher_group/teacher_group.model';
import { User } from 'src/user/user.model';

@Table({
    tableName: 'teachers',
    timestamps: true,
})
export class Teacher extends Model<Teacher> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @Column(DataType.STRING)
    fullname: string;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => TeacherGroup)
    groups: TeacherGroup[];
}
