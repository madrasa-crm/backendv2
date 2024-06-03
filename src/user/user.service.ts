import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { Role } from 'src/role/role.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly repostiroy: typeof User) {}
    async create(createUserDto: CreateUserDto) {
        return await this.repostiroy.create(createUserDto);
    }

    async findAll() {
        return await this.repostiroy.findAll({
            include: [
                {
                    model: Role,
                    attributes: ['name'],
                },
            ],
            order: [['createdAt', 'ASC']],
        });
    }

    async findOne(id: number) {
        const user = await this.repostiroy.findByPk(id, {
            include: { all: true },
        });
        if (!user) {
            throw new NotFoundException(`User with id-${id} not found`);
        }

        return user;
    }

    async remove(id: number) {
        const isDeleted = await this.repostiroy.destroy({ where: { id } });
        if (!isDeleted) {
            throw new NotFoundException(`User with id-${id} not found`);
        }

        return { message: `User with id-${id} successfully deleted!` };
    }

    async findByPhone(phone: string) {
        return await this.repostiroy.findOne({ where: { phone } });
    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const user = await this.repostiroy.findByPk(id);
        if (!user) {
            throw new NotFoundException(`User with id-${id} not found`);
        }
        return await user.update(updateUserDto);
    }
}
