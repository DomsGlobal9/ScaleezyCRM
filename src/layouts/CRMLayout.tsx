import { Outlet } from 'react-router-dom';

export function CRMLayout() {
  return (
    <div className="min-h-screen bg-brand-bg text-brand-text">
      <Outlet />
    </div>
  );
}
