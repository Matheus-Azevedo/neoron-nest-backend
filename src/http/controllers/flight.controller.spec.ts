import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from '../../http/controllers/flight.controller';
import { PrismaFlightRepository } from '../../repositories/prisma/prisma-flight.repository';
import { PrismaService } from '../../infra/database/prisma.service';
import { FlightRepository } from '../../repositories/flight.repository';
import { CreateFlightDto } from '../../http/dtos/create-flight.dto';
import { GetFlightDto } from '../../http/dtos/get-flight.dto';
import { HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto'; // Importando randomUUID para simular o comportamento

describe('FlightController', () => {
  let controller: FlightController;
  let flightRepository: FlightRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FlightController],
      providers: [
        PrismaService,
        {
          provide: FlightRepository,
          useClass: PrismaFlightRepository,
        },
      ],
    }).compile();

    controller = module.get<FlightController>(FlightController);
    flightRepository = module.get<FlightRepository>(FlightRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a flight successfully with a generated code', async () => {
      // Arrange
      const createFlightDto: CreateFlightDto = {
        originCep: '12345678',
        originCountry: 'Brazil',
        originCity: 'São Paulo',
        originState: 'SP',
        destinationCep: '87654321',
        destinationCountry: 'USA',
        destinationCity: 'New York',
        destinationState: 'NY',
        date: new Date(),
      };

      const generatedCode = randomUUID(); // Simulando o UUID gerado para o código

      const getFlightDto: GetFlightDto = {
        id: 1,
        code: generatedCode, // Simulando o código gerado como UUID
        originCep: '12345678',
        originCountry: 'Brazil',
        originCity: 'São Paulo',
        originState: 'SP',
        destinationCep: '87654321',
        destinationCountry: 'USA',
        destinationCity: 'New York',
        destinationState: 'NY',
        date: new Date(),
      };

      // Mocking the create method to return the flight with the generated code
      jest.spyOn(flightRepository, 'create').mockResolvedValue(getFlightDto);

      // Act
      const result = await controller.create(createFlightDto);

      // Assert
      expect(result).toEqual({
        statusCode: HttpStatus.CREATED,
        message: 'Flight created successfully',
        data: getFlightDto,
      });
      expect(flightRepository.create).toHaveBeenCalledWith(createFlightDto);
    });

    it('should throw an error if creation fails', async () => {
      // Arrange
      const createFlightDto: CreateFlightDto = {
        originCep: '12345678',
        originCountry: 'Brazil',
        originCity: 'São Paulo',
        originState: 'SP',
        destinationCep: '87654321',
        destinationCountry: 'USA',
        destinationCity: 'New York',
        destinationState: 'NY',
        date: new Date(),
      };

      // Simulando erro na criação
      jest
        .spyOn(flightRepository, 'create')
        .mockRejectedValue(new Error('Creation error'));

      // Act & Assert
      await expect(controller.create(createFlightDto)).rejects.toThrowError(
        'Creation error',
      );
    });
  });
});
