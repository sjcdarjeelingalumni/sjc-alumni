// components/AlumniBook.tsx

'use client';

import { useState, useEffect } from 'react';
import { Alumni } from '@/types/alumni';
import BookPage from './BookPage';
import AlumniModal from './AlumniModal';
import { motion, AnimatePresence } from 'framer-motion';

interface AlumniBookProps {
  alumni: Alumni[];
}

export default function AlumniBook({ alumni }: AlumniBookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState<Alumni | null>(null);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const itemsPerPage = isMobile ? 1 : 2;
  const totalPages = Math.ceil(alumni.length / itemsPerPage);

  const getCurrentAlumni = () => {
    const start = currentPage * itemsPerPage;
    return alumni.slice(start, start + itemsPerPage);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setFlipDirection('forward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev + 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setFlipDirection('backward');
      setIsFlipping(true);
      setTimeout(() => {
        setCurrentPage(prev => prev - 1);
        setIsFlipping(false);
      }, 600);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipping]);

  const currentAlumni = getCurrentAlumni();

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 py-8 px-4">
        {/* Book Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-amber-100 mb-2 font-serif">
            Alumni Registry
          </h1>
          <p className="text-amber-200 text-lg font-serif italic">
            St Joseph&apos;s College Economics Honours
          </p>
          <p className="text-amber-300 text-sm mt-2">
            ✦ Sursum Corda ✦
          </p>
        </div>

        {/* Book Container */}
        <div className="max-w-6xl mx-auto perspective-[2000px]">
          <div className="relative">
            {/* Book Shadow */}
            <div className="absolute inset-0 bg-black/30 blur-xl transform translate-y-4" />

            {/* Book */}
            <div className="relative bg-amber-900 rounded-xl shadow-2xl p-4 md:p-8">
              {/* Book Spine */}
              <div className="absolute left-1/2 top-0 bottom-0 w-4 bg-linear-to-r from-amber-800 via-amber-700 to-amber-800 transform -translate-x-1/2 hidden md:block">
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-black/20 to-transparent" />
              </div>

              {/* Pages */}
              <div className="grid md:grid-cols-2 gap-0 min-h-[600px]">
                <AnimatePresence mode="wait">
                  {currentAlumni.map((person, index) => (
                    <motion.div
                      key={`${currentPage}-${index}`}
                      initial={{ 
                        rotateY: flipDirection === 'forward' ? -90 : 90,
                        opacity: 0 
                      }}
                      animate={{ 
                        rotateY: 0,
                        opacity: 1 
                      }}
                      exit={{ 
                        rotateY: flipDirection === 'forward' ? 90 : -90,
                        opacity: 0 
                      }}
                      transition={{ 
                        duration: 0.6,
                        ease: "easeInOut"
                      }}
                      style={{ transformStyle: 'preserve-3d' }}
                      className="h-full"
                    >
                      <BookPage 
                        alumni={person}
                        side={index === 0 ? 'left' : 'right'}
                        onClick={() => setSelectedAlumni(person)}
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6 px-4">
                {/* Previous Button */}
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0 || isFlipping}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                    transition-all duration-300
                    ${currentPage === 0 || isFlipping
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-500 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span className="hidden md:inline">Previous</span>
                </button>

                {/* Page Counter */}
                <div className="text-center">
                  <p className="text-amber-100 font-serif text-lg">
                    Page {currentPage + 1} of {totalPages}
                  </p>
                  <p className="text-amber-300 text-sm mt-1">
                    Showing {currentPage * itemsPerPage + 1}-{Math.min((currentPage + 1) * itemsPerPage, alumni.length)} of {alumni.length} alumni
                  </p>
                </div>

                {/* Next Button */}
                <button
                  onClick={nextPage}
                  disabled={currentPage >= totalPages - 1 || isFlipping}
                  className={`
                    flex items-center gap-2 px-6 py-3 rounded-lg font-semibold
                    transition-all duration-300
                    ${currentPage >= totalPages - 1 || isFlipping
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-amber-600 text-white hover:bg-amber-500 shadow-lg hover:shadow-xl'
                    }
                  `}
                >
                  <span className="hidden md:inline">Next</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Keyboard Navigation Hint */}
              <div className="text-center mt-4">
                <p className="text-amber-300 text-xs font-serif">
                  Use ← → arrow keys to navigate
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alumni Detail Modal */}
      {selectedAlumni && (
        <AlumniModal 
          alumni={selectedAlumni}
          onClose={() => setSelectedAlumni(null)}
        />
      )}
    </>
  );
}