import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Send,
  CheckCircle2,
  Shield,
  Clock,
  User,
  MessageSquare,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { sites, submitContactMessage } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedSiteId, setSelectedSiteId] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const site = sites.find((s) => s.id === selectedSiteId);

    submitContactMessage({
      name,
      email,
      phone,
      siteId: site?.id,
      siteName: site?.name,
      subject,
      message,
    });

    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Banner */}
        <div className="bg-[#0f294a] rounded-3xl p-8 sm:p-12 text-white shadow-xl">
          <div className="max-w-3xl space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              Talent Acquisition & Site Liaison
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Contact NCC HR & Recruitment Desks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Have questions regarding an active vacancy application, site interview instructions, or joining formalities? Connect directly with our central recruitment team or project site HR officers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Inquiry Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Send an Inquiry to Recruitment Desk
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Your message will be routed to the respective site HR officer and answered within 24 business hours.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-emerald-950">
                  Message Dispatched Successfully!
                </h3>
                <p className="text-xs text-emerald-800 max-w-md mx-auto">
                  Thank you for reaching out. The NCC HR Recruitment team has received your query and will contact you via email or phone.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-emerald-700 text-white rounded-xl text-xs font-bold hover:bg-emerald-800 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs text-slate-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Target Project Site (Optional)
                    </label>
                    <select
                      value={selectedSiteId}
                      onChange={(e) => setSelectedSiteId(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 font-medium focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden truncate"
                    >
                      <option value="">General Corporate HR Desk</option>
                      {sites.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name} ({s.state})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Query regarding Site Engineer interview call letter"
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Detailed Message</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Provide your application ID or details regarding your inquiry..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 text-slate-800 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit HR Message</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Corporate HR Desk Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-700" />
                <span>NCC Limited Corporate Headquarters</span>
              </h3>

              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start space-x-2.5">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>
                    NCC House, Madhapur, Hyderabad, Telangana - 500081, India
                  </span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Toll Free HR: 1800-425-6225 / +91 40 2326 8888</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>careers@ncclimited.com / recruitment@nccprojects.in</span>
                </div>

                <div className="flex items-center space-x-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
                </div>
              </div>
            </div>

            {/* Ethical Recruitment Notice */}
            <div className="bg-blue-50/70 rounded-3xl border border-blue-200 p-6 space-y-2">
              <div className="flex items-center space-x-2 text-blue-900 font-bold text-xs">
                <Shield className="w-4 h-4 text-blue-700" />
                <span>Fair & Ethical Recruitment Policy</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                NCC Limited does not charge any application fee, registration charges, or security deposits at any stage of the recruitment process. All selections are strictly merit-based.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
