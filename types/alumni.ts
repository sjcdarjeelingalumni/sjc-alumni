// types/alumni.ts

export type MemberType = 'student' | 'faculty' | 'both' | 'all';

export interface Alumni {
  id: number;
  title?: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;              // Never shown publicly
  phone: string;
  memberType: 'student' | 'faculty' | 'both';
  graduationYear?: number | null;
  yearsAtCollege?: string | null;
  bio: string;
  currentPosition: string;
  company: string;
  linkedin?: string;
  achievements?: string;
  location: string;
  favoriteMemory?: string;
  messageToStudents?: string;
  mentoringInterest?: string;
  networkingOpen?: string;
  photo: string;
  privacySettings: {
    phone: boolean;
    linkedin: boolean;
    company: boolean;
    location: boolean;
    achievements: boolean;
  };
}