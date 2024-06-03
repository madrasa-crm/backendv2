import {
    Table,
    Column,
    Model,
    PrimaryKey,
    DataType,
    AutoIncrement,
    BelongsTo,
    ForeignKey,
    // ForeignKey,
} from 'sequelize-typescript';
import { Role } from 'src/role/role.model';
// import { Role } from './Role';

@Table({ tableName: 'users', timestamps: true })
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
    })
    id!: number;

    @Column(DataType.STRING)
    username!: string;

    @Column(DataType.STRING)
    password!: string;

    @ForeignKey(() => Role)
    @Column(DataType.INTEGER)
    role_id!: number;

    @Column({
        type: DataType.STRING,
        unique: true,
    })
    phone!: string;

    @BelongsTo(() => Role)
    role!: Role;
}
