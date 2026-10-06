import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ProjectSite,
  Vacancy,
  Employee,
  Candidate,
  Application,
  NotificationItem,
  ContactMessage,
  ActiveTab,
  EmployeeStatus,
  ApplicationStatus,
  InterviewDetails,
} from '../types';
import {
  INITIAL_SITES,
  INITIAL_EMPLOYEES,
  INITIAL_VACANCIES,
  INITIAL_CANDIDATE,
  INITIAL_APPLICATIONS,
  INITIAL_NOTIFICATIONS,
} from '../data/seedData';

interface AppContextType {
  sites: ProjectSite[];
  vacancies: Vacancy[];
  employees: Employee[];
  candidates: Candidate[];
  applications: Application[];
  notifications: NotificationItem[];
  contactMessages: ContactMessage[];
  currentUserRole: 'guest' | 'candidate' | 'admin';
  currentCandidate: Candidate | null;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  selectedVacancyForModal: Vacancy | null;
  setSelectedVacancyForModal: (v: Vacancy | null) => void;
  applyingVacancy: Vacancy | null;
  setApplyingVacancy: (v: Vacancy | null) => void;
  
  // Auto vacancy dialog state
  pendingResignedEmployee: Employee | null;
  setPendingResignedEmployee: (emp: Employee | null) => void;

  // Actions
  switchRole: (role: 'guest' | 'candidate' | 'admin') => void;
  loginAsCandidate: (candidateId?: string) => void;
  loginAsAdmin: () => void;
  logout: () => void;
  registerCandidate: (data: Partial<Candidate>) => Candidate;
  updateCandidateProfile: (updates: Partial<Candidate>) => void;
  toggleSaveVacancy: (vacancyId: string) => void;

  // Vacancy actions
  createVacancy: (data: Partial<Vacancy>) => Vacancy;
  updateVacancy: (id: string, updates: Partial<Vacancy>) => void;
  closeVacancy: (id: string) => void;

  // Employee actions & Auto Vacancy Trigger
  addEmployee: (emp: Partial<Employee>) => Employee;
  updateEmployeeStatus: (id: string, newStatus: EmployeeStatus, remarks?: string) => void;
  confirmAutoVacancyCreation: (employee: Employee, customDetails?: Partial<Vacancy>) => Vacancy;

  // Applications & Hiring
  applyForVacancy: (vacancyId: string, coverNote?: string, resumeFileName?: string) => { success: boolean; message: string };
  updateApplicationStatus: (
    appId: string,
    status: ApplicationStatus,
    notes?: string,
    interviewDetails?: InterviewDetails
  ) => void;
  hireCandidateForVacancy: (appId: string, joiningSalary?: string) => void;

  // Sites
  addSite: (site: Partial<ProjectSite>) => ProjectSite;
  updateSite: (id: string, updates: Partial<ProjectSite>) => void;

  // Contact
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  resetAllData: () => void;

