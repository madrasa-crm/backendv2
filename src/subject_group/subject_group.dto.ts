import {
    IsNotEmpty,
    IsNumberString,
    IsOptional,
    IsString,
    Matches,
} from 'class-validator';

export class CreateSubjectGroupDto {
    @IsNotEmpty()
    @IsNumberString()
    group_id!: number;

    @IsNotEmpty()
    @IsNumberString()
    subject_id!: number;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'start_time must be in the format HH:mm',
    })
    start_time: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'end_time must be in the format HH:mm',
    })
    end_time: string;
}

export class UpdateSubjectGroupDto {
    @IsOptional()
    @IsNumberString()
    group_id?: number;

    @IsOptional()
    @IsNumberString()
    subject_id?: number;

    @IsOptional()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'start_time must be in the format HH:mm',
    })
    start_time?: string;

    @IsOptional()
    @IsString()
    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'end_time must be in the format HH:mm',
    })
    end_time?: string;
}
