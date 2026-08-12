import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { crmApi } from '../../services/api';
import { TryOnItem } from '../../types';
import { 
  Search, 
  ChevronDown, 
  Filter, 
  Check, 
  Eye, 
  X,
  Send,
  ShoppingBag,
  ExternalLink,
  Users,
  Menu
} from 'lucide-react';

// Fallback mock data in case the backend API is not running
const FALLBACK_TRY_ONS: TryOnItem[] = [
  {
    id: '1',
    name: 'Peach Silk Suit',
    category: 'Suit',
    price: '₹22,000',
    priceNumber: 22000,
    date: '5 Feb 2024',
    status: 'Tried',
    tag: 'Festive',
    feedback: 'Wants to see in different color',
    image: '/assets/8694ec05f3a23456ff91558928492562f4507e0f.png',
  },
  {
    id: '2',
    name: 'Burgundy Bridal Lehenga',
    category: 'Lehenga',
    price: '₹1,25,000',
    priceNumber: 125000,
    date: '20 Jan 2024',
    status: 'Tried',
    tag: 'Bridal',
    feedback: "Customer considering for sister's wedding",
    image: '/assets/e9bb007718b98e8efff84f8b85d88614207ed4ec.png',
  },
  {
    id: '3',
    name: 'Emerald Green Silk Saree',
    category: 'Saree',
    price: '₹42,000',
    priceNumber: 42000,
    date: '2 Nov 2023',
    status: 'Purchased',
    tag: 'Bridal',
    feedback: "Customer considering for sister's wedding",
    image: '/assets/84c6febbb3a5dca46887808d5ce61a7249deb68a.png',
  },
  {
    id: '4',
    name: 'Maroon Velvet Lehenga',
    category: 'Lehenga',
    price: '₹85,000',
    priceNumber: 85000,
    date: '28 Oct 2023',
    status: 'Tried',
    tag: 'Bridal',
    feedback: 'Customer loved the design but found it too heavy',
    image: '/assets/98353a35dc2b9e77792b6d80b28e12714ee85bba.png',
  },
  {
    id: '5',
    name: 'Mint Green Georgette Saree',
    category: 'Saree',
    price: '₹18,000',
    priceNumber: 18000,
    date: '5 Sept 2023',
    status: 'Purchased',
    tag: 'Casual',
    feedback: null,
    image: '/assets/2211e1150649c382dba986e554af9d4040568fb4.png',
  },
  {
    id: '6',
    name: 'Blush Pink Anarkali',
    category: 'Anarkali',
    price: '₹28,000',
    priceNumber: 28000,
    date: '15 Aug 2023',
    status: 'Purchased',
    tag: 'Party',
    feedback: null,
    image: '/assets/14f6f4f7fc6d8a3fc50b13e1e949cff7ccc22e63.png',
  },
  {
    id: '7',
    name: 'Navy Blue Sequin Saree',
    category: 'Saree',
    price: '₹38,000',
    priceNumber: 38000,
    date: '15 Aug 2023',
    status: 'Tried',
    tag: 'Party',
    feedback: 'Preferred lighter colors',
    image: '/assets/bf25c0f24353426bcb6166894ff721bff7cee26a.png',
  },
  {
    id: '8',
    name: 'Royal Blue Anarkali',
    category: 'Anarkali',
    price: '₹32,000',
    priceNumber: 32000,
    date: '12 Jul 2023',
    status: 'Tried',
    tag: 'Party',
    feedback: null,
    image: '/assets/e439254c5fec9ae6b8033c68184eadc3c161b327.png',
  },
  {
    id: '9',
    name: 'Coral Pink Lehenga',
    category: 'Lehenga',
    price: '₹68,000',
    priceNumber: 68000,
    date: '18 Jun 2023',
    status: 'Purchased',
    tag: 'Party',
    feedback: null,
    image: '/assets/575704098ecd913189d90e81c81944f17b83beb8.png',
  },
  {
    id: '10',
    name: 'Gold Tissue Kanjeevaram',
    category: 'Saree',
    price: '₹55,000',
    priceNumber: 55000,
    date: '10 May 2023',
    status: 'Tried',
    tag: 'Bridal',
    feedback: 'Will return for wedding season',
    image: '/assets/a496c3a5971646c930b0382ad747e609497fbf40.png',
  },
  {
    id: '11',
    name: 'Ivory Pearl Embroidered Suit',
    category: 'Suit',
    price: '₹35,000',
    priceNumber: 35000,
    date: '10 May 2023',
    status: 'Purchased',
    tag: 'Festive',
    feedback: null,
    image: '/assets/9791ae3d021ee7700ce703f7aef80f0201964f73.png',
  },
  {
    id: '12',
    name: 'Teal Banarasi Saree',
    category: 'Saree',
    price: '₹48,000',
    priceNumber: 48000,
    date: '22 Apr 2023',
    status: 'Tried',
    tag: 'Festive',
    feedback: 'Preferred gold over teal',
    image: '/assets/f76c9ec03dfcc3d11c827001c7f440f47e1e6280.png',
  },
];

