// components/ContactRequestForm.tsx

'use client';

import { useState } from 'react';
import { Alumni } from '@/types/alumni';

interface ContactRequestFormProps {
  alumni: Alumni;
  onClose: () => void;
}

export default function ContactRequestForm({ alumni, onClose }: ContactRequestFormProps) {
  const [formData, setFormData] = useState({
    requesterName: '',
    requesterEmail: '',
    requesterYear: '',
    message: '',
    requestEmail: false,
    requestPhone: false,
    requestLinkedIn: false,
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.requestEmail && !formData.requestPhone && !formData.requestLinkedIn) {
      setError('Please select at least one type of information to request');
      return;
    }

    setIsSubmitting(true);
    setError('');

    // Simulate API call (replace with actual n8n webhook later)
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
        <div 
          className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Request Sent!
            </h2>
            <p className="text-gray-600 mb-6">
              Your request has been sent to {alumni.firstName}. 
              They&apos;ll review what you&apos;re asking for and decide what to share.
            </p>
            <p className="text-sm text-gray-500 mb-6">
              You&apos;ll receive an email notification when they respond.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-college-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-college-blue-700 transition-all"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-linear-to-r from-college-blue-600 to-college-blue-500 text-white p-6 rounded-t-3xl">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Request Private Information</h2>
            <button 
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-blue-100 mt-2">
            Request private contact information from {alumni.name}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">Your Information</h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.requesterName}
                onChange={(e) => setFormData({...formData, requesterName: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-college-blue-500 focus:outline-none transition-colors"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Email *
              </label>
              <input
                type="email"
                required
                value={formData.requesterEmail}
                onChange={(e) => setFormData({...formData, requesterEmail: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-college-blue-500 focus:outline-none transition-colors"
                placeholder="john.doe@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Your Graduation Year (Optional)
              </label>
              <input
                type="text"
                value={formData.requesterYear}
                onChange={(e) => setFormData({...formData, requesterYear: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-college-blue-500 focus:outline-none transition-colors"
                placeholder="e.g., 2020"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 text-lg">What would you like to see?</h3>
            <p className="text-sm text-gray-600">
              Select which private information you&apos;d like to request from {alumni.firstName}
            </p>

            <div className="space-y-3 bg-blue-50 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestEmail}
                  onChange={(e) => setFormData({...formData, requestEmail: e.target.checked})}
                  className="mt-1 w-5 h-5 text-college-blue-600 border-gray-300 rounded focus:ring-college-blue-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">📧 Email Address</div>
                  <div className="text-sm text-gray-600">Request their email for direct communication</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestPhone}
                  onChange={(e) => setFormData({...formData, requestPhone: e.target.checked})}
                  className="mt-1 w-5 h-5 text-college-blue-600 border-gray-300 rounded focus:ring-college-blue-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">📱 Phone/WhatsApp Number</div>
                  <div className="text-sm text-gray-600">Request their phone number for calls or WhatsApp</div>
                </div>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.requestLinkedIn}
                  onChange={(e) => setFormData({...formData, requestLinkedIn: e.target.checked})}
                  className="mt-1 w-5 h-5 text-college-blue-600 border-gray-300 rounded focus:ring-college-blue-500"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">💼 LinkedIn Profile</div>
                  <div className="text-sm text-gray-600">Request their LinkedIn for professional networking</div>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Message to {alumni.firstName} (Optional)
            </label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-college-blue-500 focus:outline-none transition-colors resize-none"
              placeholder="Briefly explain why you'd like to connect..."
            />
            <p className="text-xs text-gray-500 mt-1">
              A short message increases your chances of approval
            </p>
          </div>

          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-2">
              What happens next?
            </p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {alumni.firstName} will receive your request via email</li>
              <li>• They can choose which information to share with you</li>
              <li>• You&apos;ll get an email with whatever they approve</li>
              <li>• They may approve some items and decline others</li>
            </ul>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-college-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-college-blue-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Sending Request...' : 'Send Request'}
          </button>
        </form>
      </div>
    </div>
  );
}