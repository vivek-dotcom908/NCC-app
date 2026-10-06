import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Vacancy } from '../../types';
import { JobCard } from '../jobs/JobCard';
import { INDIAN_LOCATIONS, JOB_ROLES_LIST } from '../../data/seedData';
import {
  Search,
  Briefcase,
  Users,
  Building2,
  CheckCircle,
  MapPin,
  Sparkles,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  RefreshCw,
  HardHat,
  Award,
  ChevronRight,
  Layers,
  GraduationCap,
} from 'lucide-react';

interface HomePageProps {
  onOpenDetails: (v: Vacancy) => void;
  onApply: (v: Vacancy) => void;
  onOpenAuth: (type: 'candidate-login' | 'candidate-register' | 'admin-login') => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onOpenDetails,
  onApply,
  onOpenAuth,
}) => {
  const {
    vacancies,
    sites,
    employees,
    candidates,
    setActiveTab,
    searchState,
    setSearchState,
    searchDistrict,
    setSearchDistrict,
    searchSiteId,
    setSearchSiteId,
    searchJobRole,
    setSearchJobRole,
    loginAsCandidate,
    loginAsAdmin,
  } = useApp();

  const openVacancies = useMemo(
    () => vacancies.filter((v) => v.status === 'Open'),
    [vacancies]
  );
  const activeEmployeesCount = useMemo(
    () => employees.filter((e) => e.status === 'Active').length,
    [employees]
  );
  const autoVacanciesCount = useMemo(
    () => vacancies.filter((v) => v.source === 'Automatic').length,
    [vacancies]
  );

  const recentVacancies = useMemo(() => {
    return [...vacancies]
      .sort((a, b) => new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime())
      .slice(0, 6);
  }, [vacancies]);

  // Available districts for chosen state in hero filter
  const availableDistricts = useMemo(() => {
    if (!searchState) return [];
    const found = INDIAN_LOCATIONS.find((s) => s.name === searchState);
    return found ? found.districts : [];
  }, [searchState]);

  // Available sites
  const availableSites = useMemo(() => {
    return sites.filter((site) => {
      const matchState = !searchState || site.state === searchState;
      const matchDistrict = !searchDistrict || site.district === searchDistrict;
      return matchState && matchDistrict;
    });
  }, [sites, searchState, searchDistrict]);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('jobs');
  };

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#0a1f3a] via-[#0f294a] to-[#1e3a8a] text-white pt-12 pb-20 overflow-hidden">
        {/* Abstract Architectural grid */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4 text-left">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-amber-300 text-xs font-semibold backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>Next-Gen Automated Recruitment & Project Vacancy System</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Build India&apos;s Landmark Infrastructure with <span className="text-amber-400">NCC</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Real-time site recruitment connected directly to active projects across India. Whenever an employee moves or leaves a post, the position automatically transitions to an open vacancy for immediate hiring.
            </p>

            {/* Main Action Buttons (Section 1) */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActiveTab('jobs')}
                className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-sm shadow-lg shadow-amber-500/20 transition flex items-center space-x-2 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find NCC Jobs</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('jobs');
                }}
                className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 transition flex items-center space-x-2 cursor-pointer"
              >
                <Briefcase className="w-4 h-4 text-amber-400" />
                <span>Apply for Vacancy</span>
              </button>

              <button
                onClick={() => loginAsAdmin()}
                className="px-4 py-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 text-slate-300 hover:text-white font-medium text-xs border border-slate-700 transition flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span>HR Admin Access</span>
              </button>
            </div>
          </div>

          {/* CASCADING SEARCH BAR IN HERO (Section 1 & 9) */}
          <div className="mt-10 bg-white rounded-2xl shadow-2xl p-4 sm:p-5 text-slate-800 border border-slate-100">
            <div className="flex items-center space-x-2 text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider">
              <Search className="w-3.5 h-3.5 text-blue-600" />
              <span>Search Jobs by State, District, Project Site & Job Role</span>
            </div>

            <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* State */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">State</label>
                <select
                  value={searchState}
                  onChange={(e) => {
                    setSearchState(e.target.value);
                    setSearchDistrict('');
                    setSearchSiteId('');
                  }}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-900"
                >
                  <option value="">All States ({INDIAN_LOCATIONS.length})</option>
                  {INDIAN_LOCATIONS.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* District */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">District</label>
                <select
                  value={searchDistrict}
                  onChange={(e) => {
                    setSearchDistrict(e.target.value);
                    setSearchSiteId('');
                  }}
                  disabled={!searchState && availableDistricts.length === 0}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-900 disabled:opacity-50"
                >
                  <option value="">
                    {searchState ? 'All in ' + searchState : 'Select State'}
                  </option>
                  {availableDistricts.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              {/* Site */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Project Site</label>
                <select
                  value={searchSiteId}
                  onChange={(e) => setSearchSiteId(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-900 truncate"
                >
                  <option value="">All Project Sites ({availableSites.length})</option>
                  {availableSites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {site.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Job Role */}
              <div>
                <label className="block text-[11px] font-bold text-slate-600 mb-1">Job Role</label>
                <select
                  value={searchJobRole}
                  onChange={(e) => setSearchJobRole(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden text-slate-900"
                >
                  <option value="">All Job Roles</option>
                  {JOB_ROLES_LIST.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Submit search button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Vacancies</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* STATS BANNER (Section 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{openVacancies.length}</p>
              <p className="text-xs font-medium text-slate-500">Active Open Vacancies</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{sites.length}</p>
              <p className="text-xs font-medium text-slate-500">Active Project Sites</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{candidates.length + 184}</p>
              <p className="text-xs font-medium text-slate-500">Registered Candidates</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-200/80 flex items-center space-x-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <HardHat className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">{activeEmployeesCount + 420}</p>
              <p className="text-xs font-medium text-slate-500">Active Site Engineers</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW THE AUTOMATED VACANCY SYSTEM WORKS (Section 1 & 3 & 15) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-blue-900 via-[#0f294a] to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 mb-10">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4" />
              Automated Recruitment Lifecycle
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              How NCC&apos;s Automated Vacancy System Works
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Our enterprise recruitment architecture bridges on-site employee roster changes directly with public talent hiring. No delays, zero human oversight, 100% transparent.
            </p>
          </div>

          {/* 4 Interactive Flow Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Step 1 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 relative group hover:bg-white/15 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-900 font-black text-sm flex items-center justify-center shadow-md">
                01
              </div>
              <h4 className="font-bold text-sm text-white">
                Employee Movement Occurs
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                When an active employee resigns, transfers to another project, or concludes employment, their site post is marked vacated.
              </p>
              <div className="text-[10px] text-amber-300 bg-amber-400/10 px-2 py-1 rounded font-mono">
                Status: Resigned / Transferred
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 relative group hover:bg-white/15 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                02
              </div>
              <h4 className="font-bold text-sm text-white">
                Auto Vacancy Created
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                The portal systematically detects the vacated post and immediately prompts or publishes an open vacancy with pre-filled role and site location.
              </p>
              <div className="text-[10px] text-blue-300 bg-blue-400/10 px-2 py-1 rounded font-mono">
                Auto-Vacated Post: Public Open
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 relative group hover:bg-white/15 transition">
              <div className="w-10 h-10 rounded-xl bg-emerald-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                03
              </div>
              <h4 className="font-bold text-sm text-white">
                Candidate Applies & Tests
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Eligible candidates search by State/District/Site, submit their CV, and track shortlisting and interview scheduling in real time.
              </p>
              <div className="text-[10px] text-emerald-300 bg-emerald-400/10 px-2 py-1 rounded font-mono">
                Applied → Interview Scheduled
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/15 space-y-3 relative group hover:bg-white/15 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-400 text-slate-950 font-black text-sm flex items-center justify-center shadow-md">
                04
              </div>
              <h4 className="font-bold text-sm text-white">
                Selected & Post Filled
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Upon final HR selection, candidate is assigned an Employee ID, linked to the site, and the vacancy changes to Filled & closes automatically!
              </p>
              <div className="text-[10px] text-purple-300 bg-purple-400/10 px-2 py-1 rounded font-mono">
                Open → Filled & Auto-Delisted
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENTLY ADDED VACANCIES (Section 1) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-blue-700 text-xs font-bold uppercase tracking-wider">
              <TrendingUp className="w-4 h-4" />
              <span>Latest Opportunities</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Recently Added Site Vacancies
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Urgent openings across roads, metro rail, tunneling, and water project sites.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('jobs')}
            className="px-4 py-2 rounded-xl text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 transition flex items-center space-x-1.5"
          >
            <span>View All {vacancies.length} Vacancies</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recentVacancies.map((vacancy) => (
            <JobCard
              key={vacancy.id}
              vacancy={vacancy}
              onOpenDetails={onOpenDetails}
              onApply={onApply}
            />
          ))}
        </div>
      </section>

      {/* PROJECT SITES ACROSS INDIA SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">
              Pan-India Footprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Active Project Sites
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Explore key engineering packages and site contacts where vacancies arise.
            </p>
          </div>

          <button
            onClick={() => setActiveTab('sites')}
            className="text-xs font-bold text-blue-700 hover:underline flex items-center space-x-1"
          >
            <span>Explore All Sites</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sites.slice(0, 6).map((site) => {
            const siteVacancies = vacancies.filter(
              (v) => v.siteId === site.id && v.status === 'Open'
            );
            return (
              <div
                key={site.id}
                onClick={() => {
                  setSearchState(site.state);
                  setSearchDistrict(site.district);
                  setSearchSiteId(site.id);
                  setActiveTab('jobs');
                }}
                className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-blue-500 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[11px]">
                      {site.projectCode}
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold text-[11px]">
                      {site.category}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 group-hover:text-blue-700 text-sm line-clamp-2">
                    {site.name}
                  </h3>

                  <p className="text-xs text-slate-500 flex items-center gap-1 mt-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{site.district}, {site.state}</span>
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-bold">
                    {siteVacancies.length} Active {siteVacancies.length === 1 ? 'Vacancy' : 'Vacancies'}
                  </span>
                  <span className="text-blue-600 font-semibold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    View Jobs <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DUAL ACTION BANNER: CANDIDATE VS ADMIN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Candidate Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50/50 p-8 rounded-3xl border border-blue-200/80 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Are You an Engineering Professional?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Register your profile, upload your resume, and get notified immediately when vacancies matching your qualification are published across NCC project sites.
              </p>
            </div>
            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => onOpenAuth('candidate-register')}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition"
              >
                Register Candidate Profile
              </button>
              <button
                onClick={() => loginAsCandidate()}
                className="px-4 py-2.5 bg-white border border-slate-300 text-slate-700 font-semibold text-xs rounded-xl hover:bg-slate-50 transition"
              >
                Instant Demo Candidate
              </button>
            </div>
          </div>

          {/* HR & Management Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 p-8 rounded-3xl border border-amber-200/80 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center shadow-md">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                NCC HR & Project Administration
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Authorized company portal to monitor site manpower, track employee resignations/transfers, auto-generate vacancies, review applicant resumes, and conduct interviews.
              </p>
            </div>
            <div className="pt-6 flex flex-wrap gap-3">
              <button
                onClick={() => loginAsAdmin()}
                className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5"
              >
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Open Admin Portal</span>
              </button>
              <button
                onClick={() => onOpenAuth('admin-login')}
                className="px-4 py-2.5 bg-white border border-amber-300 text-amber-900 font-semibold text-xs rounded-xl hover:bg-amber-100/50 transition"
              >
                Staff Login Credentials
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
