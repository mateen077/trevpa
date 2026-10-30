import { Module } from '@nestjs/common';
import { FlightsController } from './flights.controller';
import { FlightsService } from './flights.service';
import { MockFlightProvider } from './mock-flight.provider';

@Module({
  controllers: [FlightsController],
  providers: [FlightsService, MockFlightProvider],
})
export class FlightsModule {}
