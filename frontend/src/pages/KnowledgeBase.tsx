import React, { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Search, 
  Download, 
  Trash2, 
  MoreVertical, 
  Info,
  CheckCircle,
  AlertCircle,
  Loader2,
  FileCode,
  FileSpreadsheet,
  FileJson
} from 'lucide-react';
import { kbService } from '../services/appService';
import { KBItem } from '../data/mockData';

const FileIcon = ({ type, className }: { type: string, className?: string }) => {
  switch (type) {
    case 'PDF': return <FileText className={className} />;
    case 'DOCX': return <FileText className={className} />;
    case 'CSV': return <FileSpreadsheet className={className} />;
    case 'JSON': return <FileJson className={className} />;
    default: return <FileText className={className} />;
  }
};

export const KnowledgeBase = () => {
  const [items, setItems] = useState<KBItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    kbService.getKBItems().then(setItems);
  }, []);

  const handleUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      // Simulate error 50% of the time for demo
      if (Math.random() > 0.5) {
        setError("Failed to index 'Rules_V3.pdf'. Please check the file format.");
        setTimeout(() => setError(null), 3000);
      }
    }, 2000);
  };

  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <header>
        <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Knowledge Base</h1>
        <p className="text-slate-500 font-medium">Upload documents to train your AI Support Copilot.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Upload & Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-card p-8 border-2 border-dashed border-indigo-200 text-center relative overflow-hidden group">
            <input 
              type="file" 
              className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              onChange={handleUpload}
              disabled={isUploading}
            />
            <div className="space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                {isUploading ? <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" /> : <Upload className="w-8 h-8 text-indigo-600" />}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Select Files</h3>
                <p className="text-xs text-slate-400 font-medium">Drop PDF, DOCX, or CSV files here</p>
              </div>
              <button className="btn-primary w-full" disabled={isUploading}>
                {isUploading ? 'Uploading...' : 'Select Files'}
              </button>
            </div>
          </div>

          {error && (
            <div className="glass-card p-4 bg-rose-50 border-rose-200 flex gap-3 animate-in slide-in-from-top-2">
              <AlertCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
              <p className="text-xs font-medium text-rose-700">{error}</p>
            </div>
          )}

          <div className="glass-card p-6 bg-slate-800 text-white border-none space-y-4">
            <div className="flex items-center gap-2 text-indigo-300">
              <Info className="w-4 h-4" />
              <h4 className="text-[10px] font-black uppercase tracking-widest">AI Context</h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              Documents uploaded here are automatically indexed into our vector database. Your AI Copilot uses this information to provide accurate, cited answers to support queries.
            </p>
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs font-medium text-slate-400">Indexer Status</span>
              <span className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                <CheckCircle className="w-3 h-3" /> Healthy
              </span>
            </div>
          </div>
        </div>

        {/* Right: Documents Table */}
        <div className="lg:col-span-8 glass-card overflow-hidden">
          <div className="p-6 border-b border-white/40 flex justify-between items-center">
            <h3 className="text-xl font-bold text-slate-800">Manage Documents</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search documents..."
                className="bg-white/40 border border-white/40 rounded-xl py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/30 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-4">Document</th>
                  <th className="px-6 py-4">Type</th>
                  <th className="px-6 py-4">Size</th>
                  <th className="px-6 py-4">Uploaded</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {items.map((item) => (
                  <tr key={item.id} className="group hover:bg-white/40 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-white/60 rounded-lg flex items-center justify-center border border-white/40 group-hover:bg-indigo-50 transition-colors">
                          <FileIcon type={item.type} className="w-4 h-4 text-indigo-500" />
                        </div>
                        <span className="font-bold text-slate-800 text-sm truncate max-w-xs">{item.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-black uppercase">{item.type}</span>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.size}</td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">{item.uploadedDate}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white/60 rounded-lg text-slate-500"><Download className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-white/60 rounded-lg text-rose-500"><Trash2 className="w-4 h-4" /></button>
                        <button className="p-2 hover:bg-white/60 rounded-lg text-slate-500"><MoreVertical className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
