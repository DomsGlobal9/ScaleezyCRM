import { useQuery } from '@tanstack/react-query';
import { crmApi } from '../services/api';
import { CrmHealthResponse } from '../types';

export function useHealthCheck() {
  return useQuery<CrmHealthResponse, Error>({
    queryKey: ['healthCheck'],
    queryFn: () => crmApi.getHealth(),
    refetchInterval: 5000, // Poll health status dynamically
  });
}
