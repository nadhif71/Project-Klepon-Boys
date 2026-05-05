export type TransportType = 'plane' | 'train' | 'bus' | 'other' | 'none';
export interface ConcertPlan {
  id: string;
  concertName: string;
  concertDate: string;
  location: string;
  origin?: string;

  // Step 1: Ticket
  ticketStatus: 'booked' | 'none';
  ticketPrice?: number;

  // Step 2: Transport to Jakarta
  transportTo: {
    type: TransportType;
    bookingStatus: 'booked' | 'none';
    details?: string;
  };

  // Step 3: Hotel
  hotel: {
    name: string;
    bookingStatus: 'booked' | 'none';
    checkIn?: string;
    checkOut?: string;
  };

  // Step 4: Local Transport to Venue (Optional)
  localToVenue: {
    type: string;
    skipped: boolean;
  };

  // Step 5: Local Transport back to Hotel (Optional)
  localToHotel: {
    type: string;
    skipped: boolean;
  };

  // Step 6: Transport back home
  transportFrom: {
    type: TransportType;
    bookingStatus: 'booked' | 'none';
    details?: string;
  };

  createdAt: number;
}
