import { IsNotEmpty } from 'class-validator';

export class CreateFlightDto {
  @IsNotEmpty()
  originCep: string;
  @IsNotEmpty()
  originCountry: string;
  @IsNotEmpty()
  originCity: string;
  @IsNotEmpty()
  originState: string;
  @IsNotEmpty()
  destinationCep: string;
  @IsNotEmpty()
  destinationCountry: string;
  @IsNotEmpty()
  destinationCity: string;
  @IsNotEmpty()
  destinationState: string;
  @IsNotEmpty()
  date: Date;
}
