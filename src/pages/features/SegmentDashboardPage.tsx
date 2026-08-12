import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Users, ShieldCheck } from 'lucide-react';

export function SegmentDashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const segments = [
    { title: 'High Value VIPs', count: '1,240', ltv: '₹2.5L+', color: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
    { title: 'Festive Shoppers', count: '890', ltv: '₹80k+', color: 'bg-amber-50 border-amber-200 text-amber-800' },
    { title: 'Bridal Prospects', count: '310', ltv: '₹1.8L+', color: 'bg-rose-50 border-rose-200 text-rose-800' },
    { title: 'At-Risk Gold Members', count: '145', ltv: '₹1.2L+', color: 'bg-purple-50 border-purple-200 text-purple-800' }
  ];

  return (
    <div className="flex h-screen bg-[#f9f5ee] font-sans text-slate-800 overflow-hidden">
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[266px] bg-[#101e12] border-r border-white/5 transition-transform duration-300 transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center h-20 px-6 border-b border-white/10 bg-[#111e12]">
          <img alt="ScaleEasy Logo" className="h-8 object-contain" src="/assets/857ff301f7d61d5680d29be7958b8a40d0270e61.svg" />
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-white md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
          <div>
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-slate-300 hover:text-[#89b825] hover:bg-[#243118]/50 transition text-left">
              <img src="/assets/3ea5df18d105d2f0099be76abfe25352daf0a6d2.svg" className="w-5 h-5 opacity-70" alt="Dashboard" />
              <span>CRM Dashboard</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Customers</span>
              <Users size={12} />
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/customers')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer List</button>
              <button onClick={() => navigate('/customers/meera-reddy')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Profile Card</button>
              <button onClick={() => navigate('/customers/meera-reddy')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Timeline</button>
              <button onClick={() => navigate('/feature/add-customer')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Add Customer (Manual)</button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Try-On Intelligence</span>
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/customers/meera-reddy/try-on-history')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Try-On History Panel</button>
              <button onClick={() => navigate('/feature/abandoned-try-on')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Abandoned Try-On</button>
              <button onClick={() => navigate('/feature/style-preference')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Style Preference</button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-[#89b825] uppercase tracking-wider">
              <span>Segments & Loyalty</span>
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/feature/segment-dashboard')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left">
                <span>Segment Dashboard</span>
              </button>
              <button onClick={() => navigate('/feature/digiloyalty-score')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">DigiLoyalty Score</button>
              <button onClick={() => navigate('/feature/customer-segments')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Segments</button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Communication</span>
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/feature/whatsapp-connect')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">WhatsApp Connect</button>
              <button onClick={() => navigate('/feature/campaign-follow-ups')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Campaign Follow-Ups</button>
              <button onClick={() => navigate('/feature/reminder-center')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Reminder Center</button>
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-white/10 bg-[#162719]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#232e1a] border border-white/5 hover:border-white/15 cursor-pointer transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#95c412] text-[#101e12] font-bold text-sm">AM</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Anjali Manager</p>
              <p className="text-[10px] text-slate-400 truncate">Boutique Owner</p>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-grow flex flex-col overflow-hidden">
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-stone-200">
          <div className="flex items-center flex-1 max-w-lg gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden">
              <Menu size={20} />
            </button>
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-500">
                <Search size={18} />
              </span>
              <input type="text" placeholder="Search segments..." className="w-full h-11 pl-11 pr-4 text-sm bg-[#f3e9dd] border-0 rounded-full text-stone-800 outline-none" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">CRM Dashboard</span>
              <span>/</span>
              <span className="text-[#89b825]">Segment Dashboard</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Customer Segment Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">Real-time behavioral and LTV cluster segmentation.</p>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg border border-emerald-200 uppercase tracking-wider">
                <ShieldCheck size={14} />
                <span>Auto-Updating</span>
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {segments.map((seg, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${seg.color} text-left shadow-sm space-y-2`}>
                  <h4 className="text-xs font-bold uppercase tracking-wider">{seg.title}</h4>
                  <p className="text-2xl font-black">{seg.count}</p>
                  <p className="text-xs font-medium opacity-80">Avg LTV: {seg.ltv}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
