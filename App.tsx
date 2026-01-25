
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { User, Faculty, Department, Designation } from './types';
import { DEPARTMENTS, MOCK_FACULTY } from './constants';
import FacultyProfile from './components/FacultyProfile';
import MessageModal from './components/MessageModal';
import Timetable from './components/Timetable';

// --- Auth Hook (Mock) ---
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const login = (email: string) => {
    if (!email.endsWith('@college.edu')) {
      alert("Only college email IDs are allowed!");
      return;
    }
    const isFaculty = email.startsWith('prof') || email.startsWith('sarah') || email.startsWith('james');
    setUser({
      email,
      name: email.split('@')[0].replace('.', ' '),
      role: isFaculty ? 'faculty' : 'student',
      facultyId: isFaculty ? MOCK_FACULTY[0].id : undefined
    });
  };
  const logout = () => setUser(null);
  return { user, login, logout };
};

// --- Components ---

const LandingPage: React.FC<{ onLogin: (email: string) => void }> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 p-4 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-100 rotate-3">
            <i className="fa-solid fa-hand-holding-heart text-white text-2xl"></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">CampusOnHand</h1>
          <p className="text-slate-500 mt-2">Connecting Campus Communities</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">College Email Address</label>
            <div className="relative">
              <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
              <input 
                type="email" 
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                placeholder="name@college.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-2 italic">* Use 'sarah@college.edu' for Faculty view, 'student@college.edu' for Student view.</p>
          </div>

          <button 
            onClick={() => onLogin(email)}
            className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
          >
            Sign In with College ID
          </button>
        </div>
      </div>
    </div>
  );
};

const Header: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.location.hash = '/'}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <i className="fa-solid fa-hand-holding-heart text-white text-sm"></i>
          </div>
          <span className="font-bold text-slate-900 text-lg hidden sm:block">CampusOnHand</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end mr-2 hidden sm:flex">
            <span className="text-xs font-bold text-slate-900">{user.name}</span>
            <span className="text-[10px] text-slate-500 capitalize bg-slate-100 px-2 py-0.5 rounded-full">{user.role}</span>
          </div>
          <button 
            onClick={onLogout}
            className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all"
            title="Logout"
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

