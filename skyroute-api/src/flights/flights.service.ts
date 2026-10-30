import { Injectable } from '@nestjs/common';
import { MockFlightProvider } from './mock-flight.provider';

@Injectable()
export class FlightsService {
  constructor(private readonly mockProvider: MockFlightProvider) {}

  async searchFlights(query: any) {
    // Yahan hum baad mein check karenge ke asli API (Amadeus) use karni hai ya Mock
    return this.mockProvider.searchFlights(query);
  }
}
