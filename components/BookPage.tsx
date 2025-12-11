// components/BookPage.tsx

'use client';

import { Alumni } from '@/types/alumni';
import Image from 'next/image';

interface BookPageProps {
  alumni: Alumni;
  side: 'left' | 'right';
  onClick?: () => void;
}

export default function BookPage({ alumni, side, onClick }: BookPageProps) {
  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'faculty': return 'bg-purple-100 text-purple-700';
      case 'both': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getYearDisplay = () => {
    if (alumni.memberType === 'student') {
      return `Class of ${alumni.graduationYear}`;
    } else if (alumni.memberType === 'faculty') {
      return `Faculty (${alumni.yearsAtCollege})`;
    } else {
      return `Class of ${alumni.graduationYear}`;
    }
  };

  return (
    <div 
      onClick={onClick}
      className={`
        relative h-full w-full bg-gradient-to-br from-amber-50 to-orange-50
        border-2 border-amber-200 shadow-lg
        ${side === 'left' ? 'rounded-l-xl border-r-0' : 'rounded-r-xl border-l-0'}
        cursor-pointer hover:shadow-xl transition-shadow duration-300
        overflow-hidden
      `}
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23f59e0b\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
      }}
    >
      {/* Page Corner Fold */}
      <div className={`
        absolute top-0 w-0 h-0
        ${side === 'right' 
          ? 'right-0 border-l-[30px] border-l-transparent border-t-[30px] border-t-amber-100' 
          : 'left-0 border-r-[30px] border-r-transparent border-t-[30px] border-t-amber-100'
        }
      `} />

      {/* Content */}
      <div className="relative h-full p-8 flex flex-col">
        {/* Photo */}
        <div className="flex justify-center mb-4">
          <div className="w-40 h-40 rounded-full border-4 border-amber-200 shadow-lg overflow-hidden bg-white">
            <Image 
              src={alumni.photo} 
              alt={alumni.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Name */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2 font-serif">
          {alumni.name}
        </h2>

        {/* Badge */}
        <div className="flex justify-center mb-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getBadgeColor(alumni.memberType)}`}>
            {alumni.memberType === 'student' && '🎓 Student'}
            {alumni.memberType === 'faculty' && '👨‍🏫 Faculty'}
            {alumni.memberType === 'both' && '🎓👨‍🏫 Both'}
          </span>
        </div>

        {/* Year */}
        <p className="text-sm text-college-blue-600 font-medium text-center mb-4">
          {getYearDisplay()}
        </p>

        {/* Position */}
        <div className="bg-white/60 rounded-lg p-3 mb-3 border border-amber-200">
          <p className="font-semibold text-gray-900 text-center">
            {alumni.currentPosition}
          </p>
          {alumni.privacySettings.company ? (
            <p className="text-gray-600 text-sm text-center mt-1">
              {alumni.company}
            </p>
          ) : (
            <p className="text-gray-400 text-xs text-center mt-1 italic">
              Company private
            </p>
          )}
        </div>

        {/* Location */}
        <div className="bg-white/60 rounded-lg p-2 mb-3 border border-amber-200">
          {alumni.privacySettings.location ? (
            <p className="text-gray-600 text-sm text-center">
              📍 {alumni.location}
            </p>
          ) : (
            <p className="text-gray-400 text-xs text-center italic">
              📍 Location private
            </p>
          )}
        </div>

        {/* Bio */}
        <div className="flex-1 overflow-hidden">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-6 font-serif">
            {alumni.bio}
          </p>
        </div>

        {/* Click hint */}
        <div className="mt-4 text-center">
          <p className="text-xs text-amber-600 italic">
            Click for full profile →
          </p>
        </div>
      </div>

      {/* Decorative corner */}
      <div className={`
        absolute bottom-4 w-8 h-8 border-amber-300
        ${side === 'right' ? 'right-4 border-r-2 border-b-2' : 'left-4 border-l-2 border-b-2'}
      `} />
    </div>
  );
}