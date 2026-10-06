import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Employee, EmployeeStatus } from '../../types';
import { INDIAN_LOCATIONS, JOB_ROLES_LIST } from '../../data/seedData';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Building2,
  MapPin,
  Calendar,
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  Phone,
  Mail,
  Sparkles,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  UserX,
} from 'lucide-react';

export const EmployeeManagement: React.FC = () => {
  const {
    employees,
    sites,
    updateEmployeeStatus,
    addEmployee,
    setPendingResignedEmployee,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSiteId, setFilterSiteId] = useState<string>('all');
  const [filterRole, setFilterRole] = useState<string>('all');

  // Status Change Dialog state
  const [statusChangeEmp, setStatusChangeEmp] = useState<Employee | null>(null);
  const [newSelectedStatus, setNewSelectedStatus] = useState<EmployeeStatus>('Resigned');
  const [statusRemarks, setStatusRemarks] = useState('');

  // Add Employee Modal state
  const [showAddEmpModal, setShowAddEmpModal] = useState(false);
  const [newEmpName, setNewEmpName] = useState('');
  const [newEmpEmail, setNewEmpEmail] = useState('');
  const [newEmpPhone, setNewEmpPhone] = useState('');
  const [newEmpRole, setNewEmpRole] = useState(JOB_ROLES_LIST[0]);
  const [newEmpSiteId, setNewEmpSiteId] = useState(sites[0]?.id || '');
  const [newEmpSalary, setNewEmpSalary] = useState('₹55,000 / month');

  // Filtered employees
  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      if (filterStatus !== 'all' && emp.status !== filterStatus) return false;
      if (filterSiteId !== 'all' && emp.siteId !== filterSiteId) return false;
      if (filterRole !== 'all' && emp.jobRole !== filterRole) return false;

      if (searchTerm.trim()) {
        const kw = searchTerm.toLowerCase();
        const matchName = emp.name.toLowerCase().includes(kw);
        const matchId = emp.id.toLowerCase().includes(kw);
        const matchSite = emp.siteName.toLowerCase().includes(kw);
        const matchRole = emp.jobRole.toLowerCase().includes(kw);
        if (!matchName && !matchId && !matchSite && !matchRole) return false;
      }

      return true;
    });
  }, [employees, filterStatus, filterSiteId, filterRole, searchTerm]);

  const handleOpenStatusChange = (emp: Employee) => {
    setStatusChangeEmp(emp);
    setNewSelectedStatus('Resigned');
    setStatusRemarks('Employee tendered formal resignation. Replacement required for site execution.');
  };

  const handleConfirmStatusChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (!statusChangeEmp) return;

    // This triggers the automatic vacancy prompt modal in AppContext if Resigned/Transferred/Terminated!
    updateEmployeeStatus(statusChangeEmp.id, newSelectedStatus, statusRemarks);
    setStatusChangeEmp(null);
  };

  const handleAddEmployeeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const site = sites.find((s) => s.id === newEmpSiteId) || sites[0];

    addEmployee({
      name: newEmpName,
      email: newEmpEmail,
      phone: newEmpPhone,
      jobRole: newEmpRole,
      siteId: site.id,
      siteName: site.name,
      state: site.state,
      district: site.district,
      salary: newEmpSalary,
      status: 'Active',
    });

    setShowAddEmpModal(false);
    setNewEmpName('');
    setNewEmpEmail('');
    setNewEmpPhone('');
  };

  const getStatusBadge = (status: EmployeeStatus) => {
    switch (status) {
      case 'Active':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Active
          </span>
        );
      case 'Resigned':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1">
            <UserX className="w-3 h-3 text-amber-600" />
            Resigned
          </span>
        );
      case 'Transferred':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Transferred
          </span>
        );
      case 'Terminated':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
            Terminated
          </span>
        );
      case 'On Leave':
        return (
          <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-slate-100 text-slate-700">
            On Leave
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Explainer */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-xs font-bold text-amber-600 uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Automatic Vacancy Trigger Engine</span>
          </div>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            NCC Project Site Employee Roster
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Manage site staff across projects. When an employee is marked <strong>Resigned</strong>, <strong>Transferred</strong>, or <strong>Terminated</strong>, the system will automatically prompt to convert their post into an active public vacancy!
          </p>
        </div>

        <button
          onClick={() => setShowAddEmpModal(true)}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-2 transition shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add New Employee</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, role, site..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {/* Status filter */}
          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Statuses ({employees.length})</option>
              <option value="Active">Active</option>
              <option value="Resigned">Resigned</option>
              <option value="Transferred">Transferred</option>
              <option value="Terminated">Terminated</option>
              <option value="On Leave">On Leave</option>
            </select>
          </div>

          {/* Site filter */}
          <div>
            <select
              value={filterSiteId}
              onChange={(e) => setFilterSiteId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden truncate"
            >
              <option value="all">All Sites ({sites.length})</option>
              {sites.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* Role filter */}
          <div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Job Roles</option>
              {JOB_ROLES_LIST.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Employees Table (Section 7 & 11) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Employee</th>
                <th className="py-3.5 px-4">Job Role</th>
                <th className="py-3.5 px-4">Project Site & Location</th>
                <th className="py-3.5 px-4">Joining Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50/70 transition">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{emp.name}</div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">{emp.id}</div>
                    <div className="text-[11px] text-slate-500">{emp.email} • {emp.phone}</div>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-slate-900 block">{emp.jobRole}</span>
                    <span className="text-[11px] text-emerald-700 font-medium">{emp.salary}</span>
                  </td>

                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-800 block line-clamp-1 max-w-xs">{emp.siteName}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      {emp.district}, {emp.state}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {emp.joiningDate}
                  </td>

                  <td className="py-3.5 px-4">
                    {getStatusBadge(emp.status)}
                    {emp.linkedVacancyId && (
                      <span className="block text-[10px] text-blue-600 font-mono mt-1">
                        Vacancy: {emp.linkedVacancyId}
                      </span>
                    )}
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleOpenStatusChange(emp)}
                      className="px-3 py-1.5 rounded-lg border border-slate-300 hover:border-amber-500 hover:bg-amber-50 text-slate-700 hover:text-amber-900 text-xs font-semibold transition"
                    >
                      Change Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredEmployees.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No employees found matching the current filters.
          </div>
        )}
      </div>

      {/* Change Employment Status Modal */}
      {statusChangeEmp && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                  Status Transition
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Update Employment Status
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {statusChangeEmp.name} ({statusChangeEmp.id})
                </p>
              </div>
              <button
                onClick={() => setStatusChangeEmp(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConfirmStatusChange} className="p-6 space-y-4 text-xs text-slate-700">
              <div>
                <label className="block font-bold text-slate-700 mb-1.5">
                  New Employment Status
                </label>
                <select
                  value={newSelectedStatus}
                  onChange={(e) => setNewSelectedStatus(e.target.value as EmployeeStatus)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="Active">Active</option>
                  <option value="Resigned">Resigned (Triggers Auto-Vacancy)</option>
                  <option value="Transferred">Transferred (Triggers Auto-Vacancy)</option>
                  <option value="Terminated">Terminated (Triggers Auto-Vacancy)</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>

              {(newSelectedStatus === 'Resigned' ||
                newSelectedStatus === 'Transferred' ||
                newSelectedStatus === 'Terminated') && (
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                  <p className="text-[11px] leading-relaxed">
                    <strong>Auto-Vacancy Engine:</strong> Updating status to <strong>{newSelectedStatus}</strong> will immediately launch the vacancy creation dialog to systematically open this post for candidate recruitment!
                  </p>
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Remarks / Reason for Movement
                </label>
                <textarea
                  rows={3}
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                  placeholder="e.g. Relocated, contract completed, transferred to metro package..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setStatusChangeEmp(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition"
                >
                  Confirm & Proceed
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Employee Modal */}
      {showAddEmpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                  Manpower Roster
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Add New Site Employee
                </h3>
              </div>
              <button
                onClick={() => setShowAddEmpModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddEmployeeSubmit} className="p-6 space-y-3.5 text-xs text-slate-700">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Employee Full Name</label>
                <input
                  type="text"
                  required
                  value={newEmpName}
                  onChange={(e) => setNewEmpName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra Pant"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={newEmpEmail}
                    onChange={(e) => setNewEmpEmail(e.target.value)}
                    placeholder="name@nccprojects.in"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={newEmpPhone}
                    onChange={(e) => setNewEmpPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Role</label>
                <select
                  value={newEmpRole}
                  onChange={(e) => setNewEmpRole(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {JOB_ROLES_LIST.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Assigned Project Site</label>
                <select
                  value={newEmpSiteId}
                  onChange={(e) => setNewEmpSiteId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  {sites.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.district}, {s.state})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Monthly Salary / CTC</label>
                <input
                  type="text"
                  required
                  value={newEmpSalary}
                  onChange={(e) => setNewEmpSalary(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddEmpModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Add Employee to Roster
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
