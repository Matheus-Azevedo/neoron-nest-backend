import { ApiProperty } from '@nestjs/swagger';
import { CreateFlightDto } from './create-flight.dto';

export class GetFlightDto extends CreateFlightDto {
  @ApiProperty({ description: 'Flight ID', example: 1 })
  id: number;

  @ApiProperty({
    description: 'Flight code',
    example: 'b9d6b451-234a-4159-a0b5-55fa4f3addbd',
  })
  code: string;
}
