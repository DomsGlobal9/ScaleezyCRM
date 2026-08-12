import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Menu, 
  X, 
  MessageSquare, 
  Percent, 
  Users
} from 'lucide-react';

export function AbandonedTryOnPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const alerts = [
    {
      id: '1',
      customerName: 'Ananya Patel',
      customerId: 'ananya-patel',
      initials: 'AP',
      phone: '+91 98765 43211',
      garmentName: 'Maroon Velvet Lehenga',
      image: '/assets/61f2fca25e24ee90fca7a72d7f8d68962ed144bc.png',
      price: '₹68,000',
      tryOnDate: 'Yesterday, 4:30 pm',
      status: 'High Priority',
      notes: 'Customer spent 25 mins trying this on. Liked the fitting, hesitated on price.'
    },
    {
      id: '2',
      customerName: 'Meera Reddy',
      customerId: 'meera-reddy',
      initials: 'MR',
      phone: '+91 98765 43212',
      garmentName: 'Emerald Green Silk Saree',
      image: '/assets/f76c9ec03dfcc3d11c827001c7f440f47e1e6280.png',
      price: '₹45,000',
      tryOnDate: '3 days ago',
      status: 'Medium Priority',
      notes: 'Customer was looking for matching blouse fabric before deciding.'
    },
    {
      id: '3',
      customerName: 'Sneha Joshi',
      customerId: 'sneha-joshi',
      initials: 'SJ',
      phone: '+91 98765 43217',
      garmentName: 'Gold Embroidered Anarkali',
      image: '/assets/8694ec05f3a23456ff91558928492562f4507e0f.png',
      price: '₹32,000',
      tryOnDate: '4 days ago',
      status: 'Medium Priority',
      notes: 'Requested photos sent over WhatsApp, pending response.'
    }
  ];

  const filteredAlerts = alerts.filter(a => 
    a.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.garmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#f9f5ee] font-sans text-slate-800 overflow-hidden">
      
      {/* Sidebar Nav */}
      <aside className={`fixed inset-y-0 left-0 z-50 flex flex-col w-[266px] bg-[#101e12] border-r border-white/5 transition-transform duration-300 transform md:relative md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center h-20 px-6 border-b border-white/10 bg-[#111e12]">
          <div className="flex items-center space-x-2">
            <img alt="ScaleEasy Logo" className="h-8 object-contain" src="/assets/857ff301f7d61d5680d29be7958b8a40d0270e61.svg" />
          </div>
          <button onClick={() => setSidebarOpen(false)} className="ml-auto text-slate-400 hover:text-white md:hidden">
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto scrollbar-thin">
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
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-[#89b825] uppercase tracking-wider">
              <span>Try-On Intelligence</span>
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/customers/meera-reddy/try-on-history')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Try-On History Panel</button>
              <button onClick={() => navigate('/feature/abandoned-try-on')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left">
                <span>Abandoned Try-On</span>
              </button>
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

      {/* Main Content */}
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
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search alerts by customer or garment..." 
                className="w-full h-11 pl-11 pr-4 text-sm bg-[#f3e9dd] border-0 rounded-full focus:ring-2 focus:ring-[#89b825] focus:bg-white text-stone-800 placeholder-stone-500 transition-all outline-none"
              />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">CRM Dashboard</span>
              <span>/</span>
              <span className="text-[#89b825]">Abandoned Try-On</span>
            </div>

            {/* Title */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Abandoned Try-On Alerts</h1>
                <p className="text-sm text-slate-500 mt-1">High-intent shoppers who tried garments without completing purchase.</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Abandoned</span>
                <p className="text-2xl font-black text-slate-900 mt-1">18 Items</p>
              </div>
              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Potential Value</span>
                <p className="text-2xl font-black text-[#89b825] mt-1">₹4,20,000</p>
              </div>
              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recovery Rate</span>
                <p className="text-2xl font-black text-indigo-600 mt-1">34.2%</p>
              </div>
              <div className="bg-white border border-stone-200 p-5 rounded-2xl shadow-sm text-left">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Avg. Delay</span>
                <p className="text-2xl font-black text-slate-900 mt-1">3.2 Days</p>
              </div>
            </div>

            {/* Alerts List */}
            <div className="space-y-4">
              {filteredAlerts.map(alert => (
                <div key={alert.id} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-left hover:border-[#89b825] transition duration-200">
                  <div className="flex items-center gap-4">
                    <img src={alert.image} alt={alert.garmentName} className="w-20 h-24 object-cover rounded-xl border border-stone-200 flex-shrink-0" />
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 rounded">{alert.status}</span>
                        <span className="text-xs text-slate-400 font-medium">• {alert.tryOnDate}</span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900">{alert.garmentName}</h3>
                      <p className="text-xs font-semibold text-slate-700">Shopper: <span onClick={() => navigate(`/customers/${alert.customerId}`)} className="text-[#89b825] hover:underline cursor-pointer">{alert.customerName}</span> ({alert.phone})</p>
                      <p className="text-xs text-slate-500 italic max-w-md">"{alert.notes}"</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto">
                    <button 
                      onClick={() => window.open(`https://wa.me/${alert.phone.replace(/[^0-9]/g, '')}?text=Hi%20${alert.customerName},%20did%20you%20like%20the%20${encodeURIComponent(alert.garmentName)}?`, '_blank')}
                      className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-[#101e12] hover:bg-[#1b2f1f] text-[#89b825] rounded-xl text-xs font-bold transition shadow-sm"
                    >
                      <MessageSquare size={14} />
                      <span>Send WhatsApp Nudge</span>
                    </button>
                    <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-xl text-xs font-bold transition">
                      <Percent size={14} />
                      <span>Apply 10% Discount</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
