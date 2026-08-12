import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Users, X } from 'lucide-react';

export function WhatsAppConnectPage() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMessage, setActiveMessage] = useState('');

  const chats = [
    { name: 'Meera Reddy', id: 'meera-reddy', initials: 'MR', phone: '+91 98765 43212', lastMsg: 'Hi, do you have the red Banarasi saree in stock?', time: '4:00 pm' },
    { name: 'Priya Sharma', id: 'priya-sharma', initials: 'PS', phone: '+91 98765 43210', lastMsg: 'Can I book a try-on slot for tomorrow at 3 PM?', time: 'Yesterday' },
    { name: 'Aarti Verma', id: 'aarti-verma', initials: 'AV', phone: '+91 98765 43218', lastMsg: 'Thank you! The fitting was perfect.', time: '18 Feb' }
  ];

  const [activeChat, setActiveChat] = useState(chats[0]);

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
            <div className="flex items-center justify-between px-4 text-xs font-semibold text-[#89b825] uppercase tracking-wider">
              <span>Communication</span>
            </div>
            <div className="space-y-1 pl-2">
              <button onClick={() => navigate('/feature/whatsapp-connect')} className="w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg bg-[#243118] text-[#89b825] border-l-4 border-[#89b825] hover:bg-[#243118]/90 transition text-left">
                <span>WhatsApp Connect</span>
              </button>
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

      <main className="flex-grow flex overflow-hidden">
        {/* Chat List */}
        <div className="w-80 bg-white border-r border-stone-200 flex flex-col">
          <div className="p-4 border-b border-stone-200 text-left">
            <h2 className="text-lg font-bold text-slate-900">WhatsApp Inbox</h2>
            <p className="text-xs text-slate-500">Live boutique conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-stone-150">
            {chats.map(chat => (
              <div 
                key={chat.id}
                onClick={() => setActiveChat(chat)}
                className={`p-4 cursor-pointer text-left transition ${activeChat.id === chat.id ? 'bg-[#fcfaf7] border-l-4 border-[#89b825]' : 'hover:bg-stone-50'}`}
              >
                <div className="flex justify-between items-start">
                  <span className="font-bold text-sm text-slate-900">{chat.name}</span>
                  <span className="text-[10px] text-slate-400">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate mt-1">{chat.lastMsg}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Conversation View */}
        <div className="flex-1 flex flex-col bg-[#fcfaf7]">
          <div className="h-16 px-6 bg-white border-b border-stone-200 flex justify-between items-center text-left">
            <div>
              <h3 className="font-bold text-sm text-slate-900">{activeChat.name}</h3>
              <p className="text-xs text-slate-400">{activeChat.phone}</p>
            </div>
            <button onClick={() => navigate(`/customers/${activeChat.id}`)} className="px-3 py-1.5 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg text-xs font-bold transition">
              View Profile
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="bg-stone-200/60 rounded-lg py-1 px-3 text-[10px] font-bold text-stone-600 max-w-fit mx-auto">Yesterday</div>
            <div className="bg-white border border-stone-200 p-3.5 rounded-2xl rounded-tl-none max-w-md text-left text-xs text-slate-800 shadow-sm leading-relaxed">
              "{activeChat.lastMsg}"
            </div>
            <div className="bg-[#101e12] text-[#89b825] p-3.5 rounded-2xl rounded-tr-none max-w-md ml-auto text-left text-xs font-medium shadow-sm leading-relaxed">
              Hi {activeChat.name}! Yes, we have that piece reserved in store. Would you like to schedule a try-on?
            </div>
          </div>

          <div className="p-4 bg-white border-t border-stone-200 flex gap-2">
            <input 
              type="text"
              value={activeMessage}
              onChange={(e) => setActiveMessage(e.target.value)}
              placeholder="Type WhatsApp reply..." 
              className="flex-1 px-4 py-2.5 bg-[#f3e9dd] border-0 rounded-xl text-xs outline-none"
            />
            <button className="px-5 py-2.5 bg-[#101e12] hover:bg-[#1b2f1f] text-[#89b825] rounded-xl text-xs font-bold flex items-center gap-1.5 transition">
              <Send size={14} />
              <span>Send</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
