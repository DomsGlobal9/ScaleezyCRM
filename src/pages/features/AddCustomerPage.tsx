import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, X, Info, UserPlus, Users } from 'lucide-react';

export function AddCustomerPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Bridal']);

  const tags = ['Bridal', 'Festive', 'Casual', 'Party', 'Western', 'Traditional'];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to customers list upon adding
    navigate('/customers');
  };

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
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-[#89b825] uppercase tracking-wider">
              <span>Customers</span>
              <Users size={12} />
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/customers')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer List</button>
              <button onClick={() => navigate('/customers/meera-reddy')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Profile Card</button>
              <button onClick={() => navigate('/customers/meera-reddy')} className="w-full text-left block px-4 py-2 text-sm text-slate-300 hover:text-[#89b825] hover:bg-white/5 rounded-md transition">Customer Timeline</button>
              <button onClick={() => navigate('/feature/add-customer')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left">
                <span>Add Customer (Manual)</span>
              </button>
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
              <input type="text" placeholder="Search..." className="w-full h-11 pl-11 pr-4 text-sm bg-[#f3e9dd] border-0 rounded-full text-stone-800 outline-none" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-8">
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-500">
              <span onClick={() => navigate('/')} className="hover:underline cursor-pointer">CRM Dashboard</span>
              <span>/</span>
              <span onClick={() => navigate('/customers')} className="hover:underline cursor-pointer">Customer List</span>
              <span>/</span>
              <span className="text-[#89b825]">Add Customer</span>
            </div>

            <div className="text-left">
              <h1 className="text-3xl font-extrabold text-slate-900">Add Customer</h1>
              <p className="text-sm text-slate-500 mt-1">Manually enter a new customer profile.</p>
            </div>

            {/* Tip box */}
            <div className="bg-[#fcfaf7] border border-amber-200/80 p-4 rounded-2xl flex items-start gap-3 text-left">
              <Info size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                <strong className="text-amber-900">Tip:</strong> You don't need to manually add everyone. A profile will be auto-created for any new customer on their first WhatsApp chat with the boutique.
              </p>
            </div>

            {/* Customer Form */}
            <form onSubmit={handleSubmit} className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm space-y-6 text-left">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Full Name <span className="text-rose-500">*</span></label>
                  <input 
                    type="text" 
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Priya Sharma" 
                    className="w-full h-11 px-4 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#89b825] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Phone Number <span className="text-rose-500">*</span></label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-xs font-bold text-stone-600 bg-stone-100 border border-r-0 border-stone-200 rounded-l-xl">+91</span>
                    <input 
                      type="tel" 
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210" 
                      className="w-full h-11 px-4 text-xs bg-stone-50 border border-stone-200 rounded-r-xl focus:bg-white focus:ring-2 focus:ring-[#89b825] outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Email Address <span className="text-stone-400 font-normal">(Optional)</span></label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="priya@example.com" 
                    className="w-full h-11 px-4 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#89b825] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Birthday <span className="text-stone-400 font-normal">(Optional)</span></label>
                  <input 
                    type="text" 
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    placeholder="DD/MM/YY" 
                    className="w-full h-11 px-4 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-[#89b825] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-stone-150">
                <label className="text-xs font-bold text-slate-700 block">Initial Style Tags <span className="text-stone-400 font-normal">(Optional)</span></label>
                <div className="flex flex-wrap gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3.5 py-2 text-xs font-bold rounded-xl border transition ${selectedTags.includes(tag) ? 'bg-[#101e12] text-[#89b825] border-[#101e12]' : 'bg-stone-50 text-slate-700 border-stone-200 hover:bg-stone-100'}`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-150 flex justify-end gap-3">
                <button type="button" onClick={() => navigate('/customers')} className="px-5 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl text-xs font-bold transition">
                  Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 bg-[#101e12] hover:bg-[#1b2f1f] text-[#89b825] rounded-xl text-xs font-bold shadow transition flex items-center gap-2">
                  <UserPlus size={16} />
                  <span>Save Profile</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
