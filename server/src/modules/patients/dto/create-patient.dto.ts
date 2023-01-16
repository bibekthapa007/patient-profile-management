import { IsNumber, IsString } from 'class-validator';

export class CreatePatientDTO {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  gender: string;

  @IsString()
  address: string;

  @IsString()
  notes: string;

  @IsString()
  contact: string;

  @IsString()
  file!: string;
}
