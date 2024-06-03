import {
    Controller,
    Get,
    Param,
    Delete,
    UseGuards,
    Patch,
    Body,
} from '@nestjs/common';
import { UserService } from './user.service';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @UseGuards(adminGuard)
    @Get()
    async findAll() {
        return await this.userService.findAll();
    }

    @UseGuards(adminGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.userService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateUserDto: any) {
        return await this.userService.update(+id, updateUserDto);
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.userService.remove(+id);
    }
}
