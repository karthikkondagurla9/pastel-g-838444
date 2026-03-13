import React, { useState, useEffect } from 'react';
import { 
  Zap, 
  Play, 
  Pause, 
  Settings as SettingsIcon, 
  History, 
  CheckCircle, 
  XCircle, 
  Loader2,
  TrendingUp,
  Cpu,
  BarChart3
} from 'lucide-react';
import { automationService } from '../services/appService';
import { AutomationFlow, FlowRun } from '../data/mockData';
import { clsx } from 'clsx';

export const Automations = () => {
  const [activeTab, setActiveTab] = useState<'flows' | 'logs'>('flows');
  const [flows, setFlows] = useState<AutomationFlow[]>([]);
  const [logs, setLogs] = useState<FlowRun[]>([]);

  useEffect(() => {
    automationService.getFlows().then(setFlows);
    automationService.getFlowRuns().then(setLogs);
  }, []);

  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Automation Flows</h1>
          <p className="text-slate-500 font-medium">Design and monitor intelligent customer journey automations.</p>
        </div>
        <div className="flex bg-white/40 p-1.5 rounded-2xl border border-white/40 backdrop-blur-md">
          <button 
            onClick={() => setActiveTab('flows')}
            className={clsx(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === 'flows' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-800"
            )}
          >
            Active Flows
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={clsx(
              "px-6 py-2 rounded-xl text-sm font-bold transition-all",
              activeTab === 'logs' ? "bg-white shadow-sm text-indigo-600" : "text-slate-500 hover:text-slate-800"
            )}
          >
            Execution Logs
          </button>
        </div>
      </header>

      {activeTab === 'flows' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flows.map((flow) => (
            <div key={flow.id} className="glass-card p-6 flex flex-col gap-6 group hover:shadow-xl hover:shadow-indigo-500/5">
              <div className="flex justify-between items-start">
                <div className={clsx(
                  "p-3 rounded-2xl",
                  flow.id === 'flow-1' ? "bg-blue-100 text-blue-600" :
                  flow.id === 'flow-2' ? "bg-purple-100 text-purple-600" : "bg-amber-100 text-amber-600"
                )}>
                  <Zap className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-2">
                  <span className={clsx(
                    "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest",
                    flow.status === 'active' ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-500"
                  )}>
                    {flow.status}
                  </span>
                  <button className="p-2 hover:bg-white/60 rounded-xl transition-colors">
                    <SettingsIcon className="w-4 h-4 text-slate-400" />
                  </button>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-1">{flow.name}</h3>
                <p className="text-xs text-slate-500 font-medium line-clamp-2">{flow.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/20">
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Daily Triggers</p>
                  <p className="text-lg font-bold text-slate-800">{flow.dailyTriggers}</p>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Success Rate</p>
                  <p className="text-lg font-bold text-emerald-600">{flow.successRate}%</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                  <History className="w-3.5 h-3.5" />
                  Last run {flow.lastRun}
                </div>
                <button className={clsx(
                  "p-2 rounded-xl transition-all shadow-md active:scale-90",
                  flow.status === 'active' ? "bg-rose-100 text-rose-600 hover:bg-rose-500 hover:text-white" : "bg-emerald-100 text-emerald-600 hover:bg-emerald-500 hover:text-white"
                )}>
                  {flow.status === 'active' ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
              </div>
            </div>
          ))}
          <button className="glass-card p-6 border-2 border-dashed border-indigo-200 bg-transparent flex flex-col items-center justify-center gap-4 group hover:border-indigo-500 hover:bg-indigo-50/10 transition-all">
            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-indigo-600" />
            </div>
            <span className="font-bold text-indigo-600">Create New Flow</span>
          </button>
        </div>
      ) : (
        <div className="glass-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/30 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Flow Name</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Details</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {logs.map((run) => (
                  <tr key={run.id} className="group hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4">
                      {run.status === 'success' ? (
                        <div className="flex items-center gap-2 text-emerald-600">
                          <CheckCircle className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase">Success</span>
                        </div>
                      ) : run.status === 'failed' ? (
                        <div className="flex items-center gap-2 text-rose-600">
                          <XCircle className="w-4 h-4" />
                          <span className="text-[10px] font-bold uppercase">Failed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-blue-600">
                          <div className="relative">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-20"></div>
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                            Live <span className="w-1 h-1 bg-blue-600 rounded-full"></span>
                          </span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-bold text-slate-800">{run.flowName}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">ID: {run.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500 font-medium">{run.timestamp}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 max-w-xs truncate">{run.details}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-[10px] font-black uppercase tracking-widest text-indigo-600 hover:underline">View Report</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 bg-slate-800 text-white border-none shadow-2xl shadow-indigo-900/20">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-500 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Boost</span>
          </div>
          <h4 className="text-3xl font-bold mb-1">24%</h4>
          <p className="text-xs text-slate-400 font-medium">Efficiency Boost this month across all support triggers.</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
              <Cpu className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</span>
          </div>
          <h4 className="text-3xl font-bold text-slate-800 mb-1">12.5k</h4>
          <p className="text-xs text-slate-500 font-medium">Automated executions processed in the last 30 days.</p>
        </div>
        <div className="glass-card p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-100 text-purple-600 rounded-xl">
              <BarChart3 className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Success</span>
          </div>
          <h4 className="text-3xl font-bold text-slate-800 mb-1">94.8%</h4>
          <p className="text-xs text-slate-500 font-medium">Overall flow success rate across your workspace.</p>
        </div>
        <div className="glass-card p-6 flex items-center justify-center border-2 border-indigo-100">
          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-indigo-500 mb-2">Workspace Health</p>
            <div className="flex gap-1 justify-center mb-1">
              {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-6 bg-emerald-400 rounded-full"></div>)}
            </div>
            <p className="text-xs font-bold text-emerald-600">Excellent</p>
          </div>
        </div>
      </div>
    </div>
  );
};
