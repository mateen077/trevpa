export interface Airport { code: string; city: string; name: string; country: string }
export interface FlightSegment {
  id: string; airline: string; airlineName: string; flightNumber: string;
  origin: Airport; destination: Airport;
  departureLocal: string; arrivalLocal: string;
  durationMinutes: number; stops: number;
  baggage: { cabinKg: number; checkedKg: number };
}
export interface FlightOffer {
  id: string; tripType: 'round_trip' | 'one_way' | 'multi_city';
  outbound: FlightSegment[]; inbound?: FlightSegment[];
  pricing: { currency: string; base: number; taxes: number; total: number; includesTaxes: boolean };
  fareConditions: { refundable: boolean; changeable: boolean; baggageIncluded: boolean };
  seatsAvailable: number;
}

export const AIRPORTS: Airport[] = [
  { code:'LHE', city:'Lahore', name:'Allama Iqbal Intl', country:'Pakistan' },
  { code:'KHI', city:'Karachi', name:'Jinnah Intl', country:'Pakistan' },
  { code:'ISB', city:'Islamabad', name:'Islamabad Intl', country:'Pakistan' },
  { code:'DXB', city:'Dubai', name:'Dubai Intl', country:'UAE' },
  { code:'AUH', city:'Abu Dhabi', name:'Zayed Intl', country:'UAE' },
  { code:'DOH', city:'Doha', name:'Hamad Intl', country:'Qatar' },
  { code:'IST', city:'Istanbul', name:'Istanbul Airport', country:'Turkey' },
  { code:'LHR', city:'London', name:'Heathrow', country:'UK' },
  { code:'JFK', city:'New York', name:'John F. Kennedy', country:'USA' },
  { code:'KUL', city:'Kuala Lumpur', name:'KLIA', country:'Malaysia' },
];

const AIRLINES = [
  { code:'EK', name:'Emirates' }, { code:'QR', name:'Qatar Airways' },
  { code:'PK', name:'Pakistan Intl' }, { code:'TK', name:'Turkish Airlines' },
  { code:'EY', name:'Etihad' }, { code:'SQ', name:'Singapore Airlines' },
];

function pad(n: number) { return n.toString().padStart(2,'0'); }
function fmtTime(h: number, m: number) { return `${pad(h)}:${pad(m)}`; }

export function generateOffers(params: {
  origin: Airport; destination: Airport; departureDate: string;
  returnDate?: string; tripType: 'round_trip' | 'one_way' | 'multi_city';
  passengers: number;
}): FlightOffer[] {
  const offers: FlightOffer[] = [];
  const baseDate = new Date(params.departureDate);
  for (let i = 0; i < 10; i++) {
    const c = AIRLINES[i % AIRLINES.length];
    const duration = 180 + (i % 5) * 60;
    const depH = 6 + (i * 2) % 16;
    const depM = (i * 15) % 60;
    const arrTotalMin = depH * 60 + depM + duration;
    const arrH = Math.floor(arrTotalMin / 60) % 24;
    const arrM = arrTotalMin % 60;
    const base = 48000 + i * 4200;
    const taxes = Math.round(base * 0.14);
    const stops = i % 3 === 0 ? 0 : (i % 3 === 1 ? 1 : 2);

    const dDate = baseDate.toISOString().slice(0, 10);
    const segment: FlightSegment = {
      id: `seg-${i}`,
      airline: c.code, airlineName: c.name,
      flightNumber: `${c.code}-${100 + i * 7}`,
      origin: params.origin, destination: params.destination,
      departureLocal: `${dDate}T${fmtTime(depH,depM)}:00`,
      arrivalLocal: `${dDate}T${fmtTime(arrH,arrM)}:00`,
      durationMinutes: duration, stops,
      baggage: { cabinKg: 7, checkedKg: 25 + (i % 3) * 5 },
    };

    let inbound: FlightSegment[] | undefined;
    if (params.tripType === 'round_trip' && params.returnDate) {
      inbound = [{
        ...segment,
        id: `seg-${i}-r`,
        origin: params.destination, destination: params.origin,
        departureLocal: `${params.returnDate}T${fmtTime(10,30)}:00`,
        arrivalLocal: `${params.returnDate}T${fmtTime(14,45)}:00`,
        flightNumber: `${c.code}-${200 + i * 7}`,
      }];
    }

    offers.push({
      id: `offer-${i}`,
      tripType: params.tripType,
      outbound: [segment],
      inbound,
      pricing: { currency:'PKR', base, taxes, total: base + taxes, includesTaxes: true },
      fareConditions: {
        refundable: i % 4 === 0,
        changeable: i % 2 === 0,
        baggageIncluded: true,
      },
      seatsAvailable: 9 - (i % 5),
    });
  }
  return offers;
}
