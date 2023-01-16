import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { AccessTokenGuard } from '@/common/guards/AccessTokenGuard';

import { PatientsService } from './patients.service';

import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';

@UseGuards(AccessTokenGuard)
@Controller('patients')
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

  @Post()
  async createPatient(@Body() body: CreatePatientDTO) {
    return await this.patientsService.createPatient(body);
  }

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
