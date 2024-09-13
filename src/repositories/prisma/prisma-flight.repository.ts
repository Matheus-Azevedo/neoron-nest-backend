import { Flight } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreateFlightDto } from 'src/http/dtos/create-flight.dto';
import { FlightRepository } from '../flight.repository';
import { randomUUID } from 'node:crypto';
import { GetFlightDto } from 'src/http/dtos/get-flight.dto';
import { UpdateFlightDto } from 'src/http/dtos/update-flight.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaFlightRepository implements FlightRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createFlightDto: CreateFlightDto): Promise<GetFlightDto> {
    try {
      const flight = await this.prismaService.flight.create({
        data: {
          code: randomUUID(),
          ...createFlightDto,
        },
      });
      return flight;
    } catch (error) {
      console.error('Erro ao criar flight:', error);
      throw new Error('Erro ao criar flight');
    }
  }

  async findAll(): Promise<GetFlightDto[]> {
    try {
      return await this.prismaService.flight.findMany();
    } catch (error) {
      console.error('Erro ao buscar flights:', error);
      throw new Error('Erro ao buscar flights');
    }
  }

  async findOne(id: number): Promise<Flight> {
    try {
      return await this.prismaService.flight.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Erro ao buscar flight com id ${id}:`, error);
      throw new Error('Erro ao buscar flight');
    }
  }

  async update(
    id: number,
    updatedFlightDto: UpdateFlightDto,
  ): Promise<UpdateFlightDto> {
    try {
      const flightUpdate = await this.prismaService.flight.update({
        where: {
          id,
        },
        data: updatedFlightDto,
      });
      return flightUpdate;
    } catch (error) {
      console.error(`Erro ao atualizar flight com id ${id}:`, error);
      throw new Error('Erro ao atualizar flight');
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.prismaService.flight.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      console.error(`Erro ao deletar flight com id ${id}:`, error);
      throw new Error('Erro ao deletar flight');
    }
  }
}
