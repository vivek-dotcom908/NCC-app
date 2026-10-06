import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ApplicationStatus, Vacancy } from '../../types';
import {
  User,
  Briefcase,
  FileText,
  Bookmark,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ExternalLink,
  Edit3,
  Award,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  ChevronRight,
  Sparkles,
  Download,
  Building2,
  Eye,
  Check,
} from 'lucide-react';

interface CandidateDashboardProps {
  onOpenVacancyDetails: (v: Vacancy) => void;
  onApplyVacancy: (v: Vacancy) => void;
}

export const CandidateDashboard: React.FC<CandidateDashboardProps> = ({
  onOpenVacancyDetails,
  onApplyVacancy,
}) => {
  const {
    currentCandidate,
    updateCandidateProfile,
    applications,
    vacancies,
    sites,
    setActiveTab,
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<
    'applications' | 'saved' | 'interviews' | 'profile'
  >('applications');

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [selectedInterviewModal, setSelectedInterviewModal] = useState<any | null>(null);

  // Profile edit states
  const [editName, setEditName] = useState(currentCandidate?.fullName || '');
  const [editPhone, setEditPhone] = useState(currentCandidate?.phone || '');
  const [editQual, setEditQual] = useState(currentCandidate?.highestQualification || '');
  const [editSkills, setEditSkills] = useState(currentCandidate?.skills.join(', ') || '');
  const [editAddress, setEditAddress] = useState(currentCandidate?.address || '');

  if (!currentCandidate) {
    return (
      <div className="py-16 text-center max-w-md mx-auto space-y-4">
        <h3 className="text-xl font-bold text-slate-800">No Candidate Logged In</h3>
        <p className="text-sm text-slate-500">
          Please log in to view your candidate dashboard and applications.
        </p>
        <button
          onClick={() => setActiveTab('jobs')}
          className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold"
        >
          Browse Vacancies
        </button>
      </div>
    );
  }

  // Filter applications belonging to current candidate
  const myApplications = applications.filter((a) => a.candidateId === currentCandidate.id);
  const savedVacanciesList = vacancies.filter((v) =>
    currentCandidate.savedVacancies.includes(v.id)
  );
  const scheduledInterviews = myApplications.filter(
    (a) => a.status === 'Interview Scheduled' && a.interviewDetails
  );

  // Calculate Profile Completion %
  const calculateProfileCompletion = () => {
    let score = 0;
    if (currentCandidate.fullName) score += 15;
    if (currentCandidate.email && currentCandidate.phone) score += 15;
    if (currentCandidate.state && currentCandidate.district) score += 15;
    if (currentCandidate.highestQualification) score += 20;
    if (currentCandidate.workExperience && currentCandidate.workExperience.length > 0) score += 15;
    if (currentCandidate.skills && currentCandidate.skills.length > 0) score += 10;
    if (currentCandidate.resumeFileName) score += 10;
    return Math.min(score, 100);
  };

  const profileCompletionPercent = calculateProfileCompletion();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateProfile({
      fullName: editName,
      phone: editPhone,
      highestQualification: editQual,
      skills: editSkills.split(',').map((s) => s.trim()).filter(Boolean),
      address: editAddress,
    });
    setIsEditingProfile(false);
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'Applied':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            Applied
          </span>
        );
      case 'Under Review':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            Under Review
          </span>
        );
      case 'Shortlisted':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            Shortlisted
          </span>
        );
      case 'Interview Scheduled':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-purple-600" />
            Interview Scheduled
          </span>
        );
      case 'Selected':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Selected & Appointed
          </span>
        );
      case 'Rejected':
        return (
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1.5">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Not Selected
          </span>
        );
      default:
        return null;
    }
  };

  // Pipeline stages for visual tracker
  const stages: ApplicationStatus[] = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview Scheduled',
    'Selected',
  ];

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Candidate Profile Top Header */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center space-x-4">
            <img
              src={currentCandidate.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentCandidate.fullName}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-4 ring-blue-50 shadow-sm"
            />
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900">
                  {currentCandidate.fullName}
                </h1>
                <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 font-mono">
                  {currentCandidate.id}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-700">
                {currentCandidate.highestQualification}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 pt-0.5">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  {currentCandidate.district}, {currentCandidate.state}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {currentCandidate.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {currentCandidate.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Profile Completion Bar (Section 4) */}
          <div className="w-full md:w-64 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span className="text-slate-700">Profile Completion</span>
              <span className="text-blue-700">{profileCompletionPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  profileCompletionPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                }`}
                style={{ width: `${profileCompletionPercent}%` }}
              ></div>
            </div>
            <p className="text-[10px] text-slate-500 text-center">
              {profileCompletionPercent === 100
                ? 'Profile 100% complete & verified for interviews!'
                : 'Complete skills & education to increase recruiter visibility'}
            </p>
          </div>
        </div>

        {/* Sub-Tabs Navigation */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-1 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setActiveSubTab('applications')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap ${
              activeSubTab === 'applications'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>My Applications ({myApplications.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('interviews')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap ${
              activeSubTab === 'interviews'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Scheduled Interviews ({scheduledInterviews.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('saved')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap ${
              activeSubTab === 'saved'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Vacancies ({savedVacanciesList.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('profile')}
            className={`px-4 py-2.5 rounded-xl transition flex items-center space-x-2 whitespace-nowrap ${
              activeSubTab === 'profile'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Candidate Profile & Resume</span>
          </button>
        </div>

        {/* TAB 1: MY APPLICATIONS WITH PIPELINE TRACKER */}
        {activeSubTab === 'applications' && (
          <div className="space-y-4">
            {myApplications.length > 0 ? (
              myApplications.map((app) => {
                const vacancy = vacancies.find((v) => v.id === app.vacancyId);
                const currentStageIdx = stages.indexOf(app.status);

                return (
                  <div
                    key={app.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center space-x-2 text-xs">
                          <span className="font-mono text-slate-400">ID: {app.id}</span>
                          <span>•</span>
                          <span className="text-slate-500">Applied on: {app.appliedAt}</span>
                        </div>
                        <h3 className="text-base font-bold text-slate-900 mt-1">
                          {app.vacancyTitle}
                        </h3>
                        <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                          <Building2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>{app.siteName}</span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        {getStatusBadge(app.status)}
                      </div>
                    </div>

                    {/* Visual Status Pipeline Progress */}
                    <div className="pt-2">
                      <div className="text-[11px] font-bold text-slate-500 mb-2 uppercase tracking-wider">
                        Application Progression Pipeline:
                      </div>
                      <div className="grid grid-cols-5 gap-2 text-center">
                        {stages.map((stg, idx) => {
                          const isDone = currentStageIdx >= idx;
                          const isCurrent = app.status === stg;
                          return (
                            <div key={stg} className="space-y-1">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  isCurrent
                                    ? 'bg-blue-600 ring-2 ring-blue-300'
                                    : isDone
                                    ? 'bg-emerald-500'
                                    : 'bg-slate-200'
                                }`}
                              ></div>
                              <span
                                className={`text-[10px] block leading-tight font-medium ${
                                  isCurrent
                                    ? 'font-bold text-blue-700'
                                    : isDone
                                    ? 'text-emerald-700'
                                    : 'text-slate-400'
                                }`}
                              >
                                {stg}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Interview call card if scheduled */}
                    {app.status === 'Interview Scheduled' && app.interviewDetails && (
                      <div className="p-4 rounded-xl bg-purple-50 border border-purple-200 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-purple-900 flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-purple-700" />
                            Official Interview Call Letter Issued
                          </span>
                          <button
                            onClick={() => setSelectedInterviewModal(app)}
                            className="px-2.5 py-1 text-xs font-bold bg-purple-700 hover:bg-purple-800 text-white rounded-lg transition"
                          >
                            View Call Letter & Instructions
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs text-purple-800">
                          <p><strong>Date:</strong> {app.interviewDetails.date}</p>
                          <p><strong>Time:</strong> {app.interviewDetails.time}</p>
                          <p><strong>Mode:</strong> {app.interviewDetails.mode}</p>
                        </div>
                      </div>
                    )}

                    {/* Selection Congratulations if Selected */}
                    {app.status === 'Selected' && (
                      <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-1 text-xs text-emerald-900">
                        <p className="font-bold text-sm flex items-center gap-1.5 text-emerald-800">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          Appointment Confirmed!
                        </p>
                        <p>
                          You have been selected for this position. Your site appointment formalities have been initialized with the Project HR desk.
                          {app.hiredAsEmployeeId && (
                            <span className="block mt-1 font-mono font-bold text-emerald-800">
                              Assigned Employee ID: {app.hiredAsEmployeeId}
                            </span>
                          )}
                        </p>
                      </div>
                    )}

                    {/* Bottom Links */}
                    <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-500">
                        Resume attached: <strong>{app.resumeFileName}</strong>
                      </span>

                      {vacancy && (
                        <button
                          onClick={() => onOpenVacancyDetails(vacancy)}
                          className="text-blue-700 hover:underline font-semibold flex items-center gap-1"
                        >
                          <span>View Original Vacancy Post</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Briefcase className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">No Applications Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  You haven&apos;t submitted any vacancy applications yet. Search open vacancies across project sites and apply.
                </p>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="px-4 py-2 bg-blue-700 text-white rounded-xl text-xs font-bold"
                >
                  Find Open Vacancies
                </button>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: SCHEDULED INTERVIEWS */}
        {activeSubTab === 'interviews' && (
          <div className="space-y-4">
            {scheduledInterviews.length > 0 ? (
              scheduledInterviews.map((app) => (
                <div
                  key={app.id}
                  className="bg-white rounded-2xl border border-purple-200 p-6 shadow-xs space-y-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-purple-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-purple-700 uppercase tracking-wider bg-purple-50 px-2 py-0.5 rounded">
                          Official Call Letter
                        </span>
                        <h3 className="font-bold text-base text-slate-900 mt-0.5">
                          Interview for {app.vacancyTitle}
                        </h3>
                      </div>
                    </div>
                    <span className="text-xs font-bold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
                      Confirmed by HR
                    </span>
                  </div>

                  {app.interviewDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl text-xs text-slate-700 border border-slate-200">
                      <div>
                        <span className="text-slate-400 block font-semibold">Date & Time</span>
                        <p className="font-bold text-slate-900 text-sm mt-0.5">
                          {app.interviewDetails.date} at {app.interviewDetails.time}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-semibold">Mode / Venue</span>
                        <p className="font-bold text-slate-900 text-sm mt-0.5">
                          {app.interviewDetails.mode}
                        </p>
                      </div>

                      <div className="col-span-2">
                        <span className="text-slate-400 block font-semibold">Location / Meeting Link</span>
                        <p className="font-semibold text-blue-700 mt-0.5 bg-white p-2.5 rounded-lg border border-slate-200">
                          {app.interviewDetails.locationOrLink}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-semibold">Interviewing Panel</span>
                        <p className="font-medium text-slate-800 mt-0.5">
                          {app.interviewDetails.interviewer}
                        </p>
                      </div>

                      <div>
                        <span className="text-slate-400 block font-semibold">Project Site</span>
                        <p className="font-medium text-slate-800 mt-0.5">
                          {app.siteName}
                        </p>
                      </div>

                      <div className="col-span-2 bg-amber-50 p-3 rounded-lg border border-amber-200 text-amber-900">
                        <span className="font-bold block text-amber-950 mb-0.5">Special Instructions:</span>
                        <p className="leading-relaxed">{app.interviewDetails.instructions}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">No Interviews Scheduled Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Once your application is shortlisted by the site technical team, your interview call letter and meeting instructions will appear here.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: SAVED VACANCIES */}
        {activeSubTab === 'saved' && (
          <div className="space-y-4">
            {savedVacanciesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {savedVacanciesList.map((vac) => (
                  <div
                    key={vac.id}
                    className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-blue-400 transition"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-2">
                        <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold">
                          {vac.jobType}
                        </span>
                        <span className="text-slate-400 text-[11px]">Due: {vac.lastDate}</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">
                        {vac.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate">{vac.siteName}</span>
                      </p>
                      <p className="text-xs text-emerald-700 font-bold mt-2">
                        {vac.salary}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                      <button
                        onClick={() => onOpenVacancyDetails(vac)}
                        className="text-xs font-semibold text-slate-600 hover:text-blue-700"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => onApplyVacancy(vac)}
                        className="px-3 py-1.5 bg-blue-700 text-white rounded-lg text-xs font-bold hover:bg-blue-800"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                <h4 className="font-bold text-slate-800 text-base">No Saved Vacancies</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Click the bookmark icon on any vacancy card while browsing to save it for later review.
                </p>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CANDIDATE PROFILE & RESUME */}
        {activeSubTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Candidate Credentials & Documentation
                </h3>
                <p className="text-xs text-slate-500">
                  Review or modify your contact information, qualification, and uploaded CV
                </p>
              </div>

              {!isEditingProfile && (
                <button
                  onClick={() => setIsEditingProfile(true)}
                  className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold flex items-center space-x-1.5 transition"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {isEditingProfile ? (
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Highest Qualification
                    </label>
                    <input
                      type="text"
                      value={editQual}
                      onChange={(e) => setEditQual(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Current Address</label>
                    <input
                      type="text"
                      value={editAddress}
                      onChange={(e) => setEditAddress(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-slate-700 mb-1">
                      Skills (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={editSkills}
                      onChange={(e) => setEditSkills(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 bg-slate-100 text-slate-600 font-semibold text-xs rounded-xl hover:bg-slate-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Details view */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">Candidate ID</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">{currentCandidate.id}</span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">Gender & DOB</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      {currentCandidate.gender} • {currentCandidate.dob}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">Location</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      {currentCandidate.district}, {currentCandidate.state}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">Current Employer</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      {currentCandidate.currentCompany || 'Not specified'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">Notice Period</span>
                    <span className="font-bold text-slate-900 mt-0.5 block">
                      {currentCandidate.noticePeriod || 'Immediate'}
                    </span>
                  </div>
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block font-medium">Expected CTC</span>
                    <span className="font-bold text-emerald-700 mt-0.5 block">
                      {currentCandidate.expectedSalary || 'Negotiable'}
                    </span>
                  </div>
                </div>

                {/* Skills Chips */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Key Technical Competencies & Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentCandidate.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education history */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    Educational Qualifications
                  </h4>
                  <div className="space-y-2">
                    {currentCandidate.educationDetails.map((edu, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl border border-slate-200 bg-slate-50/60 flex items-center justify-between text-xs"
                      >
                        <div>
                          <p className="font-bold text-slate-900">{edu.degree}</p>
                          <p className="text-slate-500">{edu.institution}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-semibold text-blue-700">{edu.score}</span>
                          <span className="text-slate-400 block text-[11px]">{edu.year}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Uploaded Resume File Box */}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-blue-600" />
                    Uploaded Resume Document
                  </h4>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-blue-200 bg-blue-50/40">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 text-xs">
                          {currentCandidate.resumeFileName || 'Candidate_Resume.pdf'}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Format: PDF • Attached to active job applications
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-lg">
                      Active on File
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
