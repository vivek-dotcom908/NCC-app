import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Award,
  ShieldCheck,
  HardHat,
  RefreshCw,
  Users,
  CheckCircle2,
  TrendingUp,
  MapPin,
  ArrowRight,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero */}
        <div className="bg-[#0f294a] rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              About NCC Limited
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Pioneering India&apos;s Infrastructure Growth Since 1978
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              NCC is among India’s top infrastructure conglomerates with major operations across Buildings, Roads, Water & Environment, Railways, Electrical (T&D), and Mining. Our workforce of over 10,000+ professionals builds the backbone of modern India.
            </p>
          </div>
        </div>

        {/* The Automated Vacancy System Explained (Section 1 & 3 & 15) */}
        <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xs space-y-8">
          <div className="max-w-2xl">
            <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">
              Innovation in Talent Acquisition
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              The NCC Automated Vacancy Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              Traditional enterprise recruitment suffers from weeks of delay between when a site engineer leaves and when a vacancy is approved. NCC&apos;s intelligent portal connects our manpower database directly with public hiring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                1
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Instant Trigger on Departure
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                When an employee resigns, transfers to another project corridor, or concludes their assignment, the roster system marks their post vacated and immediately requests HR authorization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                2
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Real-Time Public Publishing
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The vacancy appears on the candidate portal with pre-filled site specifications, required qualifications, and salary standards. Candidates filter by state and district to apply immediately.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                3
              </div>
              <h3 className="font-bold text-slate-900 text-base">
                Seamless Candidate Appointment
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upon technical interview approval, the candidate is appointed with a new NCC Employee ID, the vacancy is marked &quot;Filled&quot;, and removed from active public search to avoid redundant submissions.
              </p>
            </div>
          </div>
        </div>

        {/* Corporate Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <HardHat className="w-8 h-8 text-blue-700" />
            <h3 className="font-bold text-slate-900 text-base">Zero Harm Safety Culture</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We champion stringent EHS (Environment, Health & Safety) standards across all project casting yards, high-rises, and tunnel underground packages.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <Award className="w-8 h-8 text-amber-600" />
            <h3 className="font-bold text-slate-900 text-base">Merit-Based Growth</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent career pathways from Graduate Engineer Trainee (GET) up to Senior Project Director and Vice President of Infrastructure Divisions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <Building2 className="w-8 h-8 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-base">Pan-India Opportunities</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Project assignments across Uttarakhand, Maharashtra, Telangana, Uttar Pradesh, Gujarat, Karnataka, Tamil Nadu, and West Bengal.
            </p>
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-8 sm:p-10 text-white text-center space-y-4">
          <h2 className="text-2xl font-bold">Ready to Shape the Nation&apos;s Skyline?</h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
            Explore active openings or register your candidate profile for upcoming mega projects.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => setActiveTab('jobs')}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl shadow-md transition"
            >
              Explore Open Vacancies
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition"
            >
              Contact HR Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
