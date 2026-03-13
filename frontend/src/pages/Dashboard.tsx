import React, { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  MessageSquare,
  Clock,
  ArrowUpRight,
  MoreVertical
} from 'lucide-react';
import { crmService, supportService } from '../services/appService';
import { orders, customers, tickets } from '../data/mockData';

const StatCard = ({ title, value, change, icon: Icon, colorClass }: any) => {
  const isPositive = change > 0;
  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorClass}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-bold ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-slate-800">{value}</h3>
      </div>
    </div>
  );
};

export const Dashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    crmService.getDashboardStats().then(setStats);
  }, []);

  if (!stats) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Overview</h1>
        <p className="text-slate-500 font-medium">Welcome back, here's what's happening today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={`$${stats.revenue.toLocaleString()}`} 
          change={stats.revenueChange} 
          icon={DollarSign}
          colorClass="bg-blue-100 text-blue-600"
        />
        <StatCard 
          title="Active Customers" 
          value={stats.activeCustomers} 
          change={stats.customersChange} 
          icon={Users}
          colorClass="bg-purple-100 text-purple-600"
        />
        <StatCard 
          title="Total Orders" 
          value={stats.totalOrders} 
          change={stats.ordersChange} 
          icon={ShoppingCart}
          colorClass="bg-peach-100 text-orange-600"
        />
        <StatCard 
          title="Open Tickets" 
          value={stats.openTickets} 
          change={stats.ticketsChange} 
          icon={MessageSquare}
          colorClass="bg-mint-100 text-emerald-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-6 border-b border-white/40 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Recent Orders</h3>
            <button className="text-sm font-bold text-indigo-600 hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/30 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Total</th>
                  <th className="px-6 py-4">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {orders.map((order) => {
                  const customer = customers.find(c => c.id === order.customerId);
                  return (
                    <tr key={order.id} className="group hover:bg-white/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-800">{order.shopifyOrderId || order.id}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={customer?.avatar} alt="" className="w-8 h-8 rounded-full border border-white/60" />
                          <span className="font-medium text-slate-700">{customer?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider
                          ${order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' : 
                            order.status === 'processing' ? 'bg-amber-100 text-amber-700' : 
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-slate-800">${order.total.toFixed(2)}</td>
                      <td className="px-6 py-4 text-slate-500 text-sm">{order.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Support Pulse */}
        <div className="glass-card flex flex-col">
          <div className="p-6 border-b border-white/40 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Support Pulse</h3>
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          </div>
          <div className="p-6 flex-1 space-y-6">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="flex gap-4 group cursor-pointer">
                <div className={`w-1.5 h-12 rounded-full flex-shrink-0 
                  ${ticket.priority === 'urgent' ? 'bg-rose-500' : 
                    ticket.priority === 'high' ? 'bg-orange-500' : 
                    ticket.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-bold text-slate-800 truncate text-sm">{ticket.subject}</h4>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{ticket.createdAt.split(' ')[0]}</span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mb-2">{ticket.lastMessage}</p>
                  <div className="flex justify-between items-center">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md
                      ${ticket.status === 'open' ? 'bg-rose-100 text-rose-600' : 
                        ticket.status === 'pending' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {ticket.status}
                    </span>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white/60 rounded-lg">
                      <ArrowUpRight className="w-4 h-4 text-indigo-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 pt-0 mt-auto">
            <button className="w-full glass-pill text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-colors">
              Manage All Tickets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
