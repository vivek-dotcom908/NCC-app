import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Vacancy, JobType, VacancyStatus } from '../../types';
import { JobCard } from './JobCard';
import { INDIAN_LOCATIONS, JOB_ROLES_LIST } from '../../data/seedData';
import {
  Search,
  Filter,
  MapPin,
  Building2,
  Briefcase,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
  ArrowUpDown,
  CheckCircle2,
  AlertCircle,
  FileSearch,
} from 'lucide-react';

interface JobsExplorerProps {
  onOpenDetails: (v: Vacancy) => void;
  onApply: (v: Vacancy) => void;
}

export const JobsExplorer: React.FC<JobsExplorerProps> = ({
  onOpenDetails,
  onApply,
}) => {
  const {
    vacancies,
    sites,
    searchState,
    setSearchState,
    searchDistrict,
    setSearchDistrict,
    searchSiteId,
    setSearchSiteId,
    searchJobRole,
    setSearchJobRole,
    searchKeyword,
    setSearchKeyword,
  } = useApp();

  const [selectedJobType, setSelectedJobType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [onlyAutoVacancies, setOnlyAutoVacancies] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'newest' | 'openings' | 'location'>('newest');

  // Available districts for chosen state
  const availableDistricts = useMemo(() => {
    if (!searchState) return [];
    const found = INDIAN_LOCATIONS.find((s) => s.name === searchState);
    return found ? found.districts : [];
  }, [searchState]);

  // Available sites for chosen state & district
  const availableSites = useMemo(() => {
    return sites.filter((site) => {
      const matchState = !searchState || site.state === searchState;
      const matchDistrict = !searchDistrict || site.district === searchDistrict;
      return matchState && matchDistrict;
    });
  }, [sites, searchState, searchDistrict]);

  // Filtered vacancies
  const filteredVacancies = useMemo(() => {
    return vacancies.filter((v) => {
      // Cascading filters
      if (searchState && v.state !== searchState) return false;
      if (searchDistrict && v.district !== searchDistrict) return false;
      if (searchSiteId && v.siteId !== searchSiteId) return false;
      if (searchJobRole && v.jobRole !== searchJobRole) return false;

      // Status
      if (selectedStatus !== 'all' && v.status !== selectedStatus) return false;
      // Job Type
      if (selectedJobType !== 'all' && v.jobType !== selectedJobType) return false;
      // Only Auto Vacancies
      if (onlyAutoVacancies && v.source !== 'Automatic') return false;

      // Keyword Search
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const inTitle = v.title.toLowerCase().includes(kw);
        const inDesc = v.description.toLowerCase().includes(kw);
        const inSite = v.siteName.toLowerCase().includes(kw);
        const inRole = v.jobRole.toLowerCase().includes(kw);
        const inQual = v.qualification.toLowerCase().includes(kw);
        if (!inTitle && !inDesc && !inSite && !inRole && !inQual) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      }
      if (sortBy === 'openings') {
        return b.openingsCount - a.openingsCount;
      }
      if (sortBy === 'location') {
        return a.state.localeCompare(b.state);
      }
      return 0;
    });
  }, [
    vacancies,
    searchState,
    searchDistrict,
    searchSiteId,
    searchJobRole,
    selectedStatus,
    selectedJobType,
    onlyAutoVacancies,
    searchKeyword,
    sortBy,
  ]);

  const resetAllFilters = () => {
    setSearchState('');
    setSearchDistrict('');
    setSearchSiteId('');
    setSearchJobRole('');
    setSearchKeyword('');
    setSelectedJobType('all');
    setSelectedStatus('all');
    setOnlyAutoVacancies(false);
  };

  const hasActiveFilters =
    Boolean(searchState) ||
    Boolean(searchDistrict) ||
    Boolean(searchSiteId) ||
    Boolean(searchJobRole) ||
    Boolean(searchKeyword) ||
    selectedJobType !== 'all' ||
    selectedStatus !== 'all' ||
    onlyAutoVacancies;

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Page Title & Context Header */}
        <div className="bg-[#0f294a] rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
          <div className="relative z-10 max-w-3xl space-y-2">
            <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-bold bg-amber-400 text-slate-900">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Real-Time Site Openings</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              NCC Infrastructure Vacancies & Careers
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Browse openings generated directly from site project needs and vacated employee posts.
              Filter by State, District, Project Site, and Engineering Discipline across India.
            </p>
          </div>
          {/* Subtle architectural grid bg pattern */}
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none translate-x-10 translate-y-10">
            <Building2 className="w-72 h-72 text-white" />
          </div>
        </div>

        {/* CASCADING FILTER PANEL (Requirement 2 & 9) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm">
              <SlidersHorizontal className="w-4 h-4 text-blue-600" />
              <span>Cascading Filter (State → District → Site → Job Role)</span>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center space-x-1 px-2.5 py-1 rounded-lg hover:bg-rose-50 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Keyword Search Bar */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Search by keywords (e.g. Civil Engineer, Tunnel, Metro, AutoCAD, Survey, Highway)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-xs sm:text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden transition"
            />
          </div>

          {/* Cascading Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* Step 1: State */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-blue-600" />
                <span>1. State</span>
              </label>
              <select
                value={searchState}
                onChange={(e) => {
                  setSearchState(e.target.value);
                  setSearchDistrict('');
                  setSearchSiteId('');
                }}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="">All States ({INDIAN_LOCATIONS.length})</option>
                {INDIAN_LOCATIONS.map((st) => (
                  <option key={st.name} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: District */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                <span>2. District</span>
              </label>
              <select
                value={searchDistrict}
                onChange={(e) => {
                  setSearchDistrict(e.target.value);
                  setSearchSiteId('');
                }}
                disabled={!searchState && availableDistricts.length === 0}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium disabled:opacity-60 disabled:cursor-not-allowed focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="">
                  {searchState ? 'All Districts in ' + searchState : 'Select State First'}
                </option>
                {availableDistricts.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 3: Project Site */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-amber-600" />
                <span>3. Project Site</span>
              </label>
              <select
                value={searchSiteId}
                onChange={(e) => setSearchSiteId(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden truncate"
              >
                <option value="">All Project Sites ({availableSites.length})</option>
                {availableSites.map((site) => (
                  <option key={site.id} value={site.id}>
                    {site.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 4: Job Role */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                <Briefcase className="w-3.5 h-3.5 text-indigo-600" />
                <span>4. Job Role</span>
              </label>
              <select
                value={searchJobRole}
                onChange={(e) => setSearchJobRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="">All Job Roles</option>
                {JOB_ROLES_LIST.map((role) => (
                  <option key={role} value={role}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Quick Filter Pills */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-slate-500 font-semibold mr-1">Status:</span>
              {(['all', 'Open', 'Filled', 'Closed'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-2.5 py-1 rounded-lg font-medium transition ${
                    selectedStatus === st
                      ? 'bg-blue-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st === 'all' ? 'All Status' : st}
                </button>
              ))}

              <span className="text-slate-300 mx-1">|</span>

              <button
                onClick={() => setOnlyAutoVacancies(!onlyAutoVacancies)}
                className={`px-2.5 py-1 rounded-lg font-medium flex items-center gap-1 transition ${
                  onlyAutoVacancies
                    ? 'bg-amber-500 text-slate-900 font-bold'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>Auto-Vacancies Only</span>
              </button>
            </div>

            {/* Sorting */}
            <div className="flex items-center space-x-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-slate-500 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-2.5 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              >
                <option value="newest">Newest First</option>
                <option value="openings">Max Openings</option>
                <option value="location">Location (State)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results Bar */}
        <div className="flex items-center justify-between px-1">
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            Showing <strong className="text-slate-900">{filteredVacancies.length}</strong> matching vacancies
            {searchState && <span> in <strong className="text-blue-700">{searchState}</strong></span>}
            {searchDistrict && <span> ({searchDistrict})</span>}
          </p>

          <span className="text-xs text-slate-400 hidden sm:inline">
            Directly synced with NCC site manpower roster
          </span>
        </div>

        {/* Vacancies Grid */}
        {filteredVacancies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredVacancies.map((vacancy) => (
              <JobCard
                key={vacancy.id}
                vacancy={vacancy}
                onOpenDetails={onOpenDetails}
                onApply={onApply}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
              <FileSearch className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-800">
              No Vacancies Found Matching Your Search
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try resetting one or more filters (e.g. state, district, or job role) to see other open positions across NCC&apos;s project sites.
            </p>
            <div className="pt-2">
              <button
                onClick={resetAllFilters}
                className="px-4 py-2 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition"
              >
                Reset All Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
