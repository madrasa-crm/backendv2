import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './role.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('role')
export class RoleController {
    constructor(private readonly roleService: RoleService) {}

    @UseGuards(adminGuard)
    @Post()
    async create(@Body() createRoleDto: CreateRoleDto) {
        return await this.roleService.create(createRoleDto);
    }

    @UseGuards(adminGuard)
    @Get()
    async findAll() {
        return await this.roleService.findAll();
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.roleService.remove(+id);
    }
}
