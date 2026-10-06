import React from 'react';
import { Vacancy } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Building2,
  MapPin,
  Calendar,
  Briefcase,
  IndianRupee,
  Clock,
  GraduationCap,
  Award,
  Sparkles,
  Phone,
  Mail,
  UserCheck,
  CheckCircle2,
  Send,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';

interface JobDetailsModalProps {
  vacancy: Vacancy | null;
  onClose: () => void;
  onApply: (v: Vacancy) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({
  vacancy,
  onClose,
  onApply,
}) => {
  const { sites, currentCandidate, applications, toggleSaveVacancy } = useApp();

  if (!vacancy) return null;

  const site = sites.find((s) => s.id === vacancy.siteId);
  const isSaved = currentCandidate?.savedVacancies.includes(vacancy.id) || false;
  const hasApplied = applications.some(
    (a) => a.vacancyId === vacancy.id && a.candidateId === currentCandidate?.id
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-[#0f294a] text-white p-5 shrink-0 flex items-start justify-between">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-900 uppercase">
                {vacancy.id}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-blue-700/80 text-white">
                {vacancy.jobType}
              </span>
              {vacancy.source === 'Automatic' && (
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/30 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  Auto-Vacated Post
                </span>
              )}
            </div>
            <h2 className="text-xl font-bold text-white leading-tight">
              {vacancy.title}
            </h2>
            <div className="flex items-center text-xs text-blue-200 space-x-2">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{vacancy.siteName}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700">
          {/* Key Details Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">Location</span>
              <span className="font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3 h-3 text-blue-600 shrink-0" />
                {vacancy.district}, {vacancy.state}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Openings</span>
              <span className="font-bold text-slate-800 mt-0.5 block">
                {vacancy.openingsCount} Position{vacancy.openingsCount > 1 ? 's' : ''}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Vacancy Status</span>
              <span className="font-bold text-emerald-600 mt-0.5 block">
                {vacancy.status}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Pay Scale / CTC</span>
              <span className="font-bold text-emerald-700 mt-0.5 block">
                {vacancy.salary}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Posted Date</span>
              <span className="font-semibold text-slate-800 mt-0.5 block">
                {vacancy.datePosted}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Last Date to Apply</span>
              <span className="font-bold text-red-600 mt-0.5 block">
                {vacancy.lastDate}
              </span>
            </div>
          </div>

          {/* Job Description */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-blue-600" />
              Role Description & Project Context
            </h4>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed bg-white p-3 rounded-lg border border-slate-100">
              {vacancy.description}
            </p>
          </div>

          {/* Key Responsibilities */}
          {vacancy.responsibilities && vacancy.responsibilities.length > 0 && (
            <div>
              <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600" />
                Key Duties & Scope of Work
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-slate-600 bg-slate-50/70 p-3.5 rounded-lg border border-slate-200">
                {vacancy.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0"></span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Eligibility Requirements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl border border-blue-100 bg-blue-50/40">
              <div className="flex items-center space-x-2 mb-1.5">
                <GraduationCap className="w-4 h-4 text-blue-700" />
                <span className="font-bold text-xs text-blue-900 uppercase">
                  Required Qualification
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {vacancy.qualification}
              </p>
            </div>

            <div className="p-3.5 rounded-xl border border-indigo-100 bg-indigo-50/40">
              <div className="flex items-center space-x-2 mb-1.5">
                <Award className="w-4 h-4 text-indigo-700" />
                <span className="font-bold text-xs text-indigo-900 uppercase">
                  Required Experience
                </span>
              </div>
              <p className="text-xs text-slate-700 font-medium">
                {vacancy.experience}
              </p>
            </div>
          </div>

          {/* Project Site & HR Contact details */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-amber-600" />
                Project Site & Recruitment Desk
              </span>
              <span className="text-[11px] text-slate-500 font-normal">
                Category: {site?.category || 'Infrastructure'}
              </span>
            </h4>
            <div className="space-y-1.5 text-xs text-slate-600">
              <p className="flex items-start gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Site Address:</strong> {vacancy.siteAddress}
                </span>
              </p>
              {site && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200 text-slate-700">
                  <p className="flex items-center gap-1.5">
                    <UserCheck className="w-3.5 h-3.5 text-blue-600" />
                    <span>
                      HR Officer: <strong>{site.contactPerson}</strong>
                    </span>
                  </p>
                  <p className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{site.contactPhone}</span>
                  </p>
                  <p className="flex items-center gap-1.5 sm:col-span-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600" />
                    <span>{site.contactEmail}</span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Automatic Origin Notice */}
          {vacancy.source === 'Automatic' && vacancy.originatedFromEmployeeName && (
            <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 text-xs flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Automated Vacancy Note:</strong> This vacancy was systematically opened after employee separation ({vacancy.originatedFromEmployeeName}). Fast-track screening is enabled for this position.
              </span>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 p-4 shrink-0 flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition"
          >
            Close
          </button>

          <div className="flex items-center space-x-2">
            {currentCandidate && (
              <button
                onClick={() => toggleSaveVacancy(vacancy.id)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg border transition ${
                  isSaved
                    ? 'bg-amber-50 text-amber-700 border-amber-300'
                    : 'text-slate-600 border-slate-300 hover:bg-white'
                }`}
              >
                {isSaved ? '★ Saved' : '☆ Save Vacancy'}
              </button>
            )}

            {vacancy.status === 'Open' ? (
              <button
                onClick={() => {
                  onClose();
                  onApply(vacancy);
                }}
                disabled={hasApplied}
                className={`px-5 py-2.5 text-xs font-bold rounded-lg transition flex items-center space-x-1.5 shadow-sm ${
                  hasApplied
                    ? 'bg-emerald-100 text-emerald-800 cursor-default'
                    : 'bg-blue-700 hover:bg-blue-800 text-white cursor-pointer'
                }`}
              >
                {hasApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Application Submitted</span>
                  </>
                ) : (
                  <>
                    <span>Apply for this Vacancy</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            ) : (
              <span className="text-xs font-semibold text-slate-500 bg-slate-200 px-3 py-1.5 rounded-lg">
                Vacancy {vacancy.status}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
