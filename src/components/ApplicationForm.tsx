import React, { useState } from 'react';
import { useApplication } from '../hooks/useApplication';
import { validateApplicationForm } from '../utils/validation';
import Button from './UI/Button';
import FormInput from './UI/FormInput';

const ApplicationForm: React.FC = () => {
  const { submitApplication, error, loading } = useApplication();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    school: '',
    grade: '',
    experience: '',
    committeePreference: [] as string[],
    positionPreference: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const committeeOptions = [
    'United Nations Security Council (UNSC)',
    'United Nations Human Rights Council (UNHRC)',
    'United Nations Environment Programme (UNEP)',
    'World Health Organization (WHO)',
    'United Nations Children\'s Fund (UNICEF)',
    'United Nations Office on Drugs and Crime (UNODC)',
  ];

  const positionOptions = [
    'Ambassador',
    'Co-Ambassador',
    'Staff',
    'No Preference',
  ];

  const gradeOptions = [
    '9th Grade',
    '10th Grade',
    '11th Grade',
    '12th Grade',
    'University Freshman',
    'University Sophomore',
    'University Junior',
    'University Senior',
    'Graduate Student',
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCommitteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    
    if (checked) {
      // Add committee to preferences if not already there and under limit
      if (formData.committeePreference.length < 3) {
        setFormData(prev => ({
          ...prev,
          committeePreference: [...prev.committeePreference, value]
        }));
      }
    } else {
      // Remove committee from preferences
      setFormData(prev => ({
        ...prev,
        committeePreference: prev.committeePreference.filter(c => c !== value)
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateApplicationForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    // Submit application
    const success = await submitApplication(formData);
    
    if (success) {
      setSubmitSuccess(true);
    }
  };

  if (submitSuccess) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Application Submitted Successfully!</h2>
          <p className="mb-6">
            Thank you for applying to the MUN Conference 2023. Your application has been received and is currently under review.
          </p>
          <Button variant="primary">
            <a href="/dashboard">View Your Dashboard</a>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Application Form</h2>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="First Name"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleInputChange}
            error={formErrors.firstName}
            required
          />
          
          <FormInput
            label="Last Name"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleInputChange}
            error={formErrors.lastName}
            required
          />
        </div>
        
        <FormInput
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          error={formErrors.email}
          required
        />
        
        <FormInput
          label="Phone Number"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          error={formErrors.phone}
          required
        />
        
        <FormInput
          label="School"
          name="school"
          type="text"
          value={formData.school}
          onChange={handleInputChange}
          error={formErrors.school}
          required
        />
        
        <FormInput
          label="Grade"
          name="grade"
          as="select"
          value={formData.grade}
          onChange={handleInputChange}
          error={formErrors.grade}
          options={gradeOptions}
          required
        />
        
        <FormInput
          label="Previous MUN Experience"
          name="experience"
          as="textarea"
          value={formData.experience}
          onChange={handleInputChange}
          error={formErrors.experience}
          rows={4}
          required
        />
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Committee Preferences (Select up to 3)
          </label>
          <div className="space-y-2">
            {committeeOptions.map((committee) => (
              <div key={committee} className="flex items-center">
                <input
                  type="checkbox"
                  id={committee}
                  value={committee}
                  checked={formData.committeePreference.includes(committee)}
                  onChange={handleCommitteeChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor={committee} className="ml-2 block text-sm text-gray-700">
                  {committee}
                </label>
              </div>
            ))}
          </div>
          {formErrors.committeePreference && (
            <p className="mt-1 text-sm text-red-600">{formErrors.committeePreference}</p>
          )}
        </div>
        
        <FormInput
          label="Position Preference"
          name="positionPreference"
          as="select"
          value={formData.positionPreference}
          onChange={handleInputChange}
          error={formErrors.positionPreference}
          options={positionOptions}
          required
        />
        
        <Button
          type="submit"
          variant="primary"
          disabled={loading}
          className="w-full mt-6"
        >
          {loading ? 'Submitting...' : 'Submit Application'}
        </Button>
      </form>
    </div>
  );
};

export default ApplicationForm;