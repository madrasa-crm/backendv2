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
import { Grade } from 'src/grade/grade.model';
import { Group } from 'src/group/group.model';
import { User } from 'src/user/user.model';

@Table({
    tableName: 'students',
    timestamps: true,
})
export class Student extends Model<Student> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Group)
    @Column(DataType.INTEGER)
    group_id: number;

    @Column(DataType.DECIMAL)
    rating: number;

    @ForeignKey(() => User)
    @Column
    user_id: number;

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Group)
    group: Group;

    @HasMany(() => Grade)
    grades: Grade[];
}
