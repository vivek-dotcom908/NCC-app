import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab, Vacancy } from '../../types';
import { VacancyManagement } from './VacancyManagement';
import { EmployeeManagement } from './EmployeeManagement';
import { ApplicationManagement } from './ApplicationManagement';
import { SiteManagement } from './SiteManagement';
import { InterviewManagement } from './InterviewManagement';
import { ReportsManagement } from './ReportsManagement';
import {
  Briefcase,
  Users,
  Building2,
  Calendar,
  CheckCircle2,
  Sparkles,
  BarChart3,
  TrendingUp,
  UserX,
  Plus,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Clock,
  Layers,
  MapPin,
  AlertTriangle,
} from 'lucide-react';

interface AdminDashboardProps {
  onOpenVacancyDetails: (v: Vacancy) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onOpenVacancyDetails }) => {
  const {
    employees,
    vacancies,
    applications,
    sites,
    activeTab,
    setActiveTab,
    updateEmployeeStatus,
    resetAllData,
  } = useApp();

  // Internal tab for admin section
  const [adminView, setAdminView] = useState<
    'overview' | 'vacancies' | 'employees' | 'applications' | 'sites' | 'interviews' | 'reports'
  >('overview');

  // Key KPI stats (Section 13)
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'Active').length;
  const resignedEmployees = employees.filter((e) => e.status === 'Resigned').length;
  const openVacancies = vacancies.filter((v) => v.status === 'Open').length;
  const vacantPositionsCount = vacancies.filter((v) => v.status === 'Open').reduce((acc, curr) => acc + curr.openingsCount, 0);
  const totalApplications = applications.length;
  const shortlistedCount = applications.filter((a) => a.status === 'Shortlisted').length;
  const interviewsScheduledCount = applications.filter((a) => a.status === 'Interview Scheduled').length;
  const hiredCount = applications.filter((a) => a.status === 'Selected').length;

  // Chart data: Vacancies by State
  const vacanciesByState = useMemo(() => {
    const counts: Record<string, number> = {};
    vacancies.forEach((v) => {
      counts[v.state] = (counts[v.state] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  }, [vacancies]);

  // Chart data: Vacancies by Role
  const vacanciesByRole = useMemo(() => {
    const counts: Record<string, number> = {};
    vacancies.forEach((v) => {
      counts[v.jobRole] = (counts[v.jobRole] || 0) + 1;
    });
    return Object.entries(counts).slice(0, 5);
  }, [vacancies]);

  // Employee status breakdown
  const employeeStatusCounts = useMemo(() => {
    const counts: Record<string, number> = { Active: 0, Resigned: 0, Transferred: 0, Terminated: 0, 'On Leave': 0 };
    employees.forEach((e) => {
      counts[e.status] = (counts[e.status] || 0) + 1;
    });
    return counts;
  }, [employees]);

  // Quick Demo Simulator: Resign an active employee to demonstrate the prompt immediately!
  const handleSimulateResignation = () => {
    const activeEmp = employees.find((e) => e.status === 'Active');
    if (activeEmp) {
      updateEmployeeStatus(activeEmp.id, 'Resigned', 'Simulated resignation to test automatic vacancy creation engine.');
    }
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Header with Simulator pill */}
        <div className="bg-[#0f294a] rounded-2xl p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-amber-400 text-slate-900 uppercase">
                Enterprise Admin
              </span>
              <span className="text-xs text-blue-300">
                Centralized HR & Site Vacancy Directorate
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              NCC Human Capital & Site Vacancy Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Real-time synchronization between active site roster departures and candidate talent acquisition.
            </p>
          </div>

          {/* Quick Demo Simulator button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
            <button
              onClick={handleSimulateResignation}
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md flex items-center justify-center space-x-1.5 transition cursor-pointer"
              title="Click to simulate an employee resigning, which instantly triggers the Automatic Vacancy Prompt!"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-bounce" />
              <span>Simulate Employee Resignation</span>
            </button>

            <button
              onClick={resetAllData}
              className="px-3 py-2.5 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white font-semibold text-xs rounded-xl border border-white/15 flex items-center justify-center space-x-1"
              title="Reset data back to realistic initial demonstration values"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data</span>
            </button>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center space-x-1.5 border-b border-slate-200 pb-2 overflow-x-auto text-xs sm:text-sm font-bold">
          <button
            onClick={() => setAdminView('overview')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'overview'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Dashboard & Analytics</span>
          </button>

          <button
            onClick={() => setAdminView('vacancies')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'vacancies'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Vacancies ({vacancies.length})</span>
          </button>

          <button
            onClick={() => setAdminView('employees')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'employees'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Site Employees ({employees.length})</span>
          </button>

          <button
            onClick={() => setAdminView('applications')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'applications'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Applications ({applications.length})</span>
          </button>

          <button
            onClick={() => setAdminView('sites')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'sites'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>Project Sites ({sites.length})</span>
          </button>

          <button
            onClick={() => setAdminView('interviews')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'interviews'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Interviews ({interviewsScheduledCount})</span>
          </button>

          <button
            onClick={() => setAdminView('reports')}
            className={`px-3.5 py-2 rounded-xl transition flex items-center space-x-1.5 whitespace-nowrap ${
              adminView === 'reports'
                ? 'bg-blue-700 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Reports & Audit</span>
          </button>
        </div>

        {/* VIEW 1: OVERVIEW & DASHBOARD STATISTICS (Section 13) */}
        {adminView === 'overview' && (
          <div className="space-y-6">
            {/* 8 Primary KPI Cards (Section 13) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Employees</span>
                <p className="text-2xl font-black text-slate-900 mt-1">{totalEmployees}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Across project sites</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Active Employees</span>
                <p className="text-2xl font-black text-emerald-600 mt-1">{activeEmployees}</p>
                <p className="text-[11px] text-emerald-700 font-semibold mt-0.5">On-site deployed</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Open Vacancies</span>
                <p className="text-2xl font-black text-blue-700 mt-1">{openVacancies}</p>
                <p className="text-[11px] text-blue-600 font-semibold mt-0.5">{vacantPositionsCount} total openings</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Resigned Staff</span>
                <p className="text-2xl font-black text-amber-600 mt-1">{resignedEmployees}</p>
                <p className="text-[11px] text-amber-700 font-semibold mt-0.5">Vacated posts</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Total Applications</span>
                <p className="text-2xl font-black text-indigo-700 mt-1">{totalApplications}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Candidate CVs</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Shortlisted</span>
                <p className="text-2xl font-black text-blue-600 mt-1">{shortlistedCount}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Technical screening</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Interviews Scheduled</span>
                <p className="text-2xl font-black text-purple-700 mt-1">{interviewsScheduledCount}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Active panels</p>
              </div>

              <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase">Hired & Appointed</span>
                <p className="text-2xl font-black text-emerald-700 mt-1">{hiredCount}</p>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Positions filled</p>
              </div>
            </div>

            {/* Visual Analytics Charts (Section 13) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Vacancies by State */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span>Vacancies by Indian State</span>
                  </h3>
                  <span className="text-xs text-slate-400">Total states: {vacanciesByState.length}</span>
                </div>

                <div className="space-y-2.5">
                  {vacanciesByState.map(([stateName, count]) => {
                    const pct = Math.round((count / vacancies.length) * 100);
                    return (
                      <div key={stateName} className="space-y-1 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span className="text-slate-800">{stateName}</span>
                          <span className="text-blue-700">{count} vacancies ({pct}%)</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-blue-600 rounded-full"
                            style={{ width: `${pct}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 2: Vacancies by Job Role */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-600" />
                    <span>Top In-Demand Job Roles</span>
                  </h3>
                  <span className="text-xs text-slate-400">Engineering disciplines</span>
                </div>

                <div className="space-y-2.5">
                  {vacanciesByRole.map(([roleName, count]) => {
                    const pct = Math.round((count / vacancies.length) * 100);
                    return (
                      <div key={roleName} className="space-y-1 text-xs">
                        <div className="flex justify-between font-semibold">
                          <span className="text-slate-800 truncate max-w-[200px]">{roleName}</span>
                          <span className="text-amber-700 font-bold">{count} posts</span>
                        </div>
                        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-amber-500 rounded-full"
                            style={{ width: `${Math.max(pct, 15)}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Chart 3: Employee Status Breakdown */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
                <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span>Site Workforce Status Breakdown</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase block">Active</span>
                    <span className="text-xl font-black text-emerald-700 mt-1 block">
                      {employeeStatusCounts.Active}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-100 text-center">
                    <span className="text-[10px] font-bold text-amber-800 uppercase block">Resigned</span>
                    <span className="text-xl font-black text-amber-700 mt-1 block">
                      {employeeStatusCounts.Resigned}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-center">
                    <span className="text-[10px] font-bold text-blue-800 uppercase block">Transferred</span>
                    <span className="text-xl font-black text-blue-700 mt-1 block">
                      {employeeStatusCounts.Transferred}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-100 text-center">
                    <span className="text-[10px] font-bold text-rose-800 uppercase block">Terminated</span>
                    <span className="text-xl font-black text-rose-700 mt-1 block">
                      {employeeStatusCounts.Terminated}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-100 border border-slate-200 text-center col-span-2 sm:col-span-1">
                    <span className="text-[10px] font-bold text-slate-700 uppercase block">On Leave</span>
                    <span className="text-xl font-black text-slate-700 mt-1 block">
                      {employeeStatusCounts['On Leave']}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fast Action Cards */}
              <div className="bg-gradient-to-br from-blue-900 to-[#0f294a] rounded-2xl p-6 text-white shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/20 px-2 py-0.5 rounded">
                    Quick Action Shortcuts
                  </span>
                  <h3 className="text-lg font-bold text-white mt-2">
                    Automated Recruitment Operations
                  </h3>
                  <p className="text-xs text-blue-200 leading-relaxed mt-1">
                    Direct access to site rosters, applicant evaluations, and scheduled interview call letters.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    onClick={() => setAdminView('employees')}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left font-bold transition flex items-center justify-between"
                  >
                    <span>Manage Employees</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => setAdminView('applications')}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left font-bold transition flex items-center justify-between"
                  >
                    <span>Review Applicants</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => setAdminView('vacancies')}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left font-bold transition flex items-center justify-between"
                  >
                    <span>Create Vacancy</span>
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                  <button
                    onClick={() => setAdminView('sites')}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-left font-bold transition flex items-center justify-between"
                  >
                    <span>Site Locations</span>
                    <Building2 className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUB-VIEW 2: VACANCY MANAGEMENT */}
        {adminView === 'vacancies' && (
          <VacancyManagement onOpenDetails={onOpenVacancyDetails} />
        )}

        {/* SUB-VIEW 3: EMPLOYEE MANAGEMENT */}
        {adminView === 'employees' && <EmployeeManagement />}

        {/* SUB-VIEW 4: APPLICATION MANAGEMENT */}
        {adminView === 'applications' && <ApplicationManagement />}

        {/* SUB-VIEW 5: SITE MANAGEMENT */}
        {adminView === 'sites' && <SiteManagement />}

        {/* SUB-VIEW 6: INTERVIEW MANAGEMENT */}
        {adminView === 'interviews' && <InterviewManagement />}

        {/* SUB-VIEW 7: REPORTS MANAGEMENT */}
        {adminView === 'reports' && <ReportsManagement />}
      </div>
    </div>
  );
};
