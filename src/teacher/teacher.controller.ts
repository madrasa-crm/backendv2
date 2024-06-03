import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { UpdateTeacherDto } from './teacher.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('teacher')
export class TeacherController {
    constructor(private readonly teacherService: TeacherService) {}

    @UseGuards(adminGuard)
    @Get()
    async findAll() {
        return await this.teacherService.findAll();
    }

    @UseGuards(adminGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.teacherService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateTeacherDto: UpdateTeacherDto,
    ) {
        return await this.teacherService.update(+id, updateTeacherDto);
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.teacherService.remove(+id);
    }
}
