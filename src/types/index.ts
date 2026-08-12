export interface BaseApiResponse {
  success: boolean;
}

export interface CrmRootResponse extends BaseApiResponse {
  service: string;
  version: string;
  status: string;
}

export interface CrmHealthResponse extends BaseApiResponse {
  service: string;
  status: string;
  supabaseConfigured: boolean;
}

export interface ApiError {
  code: string;
  message: string;
}

export interface ErrorApiResponse extends BaseApiResponse {
  success: false;
  error: ApiError;
}

export interface TryOnItem {
  id: string;
  name: string;
  category: string;
  price: string;
  priceNumber: number;
  date: string;
  status: 'Tried' | 'Purchased';
  tag: 'Festive' | 'Bridal' | 'Casual' | 'Party';
  feedback: string | null;
  image: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  initials: string;
  role: string;
  totalItems: number;
  conversionRate: string;
  mostTriedCategory: string;
  dateRange: string;
  phone: string;
  email: string;
  birthday: string;
  loyaltyTier: string;
  lifetimeValue: string;
  loyaltyScore: number;
  topColors: string[];
  sizes: string[];
  categorySplit: { category: string; percentage: number }[];
  occasions: string[];
  interactions: {
    type: 'whatsapp' | 'note' | 'order' | 'try-on';
    title: string;
    date: string;
    content: string;
    metadata?: string;
  }[];
}

export interface CustomerListItem {
  id: string;
  name: string;
  initials: string;
  phone: string;
  lastPurchase: string;
  ltv: string;
  tier: string;
  tryOns: number;
}

export interface CustomerProfileResponse extends BaseApiResponse {
  data: CustomerProfile;
}

export interface CustomerTryOnsResponse extends BaseApiResponse {
  data: TryOnItem[];
}

export interface CustomerListResponse extends BaseApiResponse {
  data: CustomerListItem[];
}
