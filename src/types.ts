export type DestinationCategory = 'all' | 'beach' | 'mountain' | 'luxury' | 'culture' | 'city';

export interface Destination {
  id: string;
  name: string;
  location: string;
  region: 'Bắc' | 'Trung' | 'Nam' | 'Quốc tế';
  regionLabel?: string;
  tagline?: string;
  category: DestinationCategory;
  image: string;
  gallery: string[];
  description: string;
  longDescription: string;
  rating: number;
  reviewsCount: number;
  priceFrom: number; // in VND
  bestTimeToVisit: string;
  weather: {
    temp: string;
    condition: string;
    humidity: string;
  };
  highlights: string[];
  famousFoods: string[];
  tags: string[];
  featured?: boolean;
}

export interface RoomType {
  id: string;
  name: string;
  pricePerNight: number;
  originalPrice?: number;
  capacity: string;
  bedType: string;
  area: string;
  image: string;
  perks: string[];
  availableRooms: number;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  address: string;
  rating: number;
  starRating: number;
  reviewsCount: number;
  pricePerNight: number;
  originalPrice: number;
  image: string;
  gallery: string[];
  description: string;
  amenities: string[];
  roomTypes: RoomType[];
  locationTag: string;
  distanceToCenter: string;
}

export type TransportType = 'flight' | 'bus' | 'train';

export interface TransportTicket {
  id: string;
  type: TransportType;
  provider: string;
  providerLogo?: string;
  code: string; // e.g. VN-214 or FUTA-09
  fromCity: string;
  fromLocation: string;
  toCity: string;
  toLocation: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  price: number;
  originalPrice?: number;
  classType: string;
  baggageInfo?: string;
  amenities: string[];
  availableSeats: number;
}

export interface Booking {
  id: string;
  userId?: string;
  type: 'hotel' | 'flight' | 'bus' | 'train';
  status: 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  totalPrice: number;
  paid: boolean;
  paymentMethod: string;
  promoCodeApplied?: string;
  discountAmount?: number;
  specialRequests?: string;
  transportTicket?: TransportTicket;
  hotel?: Hotel;
  roomType?: RoomType;
  checkInDate?: string;
  checkOutDate?: string;
  departureDate?: string;
  quantity?: number;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatar?: string;
  savedDestinations?: string[];
  createdAt?: string;
}

export interface PromoCode {
  code: string;
  type?: 'percent' | 'fixed';
  value: number; // percent or fixed amount
  discountPercent?: number;
  fixedDiscount?: number;
  maxDiscount?: number;
  minSpend: number;
  description: string;
  active?: boolean;
  expiryDate?: string;
}

export interface AIPlanTripDay {
  day: number;
  title: string;
  morning: string;
  afternoon: string;
  evening: string;
  foodTips?: string;
}

export interface AIPlanTripResponse {
  title: string;
  destination: string;
  duration: string;
  estimatedBudget: string;
  summary: string;
  days: AIPlanTripDay[];
  packingTips?: string[];
  bestTips?: string;
}
