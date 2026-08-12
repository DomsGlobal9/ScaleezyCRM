import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Search, 
  X, 
  Users,
  Menu,
  Info
} from 'lucide-react';

interface FeatureMeta {
  title: string;
  description: string;
  category: string;
  iconText: string;
}

const FEATURE_METADATA: Record<string, FeatureMeta> = {
  'customer-list': {
    title: 'Customer List',
    description: 'Browse and search through your complete boutique customer database. Filter by segments, loyalty, or recent purchase dates.',
    category: 'Customers',
    iconText: '📋'
  },
  'customer-profile-card': {
    title: 'Customer Profile Cards',
    description: 'Detailed shopper profiles, size measurements, purchase frequency, total spend, and custom styling profiles.',
    category: 'Customers',
    iconText: '🎴'
  },
  'customer-timeline': {
    title: 'Customer Timeline',
    description: 'Visual history of all shopper touchpoints, including trial sessions, purchases, notes, and WhatsApp messages.',
    category: 'Customers',
    iconText: '🕒'
  },
  'add-customer': {
    title: 'Add Customer (Manual)',
    description: 'Quickly onboard new walk-in clients, capture size specifications, contact numbers, and style preferences.',
    category: 'Customers',
    iconText: '➕'
  },
  'abandoned-try-on': {
    title: 'Abandoned Try-Ons',
    description: 'Automatic alerts when walk-in try-ons don\'t convert. Trigger custom WhatsApp reminder templates with boutique offers.',
    category: 'Try-On Intelligence',
    iconText: '⏳'
  },
  'style-preference': {
    title: 'Style Preferences',
    description: 'AI-driven customer styling profiles based on search queries, tried items, and preferred fabric categories.',
    category: 'Try-On Intelligence',
    iconText: '✨'
  },
  'segment-dashboard': {
    title: 'Segment Dashboard',
    description: 'Analyze boutique shopper cohorts. Target high-value brides, festive buyers, or dormant customers.',
    category: 'Segments & Loyalty',
    iconText: '📊'
  },
  'digiloyalty-score': {
    title: 'DigiLoyalty Score',
    description: 'Boutique loyalty points ledger. Compute shopper rewards and VIP tiers based on purchase histories.',
    category: 'Segments & Loyalty',
    iconText: '💎'
  },
  'customer-segments': {
    title: 'Customer Segments',
    description: 'Configure rules for dynamic customer grouping (e.g. \'Bridal Shoppers\' who spent over ₹50k).',
    category: 'Segments & Loyalty',
    iconText: '🏷️'
  },
  'whatsapp-connect': {
    title: 'WhatsApp Connect',
    description: 'Manage WhatsApp API integrations. Toggle automated birthday messages, campaigns, or try-on follow-ups.',
    category: 'Communication',
    iconText: '💬'
  },
  'campaign-follow-ups': {
    title: 'Campaign Follow-Ups',
    description: 'Drip marketing scheduler. Automatically check in on clients 2 weeks after their boutique trial.',
    category: 'Communication',
    iconText: '📨'
  },
  'reminder-center': {
    title: 'Reminder Center',
    description: 'Unified boutique calendar for staff tasks, customer birthday reminders, and bridal fittings.',
    category: 'Communication',
    iconText: '📅'
  }
};

