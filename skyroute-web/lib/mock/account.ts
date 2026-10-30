export interface MockBooking {
  id: string;
  reference: string;
  pnr: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'ticketed';
  route: string;
  departure: string;
  arrival: string;
  total: number;
  currency: string;
  createdAt: string;
}

export interface MockRequest {
  caseId: string;
  subject: string;
  category: string;
  description: string;
  bookingRef?: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  lastUpdate: string;
  createdAt: string;
  messages: { author: 'user' | 'agent'; body: string; at: string }[];
}

export const MOCK_BOOKINGS: MockBooking[] = [
  {
    id: 'b_1', reference: 'SR-7H2K9Q', pnr: 'PNRMOCK1', status: 'confirmed',
    route: 'Lahore (LHE) to Dubai (DXB)', departure: '2025-11-12T08:30:00',
    arrival: '2025-11-12T12:15:00', total: 78500, currency: 'PKR',
    createdAt: '2025-10-05T10:22:00',
  },
  {
    id: 'b_2', reference: 'SR-3P8M1L', pnr: 'PNRMOCK2', status: 'ticketed',
    route: 'Karachi (KHI) to Istanbul (IST)', departure: '2025-12-02T22:10:00',
    arrival: '2025-12-03T06:55:00', total: 112000, currency: 'PKR',
    createdAt: '2025-09-28T14:10:00',
  },
];

export const MOCK_REQUESTS: MockRequest[] = [
  {
    caseId: 'CASE-2401', subject: 'Baggage allowance question', category: 'Baggage',
    description: 'How much checked baggage is included on my Dubai flight?',
    bookingRef: 'SR-7H2K9Q', status: 'in_progress',
    lastUpdate: '2025-10-06T09:12:00', createdAt: '2025-10-04T16:45:00',
    messages: [
      { author: 'user', body: 'How much checked baggage is included?', at: '2025-10-04T16:45:00' },
      { author: 'agent', body: 'Hi! Your fare includes 25kg checked baggage per adult passenger.', at: '2025-10-06T09:12:00' },
    ],
  },
  {
    caseId: 'CASE-2389', subject: 'Invoice for company records', category: 'Billing',
    description: 'Please provide a detailed invoice with tax breakdown.',
    bookingRef: 'SR-3P8M1L', status: 'resolved',
    lastUpdate: '2025-10-02T11:00:00', createdAt: '2025-10-01T18:20:00',
    messages: [
      { author: 'user', body: 'Please provide a detailed invoice.', at: '2025-10-01T18:20:00' },
      { author: 'agent', body: 'Invoice emailed to your registered address.', at: '2025-10-02T11:00:00' },
    ],
  },
];
