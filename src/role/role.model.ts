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
import { User } from 'src/user/user.model';

@Table({ tableName: 'roles', timestamps: true })
export class Role extends Model<Role> {
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
    description!: string;

    @HasMany(() => User)
    users!: User[];
}
