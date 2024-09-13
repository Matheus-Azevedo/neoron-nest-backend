import { Test, TestingModule } from '@nestjs/testing';
import { FlightController } from '../../src/http/controllers/flight.controller';
import { PrismaFlightRepository } from '../../src/repositories/prisma/prisma-flight.repository';
import { PrismaService } from 'src/infra/database/prisma.service';
import { FlightRepository } from 'src/repositories/flight.repository';

describe('FlightController', () => {
  let controller: FlightController;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
