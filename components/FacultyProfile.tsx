
import React from 'react';
import { Faculty, User } from '../types';
import Timetable from './Timetable';

interface FacultyProfileProps {
  faculty: Faculty;
  user: User;
  onSendMessage: () => void;
  onBack: () => void;
}

const FacultyProfile: React.FC<FacultyProfileProps> = ({ faculty, user, onSendMessage, onBack }) => {
  return (
    <div className="animate-fade-in">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-medium"
      >
        <i className="fa-solid fa-arrow-left"></i>
        Back to List
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
            <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
              {faculty.isOnLeave && (
                <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  On Leave
                </div>
              )}
            </div>
            <div className="px-6 pb-6">
              <div className="relative -mt-16 mb-4">
                <img 
                  src={faculty.imageUrl} 
                  alt={faculty.name} 
                  className="w-32 h-32 rounded-2xl border-4 border-white shadow-lg object-cover"
                />
              </div>
              
              <h1 className="text-2xl font-bold text-slate-900">{faculty.name}</h1>
              <p className="text-blue-600 font-semibold mb-4">{faculty.designation}</p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <i className="fa-solid fa-envelope"></i>
                  </div>
                  <span className="text-sm">{faculty.email}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-600">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400">
                    <i className="fa-solid fa-location-dot"></i>
                  </div>
                  <span className="text-sm">Room {faculty.roomNumber}</span>
                </div>
              </div>

              <button 
                onClick={onSendMessage}
                disabled={faculty.isOnLeave}
                className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${
                  faculty.isOnLeave 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' 
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'
                }`}
              >
                {faculty.isOnLeave ? 'Unavailable' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>

        {/* Content Tabs/Details */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-calendar-days text-blue-500"></i>
              Weekly Schedule
            </h2>
            <Timetable timetable={faculty.timetable} />
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-microscope text-purple-500"></i>
                Research Areas
              </h2>
              <div className="flex flex-wrap gap-2">
                {faculty.researchAreas.map(area => (
                  <span key={area} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-full border border-purple-100 font-medium">
                    {area}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fa-solid fa-lightbulb text-amber-500"></i>
                Expertise
              </h2>
              <div className="flex flex-wrap gap-2">
                {faculty.knowledgeDomains.map(domain => (
                  <span key={domain} className="px-3 py-1 bg-amber-50 text-amber-700 text-sm rounded-full border border-amber-100 font-medium">
                    {domain}
                  </span>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <i className="fa-solid fa-heart text-pink-500"></i>
              Academic Interests
            </h2>
            <div className="flex flex-wrap gap-2">
              {faculty.interests.map(interest => (
                <span key={interest} className="px-3 py-1 bg-pink-50 text-pink-700 text-sm rounded-full border border-pink-100 font-medium">
                  {interest}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;
