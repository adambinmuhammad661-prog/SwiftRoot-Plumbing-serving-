export interface Service {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  category: 'emergency' | 'repair' | 'installation' | 'maintenance';
  iconName: string;
  popular?: boolean;
}

export interface Area {
  name: string;
  postcode: string;
  engineersAvailable: number;
  avgResponseMs: number; // in minutes
  coordinates: { x: number; y: number }; // percentage coordinates in custom map SVG
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  date: string;
  verified: boolean;
  service: string;
}

export interface Booking {
  id: string;
  serviceId: string;
  customerName: string;
  email: string;
  phone: string;
  postcode: string;
  date: string;
  timeSlot: string;
  notes?: string;
  urgent: boolean;
  status: 'pending' | 'confirmed' | 'dispatched' | 'completed';
}

export interface EmergencyTicket {
  id: string;
  issue: string;
  urgency: 'high' | 'critical' | 'severe';
  area: string;
  phone: string;
  status: 'received' | 'assigning' | 'en_route' | 'arrived';
  eta: number; // minutes
  engineerName?: string;
  estimatedCost: string;
}
