import React, { useState } from 'react';
import { Application, InterviewDetails } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Video,
  X,
  Send,
  Building2,
} from 'lucide-react';

interface ScheduleInterviewModalProps {
  application: Application | null;
  onClose: () => void;
  onConfirm: (appId: string, details: InterviewDetails) => void;
}

export const ScheduleInterviewModal: React.FC<ScheduleInterviewModalProps> = ({
  application,
  onClose,
  onConfirm,
}) => {
  if (!application) return null;

  const [date, setDate] = useState(
    new Date(Date.now() + 5 * 86400000).toISOString().split('T')[0]
  );
  const [time, setTime] = useState('11:00 AM IST');
  const [mode, setMode] = useState<
    'Online (Google Meet)' | 'Site Office (Walk-in)' | 'Headquarters (Hyderabad)'
  >('Site Office (Walk-in)');
  const [locationOrLink, setLocationOrLink] = useState(
    `Conference Room 1, NCC Project Site Office, ${application.siteName}`
  );
  const [interviewer, setInterviewer] = useState(
    'Mr. Arvind Rawat (Project DGM) & Technical Panel'
  );
  const [instructions, setInstructions] = useState(
    'Please bring original educational certificates, experience letters, 2 photographs, and valid government ID. Site safety briefing will follow.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(application.id, {
      date,
      time,
      mode,
      locationOrLink,
      interviewer,
      instructions,
    });
    onClose();
  };

  const handleModeChange = (newMode: typeof mode) => {
    setMode(newMode);
    if (newMode === 'Online (Google Meet)') {
      setLocationOrLink('https://meet.google.com/ncc-interview-' + Math.floor(100 + Math.random() * 900));
    } else if (newMode === 'Headquarters (Hyderabad)') {
      setLocationOrLink('NCC House, Madhapur, Hyderabad, Telangana - 500081');
    } else {
      setLocationOrLink(`Conference Room 1, NCC Project Site Office, ${application.siteName}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-[#0f294a] text-white p-5 flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
              Recruitment Coordination
            </span>
            <h3 className="text-lg font-bold text-white mt-1">
              Schedule Candidate Interview
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Candidate: <strong className="text-white">{application.candidateName}</strong> for {application.vacancyTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs text-slate-700">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Interview Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Time Slot</label>
              <input
                type="text"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="e.g. 11:30 AM IST"
                className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Interview Format / Mode</label>
            <select
              value={mode}
              onChange={(e) => handleModeChange(e.target.value as any)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            >
              <option value="Site Office (Walk-in)">Site Office (Walk-in)</option>
              <option value="Online (Google Meet)">Online (Google Meet)</option>
              <option value="Headquarters (Hyderabad)">Headquarters (Hyderabad)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Venue Address or Meeting Link
            </label>
            <input
              type="text"
              required
              value={locationOrLink}
              onChange={(e) => setLocationOrLink(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Interviewer Panel / HR Lead</label>
            <input
              type="text"
              required
              value={interviewer}
              onChange={(e) => setInterviewer(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Special Instructions for Candidate
            </label>
            <textarea
              rows={2}
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-1.5"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Issue Call Letter & Notify Candidate</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
