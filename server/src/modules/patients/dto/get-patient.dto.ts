import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Pagination } from '@/common/classes/pagination';

export class GetPatientsDto extends Pagination {
  @ApiPropertyOptional({
    type: String,
    description: 'Search query for patient name.',
  })
  @IsString()
  @IsOptional()
  q: string;
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
