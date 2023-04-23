import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max } from 'class-validator';

export class Pagination {
  @ApiPropertyOptional({
    type: Number,
    description: 'Page number',
  })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({
    type: Number,
    description: 'Page size',
  })
  @IsNumber()
  @Transform(({ value }: { value: string }) => parseInt(value))
  @IsOptional()
  @Max(40)
  size?: number;
}
