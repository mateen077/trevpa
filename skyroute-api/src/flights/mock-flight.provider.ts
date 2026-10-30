import { Injectable } from '@nestjs/common';

@Injectable()
export class MockFlightProvider {
  async searchFlights(query: any) {
    // Fake data generate kar rahe hain test ke liye
    return Array.from({ length: 5 }).map((_, i) => ({
      id: `mock-offer-${i}-${Date.now()}`,
      airline: ['Emirates', 'Qatar Airways', 'PIA', 'Turkish Airlines'][i % 4],
      flightNumber: `FL-${100 + i}`,
      origin: query.origin,
      destination: query.destination,
      departureDate: query.departureDate,
      departureTime: `0${8 + i}:00`,
      arrivalTime: `1${2 + i}:30`,
      duration: `${2 + i}h ${15 * i}m`,
      price: 75000 + i * 5000,
      currency: 'PKR',
      stops: i % 2 === 0 ? 0 : 1,
    }));
  }
}
