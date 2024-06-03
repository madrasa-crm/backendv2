import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Post,
} from '@nestjs/common';
import { TeacherGroupService } from './teacher_group.service';
import {
    CreateTeacherGroupDto,
    UpdateTeacherGroupDto,
} from './teacher_group.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('teacher-group')
export class TeacherGroupController {
    constructor(private readonly teacherGroupService: TeacherGroupService) {}

    @UseGuards(adminGuard)
    @Post()
    async create(@Body() createTeacherGroupDto: CreateTeacherGroupDto) {
        return await this.teacherGroupService.create(createTeacherGroupDto);
    }

    @UseGuards(adminGuard)
    @Get()
    async findAll() {
        return await this.teacherGroupService.findAll();
    }

    @UseGuards(adminGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.teacherGroupService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateTeacherGroupDto: UpdateTeacherGroupDto,
    ) {
        return await this.teacherGroupService.update(
            +id,
            updateTeacherGroupDto,
        );
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.teacherGroupService.remove(+id);
    }
}
