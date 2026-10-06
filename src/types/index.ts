export type JobType = 'Full-time' | 'Contractual' | 'Site Regular' | 'Apprenticeship';
export type VacancyStatus = 'Open' | 'Filled' | 'Closed';
export type ApplicationStatus = 'Applied' | 'Under Review' | 'Shortlisted' | 'Interview Scheduled' | 'Selected' | 'Rejected';
export type EmployeeStatus = 'Active' | 'Resigned' | 'Transferred' | 'Terminated' | 'On Leave';

export interface LocationState {
  name: string;
  districts: string[];
}

export interface ProjectSite {
  id: string;
  projectCode: string;
  name: string;
  state: string;
  district: string;
  address: string;
  category: 'Roads & Highways' | 'Buildings & Housing' | 'Water & Environment' | 'Rail & Metro' | 'Power & Electrical' | 'Mining';
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  status: 'Active' | 'Mobilization' | 'Completed';
  activeEmployeesCount?: number;
}

export interface Vacancy {
  id: string;
  title: string;
  jobRole: string;
  state: string;
  district: string;
  siteId: string;
  siteName: string;
  siteAddress: string;
  openingsCount: number;
  description: string;
  responsibilities: string[];
  qualification: string;
  experience: string;
  salary: string;
  jobType: JobType;
  status: VacancyStatus;
  datePosted: string;
  lastDate: string;
  source: 'Automatic' | 'Manual';
  originatedFromEmployeeId?: string;
  originatedFromEmployeeName?: string;
  filledByCandidateId?: string;
  filledByCandidateName?: string;
  filledAt?: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  phone: string;
  jobRole: string;
  state: string;
  district: string;
  siteId: string;
  siteName: string;
  joiningDate: string;
  salary: string;
  status: EmployeeStatus;
  resignationDate?: string;
  transferDestination?: string;
  remarks?: string;
  linkedVacancyId?: string;
}

export interface EducationItem {
  degree: string;
  institution: string;
  year: string;
  score: string;
}

export interface WorkExperienceItem {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Candidate {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  password?: string;
  dob: string;
  gender: 'Male' | 'Female' | 'Other';
  state: string;
  district: string;
  address: string;
  highestQualification: string;
  educationDetails: EducationItem[];
  workExperience: WorkExperienceItem[];
  skills: string[];
  resumeFileName?: string;
  resumeUrl?: string;
  avatarUrl?: string;
  currentCompany?: string;
  currentDesignation?: string;
  expectedSalary?: string;
  noticePeriod?: string;
  createdAt: string;
  savedVacancies: string[];
}

export interface InterviewDetails {
  date: string;
  time: string;
  mode: 'Online (Google Meet)' | 'Site Office (Walk-in)' | 'Headquarters (Hyderabad)';
  locationOrLink: string;
  interviewer: string;
  instructions: string;
}

export interface Application {
  id: string;
  vacancyId: string;
  vacancyTitle: string;
  siteName: string;
  candidateId: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateExperience: string;
  candidateQualification: string;
  appliedAt: string;
  status: ApplicationStatus;
  coverNote?: string;
  resumeFileName?: string;
  notes?: string;
  interviewDetails?: InterviewDetails;
  hiredAsEmployeeId?: string;
  updatedAt?: string;
}

export interface NotificationItem {
  id: string;
  targetRole: 'admin' | 'candidate' | 'all';
  candidateId?: string;
  title: string;
  message: string;
  type: 'vacancy' | 'application' | 'interview' | 'selection' | 'resignation' | 'system';
  createdAt: string;
  read: boolean;
  link?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  siteId?: string;
  siteName?: string;
  subject: string;
  message: string;
  createdAt: string;
  status: 'Pending' | 'Resolved';
}

export type ActiveTab = 
  | 'home' 
  | 'jobs' 
  | 'sites' 
  | 'about' 
  | 'contact' 
  | 'candidate-dashboard' 
  | 'admin-dashboard'
  | 'admin-vacancies'
  | 'admin-employees'
  | 'admin-applications'
  | 'admin-sites'
  | 'admin-interviews'
  | 'admin-reports';
