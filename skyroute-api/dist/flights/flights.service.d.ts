import { MockFlightProvider } from './mock-flight.provider';
export declare class FlightsService {
    private readonly mockProvider;
    constructor(mockProvider: MockFlightProvider);
    searchFlights(query: any): Promise<{
        id: string;
        airline: string;
        flightNumber: string;
        origin: any;
        destination: any;
        departureDate: any;
        departureTime: string;
        arrivalTime: string;
        duration: string;
        price: number;
        currency: string;
        stops: number;
    }[]>;
}
