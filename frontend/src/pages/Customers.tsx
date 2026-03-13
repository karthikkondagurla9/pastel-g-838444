import React, { useState, useEffect } from 'react';
import { 
  Search, 
  UserPlus, 
  Mail, 
  Phone, 
  Calendar, 
  ShoppingBag,
  History,
  TrendingUp,
  CreditCard,
  ChevronRight,
  Users,
  MessageSquare,
  Package
} from 'lucide-react';
import { crmService } from '../services/appService';
import { Customer, Order } from '../data/mockData';
import { clsx } from 'clsx';

export const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerOrders, setCustomerOrders] = useState<Order[]>([]);

  useEffect(() => {
    crmService.getCustomers().then(data => {
      setCustomers(data);
      if (data.length > 0) setSelectedId(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedId) {
      crmService.getCustomerById(selectedId).then(cust => setSelectedCustomer(cust || null));
      crmService.getCustomerOrders(selectedId).then(setCustomerOrders);
    }
  }, [selectedId]);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Customers</h1>
          <p className="text-slate-500 font-medium">Manage your relationships and view customer insights.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Add Customer
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List */}
        <div className="lg:col-span-4 glass-card flex flex-col h-[700px]">
          <div className="p-4 border-b border-white/40">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white/40 border border-white/40 rounded-2xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto scroll-hide p-2 space-y-2">
            {filteredCustomers.map((customer) => (
              <button
                key={customer.id}
                onClick={() => setSelectedId(customer.id)}
                className={clsx(
                  "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 text-left",
                  selectedId === customer.id 
                    ? "bg-white/60 shadow-sm border border-white/40 ring-1 ring-white/20" 
                    : "hover:bg-white/30 text-slate-600"
                )}
              >
                <img src={customer.avatar} alt="" className="w-12 h-12 rounded-full border-2 border-white/80" />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 truncate">{customer.name}</h4>
                  <p className="text-xs text-slate-400 truncate font-medium">{customer.email}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-indigo-600">${customer.ltv.toFixed(0)}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{customer.totalOrders} orders</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Detail */}
        <div className="lg:col-span-8 space-y-8 h-[700px] overflow-y-auto scroll-hide pb-10">
          {selectedCustomer ? (
            <>
              {/* Profile Header */}
              <div className="glass-card p-8 flex flex-col md:flex-row gap-8 items-start md:items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Users className="w-32 h-32" />
                </div>
                <img src={selectedCustomer.avatar} alt="" className="w-32 h-32 rounded-3xl border-4 border-white shadow-xl" />
                <div className="flex-1 space-y-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h2 className="text-3xl font-bold text-slate-800">{selectedCustomer.name}</h2>
                      {selectedCustomer.shopifyId && (
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wider">
                          Shopify ID: {selectedCustomer.shopifyId}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-500 font-medium flex items-center gap-2">
                      <Mail className="w-4 h-4" /> {selectedCustomer.email}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white/40 px-3 py-1.5 rounded-full border border-white/40">
                      <Phone className="w-4 h-4" /> {selectedCustomer.phone}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 bg-white/40 px-3 py-1.5 rounded-full border border-white/40">
                      <Calendar className="w-4 h-4" /> Joined {selectedCustomer.joinDate}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-indigo-400 mb-2">Lifetime Value</p>
                  <h4 className="text-2xl font-bold text-indigo-900">${selectedCustomer.ltv.toLocaleString()}</h4>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">Avg Order Value</p>
                  <h4 className="text-2xl font-bold text-purple-900">${selectedCustomer.avgOrderValue.toFixed(2)}</h4>
                </div>
                <div className="glass-card p-6 bg-gradient-to-br from-emerald-50/50 to-teal-50/50">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-400 mb-2">Total Orders</p>
                  <h4 className="text-2xl font-bold text-emerald-900">{selectedCustomer.totalOrders}</h4>
                </div>
              </div>

              {/* Order History */}
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/40 flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-indigo-500" />
                    Order History
                  </h3>
                  <button className="text-sm font-bold text-indigo-600">Download CSV</button>
                </div>
                <div className="divide-y divide-white/20">
                  {customerOrders.map((order) => (
                    <div key={order.id} className="p-6 flex items-center justify-between hover:bg-white/40 transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white/60 rounded-xl flex items-center justify-center border border-white/40">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                        <div>
                          <h5 className="font-bold text-slate-800">{order.shopifyOrderId || order.id}</h5>
                          <p className="text-xs text-slate-400 font-medium">{order.items.join(', ')}</p>
                        </div>
                      </div>
                      <div className="text-right flex items-center gap-6">
                        <div>
                          <p className="font-bold text-slate-800">${order.total.toFixed(2)}</p>
                          <p className="text-xs text-slate-400">{order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                          ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'}`}>
                          {order.status}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-300 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Timeline */}
              <div className="glass-card p-8">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-8">
                  <History className="w-5 h-5 text-indigo-500" />
                  Activity Timeline
                </h3>
                <div className="relative pl-8 space-y-10">
                  <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-indigo-100"></div>
                  
                  {[
                    { title: 'Ordered "Premium Coffee Beans"', date: 'Mar 10, 2024', icon: ShoppingBag, color: 'bg-indigo-100 text-indigo-600' },
                    { title: 'Support Ticket #001 Opened', date: 'Mar 08, 2024', icon: MessageSquare, color: 'bg-rose-100 text-rose-600' },
                    { title: 'Clicked "Special Offer" Email', date: 'Mar 05, 2024', icon: TrendingUp, color: 'bg-emerald-100 text-emerald-600' },
                    { title: 'Payment Method Updated', date: 'Feb 28, 2024', icon: CreditCard, color: 'bg-amber-100 text-amber-600' },
                  ].map((activity, idx) => (
                    <div key={idx} className="relative">
                      <div className={`absolute -left-8 top-0 w-6 h-6 rounded-full border-4 border-white shadow-sm flex items-center justify-center z-10 ${activity.color}`}>
                        <activity.icon className="w-3 h-3" />
                      </div>
                      <div>
                        <h5 className="font-bold text-slate-800 text-sm">{activity.title}</h5>
                        <p className="text-xs text-slate-400 font-medium">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-card p-12 text-center h-full flex flex-col items-center justify-center text-slate-400">
              <Users className="w-16 h-16 mb-4 opacity-20" />
              <p className="font-medium">Select a customer to view their profile</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};