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
import { Subject } from 'src/subject/subject.model';

@Table({
    tableName: 'subjectgroups',
    timestamps: true,
})
export class SubjectGroup extends Model<SubjectGroup> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id: number;

    @ForeignKey(() => Group)
    @Column(DataType.INTEGER)
    group_id: number;

    @ForeignKey(() => Subject)
    @Column(DataType.INTEGER)
    subject_id: number;

    @Column(DataType.STRING)
    start_time: string;

    @Column(DataType.STRING)
    end_time: string;

    @BelongsTo(() => Group)
    group: Group;

    @BelongsTo(() => Subject)
    subject: Subject;
}
