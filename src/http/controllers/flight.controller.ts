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
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetFlightDto } from '../dtos/get-flight.dto';

@Controller('flights')
@ApiTags('Flights  Endpoints')
export class FlightController {
  constructor(private readonly flightRepository: FlightRepository) {}

  @Post()
  @ApiOperation({ summary: 'Create a new flight' }) // Descrição do endpoint
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Flight created successfully',
    type: GetFlightDto,
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Invalid input' })
  async create(@Body() createFlightDto: CreateFlightDto): Promise<{
    statusCode: number;
    message: string;
    data: GetFlightDto;
  }> {
    try {
      const flight = await this.flightRepository.create(createFlightDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Flight created successfully',
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
  @ApiOperation({ summary: 'Retrieve all flights' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of flights',
    type: [GetFlightDto],
  })
  async findAll(): Promise<{
    statusCode: number;
    message: string;
    data: GetFlightDto[];
  }> {
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
  @ApiOperation({ summary: 'Retrieve a flight by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Flight ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Flight fetched successfully',
    type: GetFlightDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Flight not found',
  })
  async findOne(@Param('id') id: string): Promise<{
    statusCode: number;
    message: string;
    data: GetFlightDto;
  }> {
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
  @ApiOperation({ summary: 'Update a flight by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Flight ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Flight updated successfully',
    type: UpdateFlightDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Flight not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateFlightDto: UpdateFlightDto,
  ): Promise<{
    statusCode: number;
    message: string;
    data: UpdateFlightDto;
  }> {
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
  @ApiOperation({ summary: 'Delete a flight by ID' })
  @ApiParam({ name: 'id', type: Number, description: 'Flight ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Flight deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Flight not found',
  })
  async remove(@Param('id') id: string): Promise<{
    statusCode: number;
    message: string;
  }> {
    try {
      await this.flightRepository.remove(+id);
      return {
        statusCode: HttpStatus.NO_CONTENT,
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
