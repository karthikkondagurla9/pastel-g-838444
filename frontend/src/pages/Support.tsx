import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Send, 
  Paperclip, 
  Smile, 
  CheckCircle, 
  User, 
  ShoppingBag,
  Sparkles,
  Bot
} from 'lucide-react';
import { supportService, crmService } from '../services/appService';
import { Ticket, Customer, Order, orders, customers } from '../data/mockData';
import { clsx } from 'clsx';

export const Support = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'open' | 'pending' | 'closed'>('all');
  const [search, setSearch] = useState('');
  const [reply, setReply] = useState('');

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  useEffect(() => {
    supportService.getTickets().then(data => {
      setTickets(data);
      if (data.length > 0) setSelectedId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedId) {
      supportService.getTicketById(selectedId).then(ticket => {
        setSelectedTicket(ticket || null);
        if (ticket) {
          crmService.getCustomerById(ticket.customerId).then(cust => setCustomer(cust || null));
          crmService.getCustomerOrders(ticket.customerId).then(setCustomerOrders);
        }
      });
    }
  }, [selectedId]);

  const filteredTickets = tickets.filter(t => {
    const matchesFilter = filter === 'all' || t.status === filter;
    const matchesSearch = t.subject.toLowerCase().includes(search.toLowerCase()) || 
                         t.lastMessage.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Support Inbox</h1>
          <p className="text-slate-500 font-medium">Manage customer inquiries and automated resolutions.</p>
        </div>
      </header>

      <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
        {/* Panel 1: Tickets List */}
        <div className="w-80 flex flex-col glass-card min-h-0">
          <div className="p-4 border-b border-white/40 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search tickets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/40 border border-white/40 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none"
              />
            </div>
            <div className="flex gap-1">
              {['all', 'open', 'pending', 'closed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f as any)}
                  className={clsx(
                    "flex-1 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all",
                    filter === f ? "bg-indigo-500 text-white" : "text-slate-500 hover:bg-white/40"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scroll-hide p-2 space-y-2">
            {filteredTickets.map((ticket) => (
              <button
                key={ticket.id}
                onClick={() => setSelectedId(ticket.id)}
                className={clsx(
                  "w-full p-4 rounded-2xl text-left transition-all duration-200",
                  selectedId === ticket.id 
                    ? "bg-white/60 shadow-sm border border-white/40" 
                    : "hover:bg-white/30"
                )}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={clsx(
                    "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest",
                    ticket.priority === 'urgent' ? "bg-rose-100 text-rose-600" :
                    ticket.priority === 'high' ? "bg-orange-100 text-orange-600" :
                    ticket.priority === 'medium' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                  )}>
                    {ticket.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-bold">{ticket.createdAt.split(' ')[0]}</span>
                </div>
                <h4 className="font-bold text-slate-800 text-sm truncate">{ticket.subject}</h4>
                <p className="text-xs text-slate-500 truncate mt-1">{ticket.lastMessage}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Panel 2: Conversation */}
        <div className="flex-1 flex flex-col glass-card min-h-0 overflow-hidden">
          {selectedTicket ? (
            <>
              <div className="p-6 border-b border-white/40 flex justify-between items-center bg-white/10">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">{selectedTicket.subject}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket {selectedTicket.id}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="glass-pill px-4 py-2 flex items-center gap-2 text-sm font-bold text-emerald-600 hover:bg-emerald-50">
                    <CheckCircle className="w-4 h-4" /> Resolve
                  </button>
                  <button className="p-2 hover:bg-white/40 rounded-xl">
                    <MoreVertical className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 scroll-hide">
                {/* Customer Message */}
                <div className="flex gap-4">
                  <img src={customer?.avatar} alt="" className="w-10 h-10 rounded-full border border-white/60 flex-shrink-0" />
                  <div className="space-y-2 max-w-[70%]">
                    <div className="bg-white/60 backdrop-blur-md border border-white/40 p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-700">
                      {selectedTicket.lastMessage}
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">Customer • {selectedTicket.createdAt}</span>
                  </div>
                </div>

                {/* AI Suggestion */}
                <div className="flex flex-row-reverse gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center border border-indigo-200 flex-shrink-0">
                    <Bot className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="space-y-2 max-w-[70%] text-right">
                    <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-200/40 p-5 rounded-2xl rounded-tr-none shadow-sm text-slate-700 border-l-4 border-l-indigo-500">
                      <div className="flex items-center gap-2 text-indigo-600 mb-2 justify-end">
                        <Sparkles className="w-4 h-4" />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Agent Draft</span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        Hello {customer?.name.split(' ')[0]}, I'm sorry to hear about the delay. I've checked our system and it seems your order #1001 is currently in the "shipped" phase but hasn't updated its tracking. Would you like me to ping the carrier for a status update?
                      </p>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-1">AI Copilot • Suggested Now</span>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-white/40 bg-white/20">
                <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl p-4 space-y-4">
                  <textarea 
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Type your reply..."
                    className="w-full bg-transparent border-none focus:outline-none text-sm min-h-[80px] resize-none"
                  />
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-white/60 rounded-lg text-slate-500"><Paperclip className="w-5 h-5" /></button>
                      <button className="p-2 hover:bg-white/60 rounded-lg text-slate-500"><Smile className="w-5 h-5" /></button>
                    </div>
                    <button className="btn-primary flex items-center gap-2">
                      <Send className="w-4 h-4" /> Send Reply
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
              <MessageSquare className="w-16 h-16 mb-4 opacity-10" />
              <p className="font-medium">Select a ticket to start responding</p>
            </div>
          )}
        </div>

        {/* Panel 3: Context */}
        <div className="w-80 flex flex-col gap-6 min-h-0 overflow-y-auto scroll-hide">
          {customer && (
            <>
              {/* Customer Profile */}
              <div className="glass-card p-6 space-y-6">
                <div className="flex flex-col items-center text-center">
                  <img src={customer.avatar} alt="" className="w-20 h-20 rounded-2xl border-2 border-white mb-4 shadow-lg" />
                  <h4 className="text-xl font-bold text-slate-800">{customer.name}</h4>
                  <p className="text-sm text-slate-400 font-medium">{customer.email}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/40 p-3 rounded-2xl border border-white/40 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">LTV</p>
                    <p className="font-bold text-indigo-600">${customer.ltv.toFixed(0)}</p>
                  </div>
                  <div className="bg-white/40 p-3 rounded-2xl border border-white/40 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Orders</p>
                    <p className="font-bold text-slate-800">{customer.totalOrders}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Recent Orders</h5>
                  <div className="space-y-2">
                    {customerOrders.slice(0, 2).map((order) => (
                      <div key={order.id} className="flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-700">{order.shopifyOrderId || order.id}</span>
                        <span className="text-slate-500">{order.total.toFixed(2)}</span>
                        <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-bold uppercase tracking-tighter">{order.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* AI Insights */}
              <div className="glass-card p-6 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 border-indigo-200/50">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-indigo-500">AI Insights</h5>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/60 p-4 rounded-2xl border border-white/40 shadow-sm">
                    <p className="text-xs text-slate-600 italic">"Sarah typically orders on weekends and responds well to discount codes. Consider offering free shipping on her next order."</p>
                  </div>
                  <div className="bg-white/60 p-4 rounded-2xl border border-white/40 shadow-sm flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase">Retention Risk</p>
                      <p className="text-xs font-bold text-emerald-600">Low (98% Satisfaction)</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const TrendingUp = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
    <polyline points="16 7 22 7 22 13"/>
  </svg>
);
