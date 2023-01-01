import {IsNumber, IsOptional, IsString} from "class-validator";

export class UpdatePatientDTO {

    @IsString()
    @IsOptional()
    name: string;
}
