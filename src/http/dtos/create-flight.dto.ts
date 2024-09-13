import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class CreateFlightDto {
  @ApiProperty({ description: 'Origin postal code', example: '12345-678' })
  @IsString()
  @IsNotEmpty()
  originCep: string;

  @ApiProperty({ description: 'Origin country', example: 'USA' })
  @IsString()
  @IsNotEmpty()
  originCountry: string;

  @ApiProperty({ description: 'Origin city', example: 'New York' })
  @IsString()
  @IsNotEmpty()
  originCity: string;

  @ApiProperty({ description: 'Origin state', example: 'NY' })
  @IsString()
  @IsNotEmpty()
  originState: string;

  @ApiProperty({ description: 'Destination postal code', example: '12345-678' })
  @IsString()
  @IsNotEmpty()
  destinationCep: string;

  @ApiProperty({ description: 'Destination country', example: 'USA' })
  @IsString()
  @IsNotEmpty()
  destinationCountry: string;

  @ApiProperty({ description: 'Destination city', example: 'Los Angeles' })
  @IsString()
  @IsNotEmpty()
  destinationCity: string;

  @ApiProperty({ description: 'Destination state', example: 'CA' })
  @IsString()
  @IsNotEmpty()
  destinationState: string;

  @ApiProperty({
    description: 'Date of the flight',
    example: '2024-09-12T14:30:00Z', // Exemplo no formato ISO 8601
  })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  date: Date;
}
