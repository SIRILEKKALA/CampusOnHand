
import React, { useState, useEffect } from 'react';
import { Faculty, User } from '../types';
import { polishMessage, getSmartSuggestions } from '../geminiService';

interface MessageModalProps {
  faculty: Faculty;
  user: User;
  onClose: () => void;
  onSent: () => void;
}

const MessageModal: React.FC<MessageModalProps> = ({ faculty, user, onClose, onSent }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isPolishing, setIsPolishing] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      const sugs = await getSmartSuggestions(faculty.interests, "meeting request");
      setSuggestions(sugs);
    };
    fetchSuggestions();
  }, [faculty.interests]);

  const handlePolish = async () => {
    if (!message) return;
    setIsPolishing(true);
    const polished = await polishMessage(message, {
      studentName: user.name,
      facultyName: faculty.name,
      purpose: subject || "Academic inquiry"
    });
    setMessage(polished);
    setIsPolishing(false);
  };

  const handleSend = () => {
    // Simulate sending email
    setShowConfirmation(true);
    setTimeout(() => {
      onSent();
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="p-6 bg-slate-900 text-white flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Message {faculty.name}</h2>
            <p className="text-slate-400 text-sm">Draft a professional email</p>
          </div>
          <button onClick={onClose} className="hover:text-slate-300 transition-colors">
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
            <input 
              type="text" 
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
              placeholder="e.g., Query regarding Research Project"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-slate-700">Message Content</label>
              <button 
                onClick={handlePolish}
                disabled={isPolishing || !message}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 disabled:opacity-50 flex items-center gap-1 bg-blue-50 px-2 py-1 rounded"
              >
                {isPolishing ? <i className="fa-solid fa-spinner animate-spin"></i> : <i className="fa-solid fa-wand-magic-sparkles"></i>}
                AI Professional Polish
              </button>
            </div>
            <textarea 
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none resize-none"
              placeholder="Write your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>

          {suggestions.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Smart Starters (Based on Prof's interests)</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => setMessage(prev => prev + (prev ? ' ' : '') + s)}
                    className="text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-full transition-colors border border-slate-200"
                  >
                    + {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-6 py-2 rounded-lg font-semibold text-slate-600 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSend}
            disabled={!message || !subject || showConfirmation}
            className="px-8 py-2 rounded-lg font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
          >
            {showConfirmation ? (
              <>
                <i className="fa-solid fa-check"></i>
                Sent!
              </>
            ) : (
              <>
                <i className="fa-solid fa-paper-plane"></i>
                Send Email
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