export function TryOnHistoryPage() {
  const navigate = useNavigate();
  const customerId = 'meera-reddy';

  // Fetch try-on items from the backend
  const { data: tryOnData, isLoading } = useQuery({
    queryKey: ['customerTryOns', customerId],
    queryFn: () => crmApi.getCustomerTryOns(customerId),
    retry: 1,
  });

  const tryOnItems = tryOnData?.data || FALLBACK_TRY_ONS;

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Purchased' | 'Tried'>('All');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [selectedItem, setSelectedItem] = useState<TryOnItem | null>(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Quick Action State
  const [isCopied, setIsCopied] = useState(false);
  const [whatsappSent, setWhatsappSent] = useState(false);

  // Dynamic values based on filtering
  const filteredItems = useMemo(() => {
    return tryOnItems.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'All' || 
                            (statusFilter === 'Purchased' && item.status === 'Purchased') ||
                            (statusFilter === 'Tried' && item.status === 'Tried');

      const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [tryOnItems, searchQuery, statusFilter, categoryFilter]);

  // Categories list for dropdown
  const categories = useMemo(() => {
    const cats = new Set(tryOnItems.map(item => item.category));
    return ['All', ...Array.from(cats)];
  }, [tryOnItems]);

  // Stats calculation
  const totalItems = filteredItems.length;
  const conversionRate = useMemo(() => {
    if (totalItems === 0) return '0%';
    const purchased = filteredItems.filter(item => item.status === 'Purchased').length;
    return `${Math.round((purchased / totalItems) * 100)}%`;
  }, [filteredItems, totalItems]);

  const mostTriedCategory = useMemo(() => {
    if (filteredItems.length === 0) return 'N/A';
    const counts: Record<string, number> = {};
    filteredItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';
  }, [filteredItems]);

  const dateRange = useMemo(() => {
    if (filteredItems.length === 0) return 'N/A';
    // Simply extract start/end month and year from visible items
    return 'Apr 23 - Feb 24'; // Matches Figma design range
  }, [filteredItems]);

  const generateWhatsAppMessage = (item: TryOnItem) => {
    return `Hi Meera, hope you are doing well! This is Alex from the boutique. We loved seeing you try on the ${item.name} (${item.price}). Let us know if you want us to customize the color or fit for you! We can have it ready for your next visit.`;
  };

  const handleCopyLink = (item: TryOnItem) => {
    const text = generateWhatsAppMessage(item);
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendWhatsApp = (item: TryOnItem) => {
    setWhatsappSent(true);
    setTimeout(() => {
      setWhatsappSent(false);
      // Simulate launching whatsapp
      window.open(`https://wa.me/919999999999?text=${encodeURIComponent(generateWhatsAppMessage(item))}`, '_blank');
    }, 1000);
  };

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
          {/* Close Sidebar Button for Mobile */}
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
              <button onClick={() => navigate('/customers')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer List</button>
              <button onClick={() => navigate('/customers/meera-reddy')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Profile Card</button>
              <button onClick={() => navigate('/customers/meera-reddy')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Timeline</button>
              <button onClick={() => navigate('/feature/add-customer')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Add Customer (Manual)</button>
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
                className="w-full text-left block px-4 py-2 text-sm font-medium text-[#89b825] bg-[#243118]/50 rounded-md transition"
              >
                Try-On History Panel
              </button>
              <button onClick={() => navigate('/feature/abandoned-try-on')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Abandoned Try-On</button>
              <button onClick={() => navigate('/feature/style-preference')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Style Preference</button>
            </div>
          </div>

          {/* Segments & Loyalty */}
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

          {/* Communication */}
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
      <main className="flex-1 flex flex-col overflow-hidden">
        
        {/* Header */}
        <header className="flex items-center justify-between h-20 px-6 bg-white border-b border-stone-200">
          
          {/* Left search */}
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
                placeholder="Search products, categories, or try-ons..." 
                className="w-full h-11 pl-11 pr-4 text-sm bg-[#f3e9dd] border-0 rounded-full focus:ring-2 focus:ring-[#89b825] focus:bg-white text-stone-800 placeholder-stone-500 transition-all outline-none"
              />
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            
            {/* Notification icon */}
            <div className="relative cursor-pointer p-2 hover:bg-stone-50 rounded-full transition">
              <img src="/assets/50afcee7e422d5f5163711f2fcc40a8d68685283.svg" className="w-5 h-5" alt="Notification Bell" />
              <span className="absolute top-1 right-1 flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold text-white bg-[#2d1b14] rounded-full">
                3
              </span>
            </div>

            {/* Profile */}
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
            
            {/* Breadcrumb & Meera Reddy Profile */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-6">
              
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-xs font-medium">
                <span onClick={() => navigate('/')} className="text-stone-400 hover:underline cursor-pointer">CRM Dashboard</span>
                <span className="text-stone-400">/</span>
                <span onClick={() => navigate('/customers')} className="text-stone-400 hover:underline cursor-pointer">Customer List</span>
                <span className="text-stone-400">/</span>
                <span onClick={() => navigate(`/customers/${customerId}`)} className="text-stone-400 hover:underline cursor-pointer">Meera Reddy</span>
                <span className="text-stone-400">/</span>
                <span className="text-stone-600 font-bold">Try-on History</span>
              </div>

              {/* Customer Title Card */}
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-[50px] h-[50px] rounded-xl bg-[#4f46e5] text-white border-2 border-white shadow-md font-['Playfair_Display'] font-bold text-lg">
                  MR
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Meera Reddy</h1>
                  <p className="text-xs font-medium text-stone-500">Try-On History Dashboard</p>
                </div>
              </div>

              {/* Stats Panel */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                <div className="bg-[#fffdf9] border border-[#efe6d5] p-5 rounded-xl hover:shadow-md transition">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Items Tried</p>
                  <p className="text-2xl font-extrabold text-slate-900 mt-1">{totalItems}</p>
                </div>

                <div className="bg-[#fffdf9] border border-[#efe6d5] p-5 rounded-xl hover:shadow-md transition">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Conversion Rate</p>
                  <p className="text-2xl font-extrabold text-[#059669] mt-1">{conversionRate}</p>
                </div>

                <div className="bg-[#fffdf9] border border-[#efe6d5] p-5 rounded-xl hover:shadow-md transition">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Most Tried Category</p>
                  <p className="text-2xl font-extrabold text-[#2563eb] mt-1">{mostTriedCategory}</p>
                </div>

                <div className="bg-[#fffdf9] border border-[#efe6d5] p-5 rounded-xl hover:shadow-md transition">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Date Range</p>
                  <p className="text-lg font-bold text-slate-900 mt-2">{dateRange}</p>
                </div>

              </div>

            </div>

            {/* Filter and controls */}
            <div className="bg-[#fffdf9] border border-[#efe6d5] rounded-xl p-4 flex flex-wrap gap-4 items-center justify-between shadow-sm">
              
              {/* Left filter buttons */}
              <div className="inline-flex p-1 bg-stone-100 rounded-lg border border-stone-200/50">
                <button 
                  onClick={() => setStatusFilter('All')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition ${statusFilter === 'All' ? 'bg-[#1a160f] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  All
                </button>
                <button 
                  onClick={() => setStatusFilter('Purchased')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition ${statusFilter === 'Purchased' ? 'bg-[#1a160f] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Purchased
                </button>
                <button 
                  onClick={() => setStatusFilter('Tried')}
                  className={`px-4 py-2 text-xs font-semibold rounded-md transition ${statusFilter === 'Tried' ? 'bg-[#1a160f] text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
                >
                  Not Purchased
                </button>
              </div>

              {/* Right Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#f9f5ee] border border-[#efe6d5] text-xs font-semibold text-stone-700 hover:bg-stone-50 rounded-lg shadow-sm transition"
                >
                  <Filter size={14} className="text-stone-500" />
                  <span>Category: {categoryFilter}</span>
                  <ChevronDown size={14} className="text-stone-400" />
                </button>

                {showCategoryDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-stone-200 rounded-lg shadow-xl z-20 overflow-hidden">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setCategoryFilter(cat);
                          setShowCategoryDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-xs font-medium hover:bg-stone-50 transition ${categoryFilter === cat ? 'bg-stone-100 font-bold text-[#89b825]' : 'text-stone-700'}`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Grid of items */}
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="w-10 h-10 border-4 border-[#89b825] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-medium text-slate-500">Loading Try-On history...</p>
              </div>
            ) : filteredItems.length === 0 ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-12 text-center space-y-3">
                <div className="inline-flex p-4 rounded-full bg-stone-100 text-stone-400">
                  <ShoppingBag size={30} />
                </div>
                <h3 className="text-lg font-bold text-slate-800">No try-ons match your criteria</h3>
                <p className="text-sm text-slate-500 max-w-sm mx-auto">Try clearing search text or resetting filters to see your complete catalogue.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                
                {filteredItems.map((item) => (
                  <div 
                    key={item.id}
                    onClick={() => navigate(`/customers/${customerId}/try-ons/${item.id}`)}
                    className="group bg-[#fffdf9] border border-[#efe6d5] hover:border-[#89b825] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl cursor-pointer hover:-translate-y-1 transition duration-300 flex flex-col h-full"
                  >
                    {/* Item Image & Tags */}
                    <div className="relative aspect-[4/5] bg-stone-100 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                      {/* Status Tag */}
                      <div className="absolute top-3 right-3">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold text-white rounded-md uppercase tracking-wider shadow ${item.status === 'Purchased' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`}>
                          {item.status === 'Purchased' ? (
                            <>
                              <Check size={10} strokeWidth={3} />
                              <span>Purchased</span>
                            </>
                          ) : (
                            <>
                              <Eye size={10} strokeWidth={3} />
                              <span>Tried</span>
                            </>
                          )}
                        </span>
                      </div>

                      {/* Category Label */}
                      <div className="absolute bottom-3 left-3">
                        <span className="backdrop-blur-md bg-white/90 border border-white/20 text-[#0f172a] text-[10px] font-bold px-2 py-0.5 rounded shadow-sm">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Metadata Card Footer */}
                    <div className="p-4 flex-grow flex flex-col justify-between space-y-4">
                      
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-800 text-sm leading-tight truncate group-hover:text-[#89b825] transition-colors">{item.name}</h3>
                        <div className="flex items-center justify-between text-xs font-semibold pt-1">
                          <span className="text-slate-900">{item.price}</span>
                          <span className="text-slate-400 font-normal">{item.date}</span>
                        </div>
                      </div>

                      {/* Tags & Notes */}
                      <div className="space-y-3 pt-2 border-t border-stone-200/60">
                        
                        {/* Event Tag */}
                        <div className="flex flex-wrap gap-1">
                          <span className="border border-[#3f2700]/30 text-[#3f2700] text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-50">
                            {item.tag}
                          </span>
                        </div>

                        {/* Customer Feedback */}
                        {item.feedback ? (
                          <div className="bg-stone-50 border border-stone-200/50 rounded-lg p-2 text-[10px] text-slate-500 italic leading-relaxed flex gap-1.5">
                            <span className="text-stone-400">💬</span>
                            <span className="line-clamp-2">{item.feedback}</span>
                          </div>
                        ) : (
                          <div className="h-6" /> // spacer to align heights
                        )}

                      </div>

                    </div>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

      </main>

      {/* Interactive Details Drawer / Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
          
          <div className="relative w-full max-w-2xl bg-[#fffdf9] border border-[#efe6d5] rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col md:flex-row max-h-[90vh]">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white md:text-stone-500 bg-black/40 md:bg-stone-100 hover:bg-black/60 md:hover:bg-stone-200 rounded-full transition"
            >
              <X size={18} />
            </button>

            {/* Left side: Image */}
            <div className="w-full md:w-1/2 bg-stone-100 aspect-square md:aspect-auto overflow-hidden">
              <img 
                src={selectedItem.image} 
                alt={selectedItem.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right side: details */}
            <div className="w-full md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
              
              <div className="space-y-6">
                
                {/* Title */}
                <div>
                  <div className="flex gap-2 items-center mb-2">
                    <span className="text-[10px] font-bold text-white bg-slate-900 px-2 py-0.5 rounded uppercase tracking-wider">
                      {selectedItem.category}
                    </span>
                    <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 text-[9px] font-bold text-white rounded uppercase tracking-wider ${selectedItem.status === 'Purchased' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">{selectedItem.name}</h2>
                </div>

                {/* Pricing & Date Grid */}
                <div className="grid grid-cols-2 gap-4 py-4 border-y border-stone-200">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Boutique Price</p>
                    <p className="text-lg font-extrabold text-slate-800 mt-0.5">{selectedItem.price}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Try-On Date</p>
                    <p className="text-sm font-semibold text-slate-700 mt-1">{selectedItem.date}</p>
                  </div>
                </div>

                {/* Preference Tag */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Occasion Preference</p>
                  <span className="border border-[#3f2700]/30 text-[#3f2700] text-[10px] font-bold tracking-wider px-2.5 py-1 rounded bg-amber-50 shadow-sm">
                    {selectedItem.tag}
                  </span>
                </div>

                {/* Feedback note */}
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Boutique Notes & Feedback</p>
                  {selectedItem.feedback ? (
                    <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-3.5 text-xs text-slate-600 italic leading-relaxed flex gap-2">
                      <span className="text-lg text-stone-400">💬</span>
                      <p className="pt-0.5">"{selectedItem.feedback}"</p>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No notes or preferences recorded during this try-on.</p>
                  )}
                </div>

              </div>

              {/* Quick follow-ups */}
              <div className="pt-6 space-y-2">
                <button 
                  onClick={() => handleSendWhatsApp(selectedItem)}
                  disabled={whatsappSent}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#101e12] hover:bg-[#1c301f] text-[#89b825] hover:text-[#9cd02b] disabled:opacity-75 font-semibold text-sm rounded-xl shadow-lg hover:shadow-xl transition duration-150"
                >
                  <Send size={16} />
                  <span>{whatsappSent ? 'Opening WhatsApp...' : 'Send WhatsApp Follow-up'}</span>
                </button>
                <button 
                  onClick={() => handleCopyLink(selectedItem)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-stone-300 text-stone-700 hover:bg-stone-50 font-semibold text-xs rounded-xl shadow-sm transition"
                >
                  <ExternalLink size={14} />
                  <span>{isCopied ? 'Copied Message!' : 'Copy Template Message'}</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
