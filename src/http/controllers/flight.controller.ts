import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateFlightDto } from '../dtos/create-flight.dto';
import { UpdateFlightDto } from '../dtos/update-flight.dto';
import { FlightRepository } from 'src/repositories/flight.repository';

@Controller('flights')
export class FlightController {
  constructor(private readonly flightRepository: FlightRepository) {}

  @Post()
  async create(@Body() createFlightDto: CreateFlightDto) {
    try {
      const flight = await this.flightRepository.create(createFlightDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Flight added successfully',
        data: flight,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to add flight',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      const flights = await this.flightRepository.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Flights fetched successfully',
        data: flights,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to fetch flights',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const flight = await this.flightRepository.findOne(+id);
      if (!flight) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: `Flight with ID ${id} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        statusCode: HttpStatus.OK,
        message: 'Flight fetched successfully',
        data: flight,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to fetch flight',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ) {
    try {
      const flight = await this.flightRepository.update(+id, updateFlightDto);
      return {
        statusCode: HttpStatus.OK,
        message: 'Flight updated successfully',
        data: flight,
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to update flight',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.flightRepository.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Flight deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message: error.message || 'Failed to delete flight',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
