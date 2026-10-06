import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LOCATIONS } from '../../data/seedData';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Search,
  Filter,
  Briefcase,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

export const SitesPage: React.FC = () => {
  const { sites, vacancies, setSearchState, setSearchDistrict, setSearchSiteId, setActiveTab } = useApp();

  const [selectedState, setSelectedState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSites = sites.filter((s) => {
    if (selectedState && s.state !== selectedState) return false;
    if (searchTerm.trim()) {
      const kw = searchTerm.toLowerCase();
      const matchName = s.name.toLowerCase().includes(kw);
      const matchDistrict = s.district.toLowerCase().includes(kw);
      const matchCat = s.category.toLowerCase().includes(kw);
      if (!matchName && !matchDistrict && !matchCat) return false;
    }
    return true;
  });

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Banner */}
        <div className="bg-[#0f294a] rounded-2xl p-6 sm:p-8 text-white shadow-md">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Project Infrastructure Network
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              NCC Project Sites & Regional Field Offices
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              NCC executes mega infrastructure projects across Indian states including Highways, Bridges, Metro Rails, Water Systems, and Real Estate. Connect directly with site HR or explore openings at your preferred site.
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs flex flex-wrap items-center justify-between gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by project name, district, or category..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-slate-500">Filter by State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="">All States ({INDIAN_LOCATIONS.length})</option>
              {INDIAN_LOCATIONS.map((s) => (
                <option key={s.name} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSites.map((site) => {
            const openVacancies = vacancies.filter(
              (v) => v.siteId === site.id && v.status === 'Open'
            );

            return (
              <div
                key={site.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition space-y-4"
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

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {site.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>{site.address}</span>
                  </p>

                  <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-100 text-xs space-y-1 text-slate-600">
                    <p className="font-bold text-slate-800">
                      Site HR Officer: {site.contactPerson}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{site.contactPhone}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-blue-600" />
                      <span>{site.contactEmail}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-700">
                    {openVacancies.length} Active {openVacancies.length === 1 ? 'Vacancy' : 'Vacancies'}
                  </span>

                  <button
                    onClick={() => {
                      setSearchState(site.state);
                      setSearchDistrict(site.district);
                      setSearchSiteId(site.id);
                      setActiveTab('jobs');
                    }}
                    className="px-3.5 py-1.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center space-x-1"
                  >
                    <span>View Vacancies</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
