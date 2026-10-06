import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Employee, Vacancy } from '../../types';
import {
  Sparkles,
  AlertTriangle,
  Building2,
  MapPin,
  Briefcase,
  CheckCircle,
  X,
  ArrowRight,
  UserX,
  Calendar,
} from 'lucide-react';

export const AutoVacancyPromptModal: React.FC = () => {
  const {
    pendingResignedEmployee,
    setPendingResignedEmployee,
    confirmAutoVacancyCreation,
    sites,
    setActiveTab,
  } = useApp();

  const [title, setTitle] = useState('');
  const [openingsCount, setOpeningsCount] = useState(1);
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('3 - 6 Years');
  const [salary, setSalary] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successCreated, setSuccessCreated] = useState<Vacancy | null>(null);

  useEffect(() => {
    if (pendingResignedEmployee) {
      const site = sites.find((s) => s.id === pendingResignedEmployee.siteId);
      setTitle(`${pendingResignedEmployee.jobRole} - ${site?.name ? site.name.split(' ')[0] : ''} Project`);
      setQualification('B.Tech / Diploma in Civil / Relevant Engineering');
      setExperience('2 - 5 Years in relevant infrastructure project');
      setSalary(pendingResignedEmployee.salary || '₹55,000 - ₹65,000 / month');
      setSuccessCreated(null);
    }
  }, [pendingResignedEmployee, sites]);

  if (!pendingResignedEmployee) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newVac = confirmAutoVacancyCreation(pendingResignedEmployee, {
        title,
        openingsCount,
        qualification,
        experience,
        salary,
      });
      setIsSubmitting(false);
      setSuccessCreated(newVac);
    }, 400);
  };

  const handleDismiss = () => {
    setPendingResignedEmployee(null);
    setSuccessCreated(null);
  };

  const handleViewVacancy = () => {
    handleDismiss();
    setActiveTab('admin-vacancies');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f294a] via-blue-900 to-indigo-900 text-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
                <Sparkles className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-amber-400 px-2 py-0.5 bg-amber-400/10 rounded">
                  Automatic Vacancy Generator
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Position Vacated Detected
                </h3>
              </div>
            </div>
            {!successCreated && (
              <button
                onClick={handleDismiss}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Content */}
        {!successCreated ? (
          <div className="p-6 space-y-5">
            {/* Employee info callout */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="flex items-start space-x-3">
                <UserX className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-amber-900">
                    Employee <span className="font-bold underline">{pendingResignedEmployee.name}</span> ({pendingResignedEmployee.id})
                  </p>
                  <p className="text-amber-800 text-xs mt-0.5">
                    Job Role: <span className="font-semibold">{pendingResignedEmployee.jobRole}</span> • Site: <span className="font-semibold">{pendingResignedEmployee.siteName}</span>
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Employment Status changed to: <span className="font-bold uppercase tracking-wider px-1.5 py-0.5 bg-amber-200 rounded">{pendingResignedEmployee.status}</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Core Question Prompt */}
            <div className="border-l-4 border-blue-600 pl-4 py-1">
              <h4 className="text-base font-bold text-slate-900">
                Do you want to automatically open this position as a vacancy on the NCC recruitment portal?
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                If approved, this vacancy will instantly appear on the public recruitment page with candidate application enabled.
              </p>
            </div>

            {/* Pre-filled Vacancy Details */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 space-y-3.5 text-xs">
              <div className="flex items-center justify-between text-slate-500 font-semibold border-b border-slate-200 pb-2">
                <span>PRE-FILLED VACANCY DETAILS</span>
                <span className="text-[10px] text-blue-600 bg-blue-100 px-2 py-0.5 rounded font-mono">
                  Site: {pendingResignedEmployee.district}, {pendingResignedEmployee.state}
                </span>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Vacancy Post Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-slate-800 font-medium focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Openings Count</label>
                  <input
                    type="number"
                    min="1"
                    value={openingsCount}
                    onChange={(e) => setOpeningsCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Pay Scale / Salary</label>
                <input
                  type="text"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Minimum Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  className="w-full px-3 py-2 bg-white rounded-lg border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={handleDismiss}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100 transition"
              >
                No, Don&apos;t Open Vacancy
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleConfirm}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 text-white text-xs font-bold shadow-md shadow-blue-700/20 flex items-center space-x-2 transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isSubmitting ? 'Publishing...' : 'Yes, Open & Publish Vacancy'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Success Screen */
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              Vacancy Successfully Created & Published!
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              The vacated position has been converted to an active recruitment opening (ID: <span className="font-mono font-bold text-blue-700">{successCreated.id}</span>). It is now visible on the public recruitment board for eligible candidates to apply.
            </p>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs max-w-md mx-auto space-y-1.5">
              <p><span className="text-slate-500">Post Name:</span> <strong className="text-slate-900">{successCreated.title}</strong></p>
              <p><span className="text-slate-500">Project Site:</span> <strong className="text-slate-900">{successCreated.siteName}</strong></p>
              <p><span className="text-slate-500">Source:</span> <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded font-medium">Auto-generated from Employee Resignation</span></p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-4">
              <button
                onClick={handleDismiss}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={handleViewVacancy}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5"
              >
                <span>View in Vacancy Management</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
