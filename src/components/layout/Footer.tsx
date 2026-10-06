import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Shield,
  Award,
  ExternalLink,
  HeartHandshake,
  CheckCircle2,
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab, sites } = useApp();

  return (
    <footer className="bg-[#0b1d33] text-slate-300 pt-14 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand & Overview */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-500 rounded-lg flex items-center justify-center font-extrabold text-white text-lg">
                <span className="font-mono text-amber-400">N</span>CC
              </div>
              <div>
                <h3 className="text-white font-bold text-lg leading-snug">
                  NCC Limited Recruitment Portal
                </h3>
                <p className="text-xs text-slate-400">
                  Engineering & Infrastructure Talent Acquisition
                </p>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              NCC is one of India&apos;s foremost infrastructure and construction conglomerates.
              Our automated recruitment platform transparently publishes project vacancies directly
              from site requirements across Roads, Metro, Water Systems, and Real Estate.
            </p>
            <div className="flex items-center space-x-4 pt-2">
              <div className="flex items-center space-x-2 text-xs text-emerald-400 bg-emerald-950/40 px-3 py-1.5 rounded-lg border border-emerald-800/50">
                <Shield className="w-4 h-4" />
                <span>100% Free Merit-Based Recruitment</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Recruitment Links
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => setActiveTab('jobs')}
                  className="hover:text-amber-400 transition"
                >
                  Current Open Vacancies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('sites')}
                  className="hover:text-amber-400 transition"
                >
                  Project Sites & Offices
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('about')}
                  className="hover:text-amber-400 transition"
                >
                  How Automated Vacancies Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('contact')}
                  className="hover:text-amber-400 transition"
                >
                  Contact HR Recruitment
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveTab('candidate-dashboard')}
                  className="hover:text-amber-400 transition"
                >
                  Candidate Portal / Status Check
                </button>
              </li>
            </ul>
          </div>

          {/* Key Project Regions */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Project States
            </h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Uttarakhand (Expressways & Tunnels)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Telangana (Water & Environment)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Maharashtra (Metro Lines & Flyovers)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Uttar Pradesh (Highways & EPC)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                <span>Karnataka & Gujarat (Industrial)</span>
              </li>
            </ul>
          </div>

          {/* Central HR Desk Contact */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase">
              Corporate HR Desk
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>NCC House, Madhapur, Hyderabad, Telangana 500081</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Toll Free: 1800-425-6225</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>careers@ncclimited.com</span>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 border-t border-slate-800">
                Official Working Hours: Mon - Sat 9:00 AM - 6:00 PM IST
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer & Bottom Bar */}
        <div className="border-t border-slate-800 pt-6 mt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} NCC Limited. All rights reserved. Employee Recruitment & Site Vacancy System.</p>
          <div className="flex items-center space-x-4">
            <span className="text-slate-400 flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span>Equal Opportunity Employer</span>
            </span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Recruitment</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
