import React, { useState } from 'react';
import { Application, Vacancy } from '../../types';
import {
  CheckCircle2,
  Award,
  UserCheck,
  Building2,
  Calendar,
  IndianRupee,
  X,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface HireCandidateModalProps {
  application: Application | null;
  vacancy: Vacancy | null;
  onClose: () => void;
  onConfirmHire: (appId: string, salary: string) => void;
}

export const HireCandidateModal: React.FC<HireCandidateModalProps> = ({
  application,
  vacancy,
  onClose,
  onConfirmHire,
}) => {
  if (!application || !vacancy) return null;

  const [joiningSalary, setJoiningSalary] = useState(
    vacancy.salary.split(' - ')[0] || '₹60,000 / month'
  );
  const [joiningDate, setJoiningDate] = useState(
    new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]
  );
  const [isProcessing, setIsProcessing] = useState(false);

  const handleHireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      onConfirmHire(application.id, joiningSalary);
      setIsProcessing(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-200 bg-emerald-700/50 px-2 py-0.5 rounded">
              Final Selection & Onboarding
            </span>
            <h3 className="text-lg font-bold text-white flex items-center gap-1.5 mt-1">
              <Sparkles className="w-5 h-5 text-amber-300" />
              <span>Hire & Appoint Candidate</span>
            </h3>
            <p className="text-xs text-emerald-100">
              Transform applicant into active NCC project site employee
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleHireSubmit} className="p-6 space-y-4 text-xs text-slate-700">
          {/* Candidate & Vacancy Brief */}
          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center justify-between border-b border-emerald-200/60 pb-1.5">
              <span className="font-bold text-emerald-950 text-xs">
                Candidate: {application.candidateName}
              </span>
              <span className="text-[11px] font-mono text-emerald-700">
                Application #{application.id}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-emerald-900">
              <p><strong>Job Role:</strong> {vacancy.jobRole}</p>
              <p><strong>Project Site:</strong> {vacancy.siteName}</p>
              <p><strong>Location:</strong> {vacancy.district}, {vacancy.state}</p>
              <p><strong>Qualification:</strong> {application.candidateQualification}</p>
            </div>
          </div>

          {/* Automated System Transition Notice (Requirement 3 & 15) */}
          <div className="bg-slate-50 border-l-4 border-emerald-600 p-3 rounded-r-xl space-y-1">
            <p className="font-bold text-slate-900 text-xs">
              Automated Business Logic Actions:
            </p>
            <ul className="space-y-1 text-slate-600 text-[11px]">
              <li>✓ Vacancy status changes from <strong>Open → Filled</strong></li>
              <li>✓ Vacancy is automatically removed from active public search</li>
              <li>✓ Selected candidate is enrolled as an active <strong>NCC Employee</strong></li>
              <li>✓ Automated appointment confirmation notification sent to candidate</li>
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Appointed Monthly CTC / Salary
              </label>
              <input
                type="text"
                required
                value={joiningSalary}
                onChange={(e) => setJoiningSalary(e.target.value)}
                placeholder="e.g. ₹60,000 / month"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Site Reporting / Joining Date
              </label>
              <input
                type="date"
                required
                value={joiningDate}
                onChange={(e) => setJoiningDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5 transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'Enrolling...' : 'Confirm Hire & Fill Vacancy'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
