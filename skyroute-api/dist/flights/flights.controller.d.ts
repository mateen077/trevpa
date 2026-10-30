import { FlightsService } from './flights.service';
export declare class FlightsController {
    private readonly flightsService;
    constructor(flightsService: FlightsService);
    search(query: any): Promise<{
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
