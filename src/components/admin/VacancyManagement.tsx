import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Vacancy, JobType, VacancyStatus } from '../../types';
import { INDIAN_LOCATIONS, JOB_ROLES_LIST } from '../../data/seedData';
import {
  Briefcase,
  Search,
  Plus,
  Filter,
  Building2,
  MapPin,
  Calendar,
  Sparkles,
  Users,
  CheckCircle2,
  XCircle,
  Eye,
  Edit2,
  RotateCcw,
} from 'lucide-react';

interface VacancyManagementProps {
  onOpenDetails: (v: Vacancy) => void;
}

export const VacancyManagement: React.FC<VacancyManagementProps> = ({ onOpenDetails }) => {
  const {
    vacancies,
    sites,
    applications,
    createVacancy,
    updateVacancy,
    closeVacancy,
    setActiveTab,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterSiteId, setFilterSiteId] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');

  // Create vacancy modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [jobRole, setJobRole] = useState(JOB_ROLES_LIST[0]);
  const [siteId, setSiteId] = useState(sites[0]?.id || '');
  const [openingsCount, setOpeningsCount] = useState(1);
  const [qualification, setQualification] = useState('B.Tech / Diploma in Civil Engineering');
  const [experience, setExperience] = useState('3 - 6 Years');
  const [salary, setSalary] = useState('₹55,000 - ₹68,000 / month');
  const [jobType, setJobType] = useState<JobType>('Full-time');
  const [description, setDescription] = useState('');

  // Edit vacancy state
  const [editingVacancy, setEditingVacancy] = useState<Vacancy | null>(null);

  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      if (filterStatus !== 'all' && v.status !== filterStatus) return false;
      if (filterSiteId !== 'all' && v.siteId !== filterSiteId) return false;
      if (filterSource !== 'all' && v.source !== filterSource) return false;

      if (searchTerm.trim()) {
        const kw = searchTerm.toLowerCase();
        const inTitle = v.title.toLowerCase().includes(kw);
        const inRole = v.jobRole.toLowerCase().includes(kw);
        const inSite = v.siteName.toLowerCase().includes(kw);
        const inId = v.id.toLowerCase().includes(kw);
        if (!inTitle && !inRole && !inSite && !inId) return false;
      }

      return true;
    });
  }, [vacancies, filterStatus, filterSiteId, filterSource, searchTerm]);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const site = sites.find((s) => s.id === siteId) || sites[0];

    createVacancy({
      title: title || `${jobRole} - ${site.name.split(' ')[0]} Site`,
      jobRole,
      siteId: site.id,
      siteName: site.name,
      siteAddress: site.address,
      state: site.state,
      district: site.district,
      openingsCount,
      qualification,
      experience,
      salary,
      jobType,
      description: description || `Urgent opening for ${jobRole} at ${site.name}.`,
      source: 'Manual',
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVacancy) return;
    updateVacancy(editingVacancy.id, {
      title: editingVacancy.title,
      salary: editingVacancy.salary,
      openingsCount: editingVacancy.openingsCount,
      qualification: editingVacancy.qualification,
      experience: editingVacancy.experience,
      status: editingVacancy.status,
    });
    setEditingVacancy(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
            Requisition Center
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            Site Vacancy Management
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl">
            Track active job postings. Vacancies are created manually or systematically through employee separations.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-2 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Vacancy</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by title, role, site, ID..."
              className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Statuses ({vacancies.length})</option>
              <option value="Open">Open</option>
              <option value="Filled">Filled</option>
              <option value="Closed">Closed</option>
            </select>
          </div>

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

          <div>
            <select
              value={filterSource}
              onChange={(e) => setFilterSource(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="all">All Sources</option>
              <option value="Automatic">⚡ Auto-Generated (Resignation)</option>
              <option value="Manual">Manual HR Post</option>
            </select>
          </div>
        </div>
      </div>

      {/* Vacancy Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Vacancy & ID</th>
                <th className="py-3.5 px-4">Site & Location</th>
                <th className="py-3.5 px-4">Openings & CTC</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Applicants</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVacancies.map((vac) => {
                const appCount = applications.filter((a) => a.vacancyId === vac.id).length;

                return (
                  <tr key={vac.id} className="hover:bg-slate-50/70 transition">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm leading-snug">{vac.title}</div>
                      <div className="text-[11px] font-mono text-slate-400 mt-0.5">{vac.id} • {vac.jobRole}</div>
                      <div className="text-[10px] text-slate-500">Posted: {vac.datePosted} | Due: {vac.lastDate}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-900 block line-clamp-1 max-w-xs">{vac.siteName}</span>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {vac.district}, {vac.state}
                      </span>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-bold text-slate-900 block">
                        {vac.openingsCount} {vac.openingsCount > 1 ? 'positions' : 'position'}
                      </span>
                      <span className="text-[11px] text-emerald-700 font-semibold">{vac.salary}</span>
                    </td>

                    <td className="py-3.5 px-4">
                      {vac.source === 'Automatic' ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-300 flex items-center gap-1 max-w-fit">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          Auto-Generated
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          Manual Post
                        </span>
                      )}
                      {vac.originatedFromEmployeeName && (
                        <span className="block text-[10px] text-slate-400 mt-0.5">
                          From: {vac.originatedFromEmployeeName}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setActiveTab('admin-applications')}
                        className="font-bold text-blue-700 hover:underline flex items-center gap-1"
                      >
                        <Users className="w-3.5 h-3.5" />
                        <span>{appCount} Candidate{appCount === 1 ? '' : 's'}</span>
                      </button>
                    </td>

                    <td className="py-3.5 px-4">
                      {vac.status === 'Open' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          Open
                        </span>
                      ) : vac.status === 'Filled' ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                          Filled
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-600">
                          Closed
                        </span>
                      )}
                      {vac.filledByCandidateName && (
                        <span className="block text-[10px] text-purple-700 font-medium mt-0.5">
                          Filled by: {vac.filledByCandidateName}
                        </span>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end space-x-1.5">
                        <button
                          onClick={() => onOpenDetails(vac)}
                          className="p-1.5 text-slate-600 hover:text-blue-700 rounded-lg hover:bg-slate-100"
                          title="View Public Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => setEditingVacancy(vac)}
                          className="p-1.5 text-slate-600 hover:text-amber-700 rounded-lg hover:bg-slate-100"
                          title="Edit Vacancy"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        {vac.status === 'Open' && (
                          <button
                            onClick={() => closeVacancy(vac.id)}
                            className="px-2 py-1 text-[11px] font-semibold text-rose-700 hover:bg-rose-50 rounded-lg border border-rose-200"
                            title="Close this vacancy"
                          >
                            Close
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredVacancies.length === 0 && (
          <div className="p-8 text-center text-xs text-slate-500">
            No vacancies found matching the current search filters.
          </div>
        )}
      </div>

      {/* Create New Vacancy Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                  Post Requisition
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Create New Site Vacancy</h3>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="p-6 space-y-3.5 text-xs text-slate-700">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Vacancy Post Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Senior Project Manager - Rishikesh Rail Package"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Role</label>
                  <select
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
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
                  <label className="block font-bold text-slate-700 mb-1">Project Site Location</label>
                  <select
                    value={siteId}
                    onChange={(e) => setSiteId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden truncate"
                  >
                    {sites.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.district}, {s.state})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={openingsCount}
                    onChange={(e) => setOpeningsCount(parseInt(e.target.value) || 1)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Job Type</label>
                  <select
                    value={jobType}
                    onChange={(e) => setJobType(e.target.value as JobType)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Contractual">Contractual</option>
                    <option value="Site Regular">Site Regular</option>
                    <option value="Apprenticeship">Apprenticeship</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Pay Scale</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience Required</label>
                  <input
                    type="text"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Qualification</label>
                  <input
                    type="text"
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Job Description & Scope</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail primary site responsibilities, safety requirements, reporting hierarchy..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Publish Vacancy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Vacancy Modal */}
      {editingVacancy && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-md w-full">
            <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                  Edit Vacancy
                </span>
                <h3 className="text-lg font-bold text-white mt-1">{editingVacancy.title}</h3>
              </div>
              <button
                onClick={() => setEditingVacancy(null)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="p-6 space-y-3.5 text-xs text-slate-700">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={editingVacancy.title}
                  onChange={(e) =>
                    setEditingVacancy({ ...editingVacancy, title: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Openings</label>
                  <input
                    type="number"
                    min="1"
                    value={editingVacancy.openingsCount}
                    onChange={(e) =>
                      setEditingVacancy({
                        ...editingVacancy,
                        openingsCount: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={editingVacancy.status}
                    onChange={(e) =>
                      setEditingVacancy({
                        ...editingVacancy,
                        status: e.target.value as VacancyStatus,
                      })
                    }
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-semibold focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    <option value="Open">Open</option>
                    <option value="Filled">Filled</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Pay Scale</label>
                <input
                  type="text"
                  value={editingVacancy.salary}
                  onChange={(e) =>
                    setEditingVacancy({ ...editingVacancy, salary: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingVacancy(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
