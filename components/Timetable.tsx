
import React from 'react';
import { FacultyTimetable, TimetableSlot } from '../types';

interface TimetableProps {
  timetable: FacultyTimetable;
  isEditable?: boolean;
  onUpdate?: (day: string, slotIndex: number, updatedSlot: TimetableSlot) => void;
}

const Timetable: React.FC<TimetableProps> = ({ timetable, isEditable, onUpdate }) => {
  const days = Object.keys(timetable);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-slate-200">
        <thead>
          <tr className="bg-slate-50">
            <th className="px-4 py-2 border-b text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</th>
            {days.map(day => (
              <th key={day} className="px-4 py-2 border-b text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timetable[days[0]].map((slot, idx) => (
            <tr key={idx} className="hover:bg-slate-50 transition-colors">
              <td className="px-4 py-3 border-b text-sm font-medium text-slate-600 whitespace-nowrap">{slot.time}</td>
              {days.map(day => {
                const currentSlot = timetable[day][idx];
                return (
                  <td key={`${day}-${idx}`} className="px-4 py-3 border-b min-w-[120px]">
                    <div 
                      className={`p-2 rounded-lg text-xs font-medium border ${
                        currentSlot.isFree 
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                          : 'bg-slate-50 text-slate-500 border-slate-100'
                      } ${isEditable ? 'cursor-pointer hover:border-blue-300' : ''}`}
                      onClick={() => isEditable && onUpdate?.(day, idx, { ...currentSlot, isFree: !currentSlot.isFree })}
                    >
                      <div className="flex items-center justify-between">
                        <span>{currentSlot.isFree ? 'FREE SLOT' : currentSlot.activity}</span>
                        {isEditable && <i className="fa-solid fa-pen-to-square ml-1 opacity-50"></i>}
                      </div>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-emerald-100 border border-emerald-200 rounded"></span>
          <span>Available for Meetings</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-3 h-3 bg-slate-100 border border-slate-200 rounded"></span>
          <span>In Class / Busy</span>
        </div>
      </div>
    </div>
  );
};

export default Timetable;
