import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { crmApi } from '../../services/api';
import { CustomerListItem } from '../../types';
import { 
  Search, 
  Plus, 
  Users, 
  Menu, 
  X,
  ChevronRight
} from 'lucide-react';

export function CustomerListPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch customers from backend
  const { data, isLoading } = useQuery({
    queryKey: ['customers'],
    queryFn: () => crmApi.getCustomers(),
  });

  const customersList = data?.data || [];

  // Filter list based on search
  const filteredCustomers = useMemo(() => {
    return customersList.filter((customer: CustomerListItem) => {
      const query = searchQuery.toLowerCase();
      return (
        customer.name.toLowerCase().includes(query) ||
        customer.phone.includes(query) ||
        customer.tier.toLowerCase().includes(query)
      );
    });
  }, [customersList, searchQuery]);

  // Color helper for loyalty tier badges
  const getTierStyle = (tier: string) => {
    switch (tier.toLowerCase()) {
      case 'gold':
        return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'silver':
        return 'bg-slate-100 text-slate-800 border border-slate-200';
      case 'bronze':
        return 'bg-orange-100 text-orange-800 border border-orange-200';
      default:
        return 'bg-stone-100 text-stone-800 border border-stone-200';
    }
  };

  // Avatar background colors
  const getAvatarBg = (initials: string) => {
    const code = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0);
    const colors = [
      'bg-indigo-600 text-white',
      'bg-rose-600 text-white',
      'bg-teal-600 text-white',
      'bg-emerald-600 text-white',
      'bg-amber-600 text-white',
      'bg-purple-600 text-white',
      'bg-pink-600 text-white',
      'bg-sky-600 text-white'
    ];
    return colors[code % colors.length];
  };

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
              <button 
                onClick={() => navigate('/customers')}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left"
              >
                <span>Customer List</span>
              </button>
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
              <button 
                onClick={() => navigate('/customers/meera-reddy/try-on-history')}
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
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-stone-500">
                <Search size={18} />
              </div>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search customers by name, phone, or tier..." 
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
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">CRM Dashboard</span>
              <span>/</span>
              <span className="text-[#89b825]">Customers</span>
            </div>

            {/* Title Section */}
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-[#1a1612] tracking-tight">Customers</h1>
                <p className="text-sm text-slate-500">Manage and view your customer base.</p>
              </div>
              <button 
                onClick={() => navigate('/feature/add-customer')}
                className="flex items-center gap-2 px-5 py-2.5 bg-[#101e12] hover:bg-[#1c301f] text-[#89b825] text-sm font-bold rounded-xl shadow transition"
              >
                <Plus size={16} />
                <span>Add Customer</span>
              </button>
            </div>

            {/* Customer Table Container */}
            {isLoading ? (
              <div className="bg-white border border-stone-200/80 rounded-2xl p-20 flex flex-col items-center justify-center space-y-4 shadow-sm">
                <div className="w-10 h-10 border-4 border-[#89b825] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500">Loading customer database...</p>
              </div>
            ) : filteredCustomers.length === 0 ? (
              <div className="bg-white border border-stone-200/80 rounded-2xl p-16 text-center space-y-4 shadow-sm">
                <div className="inline-flex p-4 rounded-full bg-stone-100 text-stone-400">
                  <Users size={32} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No customers found</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto">We couldn't find any customers matching "{searchQuery}". Try adjusting your search query.</p>
              </div>
            ) : (
              <div className="bg-white border border-stone-200/80 rounded-2xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4">Customer</th>
                        <th className="px-6 py-4">Last Purchase</th>
                        <th className="px-6 py-4">Lifetime Value</th>
                        <th className="px-6 py-4">Loyalty Tier</th>
                        <th className="px-6 py-4">Try-Ons</th>
                        <th className="px-6 py-4 w-10"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-150">
                      {filteredCustomers.map((customer: CustomerListItem) => (
                        <tr 
                          key={customer.id}
                          onClick={() => navigate(`/customers/${customer.id}`)}
                          className="hover:bg-[#fcfaf7] cursor-pointer transition duration-150"
                        >
                          {/* Profile */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className={`flex items-center justify-center w-9 h-9 rounded-xl font-bold text-xs font-mono shadow-sm ${getAvatarBg(customer.initials)}`}>
                                {customer.initials}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 leading-tight">{customer.name}</p>
                                <p className="text-xs text-slate-400 mt-0.5">{customer.phone}</p>
                              </div>
                            </div>
                          </td>

                          {/* Last Purchase */}
                          <td className="px-6 py-4 text-stone-600 font-medium">
                            {customer.lastPurchase}
                          </td>

                          {/* LTV */}
                          <td className="px-6 py-4 font-bold text-slate-900">
                            {customer.ltv}
                          </td>

                          {/* Tier */}
                          <td className="px-6 py-4">
                            <span className={`inline-flex px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md ${getTierStyle(customer.tier)}`}>
                              {customer.tier}
                            </span>
                          </td>

                          {/* Try ons count */}
                          <td className="px-6 py-4 font-bold text-slate-700">
                            {customer.tryOns}
                          </td>

                          {/* Arrow right */}
                          <td className="px-6 py-4 text-stone-400">
                            <ChevronRight size={16} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

        </div>

      </main>

    </div>
  );
}
