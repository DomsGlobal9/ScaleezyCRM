import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { crmApi } from '../../services/api';
import { 
  Users, 
  Menu, 
  X,
  ArrowLeft,
  Calendar,
  CreditCard,
  Hash,
  DollarSign,
  TrendingUp,
  Activity,
  BarChart2,
  Check,
  Search
} from 'lucide-react';

export function TryOnDetailPage() {
  const { id, itemId } = useParams<{ id: string; itemId: string }>();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const customerId = id || 'meera-reddy';

  // Fetch try-ons list to find this item
  const { data: tryOnsData, isLoading } = useQuery({
    queryKey: ['customerTryOns', customerId],
    queryFn: () => crmApi.getCustomerTryOns(customerId),
  });

  const tryOnItems = tryOnsData?.data || [];
  const selectedItem = tryOnItems.find(item => item.id === itemId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f9f5ee] font-sans">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-[#89b825] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-medium text-slate-500">Loading Try-On specifications...</p>
        </div>
      </div>
    );
  }

  if (!selectedItem) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#f9f5ee] font-sans">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-bold">Try-On specification not found</h2>
          <button onClick={() => navigate(`/customers/${customerId}`)} className="px-4 py-2 bg-[#101e12] text-[#89b825] rounded-xl text-sm font-semibold">
            Return to Customer Profile
          </button>
        </div>
      </div>
    );
  }

  // Journey steps based on item state
  const journeySteps = [
    { label: 'Requested', date: '28 Jan 2023', completed: true },
    { label: 'Approved', date: '28 Jan 2023', completed: true },
    { label: 'Shipped', date: '29 Jan 2023', completed: true },
    { label: 'Received', date: '31 Jan 2023', completed: true },
    { label: 'Purchased', date: selectedItem.status === 'Purchased' ? '3 Feb 2023' : 'Pending', completed: selectedItem.status === 'Purchased' }
  ];

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
              <button onClick={() => navigate(`/customers/${customerId}`)} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Profile Card</button>
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
                className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left"
              >
                Try-On History Panel
              </button>
              <button onClick={() => navigate('/feature/abandoned-try-on')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Abandoned Try-On</button>
              <button onClick={() => navigate('/feature/style-preference')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Style Preference</button>
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
                <span onClick={() => navigate(`/customers/${customerId}`)} className="hover:underline cursor-pointer">Meera Reddy</span>
                <span>/</span>
                <span onClick={() => navigate(`/customers/${customerId}/try-on-history`)} className="hover:underline cursor-pointer text-stone-500">Try-On History</span>
                <span>/</span>
                <span className="text-[#89b825]">{selectedItem.name}</span>
              </div>
              <button 
                onClick={() => navigate(`/customers/${customerId}/try-on-history`)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-bold rounded-xl shadow-sm transition"
              >
                <ArrowLeft size={14} />
                <span>Back to Try-On History</span>
              </button>
            </div>

            {/* Content panel */}
            <div className="bg-white border border-stone-200/80 rounded-2xl p-6 shadow-sm space-y-8">
              
              {/* Product Main Section */}
              <div className="flex flex-col md:flex-row gap-8 items-start">
                
                {/* Left side: Product Image */}
                <div className="w-full md:w-[320px] aspect-[3/4] bg-stone-50 rounded-2xl border border-stone-200/60 overflow-hidden relative shadow-sm flex-shrink-0">
                  <img 
                    src={selectedItem.image} 
                    alt={selectedItem.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 text-[10px] font-bold text-white rounded-lg shadow uppercase tracking-wider ${selectedItem.status === 'Purchased' ? 'bg-[#10b981]' : 'bg-[#f59e0b]'}`}>
                      {selectedItem.status}
                    </span>
                  </div>
                </div>

                {/* Right side: Product Specifications */}
                <div className="flex-1 text-left space-y-6">
                  
                  {/* Title & SKU */}
                  <div className="space-y-1">
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight leading-tight">{selectedItem.name}</h2>
                    <p className="text-xs font-semibold text-slate-400">SKU: PS-{selectedItem.category.toUpperCase().slice(0, 3)}-{selectedItem.id.padStart(4, '0')}</p>
                  </div>

                  {/* Quick stats grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    
                    <div className="bg-[#fcfaf7] border border-stone-150 p-4 rounded-xl">
                      <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                        <Calendar size={13} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Purchase Date</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedItem.date}</p>
                    </div>

                    <div className="bg-[#fcfaf7] border border-stone-150 p-4 rounded-xl">
                      <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                        <DollarSign size={13} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Amount</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedItem.price}</p>
                    </div>

                    <div className="bg-[#fcfaf7] border border-stone-150 p-4 rounded-xl">
                      <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                        <CreditCard size={13} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Payment Method</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedItem.status === 'Purchased' ? 'UPI' : 'Pending'}</p>
                    </div>

                    <div className="bg-[#fcfaf7] border border-stone-150 p-4 rounded-xl">
                      <div className="flex items-center gap-1.5 text-stone-400 mb-1">
                        <Hash size={13} />
                        <span className="text-[9px] font-bold uppercase tracking-wider">Order ID</span>
                      </div>
                      <p className="text-xs font-bold text-slate-700">{selectedItem.status === 'Purchased' ? `ORD-${23000 + Number(selectedItem.id)}` : 'N/A'}</p>
                    </div>

                  </div>

                  {/* Attribute Grid */}
                  <div className="bg-stone-50 rounded-xl p-5 border border-stone-150/60">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-stone-150 pb-2">Technical Specifications</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3.5 text-xs font-medium text-stone-700">
                      
                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Category</span>
                        <span className="font-bold text-slate-800">{selectedItem.category}</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Color</span>
                        <span className="font-bold text-slate-800">Peach / Custom</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Sub Category</span>
                        <span className="font-bold text-slate-800">{selectedItem.category} Set</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Fabric</span>
                        <span className="font-bold text-slate-800">Premium Silk</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Brand</span>
                        <span className="font-bold text-slate-800">Scaleezy</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Work</span>
                        <span className="font-bold text-slate-800">Zari Embroidery</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Collection</span>
                        <span className="font-bold text-slate-800">Wedding Collection</span>
                      </div>

                      <div className="flex justify-between py-0.5">
                        <span className="text-stone-400">Occasion</span>
                        <span className="font-bold text-slate-800">{selectedItem.tag}</span>
                      </div>

                      <div className="flex justify-between py-0.5 md:col-span-2 border-t border-stone-150 pt-3 mt-1 items-center">
                        <span className="text-stone-400">Shopper profile</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-800">Meera Reddy</span>
                          <button 
                            onClick={() => navigate(`/customers/${customerId}`)}
                            className="px-2.5 py-1 bg-white hover:bg-stone-50 border border-stone-200 rounded text-[10px] font-bold text-stone-600 transition shadow-sm"
                          >
                            View Shopper Profile
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-1">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Garment Description</h4>
                    <p className="text-xs font-medium text-slate-600 leading-relaxed">
                      {selectedItem.feedback || 'Premium boutique creation tailored with hand-crafted embroidery details, designed for special festive events.'}
                    </p>
                  </div>

                </div>

              </div>

              {/* Journey, Conversion and Margin section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4 border-t border-stone-200/70">
                
                {/* Try On Journey */}
                <div className="bg-[#fcfaf7] border border-stone-200/60 rounded-xl p-5 text-left">
                  <h4 className="text-xs font-bold text-slate-900 mb-4 flex items-center gap-1.5">
                    <Activity size={14} className="text-[#89b825]" />
                    <span>Try-On Journey</span>
                  </h4>
                  
                  <div className="relative border-l border-stone-150 pl-5 ml-1 space-y-4">
                    {journeySteps.map((step, idx) => (
                      <div key={idx} className="relative text-xs">
                        <div className={`absolute -left-[26px] top-0.5 flex items-center justify-center w-[12px] h-[12px] rounded-full border ${step.completed ? 'bg-[#89b825] border-[#89b825]' : 'bg-white border-stone-200'}`}>
                          {step.completed && <Check size={8} className="text-white" strokeWidth={4} />}
                        </div>
                        <div className="flex justify-between items-center font-bold text-slate-800">
                          <span>{step.label}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{step.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Conversion Details */}
                <div className="bg-[#fcfaf7] border border-stone-200/60 rounded-xl p-5 text-left space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <BarChart2 size={14} className="text-indigo-500" />
                    <span>Conversion Details</span>
                  </h4>
                  <div className="divide-y divide-stone-150 text-xs font-semibold text-stone-600">
                    <div className="flex justify-between py-2.5">
                      <span>Try-On to Purchase</span>
                      <span className="text-[#10b981] font-bold">42%</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Decision Time</span>
                      <span className="text-slate-800 font-bold">5 Days</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Other Items Tried</span>
                      <span className="text-slate-800 font-bold">3 Items</span>
                    </div>
                  </div>
                </div>

                {/* Purchase Overview */}
                <div className="bg-[#fcfaf7] border border-stone-200/60 rounded-xl p-5 text-left space-y-4">
                  <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-amber-500" />
                    <span>Purchase Overview</span>
                  </h4>
                  <div className="divide-y divide-stone-150 text-xs font-semibold text-stone-600">
                    <div className="flex justify-between py-2.5">
                      <span>MRP</span>
                      <span className="text-slate-800 font-bold">₹24,000</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Selling Price</span>
                      <span className="text-slate-800 font-bold">{selectedItem.price}</span>
                    </div>
                    <div className="flex justify-between py-2.5">
                      <span>Discount</span>
                      <span className="text-rose-600 font-bold">8.33%</span>
                    </div>
                    <div className="flex justify-between py-2.5 border-t border-stone-200 pt-3">
                      <span>Profit Margin</span>
                      <span className="text-[#10b981] font-bold">38.6%</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Mini Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-stone-200/70">
                
                <div className="bg-white border border-stone-200/80 p-4 rounded-xl text-left shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Views</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-1 block">128</span>
                </div>

                <div className="bg-white border border-stone-200/80 p-4 rounded-xl text-left shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Try-On Requests</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-1 block">36</span>
                </div>

                <div className="bg-white border border-stone-200/80 p-4 rounded-xl text-left shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Try-On Rate</span>
                  <span className="text-xl font-extrabold text-[#2563eb] mt-1 block">28.1%</span>
                </div>

                <div className="bg-white border border-stone-200/80 p-4 rounded-xl text-left shadow-sm">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Purchase Rate</span>
                  <span className="text-xl font-extrabold text-[#10b981] mt-1 block">42%</span>
                </div>

                <div className="bg-white border border-stone-200/80 p-4 rounded-xl text-left shadow-sm col-span-2 md:col-span-1">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Returns</span>
                  <span className="text-xl font-extrabold text-slate-900 mt-1 block">0</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}
