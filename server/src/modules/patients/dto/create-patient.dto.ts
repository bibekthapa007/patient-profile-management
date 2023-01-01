import {IsNumber, IsString} from "class-validator";

export class CreatePatientDTO {
    @IsNumber()
    id: number;

    @IsString()
    name: string;

    @IsString()
    email: string;
}