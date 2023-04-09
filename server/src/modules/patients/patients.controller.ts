import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { AccessTokenGuard } from '@/common/guards/AccessTokenGuard';

import { PatientsService } from './patients.service';

import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';

@UseGuards(AccessTokenGuard)
@Controller('api/patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  async getPatients() {
    return await this.patientsService.getPatients();
  }

  @Get('/:id')
  async getPatientById(@Param('id', ParseIntPipe) id: number) {
    return await this.patientsService.getPatientById(id);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async createPatient(@UploadedFile() file, @Body() body: CreatePatientDTO) {
    return await this.patientsService.createPatient(body);
  }

  @UseInterceptors(FileInterceptor('file'))
  @Put('/:id')
  async updatePatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePatientDTO,
  ) {
    return this.patientsService.updatePatient(id, body);
  }

  @Delete('/:id')
  async deletePatient(@Param('id', ParseIntPipe) id: number) {
    await this.patientsService.getPatientById(id);

    return this.patientsService.deletePatient(id);
  }
}
