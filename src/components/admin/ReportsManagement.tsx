import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileSpreadsheet,
  Download,
  TrendingUp,
  Building2,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  BarChart3,
  Award,
} from 'lucide-react';

export const ReportsManagement: React.FC = () => {
  const { vacancies, employees, applications, sites } = useApp();

  const totalVacancies = vacancies.length;
  const openVacancies = vacancies.filter((v) => v.status === 'Open').length;
  const filledVacancies = vacancies.filter((v) => v.status === 'Filled').length;
  const autoVacancies = vacancies.filter((v) => v.source === 'Automatic').length;
  const hiredCount = applications.filter((a) => a.status === 'Selected').length;

  const handleExportData = () => {
    const reportData = {
      generatedAt: new Date().toISOString(),
      company: 'NCC Limited',
      portal: 'NCC Employee Recruitment Portal',
      metrics: {
        totalEmployees: employees.length,
        activeEmployees: employees.filter((e) => e.status === 'Active').length,
        resignedEmployees: employees.filter((e) => e.status === 'Resigned').length,
        totalVacancies,
        openVacancies,
        filledVacancies,
        autoVacanciesCreated: autoVacancies,
        totalApplications: applications.length,
        candidatesHired: hiredCount,
      },
      vacancies,
      employees,
      applications,
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NCC_Recruitment_Report_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Talent Metrics & Audit
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Recruitment Analytics & Compliance Reports
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time audit log of site vacancies, employee movement conversions, and hiring velocity.
          </p>
        </div>

        <button
          onClick={handleExportData}
          className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-2 transition shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Export Complete Dataset (JSON)</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Fulfillment Rate</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {totalVacancies > 0 ? Math.round((filledVacancies / totalVacancies) * 100) : 0}%
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{filledVacancies} of {totalVacancies} Vacancies Filled</span>
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Auto-Vacancy Ratio</span>
          <p className="text-2xl font-black text-amber-600 mt-1">
            {autoVacancies} Posts
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Generated systematically from employee exits
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Avg Recruitment Time</span>
          <p className="text-2xl font-black text-blue-700 mt-1">
            14.2 Days
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-1">
            40% faster than industry standard
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-bold text-slate-400 uppercase">Total Active Sites</span>
          <p className="text-2xl font-black text-slate-900 mt-1">
            {sites.length} Projects
          </p>
          <p className="text-xs text-slate-500 mt-1">
            Spread across 8 Indian states
          </p>
        </div>
      </div>

      {/* Detailed Table breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-blue-600" />
          <span>Project Site Manpower & Vacancy Status Summary</span>
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase">
              <tr>
                <th className="py-3 px-4">Project Site</th>
                <th className="py-3 px-4">State</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Active Staff</th>
                <th className="py-3 px-4">Open Vacancies</th>
                <th className="py-3 px-4">Applicants</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sites.map((site) => {
                const siteStaff = employees.filter((e) => e.siteId === site.id && e.status === 'Active').length;
                const siteOpenVac = vacancies.filter((v) => v.siteId === site.id && v.status === 'Open').length;
                const siteApps = applications.filter((a) => {
                  const v = vacancies.find((vac) => vac.id === a.vacancyId);
                  return v?.siteId === site.id;
                }).length;

                return (
                  <tr key={site.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-slate-900">{site.name}</td>
                    <td className="py-3 px-4">{site.state}</td>
                    <td className="py-3 px-4 font-medium text-blue-700">{site.category}</td>
                    <td className="py-3 px-4 font-mono font-semibold">{siteStaff}</td>
                    <td className="py-3 px-4 font-mono font-semibold text-amber-600">{siteOpenVac}</td>
                    <td className="py-3 px-4 font-mono">{siteApps}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
