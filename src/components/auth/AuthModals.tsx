import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { INDIAN_LOCATIONS } from '../../data/seedData';
import {
  X,
  User,
  ShieldCheck,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  GraduationCap,
  FileText,
  Upload,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface AuthModalsProps {
  type: 'candidate-login' | 'candidate-register' | 'admin-login' | null;
  onClose: () => void;
  onSwitchType: (type: 'candidate-login' | 'candidate-register' | 'admin-login') => void;
}

export const AuthModals: React.FC<AuthModalsProps> = ({
  type,
  onClose,
  onSwitchType,
}) => {
  const { loginAsCandidate, loginAsAdmin, registerCandidate, candidates } = useApp();

  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Candidate Registration states
  const [fullName, setFullName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [dob, setDob] = useState('1998-05-15');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [stateName, setStateName] = useState(INDIAN_LOCATIONS[0].name);
  const [districtName, setDistrictName] = useState(INDIAN_LOCATIONS[0].districts[0]);
  const [address, setAddress] = useState('');
  const [highestQualification, setHighestQualification] = useState('B.Tech in Civil Engineering');
  const [skills, setSkills] = useState('Civil Engineering, Site Supervision, AutoCAD, BBS, Concreting');
  const [resumeFileName, setResumeFileName] = useState('Candidate_Resume.pdf');
  const [experienceYears, setExperienceYears] = useState('3');
  const [currentCompany, setCurrentCompany] = useState('');

  if (!type) return null;

  const availableDistricts =
    INDIAN_LOCATIONS.find((s) => s.name === stateName)?.districts || [];

  const handleCandidateLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsCandidate();
    onClose();
  };

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsAdmin();
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerCandidate({
      fullName,
      email: regEmail,
      phone,
      password: regPassword,
      dob,
      gender,
      state: stateName,
      district: districtName,
      address,
      highestQualification,
      skills: skills.split(',').map((s) => s.trim()).filter(Boolean),
      resumeFileName,
      currentCompany,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150 my-6">
        {/* Header */}
        <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
              {type === 'admin-login' ? 'Authorized Staff' : 'Candidate Portal'}
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              {type === 'candidate-login' && 'Candidate Login'}
              {type === 'candidate-register' && 'Candidate Registration'}
              {type === 'admin-login' && 'Company / HR Admin Login'}
            </h3>
            <p className="text-xs text-blue-200">
              {type === 'candidate-login' && 'Access your applications, interviews & saved vacancies'}
              {type === 'candidate-register' && 'Create your verified NCC engineering candidate profile'}
              {type === 'admin-login' && 'Authorized personnel access for site roster & vacancy controls'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. CANDIDATE LOGIN FORM */}
        {type === 'candidate-login' && (
          <form onSubmit={handleCandidateLogin} className="p-6 space-y-4 text-xs text-slate-700">
            {/* Quick Demo Credentials Pill */}
            <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-blue-900 text-xs">Quick Demo Access</p>
                <p className="text-[11px] text-blue-700">Test as sample candidate: Rahul Sharma (B.Tech Civil)</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  loginAsCandidate();
                  onClose();
                }}
                className="px-3 py-1.5 bg-blue-700 text-white font-bold text-xs rounded-lg hover:bg-blue-800 transition"
              >
                1-Click Demo
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  defaultValue="rahul.sharma@example.com"
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  defaultValue="password123"
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Sign In to Candidate Dashboard
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchType('candidate-register')}
                className="font-bold text-blue-700 hover:underline"
              >
                Register as Candidate
              </button>
            </div>
          </form>
        )}

        {/* 2. ADMIN LOGIN FORM */}
        {type === 'admin-login' && (
          <form onSubmit={handleAdminLogin} className="p-6 space-y-4 text-xs text-slate-700">
            {/* Quick Demo Credentials Pill */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-center justify-between">
              <div>
                <p className="font-bold text-amber-950 text-xs">HR Management Demo</p>
                <p className="text-[11px] text-amber-800">Directly access full roster, auto-vacancies & hiring</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  loginAsAdmin();
                  onClose();
                }}
                className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs rounded-lg transition"
              >
                1-Click HR Login
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Staff Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  defaultValue="hr.admin@nccprojects.in"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Staff Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  defaultValue="admin@ncc2026"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center space-x-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Login to HR Admin Console</span>
            </button>
          </form>
        )}

        {/* 3. CANDIDATE REGISTRATION FORM (Section 4) */}
        {type === 'candidate-register' && (
          <form
            onSubmit={handleRegisterSubmit}
            className="p-6 space-y-3.5 text-xs text-slate-700 max-h-[75vh] overflow-y-auto"
          >
            <div>
              <label className="block font-bold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Vikram Verma"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="vikram@example.com"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  required
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Home State</label>
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
              <label className="block font-bold text-slate-700 mb-1">Current Address</label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Residential address..."
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Highest Educational Qualification
              </label>
              <input
                type="text"
                required
                value={highestQualification}
                onChange={(e) => setHighestQualification(e.target.value)}
                placeholder="e.g. B.Tech in Civil Engineering"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Key Skills (Comma separated)
              </label>
              <input
                type="text"
                required
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Upload Resume / CV File
              </label>
              <div className="flex items-center space-x-2 p-2.5 bg-blue-50/60 border border-blue-200 rounded-xl">
                <FileText className="w-5 h-5 text-blue-600" />
                <span className="flex-1 text-slate-700 font-semibold truncate">
                  {resumeFileName}
                </span>
                <label className="px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 font-bold text-[11px] cursor-pointer">
                  Browse
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setResumeFileName(e.target.files[0].name);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition"
            >
              Complete Registration & Open Dashboard
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => onSwitchType('candidate-login')}
                className="font-bold text-blue-700 hover:underline"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
