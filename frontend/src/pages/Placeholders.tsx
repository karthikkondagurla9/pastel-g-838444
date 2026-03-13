import React from 'react';
import { Package, Settings as SettingsIcon, Plus, ArrowRight, ShieldCheck } from 'lucide-react';

const EmptyState = ({ icon: Icon, title, description, buttonText, secondaryButtonText }: any) => (
  <div className="flex-1 flex flex-col items-center justify-center min-h-[600px] text-center max-w-2xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
    <div className="relative">
      <div className="w-40 h-40 bg-white/20 backdrop-blur-3xl rounded-[3rem] rotate-12 absolute inset-0 -z-10 border border-white/40"></div>
      <div className="w-40 h-40 bg-indigo-500/10 backdrop-blur-3xl rounded-[3rem] -rotate-6 border border-white/40 flex items-center justify-center shadow-2xl shadow-indigo-200">
        <Icon className="w-20 h-20 text-indigo-500" />
      </div>
      <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-emerald-400 rounded-2xl flex items-center justify-center shadow-lg border-2 border-white rotate-12">
        <Plus className="text-white w-6 h-6" />
      </div>
    </div>

    <div className="space-y-3">
      <h2 className="text-4xl font-black text-slate-800 tracking-tight">{title}</h2>
      <p className="text-lg text-slate-500 font-medium leading-relaxed">
        {description}
      </p>
    </div>

    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <button className="btn-primary group">
        {buttonText}
        <ArrowRight className="w-4 h-4 inline-block ml-2 group-hover:translate-x-1 transition-transform" />
      </button>
      {secondaryButtonText && (
        <button className="btn-ghost">
          {secondaryButtonText}
        </button>
      )}
    </div>

    <div className="pt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full">
      {[1,2,3].map(i => (
        <div key={i} className="glass-card p-4 bg-white/40 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <ShieldCheck className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-left">
            <p className="text-[9px] font-black uppercase text-slate-400">Feature {i}</p>
            <p className="text-[11px] font-bold text-slate-700">Enterprise Ready</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Products = () => (
  <EmptyState 
    icon={Package}
    title="Product Catalog"
    description="You haven't added any products yet. Import your Shopify catalog or design your first product listing manually to start tracking sales."
    buttonText="Design First Product"
    secondaryButtonText="Import from Shopify"
  />
);

export const Settings = () => (
  <EmptyState 
    icon={SettingsIcon}
    title="Workspace Settings"
    description="Configure your support channels, automation triggers, and team permissions. Tailor the workspace to fit your business needs."
    buttonText="Configure Workspace"
    secondaryButtonText="View API Keys"
  />
);
