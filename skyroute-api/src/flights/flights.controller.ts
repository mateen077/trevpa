import { Controller, Post, Body } from '@nestjs/common';
import { FlightsService } from './flights.service';

@Controller('flights')
export class FlightsController {
  constructor(private readonly flightsService: FlightsService) {}

  @Post('search')
  async search(@Body() query: any) {
    return this.flightsService.searchFlights(query);
  }
}
