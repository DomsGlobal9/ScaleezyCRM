import { useHealthCheck } from '../../hooks/useHealthCheck';
import { Activity, Server, Database, XCircle } from 'lucide-react';

export function FoundationPage() {
  const { data, isLoading, isError, error } = useHealthCheck();

  const isBackendConnected = !isError && !!data;
  const isSupabaseConfigured = isBackendConnected && !!data?.supabaseConfigured;

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text font-sans">
      {/* Header */}
      <header className="border-b border-brand-border py-4 px-6 bg-brand-card">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              ScaleEasy CRM
            </span>
            <span className="px-2 py-0.5 text-xs font-semibold rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              Foundation Phase
            </span>
          </div>
          <div className="text-xs text-brand-textMuted">
            Local Dev Mode
          </div>
        </div>
      </header>

      {/* Main Panel */}
      <main className="flex-grow max-w-6xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4 bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
            System Connectivity Status
          </h1>
          <p className="max-w-xl mx-auto text-brand-textMuted text-base">
            Live verification of components, endpoints, and backend resource checks.
          </p>
        </div>

        {/* Dashboard Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto w-full">
          {/* Frontend Status */}
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 flex flex-col justify-between shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-brand-text">Frontend</h3>
                <p className="text-xs text-brand-textMuted mt-1">React web client layer</p>
              </div>
              <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                <Activity size={20} />
              </div>
            </div>
            <div className="mt-8 flex items-center justify-between">
              <span className="text-sm font-medium">Status</span>
              <div className="flex items-center space-x-2">
                <span className="h-2.5 w-2.5 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-semibold text-green-400">Running</span>
              </div>
            </div>
          </div>

          {/* Backend Express API Status */}
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 flex flex-col justify-between shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-brand-text">Backend API</h3>
                <p className="text-xs text-brand-textMuted mt-1">Express API service</p>
              </div>
              <div className={`p-2.5 rounded-lg ${isBackendConnected ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`}>
                <Server size={20} />
              </div>
            </div>
            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-textMuted">Checking...</span>
                  <div className="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Connection</span>
                    <div className="flex items-center space-x-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${isBackendConnected ? 'bg-green-500' : 'bg-red-500'}`} />
                      <span className={`text-sm font-semibold ${isBackendConnected ? 'text-green-400' : 'text-red-400'}`}>
                        {isBackendConnected ? 'Connected' : 'Disconnected'}
                      </span>
                    </div>
                  </div>
                  {!isBackendConnected && (
                    <p className="text-xs text-red-400/90 text-right italic">
                      CRM API is unavailable.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Supabase Status */}
          <div className="bg-brand-card border border-brand-border rounded-xl p-6 flex flex-col justify-between shadow-lg">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-brand-text">Supabase</h3>
                <p className="text-xs text-brand-textMuted mt-1">Database & Auth environment</p>
              </div>
              <div className={`p-2.5 rounded-lg ${isSupabaseConfigured ? 'bg-indigo-500/10 text-indigo-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                <Database size={20} />
              </div>
            </div>
            <div className="mt-8">
              {isLoading ? (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-brand-textMuted">Checking...</span>
                  <div className="h-4 w-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Configuration</span>
                  <div className="flex items-center space-x-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${isSupabaseConfigured ? 'bg-indigo-400' : 'bg-yellow-500'}`} />
                    <span className={`text-sm font-semibold ${isSupabaseConfigured ? 'text-indigo-400' : 'text-yellow-400'}`}>
                      {isSupabaseConfigured ? 'Configured' : 'Not Configured'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Network Error Warning */}
        {isError && error && (
          <div className="mt-8 max-w-4xl mx-auto w-full p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-400">
            <div className="flex items-center space-x-2">
              <XCircle size={16} />
              <span className="font-semibold">Network Warning:</span>
              <span>{error.message || 'Could not reach CRM API service.'}</span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-brand-border py-6 px-6 bg-brand-card">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-brand-textMuted space-y-4 md:space-y-0">
          <div>ScaleEasy CRM Microservice - Foundation Architecture Phase</div>
          <div className="flex space-x-6">
            <span>React v18</span>
            <span>Express v4</span>
            <span>Supabase Client</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
