import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

interface DelegateApplicationFormProps {
  applicationType: string;
}

export const DelegateApplicationForm: React.FC<DelegateApplicationFormProps> = ({ applicationType }) => {
  const { submitApplication } = useApplication();

  const [formData, setFormData] = useState({
    schoolName: '',
    grade: '',
    previousExperience: '',
    committeePreference: [] as string[],
    motivationLetter: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const committeeOptions = [
    'Council of the European Union (CEU)',
    'World Organization for Animal Health (WOAH)',
    'Disarmament and International Security Committee (DISEC)',
    'Müşterek Kriz Komitesi (MKK)',
    'Crisis Committee (CC)',
    'International Olympic Committee (IOC)',
    'International Court of Justice (ICJ)'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleCommitteeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    if (checked) {
      if (formData.committeePreference.length < 3) {
        setFormData(prev => ({
          ...prev,
          committeePreference: [...prev.committeePreference, value]
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        committeePreference: prev.committeePreference.filter(c => c !== value)
      }));
    }
  };

  const handleSubmit = async (baseData: any) => {
    const errors: Record<string, string> = {};
    
    if (!formData.schoolName.trim()) errors.schoolName = 'School name is required';
    if (!formData.grade) errors.grade = 'Grade is required';
    if (!formData.previousExperience.trim()) errors.previousExperience = 'Previous experience is required';
    
    if (formData.committeePreference.length === 0) errors.committeePreference = 'Please select at least one committee';

    if (!formData.motivationLetter.trim()) {
      errors.motivationLetter = 'Motivation letter is required';
    } else if (formData.motivationLetter.length < 150) {
      errors.motivationLetter = 'Motivation letter must be at least 150 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    const applicationData = {
      ...baseData,
      ...formData,
      type: applicationType
    };

    return await submitApplication(applicationData);
  };

  const motivationLetterLength = formData.motivationLetter.length;

  return (
    <BaseApplicationForm 
      onSubmit={handleSubmit} 
      applicationType={applicationType}
    >
      <FormInput
        label="School Name"
        name="schoolName"
        type="text"
        value={formData.schoolName}
        onChange={handleInputChange}
        error={formErrors.schoolName}
        required
      />

      <FormInput
        label="Grade"
        name="grade"
        as="select"
        value={formData.grade}
        onChange={handleInputChange}
        error={formErrors.grade}
        options={['Prep.', '9th', '10th', '11th', '12th', 'Other']}
        required
      />

      <FormInput
        label="Previous MUN Experience"
        name="previousExperience"
        as="textarea"
        value={formData.previousExperience}
        onChange={handleInputChange}
        error={formErrors.previousExperience}
        rows={4}
        required
      />

      <div className="mb-2 flex justify-end">
        <p className={`text-sm ${motivationLetterLength < 150 ? 'text-red-500' : 'text-green-600'}`}>
          Characters: {motivationLetterLength} / 150 (minimum)
        </p>
      </div>

      <FormInput
        label="Motivation Letter"
        name="motivationLetter"
        as="textarea"
        value={formData.motivationLetter}
        onChange={handleInputChange}
        error={formErrors.motivationLetter}
        rows={6}
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
    </BaseApplicationForm>
  );
};