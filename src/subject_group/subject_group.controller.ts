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
import { SubjectGroupService } from './subject_group.service';
import {
    CreateSubjectGroupDto,
    UpdateSubjectGroupDto,
} from './subject_group.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';

@Controller('subject-group')
export class SubjectGroupController {
    constructor(private readonly subjectGroupService: SubjectGroupService) {}

    @UseGuards(adminGuard)
    @Post()
    async create(@Body() createSubjectGroupDto: CreateSubjectGroupDto) {
        return await this.subjectGroupService.create(createSubjectGroupDto);
    }

    @UseGuards(adminGuard)
    @Get()
    async findAll() {
        return await this.subjectGroupService.findAll();
    }

    @UseGuards(adminGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.subjectGroupService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateSubjectGroupDto: UpdateSubjectGroupDto,
    ) {
        return await this.subjectGroupService.update(
            +id,
            updateSubjectGroupDto,
        );
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.subjectGroupService.remove(+id);
    }
}
