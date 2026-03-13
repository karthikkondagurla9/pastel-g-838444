import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Zap, 
  Package, 
  BookOpen, 
  Settings, 
  Bot,
  X,
  ChevronRight,
  Send,
  Sparkles
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/customers', label: 'Customers', icon: Users },
  { path: '/support', label: 'Support', icon: MessageSquare },
  { path: '/automations', label: 'Automations', icon: Zap },
  { path: '/products', label: 'Products', icon: Package },
  { path: '/kb', label: 'Knowledge Base', icon: BookOpen },
];

const Sidebar = () => {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-white/20 backdrop-blur-2xl border-r border-white/30 p-6 flex flex-col z-30">
      <div className="flex items-center gap-3 px-2 mb-10">
        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center shadow-indigo-200 shadow-lg">
          <Sparkles className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-slate-800">CRM Dash</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group",
              isActive 
                ? "bg-white/60 shadow-sm border border-white/40 text-indigo-600" 
                : "text-slate-500 hover:bg-white/40 hover:text-slate-800"
            )}
          >
            <item.icon className={cn("w-5 h-5", "group-hover:scale-110 transition-transform")} />
            <span className="font-medium">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-white/30">
        <NavLink
          to="/settings"
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300",
            isActive 
              ? "bg-white/60 shadow-sm border border-white/40 text-indigo-600" 
              : "text-slate-500 hover:bg-white/40 hover:text-slate-800"
          )}
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </NavLink>
      </div>
    </aside>
  );
};

const CopilotPanel = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [input, setInput] = useState('');
  
  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      {/* Panel */}
      <div className={cn(
        "fixed right-0 top-0 h-full w-96 bg-white/40 backdrop-blur-3xl border-l border-white/40 z-50 transition-transform duration-500 ease-out flex flex-col shadow-2xl",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="p-6 border-b border-white/40 flex items-center justify-between bg-gradient-to-r from-indigo-500/10 to-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/60 rounded-full flex items-center justify-center border border-white/40">
                <Bot className="text-indigo-600 w-6 h-6" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
            </div>
            <div>
              <h3 className="font-bold text-slate-800">Support Copilot</h3>
              <p className="text-xs text-green-600 font-medium">Online & Active</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/40 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6 scroll-hide">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-white/60 rounded-full flex-shrink-0 flex items-center justify-center border border-white/40">
              <Bot className="text-indigo-600 w-4 h-4" />
            </div>
            <div className="space-y-2 max-w-[85%]">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm">
                Hello! I'm your Copilot. I can help you with customer insights, knowledge base searches, and automation alerts. How can I assist you today?
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-1">AI Assistant</span>
            </div>
          </div>

          <div className="flex gap-3 flex-row-reverse">
            <div className="space-y-2 max-w-[85%]">
              <div className="bg-indigo-500 text-white p-4 rounded-2xl rounded-tr-none text-sm shadow-indigo-100 shadow-md">
                Can you give me a summary of ticket #001?
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-8 h-8 bg-white/60 rounded-full flex-shrink-0 flex items-center justify-center border border-white/40">
              <Bot className="text-indigo-600 w-4 h-4" />
            </div>
            <div className="space-y-2 max-w-[85%]">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 p-4 rounded-2xl rounded-tl-none text-sm text-slate-700 shadow-sm">
                <p className="mb-2">Searching CRM & Knowledge Base...</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <Users className="w-3 h-3" /> CRM DATABASE
                  </span>
                  <span className="bg-purple-100 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> KNOWLEDGE BASE (RAG)
                  </span>
                </div>
                Ticket #001 is from <strong>Sarah Jenkins</strong> regarding a shipping delay. She's a VIP customer with 10 total orders. Our shipping policy states that orders may take up to 5 business days during peak periods.
              </div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 px-1">AI Assistant</span>
            </div>
          </div>

          <div className="flex items-center gap-2 py-4">
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
            <span className="text-xs text-slate-400">Copilot is thinking...</span>
          </div>
        </div>

        <div className="p-6 border-t border-white/40 bg-white/20">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question..."
              className="w-full bg-white/60 backdrop-blur-md border border-white/40 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none h-20"
            />
            <button className="absolute right-3 bottom-3 p-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition-colors shadow-md shadow-indigo-200">
              <Send className="w-4 h-4" />
            </button>
          </div>
          <p className="mt-3 text-[10px] text-center text-slate-400 font-medium">
            Powered by AI • Connected to CRM & Knowledge Base
          </p>
        </div>
      </div>
    </>
  );
};

export const Layout = () => {
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>

      {/* Floating Action Button */}
      {!isCopilotOpen && (
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-white/40 backdrop-blur-xl border border-white/40 rounded-full shadow-2xl flex items-center justify-center group hover:scale-110 active:scale-95 transition-all duration-300 z-30"
        >
          <div className="relative">
            <Bot className="w-8 h-8 text-indigo-600 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full"></div>
          </div>
        </button>
      )}

      <CopilotPanel isOpen={isCopilotOpen} onClose={() => setIsCopilotOpen(false)} />
    </div>
  );
};
