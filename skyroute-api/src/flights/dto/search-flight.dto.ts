export class SearchFlightDto {
  origin!: string;
  destination!: string;
  departureDate!: string;
  passengers!: {
    adults: number;
    children: number;
    infants: number;
  };
  cabin!: string;
}