const Dashboard: React.FC<{ user: User }> = ({ user }) => {
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [viewingFaculty, setViewingFaculty] = useState<Faculty | null>(null);
  const [messagingFaculty, setMessagingFaculty] = useState<Faculty | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaculty = MOCK_FACULTY.filter(f => 
    (!selectedDept || f.departmentId === selectedDept) &&
    (f.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
     f.knowledgeDomains.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  if (viewingFaculty) {
    return (
      <FacultyProfile 
        faculty={viewingFaculty} 
        user={user} 
        onSendMessage={() => setMessagingFaculty(viewingFaculty)}
        onBack={() => setViewingFaculty(null)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fa-solid fa-graduation-cap text-9xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Find Faculty</h1>
        <p className="text-slate-500 max-w-xl">Search by name, department, or domain of expertise to connect with the right mentor for your academic journey.</p>
        
        <div className="mt-8 relative max-w-2xl">
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            placeholder="Search by name, research area, or knowledge domain..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Departments</h2>
          {selectedDept && (
            <button 
              onClick={() => setSelectedDept(null)}
              className="text-sm font-bold text-blue-600 hover:text-blue-700"
            >
              Clear Filter
            </button>
          )}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {DEPARTMENTS.map(dept => (
            <button 
              key={dept.id}
              onClick={() => setSelectedDept(dept.id)}
              className={`p-4 rounded-2xl border text-left transition-all group ${
                selectedDept === dept.id 
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' 
                  : 'bg-white border-slate-200 text-slate-900 hover:border-blue-300'
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${
                selectedDept === dept.id ? 'bg-white/20' : 'bg-slate-50 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-600'
              }`}>
                <i className={`fa-solid ${dept.icon}`}></i>
              </div>
              <h3 className="font-bold text-sm leading-tight">{dept.name}</h3>
            </button>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-900 mb-6">
          {selectedDept ? `Faculty in ${DEPARTMENTS.find(d => d.id === selectedDept)?.name}` : 'All Faculty'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map(f => (
            <div 
              key={f.id} 
              className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer"
              onClick={() => setViewingFaculty(f)}
            >
              <div className="flex items-start gap-4">
                <img src={f.imageUrl} className="w-16 h-16 rounded-xl object-cover shadow-inner" alt={f.name} />
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-slate-900 truncate group-hover:text-blue-600 transition-colors">{f.name}</h3>
                  <p className="text-xs text-slate-500 font-medium mb-1">{f.designation}</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">
                    {DEPARTMENTS.find(d => d.id === f.departmentId)?.name}
                  </p>
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-slate-50">
                <p className="text-[10px] text-slate-400 uppercase font-bold mb-2">Research Areas</p>
                <div className="flex flex-wrap gap-1">
                  {f.researchAreas.slice(0, 2).map(area => (
                    <span key={area} className="text-[10px] bg-slate-50 text-slate-600 px-2 py-0.5 rounded-full border border-slate-100">
                      {area}
                    </span>
                  ))}
                  {f.researchAreas.length > 2 && <span className="text-[10px] text-slate-400 font-medium">+{f.researchAreas.length - 2} more</span>}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${f.isOnLeave ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
                  <span className="text-xs font-semibold text-slate-500">{f.isOnLeave ? 'On Leave' : 'Available'}</span>
                </div>
                <span className="text-blue-600 text-xs font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Profile
                  <i className="fa-solid fa-chevron-right text-[10px]"></i>
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {messagingFaculty && (
        <MessageModal 
          faculty={messagingFaculty} 
          user={user} 
          onClose={() => setMessagingFaculty(null)} 
          onSent={() => setMessagingFaculty(null)}
        />
      )}
    </div>
  );
};

const FacultyAdmin: React.FC<{ user: User }> = ({ user }) => {
  const [faculty, setFaculty] = useState<Faculty>(MOCK_FACULTY.find(f => f.id === user.facultyId) || MOCK_FACULTY[0]);
  
  const handleSlotUpdate = (day: string, slotIdx: number, updatedSlot: any) => {
    setFaculty(prev => ({
      ...prev,
      timetable: {
        ...prev.timetable,
        [day]: prev.timetable[day].map((s, i) => i === slotIdx ? updatedSlot : s)
      }
    }));
  };

  const toggleLeave = () => {
    setFaculty(prev => ({ ...prev, isOnLeave: !prev.isOnLeave }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <section className="bg-slate-900 rounded-3xl p-8 text-white shadow-xl shadow-slate-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img src={faculty.imageUrl} className="w-24 h-24 rounded-2xl border-2 border-white/20 shadow-2xl" alt={faculty.name} />
            <div>
              <h1 className="text-3xl font-bold">{faculty.name}</h1>
              <p className="text-blue-400 font-semibold">{faculty.designation}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <i className="fa-solid fa-envelope"></i> {faculty.email}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <i className="fa-solid fa-building"></i> Room {faculty.roomNumber}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button 
              onClick={toggleLeave}
              className={`px-6 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                faculty.isOnLeave 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-emerald-500 text-white hover:bg-emerald-600'
              }`}
            >
              <i className={`fa-solid ${faculty.isOnLeave ? 'fa-toggle-on' : 'fa-toggle-off'}`}></i>
              {faculty.isOnLeave ? 'You are ON LEAVE' : 'You are AVAILABLE'}
            </button>
            <p className="text-[10px] text-slate-400 text-center italic">Students see this status instantly.</p>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <i className="fa-solid fa-clock text-blue-500"></i>
                Manage Your Timetable
              </h2>
              <div className="flex gap-2">
                <span className="text-xs bg-slate-100 px-2 py-1 rounded font-medium text-slate-600">Click a slot to toggle availability</span>
              </div>
            </div>
            <Timetable 
              timetable={faculty.timetable} 
              isEditable={true} 
              onUpdate={handleSlotUpdate} 
            />
          </section>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-600 font-bold uppercase mb-1">Messages Recieved</p>
                <p className="text-2xl font-bold text-blue-900">12</p>
              </div>
              <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
                <p className="text-xs text-purple-600 font-bold uppercase mb-1">Meetings Today</p>
                <p className="text-2xl font-bold text-purple-900">4</p>
              </div>
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
                <p className="text-xs text-amber-600 font-bold uppercase mb-1">Weekly Office Hours</p>
                <p className="text-2xl font-bold text-amber-900">8h</p>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-2xl p-6 text-white shadow-lg">
            <h2 className="text-lg font-bold mb-2">Smart Suggestion</h2>
            <p className="text-indigo-100 text-xs leading-relaxed mb-4">
              Based on student inquiries, we suggest opening a free slot on Wednesday at 2 PM.
            </p>
            <button className="w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-all backdrop-blur-sm">
              Apply Suggestion
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

// --- App Layout ---

const MainLayout: React.FC<{ user: User; onLogout: () => void }> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header user={user} onLogout={onLogout} />
      <main className="max-w-7xl mx-auto px-4 py-8">
        {user.role === 'faculty' ? <FacultyAdmin user={user} /> : <Dashboard user={user} />}
      </main>
      <footer className="py-12 border-t border-slate-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-900 rounded flex items-center justify-center">
              <i className="fa-solid fa-hand-holding-heart text-white text-[10px]"></i>
            </div>
            <span className="font-bold text-slate-900 text-sm">CampusOnHand v1.0</span>
          </div>
          <div className="flex gap-6 text-slate-400 text-xs">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">College Guidelines</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Support</a>
          </div>
          <p className="text-slate-400 text-[10px]">© 2024 CampusOnHand Inc. Authorized Academic Portal.</p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  const { user, login, logout } = useAuth();

  return (
    <HashRouter>
      {!user ? (
        <LandingPage onLogin={login} />
      ) : (
        <MainLayout user={user} onLogout={logout} />
      )}
    </HashRouter>
  );
};

export default App;
