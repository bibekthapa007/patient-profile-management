import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Pagination } from '@/common/classes/pagination';
import { PATIENTS_SORT_BY_ORDER, SORTING_ORDER } from '@/common/enums/sort';

export class GetPatientsDto extends Pagination {
  @ApiPropertyOptional({
    type: String,
    description: 'Search query for patient name or email or contact.',
  })
  @IsString()
  @IsOptional()
  q: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsEnum(PATIENTS_SORT_BY_ORDER)
  @IsOptional()
  sortBy?: string;

  @ApiPropertyOptional({
    type: String,
  })
  @IsEnum(SORTING_ORDER)
  @IsOptional()
  order?: string;
}

export class GetPatientResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  contact: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  notes: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  imageLink: string;
}

export class GetPatientsResponseDto {
  @ApiProperty({ type: () => [GetPatientResponseDto] })
  data: GetPatientResponseDto[];

  @ApiProperty()
  meta: Meta;
}
