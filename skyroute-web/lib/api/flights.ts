import { api } from './client';

export interface FlightSearchQuery {
  origin: string;
  destination: string;
  departureDate: string;
  passengers: { adults: number; children: number; infants: number };
  cabin: string;
}

export const searchFlights = async (query: FlightSearchQuery) => {
  const response = await api.post('/flights/search', query);
  return response.data;
};
