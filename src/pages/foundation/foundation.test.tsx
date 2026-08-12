import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FoundationPage } from './FoundationPage';
import * as healthHook from '../../hooks/useHealthCheck';

vi.mock('../../hooks/useHealthCheck', () => ({
  useHealthCheck: vi.fn(),
}));

describe('FoundationPage Component Tests', () => {
  it('renders loading states on init', () => {
    vi.mocked(healthHook.useHealthCheck).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    } as any);

    render(<FoundationPage />);

    expect(screen.getByText('ScaleEasy CRM')).toBeDefined();
    expect(screen.getByText('System Connectivity Status')).toBeDefined();
    expect(screen.getAllByText('Checking...').length).toBe(2);
  });

  it('displays Connected and Configured indicators when backend responds successfully', () => {
    vi.mocked(healthHook.useHealthCheck).mockReturnValue({
      data: {
        success: true,
        service: 'scaleeasy-crm-api',
        status: 'healthy',
        supabaseConfigured: true,
      },
      isLoading: false,
      isError: false,
      error: null,
    } as any);

    render(<FoundationPage />);

    expect(screen.getByText('Connected')).toBeDefined();
    expect(screen.getByText('Configured')).toBeDefined();
  });

  it('displays Disconnected and Not Configured indicators when API is unreachable', () => {
    vi.mocked(healthHook.useHealthCheck).mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: new Error('Failed to connect to backend'),
    } as any);

    render(<FoundationPage />);

    expect(screen.getByText('Disconnected')).toBeDefined();
    expect(screen.getByText('Not Configured')).toBeDefined();
    expect(screen.getByText('CRM API is unavailable.')).toBeDefined();
    expect(screen.getByText('Failed to connect to backend')).toBeDefined();
  });
});
