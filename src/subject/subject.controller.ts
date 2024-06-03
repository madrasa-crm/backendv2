import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
    Patch,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './subject.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('subject')
export class SubjectController {
    constructor(private readonly subjectService: SubjectService) {}

    @UseGuards(adminGuard)
    @Post()
    async create(@Body() createSubjectDto: CreateSubjectDto) {
        return await this.subjectService.create(createSubjectDto);
    }

    @Get()
    async findAll() {
        return await this.subjectService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.subjectService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateSubjectDto: CreateSubjectDto,
    ) {
        return await this.subjectService.update(+id, updateSubjectDto);
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.subjectService.remove(+id);
    }
}
