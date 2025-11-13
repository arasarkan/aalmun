import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import Button from '../UI/Button';

interface BaseApplicationFormProps {
  onSubmit: (data: any) => Promise<boolean>;
  applicationType: string;
  children: React.ReactNode;
}

export const BaseApplicationForm: React.FC<BaseApplicationFormProps> = ({ 
  onSubmit, 
  applicationType,
  children 
}) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // State to collect all form data including base fields
  const [formData, setFormData] = useState({
    firstName: user?.displayName?.split(' ')[0] || '',
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || '',
    phone: '',
    idNumber: '',
    specialConditions: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const baseData = {
      email: user?.email || '', 
      uid: user?.uid || '',
      ...formData, 
    };

    console.log('BaseApplicationForm submitting with data:', baseData);

    try {
      const success = await onSubmit(baseData);
      if (success) {
        window.location.href = '/apply';
      } else {
        setError('Failed to submit application');
      }
    } catch (err) {
      setError('An error occurred while submitting your application');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">
        {applicationType.charAt(0).toUpperCase() + applicationType.slice(1)} Application
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {/* Authenticated user's email (read-only) */}
        <div className="mb-4">
          <label htmlFor="userEmail" className="block text-gray-700 font-medium mb-2">
            Your Email (Authenticated Account)
          </label>
          <input
            type="email"
            id="userEmail"
            value={user?.email || ''}
            readOnly
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
            title="This email is locked to your authenticated account"
          />
          <p className="text-sm text-gray-500 mt-1">This email is locked to your authenticated account</p>
        </div>

        {/* Name fields (pre-filled from Google account) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Phone number field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="+1 (555) 123-4567"
            required
          />
        </div>

        {/* ID Number field */}
        <div className="mb-4">
          <label htmlFor="idNumber" className="block text-gray-700 font-medium mb-2">
            ID Number
          </label>
          <input
            type="text"
            id="idNumber"
            name="idNumber"
            value={formData.idNumber}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your ID number"
            required
          />
          <p className="text-sm text-gray-500 mt-1">This information is required for conference registration and will be kept confidential.</p>
        </div>

        {/* Special Conditions field */}
        <div className="mb-4">
          <label htmlFor="specialConditions" className="block text-gray-700 font-medium mb-2">
            Special Conditions
          </label>
          <textarea
            id="specialConditions"
            name="specialConditions"
            rows={3}
            value={formData.specialConditions}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Please let us know if you have any special conditions or require accommodations during the conference"
          ></textarea>
          <p className="text-sm text-gray-500 mt-1">Optional - Leave blank if not applicable</p>
        </div>
        
        {children}
        
        <div className="mt-6">
          <Button
            type="submit"
            variant="primary"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Application'}
          </Button>
        </div>
      </form>
    </div>
  );
};