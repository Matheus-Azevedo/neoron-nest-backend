import { CreateFlightDto } from './create-flight.dto';

export class GetFlightDto extends CreateFlightDto {
  id: number;
  code: string;
}
