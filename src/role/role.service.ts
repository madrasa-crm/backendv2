import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './role.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from './role.model';

@Injectable()
export class RoleService {
    constructor(@InjectModel(Role) private readonly repostiroy: typeof Role) {}

    async create(createRoleDto: CreateRoleDto) {
        const role = await this.repostiroy.create(createRoleDto);
        return {
            message: `Role "${createRoleDto.name}" successfully created!`,
            id: role.id,
        };
    }

    async findAll() {
        return await this.repostiroy.findAll({
            include: { all: true },
            order: [['id', 'ASC']],
        });
    }

    async remove(id: number) {
        const isDeleted = await this.repostiroy.destroy({ where: { id } });
        if (!isDeleted) {
            throw new Error(`Role with id-${id} not found`);
        }

        return { message: `Role with id-${id} successfully deleted!` };
    }
}

// ROLELAR 4 ta bo'ladigan bo'ldi, 1-STUDENT, 2-TEACHER, 3-ADMIN, 4-SUPERADMIN
