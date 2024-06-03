import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto, UpdateGroupDto } from './group.dto';
import { adminGuard } from 'src/auth/guards/admin.guard';
import { selfGuard } from 'src/auth/guards/self.guard';

@Controller('group')
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @UseGuards(adminGuard)
    @Post()
    async create(@Body() createGroupDto: CreateGroupDto) {
        return await this.groupService.create(createGroupDto);
    }

    @UseGuards(selfGuard)
    @Get()
    async findAll() {
        return await this.groupService.findAll();
    }

    @UseGuards(selfGuard)
    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.groupService.findOne(+id);
    }

    @UseGuards(adminGuard)
    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() updateGroupDto: UpdateGroupDto,
    ) {
        return await this.groupService.update(+id, updateGroupDto);
    }

    @UseGuards(adminGuard)
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return await this.groupService.remove(+id);
    }
}
