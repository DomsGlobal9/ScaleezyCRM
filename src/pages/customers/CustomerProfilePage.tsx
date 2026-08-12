import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { crmApi } from '../../services/api';
import { 
  Users, 
  Menu, 
  X,
  MessageSquare,
  FileText,
  Check,
  Eye,
  ArrowLeft,
  Instagram,
  Gift,
  ExternalLink,
  Search
} from 'lucide-react';

export function CustomerProfilePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const customerId = id || 'meera-reddy';

  // Fetch customer profile
  const { data: profileData, isLoading: profileLoading } = useQuery({
    queryKey: ['customerProfile', customerId],
    queryFn: () => crmApi.getCustomerProfile(customerId),
  });

  // Fetch customer try-ons
  const { data: tryOnsData, isLoading: tryOnsLoading } = useQuery({
    queryKey: ['customerTryOns', customerId],
    queryFn: () => crmApi.getCustomerTryOns(customerId),
  });

  const profile = profileData?.data;
  const tryOns = tryOnsData?.data || [];

  if (profileLoading || tryOnsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f9f5ee] font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#89b825] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">Loading shopper profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f9f5ee] font-sans">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Customer profile not found</h2>
          <button onClick={() => navigate('/customers')} className="px-4 py-2 bg-[#101e12] text-[#89b825] rounded-xl text-sm font-semibold">
            Return to Customer List
          </button>
        </div>
      </div>
    );
  }

  // Filter first 6 try ons for the grid
  const recentTryOns = tryOns.slice(0, 6);

  // SVG circular progress calculation for DigiLoyalty Score
  const radius = 34;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (profile.loyaltyScore / 100) * circumference;

  return (
    <div className="flex h-screen bg-[#f9f5ee] font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Nav */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[266px] bg-[#101e12] border-r border-white/5 transition-transform duration-300 transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
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
          
          <div>
            <button 
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg text-slate-300 hover:text-[#89b825] hover:bg-[#243118]/50 transition text-left"
            >
              <img src="/assets/3ea5df18d105d2f0099be76abfe25352daf0a6d2.svg" className="w-5 h-5 opacity-70" alt="Dashboard Icon" />
              <span>CRM Dashboard</span>
            </button>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-[#89b825] uppercase tracking-wider">
              <span>Customers</span>
              <Users size={12} />
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/customers')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer List</button>
              <button 
                onClick={() => navigate(`/customers/${customerId}`)}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left animate-fade-in"
              >
                <span>Customer Profile Card</span>
              </button>
              <button onClick={() => navigate(`/customers/${customerId}`)} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Timeline</button>
              <button onClick={() => navigate('/feature/add-customer')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Add Customer (Manual)</button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Try-On Intelligence</span>
            </div>
            <div className="space-y-1 pl-2">
              <button 
                onClick={() => navigate(`/customers/${customerId}/try-on-history`)}
                className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition"
              >
                Try-On History Panel
              </button>
              <button onClick={() => navigate('/feature/abandoned-try-on')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Abandoned Try-On</button>
              <button onClick={() => navigate('/feature/style-preference')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Style Preference</button>
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
              <span>Segments & Loyalty</span>
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/feature/segment-dashboard')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Segment Dashboard</button>
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
      <main className="flex-grow flex flex-col overflow-hidden">
        
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
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-500">
                <Search size={18} />
              </span>
              <input 
                type="text" 
                placeholder="Search products, SKUs, or try-ons..." 
                className="w-full h-11 pl-11 pr-4 text-sm bg-[#f3e9dd] border-0 rounded-full focus:ring-2 focus:ring-[#89b825] focus:bg-white text-stone-800 placeholder-stone-500 transition-all outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer p-2 hover:bg-stone-50 rounded-full transition">
              <img src="/assets/50afcee7e422d5f5163711f2fcc40a8d68685283.svg" className="w-5 h-5" alt="Notification Bell" />
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
        <div className="flex-1 overflow-y-auto px-6 py-8">
          
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Top breadcrumb and back button */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
                <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">CRM Dashboard</span>
                <span>/</span>
                <span onClick={() => navigate('/customers')} className="hover:underline cursor-pointer">Customer List</span>
                <span>/</span>
                <span className="text-[#89b825]">{profile.name}</span>
              </div>
              <button 
                onClick={() => navigate('/customers')}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold rounded-xl shadow-sm transition"
              >
                <ArrowLeft size={14} />
                <span>Back to Customer List</span>
              </button>
            </div>

            {/* Split layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Left Column (Personal info and connects) */}
              <div className="space-y-6">
                
                {/* Shopper profile details */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow font-bold text-xl">
                      {profile.initials}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{profile.name}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="inline-flex px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-amber-800 bg-amber-100 border border-amber-200 rounded">
                          {profile.role}
                        </span>
                        <span className="text-xs text-stone-500 font-semibold">• LTV: {profile.lifetimeValue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-stone-150 space-y-3.5 text-sm font-medium text-stone-700">
                    <div className="flex items-center gap-2.5">
                      <span className="text-stone-400">📞</span>
                      <span>{profile.phone}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-stone-400">✉️</span>
                      <span>{profile.email}</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <span className="text-stone-400">📅</span>
                      <span>{profile.birthday}</span>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Connect */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[rgba(37,211,102,0.1)] text-[#128c7e]">
                        <MessageSquare size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">WhatsApp Connect</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">23 messages • Active yesterday</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#fcfaf7] border border-stone-150 rounded-xl p-3.5 text-xs text-slate-600 italic font-light relative leading-relaxed">
                    "I loved the collection yesterday, will come back with my mother."
                  </div>

                  <button 
                    onClick={() => window.open(`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}`, '_blank')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition"
                  >
                    <ExternalLink size={13} />
                    <span>Open Chat</span>
                  </button>
                </div>

                {/* Instagram Connect */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-pink-50 text-pink-600">
                        <Instagram size={16} />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Instagram Connect</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">23 messages • Active yesterday</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#fcfaf7] border border-stone-150 rounded-xl p-3.5 text-xs text-slate-600 italic font-light relative leading-relaxed">
                    "Just discovered this amazing new brand on Instagram, can't wait to share it with my friends!"
                  </div>

                  <button 
                    onClick={() => window.open('https://instagram.com', '_blank')}
                    className="w-full flex items-center justify-center gap-2 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-xl transition"
                  >
                    <ExternalLink size={13} />
                    <span>Open Chat</span>
                  </button>
                </div>

                {/* DigiLoyalty Score */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-5 shadow-sm space-y-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift size={16} className="text-[#89b825]" />
                      <h4 className="text-xs font-bold text-slate-900">DigiLoyalty Score</h4>
                    </div>
                    <button className="text-[11px] font-bold text-[#89b825] hover:underline">View Details</button>
                  </div>

                  <div className="flex items-center justify-center py-2 gap-6">
                    {/* Circle Score Gauge */}
                    <div className="relative w-20 h-20">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 80 80">
                        <circle cx="40" cy="40" r={radius} stroke="#e5e7eb" strokeWidth="6" fill="transparent" />
                        <circle 
                          cx="40" 
                          cy="40" 
                          r={radius} 
                          stroke="#89b825" 
                          strokeWidth="6" 
                          fill="transparent" 
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-xl font-black text-slate-800 leading-tight">{profile.loyaltyScore}</span>
                        <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Score</span>
                      </div>
                    </div>
                    <div className="text-left space-y-1">
                      <p className="text-xs font-bold text-slate-800">Top 15% of customers</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed max-w-[130px]">Shopper qualifies for exclusive boutique loyalty tier rewards.</p>
                    </div>
                  </div>

                  <div className="space-y-2 border-t border-stone-150 pt-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 text-left">How to improve</p>
                    
                    <button className="w-full flex items-center justify-between p-2.5 bg-[#fcfaf7] border border-stone-150 hover:bg-stone-50 rounded-xl transition text-xs font-bold text-stone-700">
                      <span>Refer a friend</span>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-[9px]">+5 pts</span>
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-2.5 bg-[#fcfaf7] border border-stone-150 hover:bg-stone-50 rounded-xl transition text-xs font-bold text-stone-700">
                      <span>Complete style quiz</span>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded text-[9px]">+10 pts</span>
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column (AI styling, Try-ons, Timeline) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* AI Style Profile */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">AI Style Profile</h3>
                    <button className="text-xs font-bold text-[#89b825] hover:underline">View Full Profile</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* Left stats */}
                    <div className="space-y-4 text-left">
                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Top Colors</h4>
                        <div className="flex items-center gap-2">
                          {profile.topColors.map((color: string, idx: number) => (
                            <div 
                              key={idx} 
                              className="w-7 h-7 rounded-lg border border-stone-200 shadow-sm"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Size Profile</h4>
                        <div className="flex flex-wrap gap-2">
                          {profile.sizes.map((size: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-stone-100 text-stone-700 border border-stone-200 rounded-lg text-xs font-bold">
                              {size}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Category split */}
                    <div>
                      <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-left">Category Split</h4>
                      <div className="space-y-3">
                        {profile.categorySplit.map((split: any, idx: number) => (
                          <div key={idx} className="space-y-1.5">
                            <div className="flex justify-between text-xs font-bold text-stone-700">
                              <span>{split.category}</span>
                              <span>{split.percentage}%</span>
                            </div>
                            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-[#89b825] rounded-full transition-all duration-500" 
                                style={{ width: `${split.percentage}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  <div className="pt-4 border-t border-stone-150 text-left">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Preferred Occasions</h4>
                    <div className="flex flex-wrap gap-2">
                      {profile.occasions.map((occ: string, idx: number) => (
                        <span key={idx} className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200/50 rounded-lg text-xs font-bold">
                          {occ}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Try-On History grid */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-slate-900 tracking-tight">Try-On History</h3>
                    <button 
                      onClick={() => navigate(`/customers/${customerId}/try-on-history`)}
                      className="text-xs font-bold text-[#89b825] hover:underline"
                    >
                      View All
                    </button>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {recentTryOns.map((item: any) => (
                      <div 
                        key={item.id}
                        onClick={() => navigate(`/customers/${customerId}/try-ons/${item.id}`)}
                        className="group bg-[#fcfaf7] border border-stone-200/70 hover:border-[#89b825] rounded-xl overflow-hidden cursor-pointer shadow-sm hover:shadow transition duration-200 text-left flex flex-col justify-between"
                      >
                        <div className="aspect-[4/5] bg-stone-100 relative overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <span className={`absolute top-2 right-2 px-1.5 py-0.5 text-[8px] font-bold text-white rounded shadow uppercase tracking-wider ${item.status === 'Purchased' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`}>
                            {item.status}
                          </span>
                        </div>
                        <div className="p-3 space-y-0.5">
                          <h5 className="font-bold text-xs text-slate-900 truncate leading-tight group-hover:text-[#89b825] transition-colors">{item.name}</h5>
                          <p className="text-[10px] text-slate-400">{item.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interaction History timeline */}
                <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-6">
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight text-left">Interaction History</h3>

                  <div className="relative border-l border-stone-150 pl-6 ml-2 space-y-6">
                    {profile.interactions.map((interaction: any, idx: number) => {
                      // Icon/Color mapping for timeline nodes
                      let nodeBg = 'bg-stone-50 border-stone-200 text-stone-500';
                      let nodeIcon = <FileText size={10} />;
                      
                      if (interaction.type === 'whatsapp') {
                        nodeBg = 'bg-green-50 border-green-200 text-green-600';
                        nodeIcon = <MessageSquare size={10} />;
                      } else if (interaction.type === 'order') {
                        nodeBg = 'bg-emerald-50 border-emerald-200 text-emerald-600';
                        nodeIcon = <Check size={10} />;
                      } else if (interaction.type === 'try-on') {
                        nodeBg = 'bg-blue-50 border-blue-200 text-blue-600';
                        nodeIcon = <Eye size={10} />;
                      }

                      return (
                        <div key={idx} className="relative text-left">
                          <div className={`absolute -left-[33px] top-0.5 flex items-center justify-center w-[22px] h-[22px] rounded-full border shadow-sm ${nodeBg}`}>
                            {nodeIcon}
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-xs font-bold text-slate-900">
                              <span>{interaction.title}</span>
                              <span className="text-[10px] text-slate-400 font-normal">{interaction.date}</span>
                            </div>
                            <p className={`text-xs mt-1.5 leading-relaxed ${interaction.type === 'whatsapp' ? 'text-[#475569] italic bg-stone-50 border border-stone-100 rounded-lg p-2 font-light' : 'text-slate-600'}`}>
                              {interaction.content}
                            </p>
                            {interaction.metadata && (
                              <span className="inline-block mt-2 bg-stone-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                                {interaction.metadata}
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
