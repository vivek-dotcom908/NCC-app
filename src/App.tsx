import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './components/home/HomePage';
import { JobsExplorer } from './components/jobs/JobsExplorer';
import { SitesPage } from './components/sites/SitesPage';
import { AboutPage } from './components/about/AboutPage';
import { ContactPage } from './components/contact/ContactPage';
import { CandidateDashboard } from './components/candidate/CandidateDashboard';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AutoVacancyPromptModal } from './components/common/AutoVacancyPromptModal';
import { JobDetailsModal } from './components/jobs/JobDetailsModal';
import { ApplyModal } from './components/jobs/ApplyModal';
import { NotificationsModal } from './components/common/NotificationsModal';
import { AuthModals } from './components/auth/AuthModals';
import { Vacancy } from './types';

function MainApp() {
  const {
    activeTab,
    selectedVacancyForModal,
    setSelectedVacancyForModal,
    applyingVacancy,
    setApplyingVacancy,
  } = useApp();

  const [authModalType, setAuthModalType] = useState<
    'candidate-login' | 'candidate-register' | 'admin-login' | null
  >(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const handleOpenVacancyDetails = (v: Vacancy) => {
    setSelectedVacancyForModal(v);
  };

  const handleApplyVacancy = (v: Vacancy) => {
    setApplyingVacancy(v);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation Bar */}
      <Navbar
        onOpenAuth={(type) => setAuthModalType(type)}
        onOpenNotifications={() => setNotificationsOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onOpenDetails={handleOpenVacancyDetails}
            onApply={handleApplyVacancy}
            onOpenAuth={(type) => setAuthModalType(type)}
          />
        )}

        {activeTab === 'jobs' && (
          <JobsExplorer
            onOpenDetails={handleOpenVacancyDetails}
            onApply={handleApplyVacancy}
          />
        )}

        {activeTab === 'sites' && <SitesPage />}

        {activeTab === 'about' && <AboutPage />}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'candidate-dashboard' && (
          <CandidateDashboard
            onOpenVacancyDetails={handleOpenVacancyDetails}
            onApplyVacancy={handleApplyVacancy}
          />
        )}

        {(activeTab === 'admin-dashboard' ||
          activeTab === 'admin-vacancies' ||
          activeTab === 'admin-employees' ||
          activeTab === 'admin-applications' ||
          activeTab === 'admin-sites' ||
          activeTab === 'admin-interviews' ||
          activeTab === 'admin-reports') && (
          <AdminDashboard onOpenVacancyDetails={handleOpenVacancyDetails} />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals & Engine Handlers */}
      <AutoVacancyPromptModal />

      <JobDetailsModal
        vacancy={selectedVacancyForModal}
        onClose={() => setSelectedVacancyForModal(null)}
        onApply={handleApplyVacancy}
      />

      <ApplyModal
        vacancy={applyingVacancy}
        onClose={() => setApplyingVacancy(null)}
        onSuccess={() => setApplyingVacancy(null)}
        onRequireAuth={() => setAuthModalType('candidate-register')}
      />

      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />

      <AuthModals
        type={authModalType}
        onClose={() => setAuthModalType(null)}
        onSwitchType={(type) => setAuthModalType(type)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