  // Global search filters
  searchState: string;
  setSearchState: (s: string) => void;
  searchDistrict: string;
  setSearchDistrict: (d: string) => void;
  searchSiteId: string;
  setSearchSiteId: (siteId: string) => void;
  searchJobRole: string;
  setSearchJobRole: (role: string) => void;
  searchKeyword: string;
  setSearchKeyword: (kw: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY = 'ncc_recruitment_portal_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or seed
  const [sites, setSites] = useState<ProjectSite[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_sites`);
    return saved ? JSON.parse(saved) : INITIAL_SITES;
  });

  const [vacancies, setVacancies] = useState<Vacancy[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_vacancies`);
    return saved ? JSON.parse(saved) : INITIAL_VACANCIES;
  });

  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_employees`);
    return saved ? JSON.parse(saved) : INITIAL_EMPLOYEES;
  });

  const [candidates, setCandidates] = useState<Candidate[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_candidates`);
    return saved ? JSON.parse(saved) : [INITIAL_CANDIDATE];
  });

  const [applications, setApplications] = useState<Application[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_messages`);
    return saved ? JSON.parse(saved) : [];
  });

  const [currentUserRole, setCurrentUserRole] = useState<'guest' | 'candidate' | 'admin'>('guest');
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(INITIAL_CANDIDATE);
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [selectedVacancyForModal, setSelectedVacancyForModal] = useState<Vacancy | null>(null);
  const [applyingVacancy, setApplyingVacancy] = useState<Vacancy | null>(null);
  const [pendingResignedEmployee, setPendingResignedEmployee] = useState<Employee | null>(null);

  // Global filters
  const [searchState, setSearchState] = useState('');
  const [searchDistrict, setSearchDistrict] = useState('');
  const [searchSiteId, setSearchSiteId] = useState('');
  const [searchJobRole, setSearchJobRole] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  // Persist state updates to localStorage
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_sites`, JSON.stringify(sites));
  }, [sites]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_vacancies`, JSON.stringify(vacancies));
  }, [vacancies]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_employees`, JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_candidates`, JSON.stringify(candidates));
  }, [candidates]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_notifications`, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_messages`, JSON.stringify(contactMessages));
  }, [contactMessages]);

  const switchRole = (role: 'guest' | 'candidate' | 'admin') => {
    setCurrentUserRole(role);
    if (role === 'candidate') {
      setCurrentCandidate(candidates[0] || INITIAL_CANDIDATE);
    } else if (role === 'admin') {
      // admin user
    }
  };

  const loginAsCandidate = (candidateId?: string) => {
    const cand = candidateId
      ? candidates.find((c) => c.id === candidateId) || candidates[0]
      : candidates[0] || INITIAL_CANDIDATE;
    setCurrentCandidate(cand);
    setCurrentUserRole('candidate');
    setActiveTab('candidate-dashboard');
  };

  const loginAsAdmin = () => {
    setCurrentUserRole('admin');
    setActiveTab('admin-dashboard');
  };

  const logout = () => {
    setCurrentUserRole('guest');
    setActiveTab('home');
  };

  const registerCandidate = (data: Partial<Candidate>): Candidate => {
    const newCand: Candidate = {
      id: `CAND-${Date.now().toString().slice(-4)}`,
      fullName: data.fullName || 'New Candidate',
      email: data.email || 'candidate@example.com',
      phone: data.phone || '',
      password: data.password || 'password123',
      dob: data.dob || '1998-01-01',
      gender: data.gender || 'Male',
      state: data.state || 'Uttarakhand',
      district: data.district || 'Dehradun',
      address: data.address || '',
      highestQualification: data.highestQualification || 'B.Tech Civil Engineering',
      educationDetails: data.educationDetails || [
        {
          degree: data.highestQualification || 'B.Tech Civil Engineering',
          institution: 'State Technical University',
          year: '2020',
          score: '80%',
        },
      ],
      workExperience: data.workExperience || [],
      skills: data.skills || ['Civil Engineering', 'Site Execution'],
      resumeFileName: data.resumeFileName || 'Resume.pdf',
      resumeUrl: '#',
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      createdAt: new Date().toISOString().split('T')[0],
      savedVacancies: [],
      ...data,
    };

    setCandidates((prev) => [newCand, ...prev]);
    setCurrentCandidate(newCand);
    setCurrentUserRole('candidate');
    setActiveTab('candidate-dashboard');

    // Add notification
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      targetRole: 'candidate',
      candidateId: newCand.id,
      title: 'Welcome to NCC Recruitment Portal',
      message: `Hello ${newCand.fullName}, your candidate profile has been registered. Explore active vacancies and apply!`,
      type: 'system',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'jobs',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newCand;
  };

  const updateCandidateProfile = (updates: Partial<Candidate>) => {
    if (!currentCandidate) return;
    const updated = { ...currentCandidate, ...updates };
    setCurrentCandidate(updated);
    setCandidates((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const toggleSaveVacancy = (vacancyId: string) => {
    if (!currentCandidate) return;
    const exists = currentCandidate.savedVacancies.includes(vacancyId);
    const updatedSaved = exists
      ? currentCandidate.savedVacancies.filter((id) => id !== vacancyId)
      : [...currentCandidate.savedVacancies, vacancyId];
    updateCandidateProfile({ savedVacancies: updatedSaved });
  };

  // Vacancy management
  const createVacancy = (data: Partial<Vacancy>): Vacancy => {
    const site = sites.find((s) => s.id === data.siteId) || sites[0];
    const newVac: Vacancy = {
      id: `VAC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: data.title || `${data.jobRole || 'Engineer'} - ${site.name.split(' ')[0]}`,
      jobRole: data.jobRole || 'Site Engineer (Civil)',
      state: data.state || site.state,
      district: data.district || site.district,
      siteId: site.id,
      siteName: site.name,
      siteAddress: site.address,
      openingsCount: data.openingsCount || 1,
      description:
        data.description ||
        `Urgent requirement for ${data.jobRole || 'Site Engineer'} at our ${site.name} project site. Candidate will oversee day-to-day operations and project milestones.`,
      responsibilities: data.responsibilities || [
        'Supervise on-site construction work in accordance with technical specifications',
        'Maintain daily progress log, inspection requests (RFI), and safety standards',
        'Coordinate with project management and sub-contractors',
      ],
      qualification: data.qualification || 'B.Tech / Diploma in Civil / Relevant Engineering discipline',
      experience: data.experience || '2 - 5 Years in relevant infrastructure projects',
      salary: data.salary || '₹50,000 - ₹65,000 / month + Site Accommodation',
      jobType: data.jobType || 'Full-time',
      status: 'Open',
      datePosted: new Date().toISOString().split('T')[0],
      lastDate: data.lastDate || new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
      source: data.source || 'Manual',
      originatedFromEmployeeId: data.originatedFromEmployeeId,
      originatedFromEmployeeName: data.originatedFromEmployeeName,
    };

    setVacancies((prev) => [newVac, ...prev]);

    // Admin & candidate notification
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      targetRole: 'all',
      title: `New Vacancy: ${newVac.title}`,
      message: `${newVac.openingsCount} position(s) open for ${newVac.jobRole} at ${newVac.siteName}, ${newVac.district}.`,
      type: 'vacancy',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'jobs',
    };
    setNotifications((prev) => [notif, ...prev]);

    return newVac;
  };

  const updateVacancy = (id: string, updates: Partial<Vacancy>) => {
    setVacancies((prev) => prev.map((v) => (v.id === id ? { ...v, ...updates } : v)));
  };

  const closeVacancy = (id: string) => {
    setVacancies((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status: 'Closed' as const } : v))
    );
  };

  // Employee management & Automatic Vacancy trigger
  const addEmployee = (emp: Partial<Employee>): Employee => {
    const site = sites.find((s) => s.id === emp.siteId) || sites[0];
    const newEmp: Employee = {
      id: `NCC-EMP-${Math.floor(1000 + Math.random() * 9000)}`,
      name: emp.name || 'New Employee',
      email: emp.email || 'employee@nccprojects.in',
      phone: emp.phone || '+91 98000 00000',
      jobRole: emp.jobRole || 'Site Engineer (Civil)',
      state: emp.state || site.state,
      district: emp.district || site.district,
      siteId: site.id,
      siteName: site.name,
      joiningDate: emp.joiningDate || new Date().toISOString().split('T')[0],
      salary: emp.salary || '₹55,000 / month',
      status: emp.status || 'Active',
      remarks: emp.remarks,
    };

    setEmployees((prev) => [newEmp, ...prev]);
    return newEmp;
  };

  const updateEmployeeStatus = (id: string, newStatus: EmployeeStatus, remarks?: string) => {
    const emp = employees.find((e) => e.id === id);
    if (!emp) return;

    const updatedEmp: Employee = {
      ...emp,
      status: newStatus,
      remarks: remarks || emp.remarks,
      resignationDate:
        newStatus === 'Resigned' || newStatus === 'Terminated' || newStatus === 'Transferred'
          ? new Date().toISOString().split('T')[0]
          : emp.resignationDate,
    };

    setEmployees((prev) => prev.map((e) => (e.id === id ? updatedEmp : e)));

    // IMPORTANT REQUIREMENT:
    // When status changes from Active to Resigned/Transferred/Terminated,
    // trigger prompt to ask HR Admin: "Do you want to open this position as a vacancy?"
    if (newStatus === 'Resigned' || newStatus === 'Transferred' || newStatus === 'Terminated') {
      setPendingResignedEmployee(updatedEmp);
    }
  };

  const confirmAutoVacancyCreation = (
    employee: Employee,
    customDetails?: Partial<Vacancy>
  ): Vacancy => {
    const site = sites.find((s) => s.id === employee.siteId) || sites[0];
    const title = `${employee.jobRole} - ${site.name.split(' ')[0]} Site`;

    const newVac: Vacancy = {
      id: `VAC-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      title: customDetails?.title || title,
      jobRole: employee.jobRole,
      state: employee.state,
      district: employee.district,
      siteId: site.id,
      siteName: site.name,
      siteAddress: site.address,
      openingsCount: customDetails?.openingsCount || 1,
      description:
        customDetails?.description ||
        `Urgent position opened automatically following the ${employee.status.toLowerCase()} of former post holder (${employee.name}). Looking for qualified professional to immediately oversee site execution at ${site.name}.`,
      responsibilities: [
        `Take over project leadership for ${employee.jobRole} responsibilities at ${site.name}`,
        'Coordinate site operations, inspection checklists, and sub-contractor alignment',
        'Ensure quality standards as per NCC project engineering benchmarks',
      ],
      qualification: customDetails?.qualification || 'Degree / Diploma in relevant Engineering / Professional field',
      experience: customDetails?.experience || '3 - 6 Years in Infrastructure / Construction Projects',
      salary: customDetails?.salary || `${employee.salary} (Negotiable as per candidate experience)`,
      jobType: 'Full-time',
      status: 'Open',
      datePosted: new Date().toISOString().split('T')[0],
      lastDate: new Date(Date.now() + 25 * 86400000).toISOString().split('T')[0],
      source: 'Automatic',
      originatedFromEmployeeId: employee.id,
      originatedFromEmployeeName: `${employee.name} (${employee.status})`,
    };

    setVacancies((prev) => [newVac, ...prev]);

    // Link vacancy ID to employee record
    setEmployees((prev) =>
      prev.map((e) => (e.id === employee.id ? { ...e, linkedVacancyId: newVac.id } : e))
    );

    // Notify admin & public
    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      targetRole: 'admin',
      title: `⚡ Auto-Vacancy Published: ${newVac.title}`,
      message: `Position automatically published to public recruitment portal after ${employee.name}'s ${employee.status.toLowerCase()}. ID: ${newVac.id}`,
      type: 'resignation',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'admin-vacancies',
    };
    setNotifications((prev) => [notif, ...prev]);

    setPendingResignedEmployee(null);
    return newVac;
  };

  // Job Application system
  const applyForVacancy = (
    vacancyId: string,
    coverNote?: string,
    resumeFileName?: string
  ): { success: boolean; message: string } => {
    if (!currentCandidate) {
      return { success: false, message: 'Please login or register as a candidate first.' };
    }

    const vacancy = vacancies.find((v) => v.id === vacancyId);
    if (!vacancy) {
      return { success: false, message: 'Vacancy not found.' };
    }

    if (vacancy.status !== 'Open') {
      return { success: false, message: 'This vacancy is no longer open for applications.' };
    }

    // Check duplicate application
    const existing = applications.find(
      (a) => a.vacancyId === vacancyId && a.candidateId === currentCandidate.id
    );
    if (existing) {
      return {
        success: false,
        message: 'You have already submitted an application for this vacancy. Please track its status in your dashboard.',
      };
    }

    const newApp: Application = {
      id: `APP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      vacancyId: vacancy.id,
      vacancyTitle: vacancy.title,
      siteName: vacancy.siteName,
      candidateId: currentCandidate.id,
      candidateName: currentCandidate.fullName,
      candidateEmail: currentCandidate.email,
      candidatePhone: currentCandidate.phone,
      candidateExperience: `${currentCandidate.workExperience.length > 0 ? '3+' : '2'} Years`,
      candidateQualification: currentCandidate.highestQualification,
      appliedAt: new Date().toISOString().split('T')[0],
      status: 'Applied',
      coverNote: coverNote || 'I am excited to apply for this position at NCC.',
      resumeFileName: resumeFileName || currentCandidate.resumeFileName || 'Candidate_Resume.pdf',
    };

    setApplications((prev) => [newApp, ...prev]);

    // Notification for candidate
    const candNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}-1`,
      targetRole: 'candidate',
      candidateId: currentCandidate.id,
      title: 'Application Submitted Successfully',
      message: `Your application for "${vacancy.title}" at ${vacancy.siteName} has been received. Application ID: ${newApp.id}`,
      type: 'application',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'candidate-dashboard',
    };

    // Notification for admin
    const adminNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}-2`,
      targetRole: 'admin',
      title: `New Applicant: ${currentCandidate.fullName}`,
      message: `Received application for ${vacancy.title} (${vacancy.siteName}).`,
      type: 'application',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'admin-applications',
    };

    setNotifications((prev) => [candNotif, adminNotif, ...prev]);

    return { success: true, message: 'Application submitted successfully!' };
  };

  const updateApplicationStatus = (
    appId: string,
    status: ApplicationStatus,
    notes?: string,
    interviewDetails?: InterviewDetails
  ) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              status,
              notes: notes !== undefined ? notes : a.notes,
              interviewDetails: interviewDetails || a.interviewDetails,
              updatedAt: new Date().toISOString().split('T')[0],
            }
          : a
      )
    );

    // Notify candidate
    let title = `Application Update: ${status}`;
    let message = `Your application for ${app.vacancyTitle} is now "${status}".`;

    if (status === 'Interview Scheduled' && interviewDetails) {
      title = `📅 Interview Scheduled: ${app.vacancyTitle}`;
      message = `Your interview is scheduled on ${interviewDetails.date} at ${interviewDetails.time} (${interviewDetails.mode}). Check details in your dashboard.`;
    } else if (status === 'Shortlisted') {
      title = `⭐ Application Shortlisted!`;
      message = `Great news! You have been shortlisted for ${app.vacancyTitle}. Recruitment team will contact you soon.`;
    } else if (status === 'Selected') {
      title = `🎉 Congratulations! Selected for ${app.vacancyTitle}`;
      message = `You have been selected for the position! An HR representative will connect regarding your formal appointment letter and joining formalities.`;
    }

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      targetRole: 'candidate',
      candidateId: app.candidateId,
      title,
      message,
      type: status === 'Interview Scheduled' ? 'interview' : status === 'Selected' ? 'selection' : 'application',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'candidate-dashboard',
    };

    setNotifications((prev) => [notif, ...prev]);
  };

  // REQUIREMENT 3 & 15:
  // When candidate is successfully hired for that vacancy:
  // - Vacancy status changes from Open -> Filled
  // - Selected candidate is linked to that employee position (create employee record)
  // - Vacancy disappears from active vacancy list
  const hireCandidateForVacancy = (appId: string, joiningSalary?: string) => {
    const app = applications.find((a) => a.id === appId);
    if (!app) return;

    const vacancy = vacancies.find((v) => v.id === app.vacancyId);
    if (!vacancy) return;

    const cand = candidates.find((c) => c.id === app.candidateId);
    const site = sites.find((s) => s.id === vacancy.siteId) || sites[0];

    // 1. Create or link employee record
    const newEmpId = `NCC-EMP-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEmployee: Employee = {
      id: newEmpId,
      name: app.candidateName,
      email: app.candidateEmail,
      phone: app.candidatePhone,
      jobRole: vacancy.jobRole,
      state: vacancy.state,
      district: vacancy.district,
      siteId: site.id,
      siteName: site.name,
      joiningDate: new Date().toISOString().split('T')[0],
      salary: joiningSalary || vacancy.salary.split(' - ')[0] || '₹60,000 / month',
      status: 'Active',
      linkedVacancyId: vacancy.id,
      remarks: `Hired via NCC Recruitment Portal application #${app.id}`,
    };

    setEmployees((prev) => [newEmployee, ...prev]);

    // 2. Mark application Selected & link employee ID
    setApplications((prev) =>
      prev.map((a) =>
        a.id === appId
          ? {
              ...a,
              status: 'Selected' as const,
              hiredAsEmployeeId: newEmpId,
              notes: `Candidate appointed as Employee (${newEmpId}).`,
            }
          : a
      )
    );

    // 3. Mark vacancy as Filled, link candidate, and close active listing
    setVacancies((prev) =>
      prev.map((v) =>
        v.id === vacancy.id
          ? {
              ...v,
              status: 'Filled' as const,
              filledByCandidateId: app.candidateId,
              filledByCandidateName: app.candidateName,
              filledAt: new Date().toISOString().split('T')[0],
            }
          : v
      )
    );

    // 4. Send celebration notifications
    const candNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}-hired`,
      targetRole: 'candidate',
      candidateId: app.candidateId,
      title: `🎉 Official Selection & Appointment - Employee ID: ${newEmpId}`,
      message: `Congratulations ${app.candidateName}! You have been formally appointed as ${vacancy.jobRole} at ${vacancy.siteName}. Your employee profile is now Active.`,
      type: 'selection',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'candidate-dashboard',
    };

    const adminNotif: NotificationItem = {
      id: `NOTIF-${Date.now()}-hired-admin`,
      targetRole: 'admin',
      title: `✅ Position Filled: ${vacancy.title}`,
      message: `${app.candidateName} has been hired. Employee ID ${newEmpId} generated. Vacancy ${vacancy.id} is now Filled and removed from active list.`,
      type: 'selection',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'admin-employees',
    };

    setNotifications((prev) => [candNotif, adminNotif, ...prev]);
  };

  // Site management
  const addSite = (siteData: Partial<ProjectSite>): ProjectSite => {
    const newSite: ProjectSite = {
      id: `SITE-${Date.now().toString().slice(-4)}`,
      projectCode: `NCC-${siteData.state?.substring(0, 2).toUpperCase() || 'IN'}-${Math.floor(10 + Math.random() * 90)}`,
      name: siteData.name || 'New Project Site',
      state: siteData.state || 'Uttarakhand',
      district: siteData.district || 'Dehradun',
      address: siteData.address || 'Site Office Address',
      category: siteData.category || 'Roads & Highways',
      contactPerson: siteData.contactPerson || 'Site HR In-charge',
      contactEmail: siteData.contactEmail || 'sitehr@nccprojects.in',
      contactPhone: siteData.contactPhone || '+91 98000 00000',
      status: 'Active',
      activeEmployeesCount: 0,
      ...siteData,
    };

    setSites((prev) => [newSite, ...prev]);
    return newSite;
  };

  const updateSite = (id: string, updates: Partial<ProjectSite>) => {
    setSites((prev) => prev.map((s) => (s.id === id ? { ...s, ...updates } : s)));
  };

  // Contact form
  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      id: `MSG-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'Pending',
      ...msg,
    };
    setContactMessages((prev) => [newMsg, ...prev]);

    const notif: NotificationItem = {
      id: `NOTIF-${Date.now()}`,
      targetRole: 'admin',
      title: `New Inquiry from ${msg.name}`,
      message: `${msg.subject} (${msg.email})`,
      type: 'system',
      createdAt: new Date().toISOString(),
      read: false,
      link: 'admin-dashboard',
    };
    setNotifications((prev) => [notif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetAllData = () => {
    localStorage.clear();
    setSites(INITIAL_SITES);
    setVacancies(INITIAL_VACANCIES);
    setEmployees(INITIAL_EMPLOYEES);
    setCandidates([INITIAL_CANDIDATE]);
    setApplications(INITIAL_APPLICATIONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setContactMessages([]);
    setCurrentCandidate(INITIAL_CANDIDATE);
    setCurrentUserRole('guest');
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        sites,
        vacancies,
        employees,
        candidates,
        applications,
        notifications,
        contactMessages,
        currentUserRole,
        currentCandidate,
        activeTab,
        setActiveTab,
        selectedVacancyForModal,
        setSelectedVacancyForModal,
        applyingVacancy,
        setApplyingVacancy,
        pendingResignedEmployee,
        setPendingResignedEmployee,
        switchRole,
        loginAsCandidate,
        loginAsAdmin,
        logout,
        registerCandidate,
        updateCandidateProfile,
        toggleSaveVacancy,
        createVacancy,
        updateVacancy,
        closeVacancy,
        addEmployee,
        updateEmployeeStatus,
        confirmAutoVacancyCreation,
        applyForVacancy,
        updateApplicationStatus,
        hireCandidateForVacancy,
        addSite,
        updateSite,
        submitContactMessage,
        markNotificationAsRead,
        markAllNotificationsRead,
        resetAllData,
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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
