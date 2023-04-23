import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Query,
  ParseIntPipe,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { AccessTokenGuard } from '@/common/guards/AccessTokenGuard';

import { PatientsService } from './patients.service';

import {
  GetPatientsDto,
  GetPatientResponseDto,
  GetPatientsResponseDto,
} from './dto/get-patient.dto';
import { CreatePatientDTO } from './dto/create-patient.dto';
import { UpdatePatientDTO } from './dto/update-patient.dto';

@UseGuards(AccessTokenGuard)
@Controller('api/patients')
export class PatientsController {
  constructor(private patientsService: PatientsService) {}

  @Get()
  @ApiQuery({ type: GetPatientsDto })
  @ApiOkResponse({ type: GetPatientsResponseDto })
  async getPatients(@Query() query: GetPatientsDto) {
    return await this.patientsService.getPatients(query);
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetPatientResponseDto })
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
  @ApiOkResponse({ type: GetPatientResponseDto })
  async updatePatient(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePatientDTO,
  ) {
    return this.patientsService.updatePatient(id, body);
  }

  @Delete('/:id')
  async deletePatient(@Param('id', ParseIntPipe) id: number) {
    return this.patientsService.deletePatient(id);
  }
}
