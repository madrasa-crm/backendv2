import {
    Controller,
    Get,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Post,
    Req,
} from '@nestjs/common';
import { GradeService } from './grade.service';
import { CreateGradeDto, UpdateGradeDto } from './grade.dto';
import { CustomRequest } from 'src/auth/guards/custom-request.interface';
import { teacherGuard } from 'src/auth/guards/teacher.guard';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('grade')
export class GradeController {
    constructor(private readonly gradeService: GradeService) {}

    @UseGuards(teacherGuard)
    @Post()
    async create(
        @Req() req: CustomRequest,
        @Body() createGradeDto: CreateGradeDto,
    ) {
        return await this.gradeService.create(req, createGradeDto);
    }

    @Get()
    async findAll() {
        return await this.gradeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.gradeService.findOne(+id);
    }

    @UseGuards(teacherGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGradeDto: UpdateGradeDto,
    ) {
        return await this.gradeService.update(+id, updateGradeDto);
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.gradeService.remove(+id);
    }
}
