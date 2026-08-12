import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  Check, 
  Eye, 
  X, 
  Send,
  ShoppingBag,
  Users,
  Menu,
  Clock,
  FileText,
  TrendingUp,
  MessageSquare
} from 'lucide-react';

export function DashboardPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states for interactivity
  const [activeModal, setActiveModal] = useState<'priya' | 'ananya' | 'segments' | 'activity' | null>(null);

  // Priya follow up details
  const handlePriyaFollowUp = () => {
    setActiveModal('priya');
  };

  // Ananya follow up details
  const handleAnanyaFollowUp = () => {
    setActiveModal('ananya');
  };

  const handleMeeraFollowUp = () => {
    navigate('/customers/meera-reddy/try-on-history');
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
              className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left"
            >
              <img src="/assets/3ea5df18d105d2f0099be76abfe25352daf0a6d2.svg" className="w-5 h-5 text-[#89b825]" alt="Dashboard Icon" />
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
                className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition"
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
      <main className="flex-grow flex flex-col overflow-hidden">
        
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
                placeholder="Search products, SKUs, or try-ons..." 
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
          
          <div className="max-w-6xl mx-auto space-y-8">
            
            {/* Title Section */}
            <div>
              <h1 className="text-3xl font-extrabold text-[#1a1612] tracking-tight">Overview</h1>
              <p className="text-sm text-slate-500 mt-1">Welcome back, Anjali. Here's what's happening today.</p>
            </div>

            {/* Stats Bento Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Card 1 */}
              <div className="bg-[#fdf9f5] border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-stone-100 text-[#0f172a] rounded-xl">
                    <Users size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#059669] bg-green-50 px-2 py-0.5 rounded">↑ 12%</span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Customers</p>
                  <p className="text-3xl font-extrabold text-[#0f172a] mt-1">1,247</p>
                  <p className="text-[10px] text-slate-400 mt-1">vs last month</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-[#fdf9f5] border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-stone-100 text-[#0f172a] rounded-xl">
                    <TrendingUp size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#059669] bg-green-50 px-2 py-0.5 rounded">↑ 4%</span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Repeat Buyers</p>
                  <p className="text-3xl font-extrabold text-[#0f172a] mt-1">68%</p>
                  <p className="text-[10px] text-slate-400 mt-1">vs last month</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-[#fdf9f5] border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-stone-100 text-[#0f172a] rounded-xl">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#059669] bg-green-50 px-2 py-0.5 rounded">↑ 2</span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Segments</p>
                  <p className="text-3xl font-extrabold text-[#0f172a] mt-1">89</p>
                  <p className="text-[10px] text-slate-400 mt-1">vs last month</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="bg-[#fdf9f5] border border-stone-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition">
                <div className="flex items-start justify-between">
                  <div className="p-3 bg-[#fff1f2] text-[#e11d48] rounded-xl">
                    <Clock size={20} />
                  </div>
                  <span className="text-xs font-semibold text-[#e11d48] bg-rose-50 px-2 py-0.5 rounded">↓ 5%</span>
                </div>
                <div className="mt-4">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Dormant</p>
                  <p className="text-3xl font-extrabold text-[#0f172a] mt-1">156</p>
                  <p className="text-[10px] text-slate-400 mt-1">vs last month</p>
                </div>
              </div>

            </div>

            {/* Content Columns split (Left: Alerts, Right: Activity) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Left Column: Reminders & Abandoned alerts (spans 2 cols) */}
              <div className="lg:col-span-2 space-y-6">
                
                {/* Reminders section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <Users size={18} className="text-[#89b825]" />
                    <h2>Follow-Up Reminders</h2>
                  </div>

                  <div className="space-y-3">
                    
                    {/* Priya Sharma Reminder */}
                    <div className="flex items-center justify-between p-4 bg-white border border-stone-200/80 rounded-xl shadow-sm">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-900 text-sm">Priya Sharma</p>
                        <p className="text-xs text-[#475569]">Priya bought bridal lehenga 5 months ago — Anniversary collection due.</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handlePriyaFollowUp}
                          className="px-4 py-2 bg-[#fff1f2] text-[#be123c] text-xs font-semibold rounded-lg hover:bg-[#ffe4e6] transition"
                        >
                          Act Now
                        </button>
                      </div>
                    </div>

                    {/* Meera Reddy Reminder */}
                    <div className="flex items-center justify-between p-4 bg-white border border-stone-200/80 rounded-xl shadow-sm">
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-900 text-sm">Meera Reddy</p>
                        <p className="text-xs text-[#475569]">Meera's birthday is next week. Send festive offer?</p>
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={handleMeeraFollowUp}
                          className="px-4 py-2 bg-[#fff1f2] text-[#be123c] text-xs font-semibold rounded-lg hover:bg-[#ffe4e6] transition"
                        >
                          Act Now
                        </button>
                      </div>
                    </div>

                  </div>
                </div>

                {/* Abandoned alerts */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                    <Clock size={18} className="text-[#89b825]" />
                    <h2>Abandoned Try-On Alerts</h2>
                  </div>

                  <div className="bg-[#fffdf9] border border-stone-200 rounded-xl p-4 shadow-sm space-y-4">
                    <div className="flex gap-4">
                      {/* Product Thumbnail */}
                      <img 
                        src="/assets/d29cbd76890301f9102a801feb11351935f499f9.png" 
                        alt="Maroon Velvet Lehenga" 
                        className="w-16 h-20 object-cover rounded-lg border border-stone-200" 
                      />
                      <div className="flex-1 space-y-1 text-left">
                        <p className="text-sm font-bold text-slate-900">Ananya Patel</p>
                        <div className="text-xs text-[#475569]">
                          Tried <span className="font-medium text-slate-900">Maroon Velvet Lehenga</span> but didn't buy.
                        </div>
                        <p className="text-[10px] text-slate-400 pt-1">Yesterday, 4:30 PM</p>
                      </div>
                      <div>
                        <button 
                          onClick={handleAnanyaFollowUp}
                          className="flex items-center gap-1.5 px-3 py-2 bg-[rgba(37,211,102,0.1)] text-[#128c7e] hover:bg-[rgba(37,211,102,0.2)] text-xs font-semibold rounded-lg transition"
                        >
                          <Send size={12} />
                          <span>Send Reminder</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Segments action */}
                <div className="bg-[#fffdf9] border border-[#efe6d5] rounded-xl p-6 shadow-sm hover:shadow-md transition">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1 text-left">
                      <h3 className="font-bold text-slate-900 text-sm">Manage Segments</h3>
                      <p className="text-xs text-slate-500">Create, update and manage customer segments to run targeted campaigns.</p>
                    </div>
                    <button 
                      onClick={() => setActiveModal('segments')}
                      className="px-4 py-2.5 bg-[#101e12] text-[#89b825] text-xs font-semibold rounded-lg hover:bg-[#162a19] transition"
                    >
                      Manage Segments
                    </button>
                  </div>
                </div>

              </div>

              {/* Right Column: Interaction timeline */}
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-lg">
                  <Clock size={18} className="text-[#89b825]" />
                  <h2>Recent Interactions</h2>
                </div>

                <div className="bg-[#fffdf9] border border-stone-200 rounded-2xl p-5 shadow-sm space-y-6">
                  
                  <div className="relative border-l border-stone-200/80 pl-6 ml-2 space-y-6">
                    
                    {/* Item 1 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] top-0 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-green-50 border border-green-200 text-green-600">
                        <MessageSquare size={10} />
                      </div>
                      <div className="text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">WhatsApp Message</span>
                          <span className="text-[10px] text-slate-400">20 Feb, 4:00 pm</span>
                        </div>
                        <p className="text-xs text-[#475569] italic mt-1.5 bg-stone-50 border border-stone-100 rounded-lg p-2 font-light">"Hi, do you have the red Banarasi saree in stock?"</p>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] top-0 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-amber-50 border border-amber-200 text-amber-600">
                        <FileText size={10} />
                      </div>
                      <div className="text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">Staff Note</span>
                          <span className="text-[10px] text-slate-400">18 Feb, 7:45 pm</span>
                        </div>
                        <p className="text-xs text-[#475569] mt-1.5 leading-relaxed">Customer is looking for a bridal lehenga for her sister's wedding in May.</p>
                      </div>
                    </div>

                    {/* Item 3 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] top-0 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600">
                        <Check size={10} />
                      </div>
                      <div className="text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">Order #4892</span>
                          <span className="text-[10px] text-slate-400">2 Nov, 10:15 pm</span>
                        </div>
                        <p className="text-xs text-[#475569] mt-1">Purchased Emerald Green Silk Saree</p>
                        <span className="inline-block mt-2 bg-stone-100 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded">₹42,000</span>
                      </div>
                    </div>

                    {/* Item 4 */}
                    <div className="relative">
                      <div className="absolute -left-[33px] top-0 flex items-center justify-center w-[22px] h-[22px] rounded-full bg-blue-50 border border-blue-200 text-blue-600">
                        <Eye size={10} />
                      </div>
                      <div className="text-left">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-slate-900">Tried Garment</span>
                          <span className="text-[10px] text-slate-400">28 Oct, 4:50 pm</span>
                        </div>
                        <p className="text-xs text-[#475569] mt-1.5">Tried on Maroon Velvet Lehenga</p>
                      </div>
                    </div>

                  </div>

                  {/* View All Button */}
                  <button 
                    onClick={() => setActiveModal('activity')}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-[#101e12] font-semibold text-xs rounded-xl shadow-sm transition"
                  >
                    View All Activity
                  </button>

                </div>
              </div>

            </div>

          </div>

        </div>

      </main>

      {/* Interactives: Priya Sharma Modal */}
      {activeModal === 'priya' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#fffdf9] border border-[#efe6d5] rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"><X size={18} /></button>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white bg-rose-600 px-2 py-0.5 rounded uppercase tracking-wider">BRIDAL REMINDER</span>
              <h3 className="text-lg font-bold text-slate-900">Priya Sharma Follow-Up</h3>
              <p className="text-xs text-slate-500">Priya bought a bridal lehenga 5 months ago. It is time to prompt the anniversary boutique collection.</p>
            </div>
            <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-3 text-xs text-slate-600 italic">
              "Hi Priya! Hope your wedding lehenga was a massive hit! Since it's been 5 months, we wanted to share our exclusive Anniversary collection with you with a special boutique discount. Let us know if you would like to visit!"
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  window.open("https://wa.me/919999999999?text=" + encodeURIComponent("Hi Priya! Hope your wedding lehenga was a massive hit!"), "_blank");
                  setActiveModal(null);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#101e12] text-[#89b825] text-sm font-semibold rounded-xl transition shadow"
              >
                <Send size={14} />
                <span>Send WhatsApp</span>
              </button>
              <button onClick={() => setActiveModal(null)} className="flex-1 py-3 border border-stone-300 text-stone-700 text-sm font-semibold rounded-xl transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactives: Ananya Patel Modal */}
      {activeModal === 'ananya' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#fffdf9] border border-[#efe6d5] rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"><X size={18} /></button>
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-white bg-amber-600 px-2 py-0.5 rounded uppercase tracking-wider">ABANDONED TRY-ON</span>
              <h3 className="text-lg font-bold text-slate-900">Ananya Patel Follow-Up</h3>
              <p className="text-xs text-slate-500">Ananya tried the Maroon Velvet Lehenga yesterday but did not buy. Suggest a discount or design modification.</p>
            </div>
            <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-3 text-xs text-slate-600 italic">
              "Hi Ananya! Loved seeing you try the Maroon Velvet Lehenga yesterday. We can make custom adjustments to the weight or embroidery, or offer a special festive discount. Let us know if you want to visit again!"
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => {
                  window.open("https://wa.me/919999999999?text=" + encodeURIComponent("Hi Ananya! Loved seeing you try the Maroon Velvet Lehenga yesterday."), "_blank");
                  setActiveModal(null);
                }}
                className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#101e12] text-[#89b825] text-sm font-semibold rounded-xl transition shadow"
              >
                <Send size={14} />
                <span>Send WhatsApp</span>
              </button>
              <button onClick={() => setActiveModal(null)} className="flex-1 py-3 border border-stone-300 text-stone-700 text-sm font-semibold rounded-xl transition">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactives: Segments Modal */}
      {activeModal === 'segments' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-[#fffdf9] border border-[#efe6d5] rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"><X size={18} /></button>
            <h3 className="text-lg font-bold text-slate-900">Manage Customer Segments</h3>
            <div className="space-y-3">
              <div className="p-3 bg-stone-50 border border-stone-200/50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-900">Bridal Buyers</p>
                  <p className="text-[10px] text-slate-400">Purchased lehenga or bridal saree</p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-stone-200 px-2 py-0.5 rounded">342 customers</span>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200/50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-900">Festive shoppers</p>
                  <p className="text-[10px] text-slate-400">Tried or purchased festive wear</p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-stone-200 px-2 py-0.5 rounded">512 customers</span>
              </div>
              <div className="p-3 bg-stone-50 border border-stone-200/50 rounded-xl flex justify-between items-center">
                <div>
                  <p className="text-xs font-bold text-slate-900">Dormant shoppers</p>
                  <p className="text-[10px] text-slate-400">No interaction in 3+ months</p>
                </div>
                <span className="text-xs font-semibold text-slate-500 bg-stone-200 px-2 py-0.5 rounded">156 customers</span>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-[#101e12] text-[#89b825] text-xs font-semibold rounded-lg hover:bg-[#162a19] transition">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Interactives: View All Activity Modal */}
      {activeModal === 'activity' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#fffdf9] border border-[#efe6d5] rounded-3xl p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-150 max-h-[80vh] overflow-y-auto">
            <button onClick={() => setActiveModal(null)} className="absolute top-4 right-4 text-stone-400 hover:text-stone-600"><X size={18} /></button>
            <h3 className="text-lg font-bold text-slate-900">Complete Interaction Timeline</h3>
            <div className="space-y-4 border-l border-stone-200 pl-6 ml-2">
              {/* Message 1 */}
              <div className="relative">
                <span className="absolute -left-[33px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs">💬</span>
                <div className="text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">WhatsApp Message</span>
                    <span className="text-[10px] text-slate-400">20 Feb, 4:00 pm</span>
                  </div>
                  <p className="text-slate-500 italic mt-1">"Hi, do you have the red Banarasi saree in stock?"</p>
                </div>
              </div>
              {/* Message 2 */}
              <div className="relative">
                <span className="absolute -left-[33px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 border border-amber-200 text-amber-600 text-xs">📝</span>
                <div className="text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Staff Note</span>
                    <span className="text-[10px] text-slate-400">18 Feb, 7:45 pm</span>
                  </div>
                  <p className="text-slate-500 mt-1">Customer is looking for a bridal lehenga for her sister's wedding in May.</p>
                </div>
              </div>
              {/* Message 3 */}
              <div className="relative">
                <span className="absolute -left-[33px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs">🛍️</span>
                <div className="text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Order #4892</span>
                    <span className="text-[10px] text-slate-400">2 Nov, 10:15 pm</span>
                  </div>
                  <p className="text-slate-500 mt-1">Purchased Emerald Green Silk Saree (₹42,000)</p>
                </div>
              </div>
              {/* Message 4 */}
              <div className="relative">
                <span className="absolute -left-[33px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 border border-blue-200 text-blue-600 text-xs">👁️</span>
                <div className="text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">Tried Garment</span>
                    <span className="text-[10px] text-slate-400">28 Oct, 4:50 pm</span>
                  </div>
                  <p className="text-slate-500 mt-1">Tried on Maroon Velvet Lehenga</p>
                </div>
              </div>
              {/* Message 5 */}
              <div className="relative">
                <span className="absolute -left-[33px] top-0 flex items-center justify-center w-5 h-5 rounded-full bg-green-50 border border-green-200 text-green-600 text-xs">💬</span>
                <div className="text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-900">WhatsApp Message</span>
                    <span className="text-[10px] text-slate-400">29 Oct, 2:40 pm</span>
                  </div>
                  <p className="text-slate-500 italic mt-1">"I loved the collection yesterday, will come back with my mother."</p>
                </div>
              </div>
            </div>
            <button onClick={() => setActiveModal(null)} className="w-full py-2.5 bg-[#101e12] text-[#89b825] text-xs font-semibold rounded-lg hover:bg-[#162a19] transition">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