export function MockFeaturePage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const feature = slug ? FEATURE_METADATA[slug] : null;

  if (!feature) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f9f5ee] font-sans">
        <div className="text-center space-y-4">
          <Info size={40} className="mx-auto text-amber-500" />
          <h2 className="text-xl font-bold">Feature not found</h2>
          <button onClick={() => navigate('/')} className="px-4 py-2 bg-[#101e12] text-[#89b825] rounded-xl text-sm font-semibold">
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#f9f5ee] font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Nav */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[266px] bg-[#101e12] border-r border-white/5 transition-transform duration-300 transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Logo Section */}
        <div className="flex items-center h-20 px-6 border-b border-white/10 bg-[#111e12]">
          <div className="flex items-center space-x-2">
            <img 
              alt="ScaleEasy Logo" 
              className="h-8 object-contain" 
              src="/assets/857ff301f7d61d5680d29be7958b8a40d0270e61.svg" 
            />
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-slate-400 hover:text-white md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
          
          {/* Main Dashboard Link */}
          <div>
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-slate-300 hover:text-[#89b825] hover:bg-[#243118]/50 transition text-left"
            >
              <img src="/assets/3ea5df18d105d2f0099be76abfe25352daf0a6d2.svg" className="w-5 h-5 opacity-70" alt="Dashboard Icon" />
              <span>CRM Dashboard</span>
            </button>
          </div>

          {/* Customers Section */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Customers</span>
              <Users size={12} />
            </div>
            <div className="space-y-1 pl-2">
              <button 
                onClick={() => navigate('/customers')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'customer-list' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Customer List
              </button>
              <button 
                onClick={() => navigate('/customers/meera-reddy')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'customer-profile-card' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Customer Profile Card
              </button>
              <button 
                onClick={() => navigate('/customers/meera-reddy')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'customer-timeline' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Customer Timeline
              </button>
              <button 
                onClick={() => navigate('/feature/add-customer')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'add-customer' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Add Customer (Manual)
              </button>
            </div>
          </div>

          {/* Try-On Intelligence Section */}
          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Try-On Intelligence</span>
            </div>
            <div className="space-y-1 pl-2">
              <button 
                onClick={() => navigate('/customers/meera-reddy/try-on-history')}
                className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition"
              >
                Try-On History Panel
              </button>
              <button 
                onClick={() => navigate('/feature/abandoned-try-on')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'abandoned-try-on' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Abandoned Try-On
              </button>
              <button 
                onClick={() => navigate('/feature/style-preference')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'style-preference' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Style Preference
              </button>
            </div>
          </div>

          {/* Segments & Loyalty */}
          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Segments & Loyalty</span>
            </div>
            <div className="space-y-1 pl-2">
              <button 
                onClick={() => navigate('/feature/segment-dashboard')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'segment-dashboard' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Segment Dashboard
              </button>
              <button 
                onClick={() => navigate('/feature/digiloyalty-score')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'digiloyalty-score' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                DigiLoyalty Score
              </button>
              <button 
                onClick={() => navigate('/feature/customer-segments')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'customer-segments' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Customer Segments
              </button>
            </div>
          </div>

          {/* Communication */}
          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Communication</span>
            </div>
            <div className="space-y-1 pl-2">
              <button 
                onClick={() => navigate('/feature/whatsapp-connect')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'whatsapp-connect' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                WhatsApp Connect
              </button>
              <button 
                onClick={() => navigate('/feature/campaign-follow-ups')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'campaign-follow-ups' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Campaign Follow-Ups
              </button>
              <button 
                onClick={() => navigate('/feature/reminder-center')}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${slug === 'reminder-center' ? 'text-[#89b825] bg-[#243118]/50 font-semibold' : 'text-slate-300 hover:text-[#89b825] hover:bg-white/5'}`}
              >
                Reminder Center
              </button>
            </div>
          </div>

        </nav>

        {/* User Card */}
        <div className="p-4 border-t border-white/10 bg-[#162719]">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-[#232e1a] border border-white/5 hover:border-white/15 cursor-pointer transition">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#95c412] text-[#101e12] font-bold text-sm">
              AM
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">Anjali Manager</p>
              <p className="text-[10px] text-slate-400 truncate">Boutique Owner</p>
            </div>
            <img src="/assets/e633efeb83668c75396c2b12e8911e5300507acf.svg" className="w-4 h-4 opacity-70" alt="Dropdown Arrow" />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-stone-200">
          <div className="flex items-center flex-1 max-w-lg gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg md:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-500">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                placeholder="Search products, SKUs, or try-ons..." 
                className="w-full h-11 pl-11 pr-4 text-sm bg-[#f3e9dd] border-0 rounded-full focus:bg-white text-stone-800 placeholder-stone-500 outline-none transition"
                disabled
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer p-2 hover:bg-stone-50 rounded-full transition">
              <img src="/assets/50afcee7e422d5f5163711f2fcc40a8d68685283.svg" className="w-5 h-5" alt="Bell" />
              <span className="absolute top-1 right-1 flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold text-white bg-[#2d1b14] rounded-full">
                3
              </span>
            </div>
            <div className="flex items-center gap-3 cursor-pointer hover:bg-stone-50 p-2 rounded-lg transition">
              <img 
                alt="Alex Morgan Avatar" 
                className="w-10 h-10 rounded-full border border-stone-200 object-cover" 
                src="/assets/74d7ebfb6a25178a5301032bec9cda6b1659badf.png" 
              />
              <div className="hidden sm:block text-left">
                <p className="text-sm font-bold text-[#2d1b14]">Alex Morgan</p>
                <p className="text-[11px] text-[#78716c]">Store Owner</p>
              </div>
              <img src="/assets/78f60344c87c18dd9040aabf1140e3730cbcf70e.svg" className="w-3 h-3 opacity-60" alt="Dropdown Icon" />
            </div>
          </div>
        </header>

        {/* Content body */}
        <div className="flex-grow flex items-center justify-center p-8 overflow-y-auto">
          
          <div className="max-w-md w-full bg-white border border-stone-200 p-8 rounded-3xl shadow-xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#243118]/10 text-[#89b825] text-3xl">
              {feature.iconText}
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-wider text-[#89b825] uppercase bg-[#243118]/10 px-2.5 py-0.5 rounded">
                {feature.category}
              </span>
              <h2 className="text-2xl font-extrabold text-[#1a1612] tracking-tight">{feature.title}</h2>
              <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
            </div>

            <div className="bg-[#f9f5ee] border border-stone-200/60 p-4 rounded-2xl text-xs text-left text-slate-600 leading-relaxed flex gap-2.5">
              <span className="text-lg">✨</span>
              <p>This boutique module has been designed as a premium component mockup for presentation. Full database tables and analytics pipelines are currently in construction.</p>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => navigate('/')} 
                className="w-full py-3 bg-[#101e12] hover:bg-[#162a19] text-[#89b825] text-sm font-semibold rounded-xl transition shadow-lg hover:shadow-xl"
              >
                Back to Dashboard
              </button>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
