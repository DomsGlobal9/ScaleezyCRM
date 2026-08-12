import { QueryClientProvider } from '@tanstack/react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { queryClient } from './lib/queryClient';
import { CRMLayout } from './layouts/CRMLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TryOnHistoryPage } from './pages/customers/TryOnHistoryPage';
import { CustomerListPage } from './pages/customers/CustomerListPage';
import { CustomerProfilePage } from './pages/customers/CustomerProfilePage';
import { TryOnDetailPage } from './pages/customers/TryOnDetailPage';
import { AbandonedTryOnPage } from './pages/features/AbandonedTryOnPage';
import { StylePreferencePage } from './pages/features/StylePreferencePage';
import { SegmentDashboardPage } from './pages/features/SegmentDashboardPage';
import { CustomerSegmentsPage } from './pages/features/CustomerSegmentsPage';
import { DigiLoyaltyScorePage } from './pages/features/DigiLoyaltyScorePage';
import { WhatsAppConnectPage } from './pages/features/WhatsAppConnectPage';
import { CampaignFollowUpsPage } from './pages/features/CampaignFollowUpsPage';
import { ReminderCenterPage } from './pages/features/ReminderCenterPage';
import { AddCustomerPage } from './pages/features/AddCustomerPage';
import { MockFeaturePage } from './pages/MockFeaturePage';
import { FoundationPage } from './pages/foundation/FoundationPage';

// Configure client-side page routing
const router = createBrowserRouter([
  {
    path: '/',
    element: <CRMLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'customers',
        element: <CustomerListPage />,
      },
      {
        path: 'customers/:id',
        element: <CustomerProfilePage />,
      },
      {
        path: 'customers/:id/try-on-history',
        element: <TryOnHistoryPage />,
      },
      {
        path: 'customers/:id/try-ons/:itemId',
        element: <TryOnDetailPage />,
      },
      {
        path: 'feature/abandoned-try-on',
        element: <AbandonedTryOnPage />,
      },
      {
        path: 'feature/style-preference',
        element: <StylePreferencePage />,
      },
      {
        path: 'feature/segment-dashboard',
        element: <SegmentDashboardPage />,
      },
      {
        path: 'feature/customer-segments',
        element: <CustomerSegmentsPage />,
      },
      {
        path: 'feature/digiloyalty-score',
        element: <DigiLoyaltyScorePage />,
      },
      {
        path: 'feature/whatsapp-connect',
        element: <WhatsAppConnectPage />,
      },
      {
        path: 'feature/campaign-follow-ups',
        element: <CampaignFollowUpsPage />,
      },
      {
        path: 'feature/reminder-center',
        element: <ReminderCenterPage />,
      },
      {
        path: 'feature/add-customer',
        element: <AddCustomerPage />,
      },
      {
        path: 'feature/:slug',
        element: <MockFeaturePage />,
      },
      {
        path: 'foundation',
        element: <FoundationPage />,
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
