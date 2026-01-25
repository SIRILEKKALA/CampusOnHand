
import { Designation, Department, Faculty, TimetableSlot } from './types';

export const DEPARTMENTS: Department[] = [
  { id: 'cs', name: 'Computer Science', icon: 'fa-code', description: 'Exploring algorithms, AI, and software systems.' },
  { id: 'me', name: 'Mechanical Engineering', icon: 'fa-gears', description: 'Design, analysis, and manufacturing of mechanical systems.' },
  { id: 'ee', name: 'Electrical Engineering', icon: 'fa-bolt', description: 'Power systems, electronics, and telecommunications.' },
  { id: 'ce', name: 'Civil Engineering', icon: 'fa-building', description: 'Infrastructure, urban planning, and structural design.' },
  { id: 'bt', name: 'Biotechnology', icon: 'fa-dna', description: 'Harnessing biological systems for innovation.' },
];

const generateDefaultTimetable = (): any => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const slots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', 
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
  ];
  
  const timetable: any = {};
  days.forEach(day => {
    timetable[day] = slots.map(time => ({
      time,
      activity: Math.random() > 0.5 ? 'Lecture' : 'Research/Office',
      isFree: Math.random() > 0.7
    }));
  });
  return timetable;
};

export const MOCK_FACULTY: Faculty[] = [
  {
    id: 'f1',
    name: 'Dr. Sarah Mitchell',
    email: 'sarah.mitchell@college.edu',
    roomNumber: 'A-302',
    designation: Designation.DepartmentHead,
    departmentId: 'cs',
    researchAreas: ['Artificial Intelligence', 'Natural Language Processing'],
    interests: ['Ethical AI', 'Hiking', 'Chess'],
    knowledgeDomains: ['Python', 'Machine Learning', 'Deep Learning'],
    imageUrl: 'https://picsum.photos/seed/sarah/200',
    isOnLeave: false,
    timetable: generateDefaultTimetable()
  },
  {
    id: 'f2',
    name: 'Prof. James Wilson',
    email: 'james.wilson@college.edu',
    roomNumber: 'B-105',
    designation: Designation.Professor,
    departmentId: 'cs',
    researchAreas: ['Cybersecurity', 'Blockchain'],
    interests: ['Photography', 'Astronomy'],
    knowledgeDomains: ['Network Security', 'Cryptography'],
    imageUrl: 'https://picsum.photos/seed/james/200',
    isOnLeave: false,
    timetable: generateDefaultTimetable()
  },
  {
    id: 'f3',
    name: 'Dr. Elena Rodriguez',
    email: 'elena.rodriguez@college.edu',
    roomNumber: 'M-201',
    designation: Designation.AssociateProfessor,
    departmentId: 'me',
    researchAreas: ['Robotics', 'Thermodynamics'],
    interests: ['Music', 'Tennis'],
    knowledgeDomains: ['CAD/CAM', 'Automation'],
    imageUrl: 'https://picsum.photos/seed/elena/200',
    isOnLeave: false,
    timetable: generateDefaultTimetable()
  }
];
