import { PrismaService } from './infra/database/prisma.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FlightController } from './http/controllers/flight.controller';
import { PrismaFlightRepository } from './repositories/prisma/prisma-flight.repository';
import { FlightRepository } from './repositories/flight.repository';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [FlightController],
  providers: [
    PrismaService,
    {
      provide: FlightRepository,
      useClass: PrismaFlightRepository,
    },
  ],
})
export class AppModule {}
