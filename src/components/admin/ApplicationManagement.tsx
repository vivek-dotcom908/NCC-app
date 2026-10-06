import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Application, ApplicationStatus, InterviewDetails } from '../../types';
import { ScheduleInterviewModal } from './ScheduleInterviewModal';
import { HireCandidateModal } from './HireCandidateModal';
import {
  FileText,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Sparkles,
  UserCheck,
  User,
  Building2,
  MapPin,
  ExternalLink,
  Phone,
  Mail,
  GraduationCap,
  Award,
  ChevronRight,
} from 'lucide-react';

export const ApplicationManagement: React.FC = () => {
  const {
    applications,
    vacancies,
    candidates,
    updateApplicationStatus,
    hireCandidateForVacancy,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterVacancyId, setFilterVacancyId] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modals state
  const [schedulingApp, setSchedulingApp] = useState<Application | null>(null);
  const [hiringApp, setHiringApp] = useState<Application | null>(null);
  const [selectedCandidateDetail, setSelectedCandidateDetail] = useState<any | null>(null);

  // Filtered applications
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      if (filterVacancyId !== 'all' && app.vacancyId !== filterVacancyId) return false;
      if (filterStatus !== 'all' && app.status !== filterStatus) return false;

      if (searchTerm.trim()) {
        const kw = searchTerm.toLowerCase();
        const matchName = app.candidateName.toLowerCase().includes(kw);
        const matchEmail = app.candidateEmail.toLowerCase().includes(kw);
        const matchVac = app.vacancyTitle.toLowerCase().includes(kw);
        const matchSite = app.siteName.toLowerCase().includes(kw);
        if (!matchName && !matchEmail && !matchVac && !matchSite) return false;
      }

      return true;
    });
  }, [applications, filterVacancyId, filterStatus, searchTerm]);

  const handleStatusChange = (appId: string, status: ApplicationStatus) => {
    if (status === 'Interview Scheduled') {
      const app = applications.find((a) => a.id === appId);
      if (app) setSchedulingApp(app);
      return;
    }

    if (status === 'Selected') {
      const app = applications.find((a) => a.id === appId);
      if (app) setHiringApp(app);
      return;
    }

    updateApplicationStatus(appId, status);
  };

  const handleConfirmInterview = (appId: string, details: InterviewDetails) => {
    updateApplicationStatus(appId, 'Interview Scheduled', 'Interview call letter dispatched.', details);
  };

  const handleConfirmHire = (appId: string, salary: string) => {
    hireCandidateForVacancy(appId, salary);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Applied
          </span>
        );
      case 'Under Review':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            Under Review
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Shortlisted
          </span>
        );
      case 'Interview Scheduled':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            Interview Scheduled
          </span>
        );
      case 'Selected':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-300">
            Selected & Hired
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            Rejected
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Applicant Tracking System (ATS)
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Candidate Job Applications & Evaluation
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Review submitted credentials, transition candidates across recruitment stages, schedule site interviews, and execute one-click appointment into site employee positions.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search candidate name, email, role, or site..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Vacancy filter */}
          <div>
            <select
              value={filterVacancyId}
              onChange={(e) => setFilterVacancyId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden truncate"
            >
              <option value="all">All Vacancies ({vacancies.length})</option>
              {vacancies.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} ({v.id})
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Statuses ({applications.length})</option>
              <option value="Applied">Applied</option>
              <option value="Under Review">Under Review</option>
              <option value="Shortlisted">Shortlisted</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Selected">Selected</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Applicant</th>
                <th className="py-3.5 px-4">Applied Vacancy & Site</th>
                <th className="py-3.5 px-4">Experience & Qual</th>
                <th className="py-3.5 px-4">Resume / CV</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Recruitment Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApplications.map((app) => {
                const cand = candidates.find((c) => c.id === app.candidateId);
                const vac = vacancies.find((v) => v.id === app.vacancyId);

                return (
                  <tr key={app.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{app.candidateName}</div>
                      <div className="text-[11px] text-slate-500">{app.candidateEmail}</div>
                      <div className="text-[11px] text-slate-400">{app.candidatePhone}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Applied: {app.appliedAt}
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block">{app.vacancyTitle}</span>
                      <span className="text-[11px] text-blue-700 font-medium flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-blue-600" />
                        {app.siteName}
                      </span>
                      {app.hiredAsEmployeeId && (
                        <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-100 text-emerald-800 rounded font-mono text-[10px] font-bold">
                          Emp ID: {app.hiredAsEmployeeId}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">
                        {app.candidateQualification}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Exp: {app.candidateExperience}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="flex items-center space-x-1.5 text-blue-600 font-semibold text-xs">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate max-w-[130px]">{app.resumeFileName}</span>
                      </div>
                      {cand && (
                        <button
                          onClick={() => setSelectedCandidateDetail(cand)}
                          className="text-[10px] text-slate-500 hover:text-blue-700 underline mt-0.5 block"
                        >
                          View Full Dossier
                        </button>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      {getStatusBadge(app.status)}
                      {app.interviewDetails && (
                        <div className="text-[10px] text-purple-700 mt-1 font-semibold">
                          📅 {app.interviewDetails.date} ({app.interviewDetails.time})
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      {app.status === 'Selected' ? (
                        <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-2.5 py-1 rounded-lg">
                          Hired to Site
                        </span>
                      ) : (
                        <div className="flex items-center justify-end space-x-1.5">
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleStatusChange(app.id, e.target.value as ApplicationStatus)
                            }
                            className="px-2 py-1 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                          >
                            <option value="Applied">Applied</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Shortlisted">Shortlist Candidate</option>
                            <option value="Interview Scheduled">Schedule Interview</option>
                            <option value="Selected">Select & Hire (Fill Vacancy)</option>
                            <option value="Rejected">Reject</option>
                          </select>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredApplications.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No applications found matching the selected filter criteria.
          </div>
        )}
      </div>

      {/* Candidate Full Dossier Modal */}
      {selectedCandidateDetail && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                  Candidate Dossier
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  {selectedCandidateDetail.fullName}
                </h3>
                <p className="text-xs text-slate-300">
                  {selectedCandidateDetail.highestQualification} • {selectedCandidateDetail.district}, {selectedCandidateDetail.state}
                </p>
              </div>
              <button
                onClick={() => setSelectedCandidateDetail(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs text-slate-700 max-h-[70vh] overflow-y-auto">
              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                  Skills & Technical Strengths
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCandidateDetail.skills.map((s: string, i: number) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded bg-blue-50 text-blue-700 font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                  Prior Construction Experience
                </h4>
                <div className="space-y-2">
                  {selectedCandidateDetail.workExperience.map((exp: any, i: number) => (
                    <div key={i} className="p-2.5 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-900">{exp.role} at {exp.company}</p>
                      <p className="text-[11px] text-slate-500">{exp.duration}</p>
                      <p className="mt-1 text-slate-600 leading-relaxed">{exp.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 mb-1.5 uppercase tracking-wider text-[11px]">
                  Resume File On Record
                </h4>
                <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-slate-800">
                      {selectedCandidateDetail.resumeFileName}
                    </span>
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded">
                    Verified
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedCandidateDetail(null)}
                className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-semibold"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {schedulingApp && (
        <ScheduleInterviewModal
          application={schedulingApp}
          onClose={() => setSchedulingApp(null)}
          onConfirm={handleConfirmInterview}
        />
      )}

      {/* Hire Candidate Modal */}
      {hiringApp && (
        <HireCandidateModal
          application={hiringApp}
          vacancy={vacancies.find((v) => v.id === hiringApp.vacancyId) || null}
          onClose={() => setHiringApp(null)}
          onConfirmHire={handleConfirmHire}
        />
      )}
    </div>
  );
};
