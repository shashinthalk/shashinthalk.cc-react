import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  RefreshCw, 
  Mail, 
  Building2, 
  User, 
  CheckCircle2, 
  XCircle,
  Clock
} from 'lucide-react';

interface JobEmail {
  id: string;
  sender_name: string;
  reason: string;
  is_job_related: boolean;
  status: string;
  company_name: string;
  position_title: string;
  created_at: string;
}

const JobAnalitics = () => {
  const [emails, setEmails] = useState<JobEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = async () => {
    setIsRefreshing(true);
    try {
      const response = await fetch('/api/job-emails');
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#111827] text-slate-100 font-light pb-20">
      {/* Decorative Glow */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] pointer-events-none" />
      
      <main className="max-w-7xl mx-auto px-6 pt-32">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-500 text-xs font-bold uppercase tracking-[0.3em]">
              <Database size={14} /> System Intelligence
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Job Email Pipeline</h1>
            <p className="text-slate-400">Monitoring incoming opportunities from automated analysis.</p>
          </div>

          <button 
            onClick={fetchData}
            disabled={isRefreshing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-medium transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
          >
            <RefreshCw size={16} className={isRefreshing ? "animate-spin" : ""} />
            {isRefreshing ? "Syncing..." : "Refresh Feed"}
          </button>
        </header>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {[
            { label: 'Total Scanned', value: emails.length, icon: Mail },
            { label: 'Job Related', value: emails.filter(e => e.is_job_related).length, icon: CheckCircle2 },
            { label: 'Active Companies', value: new Set(emails.map(e => e.company_name)).size - 1, icon: Building2 },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm font-medium">{stat.label}</span>
                <stat.icon size={18} className="text-emerald-500/50" />
              </div>
              <div className="text-3xl font-bold mt-2">{loading ? "..." : stat.value}</div>
            </div>
          ))}
        </div>

        {/* Main Table */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.01] backdrop-blur-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 bg-white/[0.02]">
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Company & Position</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Sender</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                  <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td colSpan={4} className="px-6 py-8"><div className="h-4 bg-white/5 rounded-full w-full" /></td>
                    </tr>
                  ))
                ) : (
                  <AnimatePresence>
                    {emails.map((email) => (
                      <motion.tr 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={email.id} 
                        className="group hover:bg-emerald-500/[0.02] transition-colors"
                      >
                        <td className="px-6 py-6">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-200 flex items-center gap-2">
                              {email.company_name || "Unknown Company"}
                              {email.is_job_related && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />}
                            </span>
                            <span className="text-sm text-slate-500">{email.position_title || "Unspecified Role"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center gap-2 text-sm text-slate-300">
                            <User size={14} className="text-slate-500" />
                            {email.sender_name}
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter border ${
                            email.status === 'replied' 
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                            : 'bg-slate-500/10 border-slate-500/20 text-slate-400'
                          }`}>
                            {email.status || 'Pending'}
                          </span>
                        </td>
                        <td className="px-6 py-6 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-slate-400 font-mono">
                              {new Date(email.created_at).toLocaleDateString()}
                            </span>
                            <span className="text-[10px] text-slate-600 uppercase">
                              {new Date(email.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export { JobAnalitics };