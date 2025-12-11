// app/page.tsx

import AlumniBook from '@/components/AlumniBook';
import { alumniData } from '@/data/alumni';
import Header from '@/components/Header';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <AlumniBook alumni={alumniData} />
    </div>
  );
}