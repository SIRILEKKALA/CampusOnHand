
export enum Designation {
  Professor = "Professor",
  AssociateProfessor = "Associate Professor",
  AssistantProfessor = "Assistant Professor",
  Lecturer = "Lecturer",
  DepartmentHead = "Head of Department"
}

export interface TimetableSlot {
  time: string;
  activity: string;
  isFree: boolean;
}

export interface FacultyTimetable {
  [day: string]: TimetableSlot[];
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  roomNumber: string;
  designation: Designation;
  departmentId: string;
  researchAreas: string[];
  interests: string[];
  knowledgeDomains: string[];
  imageUrl: string;
  isOnLeave: boolean;
  timetable: FacultyTimetable;
}

export interface Department {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface User {
  email: string;
  name: string;
  role: 'student' | 'faculty';
  facultyId?: string;
}

export interface Message {
  id: string;
  senderEmail: string;
  receiverEmail: string;
  subject: string;
  content: string;
  timestamp: Date;
}
