// components/AlumniModal.tsx

'use client';

import { Alumni } from '@/types/alumni';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AlumniModalProps {
  alumni: Alumni | null;
  onClose: () => void;
}

export default function AlumniModal({ alumni, onClose }: AlumniModalProps) {
  const [showContactForm, setShowContactForm] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!alumni) return null;

  const getYearDisplay = () => {
    if (alumni.memberType === 'student') {
      return `Class of ${alumni.graduationYear}`;
    } else if (alumni.memberType === 'faculty') {
      return `Faculty (${alumni.yearsAtCollege})`;
    } else {
      return `Class of ${alumni.graduationYear} • Faculty (${alumni.yearsAtCollege})`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-linear-to-r from-college-blue-600 to-college-blue-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-start gap-6">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white shrink-0">
              <Image 
                src={alumni.photo} 
                alt={alumni.name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-2">{alumni.name}</h2>
              <p className="text-blue-100 text-lg mb-2">{alumni.currentPosition}</p>
              <p className="text-blue-200">{alumni.company}</p>
              <p className="text-blue-200 text-sm mt-2">{getYearDisplay()}</p>
            </div>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-2">📖 Biography</h3>
            <p className="text-gray-700 leading-relaxed">{alumni.bio}</p>
          </div>

          {alumni.achievements && alumni.privacySettings.achievements && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🏆 Notable Achievements</h3>
              <p className="text-gray-700">{alumni.achievements}</p>
            </div>
          )}

          {alumni.favoriteMemory && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💭 Favorite Memory</h3>
              <p className="text-gray-700 italic">&quot;{alumni.favoriteMemory}&quot;</p>
            </div>
          )}

          {alumni.messageToStudents && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">💡 Advice to Current Students</h3>
              <p className="text-gray-700">{alumni.messageToStudents}</p>
            </div>
          )}

          {(alumni.mentoringInterest || alumni.networkingOpen) && (
            <div className="bg-blue-50 rounded-xl p-4">
              <h3 className="font-semibold text-gray-900 mb-2">🤝 Availability</h3>
              <div className="space-y-2 text-gray-700">
                {alumni.mentoringInterest && (
                  <p><strong>Mentoring:</strong> {alumni.mentoringInterest}</p>
                )}
                {alumni.networkingOpen && (
                  <p><strong>Networking:</strong> {alumni.networkingOpen}</p>
                )}
              </div>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl p-4">
            <h3 className="font-semibold text-gray-900 mb-3">📞 Contact Information</h3>
            
            <div className="space-y-2 mb-4">
              {alumni.privacySettings.location && (
                <p className="text-gray-700">
                  <strong>Location:</strong> {alumni.location}
                </p>
              )}
              {alumni.privacySettings.company && (
                <p className="text-gray-700">
                  <strong>Company:</strong> {alumni.company}
                </p>
              )}
              {alumni.privacySettings.linkedin && alumni.linkedin && (
                <p className="text-gray-700">
                  <strong>LinkedIn:</strong>{' '}
                  <a 
                    href={`https://${alumni.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-college-blue-600 hover:underline"
                  >
                    {alumni.linkedin}
                  </a>
                </p>
              )}
              {alumni.privacySettings.phone && (
                <p className="text-gray-700">
                  <strong>WhatsApp:</strong> {alumni.phone}
                </p>
              )}
              
              {(!alumni.privacySettings.phone || !alumni.privacySettings.linkedin) && (
                <p className="text-gray-500 text-sm italic mt-2">
                  Some contact information is kept private for security
                </p>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <button
                onClick={() => setShowContactForm(true)}
                className="inline-flex items-center gap-2 bg-college-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-college-blue-700 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Request Private Information
              </button>
              <p className="text-xs text-gray-500 mt-2">
                Your request will be forwarded to {alumni.firstName} for approval
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}