import { CrmRootResponse, CrmHealthResponse, CustomerProfileResponse, CustomerTryOnsResponse, CustomerListResponse } from '../types';

export class CrmApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private async request<T>(path: string, options?: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { message: 'An unknown network error occurred.' };
      }
      throw new Error(errorData?.error?.message || errorData?.message || `HTTP error! Status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async getRoot(): Promise<CrmRootResponse> {
    return this.request<CrmRootResponse>('');
  }

  async getHealth(): Promise<CrmHealthResponse> {
    return this.request<CrmHealthResponse>('/health');
  }

  async getCustomerProfile(id: string): Promise<CustomerProfileResponse> {
    return this.request<CustomerProfileResponse>(`/customers/${id}`);
  }

  async getCustomerTryOns(id: string): Promise<CustomerTryOnsResponse> {
    return this.request<CustomerTryOnsResponse>(`/customers/${id}/try-ons`);
  }

  async getCustomers(): Promise<CustomerListResponse> {
    return this.request<CustomerListResponse>('/customers');
  }
}

const API_BASE_URL = import.meta.env.VITE_CRM_API_URL || 'http://localhost:4001/api/v1/crm';

// Centralized API client instance
export const crmApi = new CrmApiClient(API_BASE_URL);
