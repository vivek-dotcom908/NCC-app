import React from 'react';
import { Vacancy } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Building2,
  Calendar,
  Briefcase,
  IndianRupee,
  Clock,
  Bookmark,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Users,
} from 'lucide-react';

interface JobCardProps {
  vacancy: Vacancy;
  onOpenDetails: (v: Vacancy) => void;
  onApply: (v: Vacancy) => void;
}

export const JobCard: React.FC<JobCardProps> = ({
  vacancy,
  onOpenDetails,
  onApply,
}) => {
  const { currentCandidate, toggleSaveVacancy, applications } = useApp();

  const isSaved = currentCandidate?.savedVacancies.includes(vacancy.id) || false;
  const hasApplied = applications.some(
    (a) => a.vacancyId === vacancy.id && a.candidateId === currentCandidate?.id
  );

  const isAutoSource = vacancy.source === 'Automatic';

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md transition-all duration-200 p-5 flex flex-col justify-between group hover:border-blue-400">
      <div>
        {/* Top Badges */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60">
              {vacancy.jobType}
            </span>

            {isAutoSource && (
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1" title="Urgent opening automatically generated from employee replacement requirement">
                <Sparkles className="w-3 h-3 text-amber-600 animate-pulse" />
                <span>Urgent Site Replacement</span>
              </span>
            )}

            {vacancy.status === 'Open' ? (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Open ({vacancy.openingsCount} {vacancy.openingsCount > 1 ? 'posts' : 'post'})
              </span>
            ) : vacancy.status === 'Filled' ? (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Filled
              </span>
            ) : (
              <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-600">
                Closed
              </span>
            )}
          </div>

          {currentCandidate && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleSaveVacancy(vacancy.id);
              }}
              className={`p-1.5 rounded-lg border transition ${
                isSaved
                  ? 'bg-amber-50 text-amber-600 border-amber-200'
                  : 'text-slate-400 hover:text-slate-600 border-transparent hover:bg-slate-50'
              }`}
              title={isSaved ? 'Remove Bookmark' : 'Save Vacancy'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          )}
        </div>

        {/* Title & Job Role */}
        <h3
          onClick={() => onOpenDetails(vacancy)}
          className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition cursor-pointer leading-snug line-clamp-2"
        >
          {vacancy.title}
        </h3>

        {/* Project Site Name */}
        <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-700 mt-2">
          <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span className="truncate">{vacancy.siteName}</span>
        </div>

        {/* Location (State & District) */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mt-1">
          <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            {vacancy.district}, <strong className="font-semibold text-slate-700">{vacancy.state}</strong>
          </span>
        </div>

        {/* Short Description */}
        <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed">
          {vacancy.description}
        </p>

        {/* Key Specs Pills */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
          <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-slate-700">
            <span className="text-slate-400 block text-[10px]">Experience</span>
            <span className="font-semibold truncate block">{vacancy.experience}</span>
          </div>
          <div className="bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100 text-slate-700">
            <span className="text-slate-400 block text-[10px]">Pay Scale</span>
            <span className="font-semibold truncate block text-emerald-700">{vacancy.salary}</span>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="text-[11px] text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3 text-slate-400" />
          <span>Apply by: {vacancy.lastDate}</span>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onOpenDetails(vacancy)}
            className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition"
          >
            Details
          </button>

          {vacancy.status === 'Open' && (
            <button
              onClick={() => onApply(vacancy)}
              disabled={hasApplied}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition flex items-center space-x-1 ${
                hasApplied
                  ? 'bg-emerald-100 text-emerald-800 cursor-default'
                  : 'bg-blue-700 hover:bg-blue-800 text-white shadow-xs'
              }`}
            >
              {hasApplied ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Applied</span>
                </>
              ) : (
                <>
                  <span>Apply</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
