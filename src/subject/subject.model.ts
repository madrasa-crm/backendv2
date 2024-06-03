import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    AutoIncrement,
    HasMany,
    // ForeignKey,
} from 'sequelize-typescript';
import { SubjectGroup } from 'src/subject_group/subject_group.model';

@Table({ tableName: 'subjects', timestamps: true })
export class Subject extends Model<Subject> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column({
        type: DataType.STRING,
    })
    name!: string;

    @Column({
        type: DataType.STRING,
    })
    description?: string;

    @HasMany(() => SubjectGroup)
    groups: SubjectGroup[];
}
