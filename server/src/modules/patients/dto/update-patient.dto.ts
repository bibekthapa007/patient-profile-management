import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdatePatientDTO {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  gender: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  notes: string;

  @IsString()
  @IsOptional()
  contact: string;

  @IsString()
  @IsOptional()
  file: string | undefined;
}
