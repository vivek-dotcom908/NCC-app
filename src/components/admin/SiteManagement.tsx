import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProjectSite } from '../../types';
import { INDIAN_LOCATIONS } from '../../data/seedData';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Plus,
  Briefcase,
  Users,
  Search,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

export const SiteManagement: React.FC = () => {
  const { sites, addSite, vacancies, employees, setSearchState, setSearchDistrict, setSearchSiteId, setActiveTab } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [showAddSiteModal, setShowAddSiteModal] = useState(false);

  // New site form
  const [siteName, setSiteName] = useState('');
  const [stateName, setStateName] = useState(INDIAN_LOCATIONS[0].name);
  const [districtName, setDistrictName] = useState(INDIAN_LOCATIONS[0].districts[0]);
  const [address, setAddress] = useState('');
  const [category, setCategory] = useState<ProjectSite['category']>('Roads & Highways');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const availableDistricts =
    INDIAN_LOCATIONS.find((s) => s.name === stateName)?.districts || [];

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addSite({
      name: siteName,
      state: stateName,
      district: districtName,
      address,
      category,
      contactPerson,
      contactEmail,
      contactPhone,
      status: 'Active',
    });

    setShowAddSiteModal(false);
    setSiteName('');
    setAddress('');
    setContactPerson('');
    setContactEmail('');
    setContactPhone('');
  };

  const filteredSites = sites.filter((s) => {
    if (!searchTerm.trim()) return true;
    const kw = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(kw) ||
      s.state.toLowerCase().includes(kw) ||
      s.district.toLowerCase().includes(kw) ||
      s.projectCode.toLowerCase().includes(kw)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
            Infrastructure Network
          </span>
          <h2 className="text-xl font-black text-slate-900 mt-1">
            NCC Project Sites & Offices
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage project site offices, regional HR desk contacts, and site addresses across Indian states.
          </p>
        </div>

        <button
          onClick={() => setShowAddSiteModal(true)}
          className="px-4 py-2.5 bg-blue-700 hover:bg-blue-800 text-white rounded-xl text-xs font-bold shadow-sm flex items-center space-x-2 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project Site</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search project site by name, state, district..."
            className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
          />
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSites.map((site) => {
          const siteVacancies = vacancies.filter((v) => v.siteId === site.id && v.status === 'Open');
          const siteEmployees = employees.filter((e) => e.siteId === site.id && e.status === 'Active');

          return (
            <div
              key={site.id}
              className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between hover:border-blue-400 transition"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-slate-500 font-bold bg-slate-100 px-2 py-0.5 rounded">
                    {site.projectCode}
                  </span>
                  <span className="text-blue-700 font-bold bg-blue-50 px-2.5 py-0.5 rounded-full text-[11px]">
                    {site.category}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {site.name}
                </h3>

                <p className="text-xs text-slate-500 flex items-start gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                  <span>{site.address}</span>
                </p>

                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 text-xs space-y-1 text-slate-600">
                  <p className="font-semibold text-slate-800">
                    HR In-Charge: {site.contactPerson}
                  </p>
                  <p className="flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    <span>{site.contactPhone}</span>
                  </p>
                  <p className="flex items-center gap-1">
                    <Mail className="w-3 h-3 text-blue-600" />
                    <span>{site.contactEmail}</span>
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center text-xs pt-1">
                  <div className="bg-blue-50/70 p-2 rounded-xl text-blue-900">
                    <span className="block font-bold text-sm text-blue-700">{siteVacancies.length}</span>
                    <span className="text-[10px] text-blue-600 font-medium">Open Vacancies</span>
                  </div>
                  <div className="bg-slate-100 p-2 rounded-xl text-slate-800">
                    <span className="block font-bold text-sm text-slate-900">{siteEmployees.length}</span>
                    <span className="text-[10px] text-slate-500 font-medium">Site Staff</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  onClick={() => {
                    setSearchState(site.state);
                    setSearchDistrict(site.district);
                    setSearchSiteId(site.id);
                    setActiveTab('jobs');
                  }}
                  className="text-xs font-bold text-blue-700 hover:underline flex items-center gap-1"
                >
                  <span>Filter Site Jobs</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Site Modal */}
      {showAddSiteModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider bg-amber-500/20 px-2 py-0.5 rounded">
                  Project Location
                </span>
                <h3 className="text-lg font-bold text-white mt-1">Register New Project Site</h3>
              </div>
              <button
                onClick={() => setShowAddSiteModal(false)}
                className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-3.5 text-xs text-slate-700">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Site Name</label>
                <input
                  type="text"
                  required
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="e.g. Varanasi Elevated Bypass Corridor Package 2"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">State</label>
                  <select
                    value={stateName}
                    onChange={(e) => {
                      setStateName(e.target.value);
                      const d = INDIAN_LOCATIONS.find((s) => s.name === e.target.value);
                      if (d && d.districts.length > 0) setDistrictName(d.districts[0]);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    {INDIAN_LOCATIONS.map((s) => (
                      <option key={s.name} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">District</label>
                  <select
                    value={districtName}
                    onChange={(e) => setDistrictName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  >
                    {availableDistricts.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="Roads & Highways">Roads & Highways</option>
                  <option value="Buildings & Housing">Buildings & Housing</option>
                  <option value="Water & Environment">Water & Environment</option>
                  <option value="Rail & Metro">Rail & Metro</option>
                  <option value="Power & Electrical">Power & Electrical</option>
                  <option value="Mining">Mining</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Complete Site Address</label>
                <textarea
                  rows={2}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street, Landmark, City and PIN Code..."
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">HR In-Charge Name</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="e.g. Mr. K. Sharma"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Email</label>
                  <input
                    type="email"
                    required
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="hr.site@nccprojects.in"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddSiteModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md"
                >
                  Save Project Site
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
