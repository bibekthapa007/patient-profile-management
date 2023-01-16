import { IsNumber, IsString } from 'class-validator';

export class CreatePatientDTO {
  @IsNumber()
  id: number;

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
}
