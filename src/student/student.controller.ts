import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { UpdateStudentDto } from './student.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';
import { teacherGuard } from 'src/auth/guards/teacher.guard';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) {}

    @UseGuards(teacherGuard)
    @Get()
    async findAll(@Query('byRating') byRating: string) {
        return await this.studentService.findAll(byRating);
    }

    @UseGuards(teacherGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.studentService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateStudentDto: UpdateStudentDto,
    ) {
        return await this.studentService.update(+id, updateStudentDto);
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.studentService.remove(+id);
    }
}
