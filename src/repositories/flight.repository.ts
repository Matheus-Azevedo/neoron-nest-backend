import { CreateFlightDto } from 'src/http/dtos/create-flight.dto';
import { GetFlightDto } from 'src/http/dtos/get-flight.dto';
import { UpdateFlightDto } from 'src/http/dtos/update-flight.dto';

export abstract class FlightRepository {
  abstract create(createFlightDto: CreateFlightDto): Promise<GetFlightDto>;
  abstract findAll(): Promise<GetFlightDto[]>;
  abstract findOne(id: number): Promise<GetFlightDto>;
  abstract update(
    id: number,
    updateFlightDto: UpdateFlightDto,
  ): Promise<UpdateFlightDto>;
  abstract remove(id: number): Promise<void>;
}
