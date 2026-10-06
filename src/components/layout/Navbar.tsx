import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Building2,
  Briefcase,
  MapPin,
  User,
  ShieldCheck,
  Bell,
  Menu,
  X,
  ChevronDown,
  Search,
  LogIn,
  LogOut,
  UserCheck,
  Sparkles,
  Info,
  PhoneCall,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface NavbarProps {
  onOpenAuth: (type: 'candidate-login' | 'candidate-register' | 'admin-login') => void;
  onOpenNotifications: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth, onOpenNotifications }) => {
  const {
    activeTab,
    setActiveTab,
    currentUserRole,
    currentCandidate,
    notifications,
    logout,
    vacancies,
    switchRole,
    loginAsAdmin,
    loginAsCandidate,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoSwitcherOpen, setDemoSwitcherOpen] = useState(false);

  const openVacanciesCount = vacancies.filter((v) => v.status === 'Open').length;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Corporate Strip */}
      <div className="bg-[#0f294a] text-white text-xs py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-900 uppercase tracking-wider">
              Official Portal
            </span>
            <span className="hidden sm:inline text-slate-300">
              NCC Infrastructure & Construction Projects Recruitment
            </span>
          </div>

          {/* Quick Demo Switcher bar */}
          <div className="flex items-center space-x-3 text-xs">
            <span className="text-slate-400 hidden md:inline">Quick Role Demo:</span>
            <div className="flex items-center bg-slate-800/80 rounded-md p-0.5 border border-slate-700">
              <button
                onClick={() => {
                  switchRole('guest');
                  setActiveTab('home');
                }}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                  currentUserRole === 'guest'
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                Public Guest
              </button>
              <button
                onClick={() => loginAsCandidate()}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center space-x-1 ${
                  currentUserRole === 'candidate'
                    ? 'bg-emerald-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <User className="w-3 h-3 inline mr-0.5" />
                <span>Candidate</span>
              </button>
              <button
                onClick={() => loginAsAdmin()}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition flex items-center space-x-1 ${
                  currentUserRole === 'admin'
                    ? 'bg-amber-600 text-white'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3 h-3 inline mr-0.5" />
                <span>HR Admin</span>
              </button>
            </div>

            <div className="hidden lg:flex items-center space-x-1 text-slate-300 border-l border-slate-700 pl-3">
              <PhoneCall className="w-3 h-3 text-amber-400" />
              <span>HR Desk: 1800-425-6225</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-[#0f294a] via-[#1e40af] to-blue-600 rounded-xl flex items-center justify-center shadow-md shadow-blue-900/20 text-white font-extrabold text-xl tracking-tight group-hover:scale-105 transition-transform">
              <span className="font-mono text-amber-400">N</span>
              <span>CC</span>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900">
                  NCC
                </span>
                <span className="text-xl font-medium text-blue-700">Recruitment</span>
              </div>
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <span>Employee & Site Vacancy Portal</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'home'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNavClick('jobs')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition relative ${
                activeTab === 'jobs'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              <span>Find Vacancies</span>
              {openVacanciesCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                  {openVacanciesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('sites')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'sites'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Project Sites
            </button>

            <button
              onClick={() => handleNavClick('about')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'about'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              About NCC
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition ${
                activeTab === 'contact'
                  ? 'text-blue-700 bg-blue-50/80 font-bold'
                  : 'text-slate-700 hover:text-blue-700 hover:bg-slate-100'
              }`}
            >
              Contact HR
            </button>
          </nav>

          {/* Right Action Icons & Auth Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-slate-600 hover:text-blue-700 hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-600 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* If Candidate is logged in */}
            {currentUserRole === 'candidate' && currentCandidate && (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50/60 transition"
                >
                  <img
                    src={currentCandidate.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentCandidate.fullName}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div className="text-left hidden sm:block">
                    <p className="text-xs font-bold text-slate-900 leading-tight">
                      {currentCandidate.fullName}
                    </p>
                    <p className="text-[10px] text-emerald-600 font-medium">Candidate</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-50">
                    <div className="px-3.5 py-2 border-b border-slate-100">
                      <p className="text-xs text-slate-500">Logged in as</p>
                      <p className="text-sm font-bold text-slate-900 truncate">
                        {currentCandidate.fullName}
                      </p>
                      <p className="text-xs text-slate-400 truncate">{currentCandidate.email}</p>
                    </div>

                    <button
                      onClick={() => handleNavClick('candidate-dashboard')}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-2"
                    >
                      <User className="w-4 h-4 text-blue-600" />
                      <span>Candidate Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNavClick('jobs')}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center space-x-2"
                    >
                      <Briefcase className="w-4 h-4 text-blue-600" />
                      <span>Browse Vacancies</span>
                    </button>

                    <div className="border-t border-slate-100 my-1"></div>

                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* If Admin is logged in */}
            {currentUserRole === 'admin' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('admin-dashboard')}
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center space-x-1.5 shadow-sm transition"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin Panel</span>
                </button>
                <button
                  onClick={logout}
                  className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-slate-100 rounded-lg transition"
                  title="Logout Admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* If Guest */}
            {currentUserRole === 'guest' && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onOpenAuth('candidate-login')}
                  className="px-3 py-2 text-xs font-semibold text-slate-700 hover:text-blue-700 hover:bg-slate-100 rounded-lg transition hidden sm:inline-flex items-center space-x-1"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Candidate Login</span>
                </button>

                <button
                  onClick={() => onOpenAuth('candidate-register')}
                  className="px-3.5 py-2 text-xs font-bold text-white bg-blue-700 hover:bg-blue-800 rounded-lg shadow-sm transition flex items-center space-x-1"
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>

                <button
                  onClick={() => onOpenAuth('admin-login')}
                  className="px-2.5 py-2 text-xs font-semibold text-slate-600 hover:text-amber-700 hover:bg-amber-50 rounded-lg border border-slate-200 transition hidden md:inline-flex items-center space-x-1"
                  title="NCC Staff & HR Portal Login"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                  <span>HR Login</span>
                </button>
              </div>
            )}

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-blue-700 lg:hidden rounded-lg hover:bg-slate-100"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-5 space-y-2">
          <button
            onClick={() => handleNavClick('home')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('jobs')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50 flex justify-between items-center"
          >
            <span>Available Vacancies</span>
            <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-blue-600 text-white">
              {openVacanciesCount}
            </span>
          </button>
          <button
            onClick={() => handleNavClick('sites')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
          >
            Project Sites & Offices
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
          >
            About NCC Limited
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-blue-50"
          >
            Contact HR & Recruitment
          </button>

          {currentUserRole === 'candidate' && (
            <button
              onClick={() => handleNavClick('candidate-dashboard')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-emerald-700 bg-emerald-50 flex items-center space-x-2"
            >
              <User className="w-4 h-4" />
              <span>Go to Candidate Dashboard</span>
            </button>
          )}

          {currentUserRole === 'admin' && (
            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-amber-900 bg-amber-100 flex items-center space-x-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>HR Admin Dashboard</span>
            </button>
          )}

          {currentUserRole === 'guest' && (
            <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('candidate-login');
                }}
                className="w-full py-2 text-center text-xs font-bold text-slate-700 bg-slate-100 rounded-lg"
              >
                Candidate Login
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('candidate-register');
                }}
                className="w-full py-2 text-center text-xs font-bold text-white bg-blue-700 rounded-lg"
              >
                Register
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth('admin-login');
                }}
                className="col-span-2 w-full py-2 text-center text-xs font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-lg"
              >
                Company / HR Admin Login
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
