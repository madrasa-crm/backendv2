import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupDto {
    @IsNotEmpty()
    @IsString()
    name!: string;
}

export class UpdateGroupDto {
    @IsOptional()
    @IsString()
    name?: string;
}
