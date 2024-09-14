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

  async getLastFlight(): Promise<Flight | null> {
    try {
      return await this.prismaService.flight.findFirst({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Erro ao buscar último flight:', error);
      throw new Error('Erro ao buscar último flight');
    }
  }

  flightDateVerification(lastFlightDate: Date, newFlightDate: Date): boolean {
    const lastFlight = new Date(lastFlightDate);
    const newFlight = new Date(newFlightDate);
    const MINUTES_30_IN_MS = 30 * 60 * 1000;
    const differenceInMs = Math.abs(lastFlight.getTime() - newFlight.getTime());
    return differenceInMs <= MINUTES_30_IN_MS;
  }

  formatDate(date: Date): string {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} às ${hours}:${minutes}`;
  }

  async create(createFlightDto: CreateFlightDto): Promise<GetFlightDto> {
    const lastFlight = await this.getLastFlight();
    if (lastFlight) {
      // Business Rule: The interval between flights must be 30 minutes
      if (this.flightDateVerification(lastFlight.date, createFlightDto.date)) {
        const lastFlightDate = this.formatDate(lastFlight.date);
        throw new Error(
          `O intervalo entre os voos deve ser de 30 minutos, o último voo foi em: ${lastFlightDate}`,
        );
      }
    }
    try {
      const flight = await this.prismaService.flight.create({
        data: {
          code: randomUUID(), // Business Rule: The code must be random
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
