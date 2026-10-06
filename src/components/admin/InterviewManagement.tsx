import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Building2,
  Video,
  CheckCircle2,
  ExternalLink,
  Search,
  AlertCircle,
} from 'lucide-react';

export const InterviewManagement: React.FC = () => {
  const { applications, vacancies, updateApplicationStatus, hireCandidateForVacancy } = useApp();

  const [searchTerm, setSearchTerm] = useState('');

  const scheduledApplications = applications.filter(
    (a) => a.status === 'Interview Scheduled' && a.interviewDetails
  );

  const filtered = scheduledApplications.filter((app) => {
    if (!searchTerm.trim()) return true;
    const kw = searchTerm.toLowerCase();
    return (
      app.candidateName.toLowerCase().includes(kw) ||
      app.vacancyTitle.toLowerCase().includes(kw) ||
      app.siteName.toLowerCase().includes(kw)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-700 uppercase tracking-wider">
            Selection Rounds
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Scheduled Interviews & Technical Panels
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor upcoming candidate assessments across site offices and online interview rooms.
          </p>
        </div>

        <div className="bg-purple-50 text-purple-900 px-3.5 py-1.5 rounded-xl border border-purple-200 text-xs font-bold flex items-center gap-1.5">
          <Calendar className="w-4 h-4 text-purple-700" />
          <span>{scheduledApplications.length} Active Interview Calls</span>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search candidate name, vacancy, site..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Interviews Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="bg-white rounded-2xl border border-purple-200 p-5 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-purple-100 pb-2.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-600 animate-pulse"></span>
                    <span className="font-bold text-slate-900 text-sm">
                      {app.candidateName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
                    App #{app.id}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{app.vacancyTitle}</h4>
                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>{app.siteName}</span>
                  </p>
                </div>

                {app.interviewDetails && (
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-2 text-slate-700">
                    <div className="grid grid-cols-2 gap-2">
                      <p>
                        <strong className="text-slate-500 block text-[10px]">DATE & TIME:</strong>
                        <span className="font-bold text-slate-900">{app.interviewDetails.date} @ {app.interviewDetails.time}</span>
                      </p>
                      <p>
                        <strong className="text-slate-500 block text-[10px]">FORMAT:</strong>
                        <span className="font-semibold text-purple-800">{app.interviewDetails.mode}</span>
                      </p>
                    </div>

                    <p>
                      <strong className="text-slate-500 block text-[10px]">VENUE / LINK:</strong>
                      <span className="font-medium text-blue-700">{app.interviewDetails.locationOrLink}</span>
                    </p>

                    <p>
                      <strong className="text-slate-500 block text-[10px]">PANEL:</strong>
                      <span>{app.interviewDetails.interviewer}</span>
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() =>
                    updateApplicationStatus(app.id, 'Rejected', 'Did not qualify technical assessment.')
                  }
                  className="px-3 py-1.5 rounded-lg border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                >
                  Mark Unsuccessful
                </button>

                <button
                  onClick={() =>
                    hireCandidateForVacancy(app.id)
                  }
                  className="px-4 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center space-x-1"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pass & Appoint Candidate</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
          <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
          <h4 className="font-bold text-slate-800 text-base">No Scheduled Interviews Active</h4>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Review incoming applicants in the Applications tab and click &quot;Schedule Interview&quot; to issue call letters.
          </p>
        </div>
      )}
    </div>
  );
};
