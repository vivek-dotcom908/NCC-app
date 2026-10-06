import React, { useState } from 'react';
import { Vacancy } from '../../types';
import { useApp } from '../../context/AppContext';
import {
  X,
  Send,
  FileText,
  Upload,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  User,
  Phone,
  Mail,
  GraduationCap,
  Briefcase,
  ArrowRight,
} from 'lucide-react';

interface ApplyModalProps {
  vacancy: Vacancy | null;
  onClose: () => void;
  onSuccess: () => void;
  onRequireAuth: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({
  vacancy,
  onClose,
  onSuccess,
  onRequireAuth,
}) => {
  const { currentCandidate, currentUserRole, applyForVacancy, setActiveTab } = useApp();

  const [coverNote, setCoverNote] = useState('');
  const [selectedResumeName, setSelectedResumeName] = useState(
    currentCandidate?.resumeFileName || 'Rahul_Sharma_Civil_Resume.pdf'
  );
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  if (!vacancy) return null;

  // If user is guest, prompt login/registration
  if (currentUserRole !== 'candidate' || !currentCandidate) {
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 text-center space-y-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center mx-auto">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Candidate Registration Required
          </h3>
          <p className="text-xs text-slate-600">
            To apply for <strong>{vacancy.title}</strong>, please login to your NCC candidate account or create a new profile in under 2 minutes.
          </p>
          <div className="flex flex-col gap-2 pt-2">
            <button
              onClick={() => {
                onClose();
                onRequireAuth();
              }}
              className="w-full py-2.5 bg-blue-700 text-white font-bold text-xs rounded-xl hover:bg-blue-800 transition"
            >
              Login or Register as Candidate
            </button>
            <button
              onClick={onClose}
              className="w-full py-2 text-slate-600 text-xs font-semibold hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedResumeName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!agreeTerms) {
      setErrorMsg('Please confirm that your submitted credentials are true and accurate.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const res = applyForVacancy(vacancy.id, coverNote, selectedResumeName);
      setIsSubmitting(false);

      if (res.success) {
        setSubmittedSuccess(true);
      } else {
        setErrorMsg(res.message);
      }
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0f294a] to-blue-900 text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
              NCC Employment Application
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Apply for {vacancy.title}
            </h3>
            <p className="text-xs text-blue-200 mt-0.5">
              Site: {vacancy.siteName} ({vacancy.district}, {vacancy.state})
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {!submittedSuccess ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
            {errorMsg && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Candidate Auto-Filled Details card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2">
              <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                <span className="font-bold text-slate-900 flex items-center gap-1.5 text-xs">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  Your Profile Information (Auto-Filled)
                </span>
                <span className="text-[10px] text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  Verified Candidate
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-slate-600">
                <p><strong>Name:</strong> {currentCandidate.fullName}</p>
                <p><strong>Email:</strong> {currentCandidate.email}</p>
                <p><strong>Phone:</strong> {currentCandidate.phone}</p>
                <p><strong>Highest Qual:</strong> {currentCandidate.highestQualification}</p>
                <p className="col-span-2">
                  <strong>Location:</strong> {currentCandidate.district}, {currentCandidate.state}
                </p>
              </div>
            </div>

            {/* Resume Attachment */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Curriculum Vitae / Resume
              </label>
              <div className="flex items-center space-x-3 p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
                <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="flex-1 truncate">
                  <p className="font-semibold text-slate-800 text-xs truncate">
                    {selectedResumeName}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Attached from your candidate documents
                  </p>
                </div>
                <label className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg text-slate-700 font-semibold text-[11px] cursor-pointer shrink-0">
                  <span>Change File</span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>

            {/* Statement / Pitch */}
            <div>
              <label className="block font-bold text-slate-800 mb-1">
                Statement of Experience / Cover Note (Optional)
              </label>
              <textarea
                rows={3}
                value={coverNote}
                onChange={(e) => setCoverNote(e.target.value)}
                placeholder="Mention relevant infrastructure project experience, availability, or reasons for applying to this site..."
                className="w-full px-3 py-2 bg-white rounded-xl border border-slate-300 text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            {/* Terms confirmation */}
            <label className="flex items-start space-x-2.5 pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-[11px] text-slate-600">
                I hereby declare that all qualification and experience information submitted in my profile is genuine and I am eligible for the site location stated.
              </span>
            </label>

            {/* Actions */}
            <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-700/20 flex items-center space-x-1.5 transition cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting Application...' : 'Submit Application'}</span>
              </button>
            </div>
          </form>
        ) : (
          /* Submission Success State */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              Application Successfully Submitted!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
              Your application for <strong>{vacancy.title}</strong> at <strong>{vacancy.siteName}</strong> has been registered with NCC HR. You will receive real-time updates as your profile progresses.
            </p>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-700 max-w-sm mx-auto">
              <p>Application Status: <strong className="text-blue-700 font-bold">Applied (Under Review)</strong></p>
              <p className="text-[11px] text-slate-500 mt-1">
                You can track shortlisting status, interview call letters, and HR notes in your Candidate Dashboard.
              </p>
            </div>

            <div className="flex items-center justify-center space-x-3 pt-4">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
              >
                Browse More Jobs
              </button>
              <button
                onClick={() => {
                  onClose();
                  setActiveTab('candidate-dashboard');
                }}
                className="px-5 py-2.5 bg-blue-700 text-white text-xs font-bold rounded-xl hover:bg-blue-800 transition flex items-center space-x-1.5"
              >
                <span>Go to Candidate Dashboard</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
