import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

export const DelegateApplicationForm: React.FC = () => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    school: '',
    grade: '',
    experience: '',
    committeePreference: [] as string[],
    positionPreference: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

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
    // Validate delegate-specific fields
    const errors: Record<string, string> = {};
    
    if (!formData.school.trim()) errors.school = 'School is required';
    if (!formData.grade) errors.grade = 'Grade is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (formData.committeePreference.length === 0) errors.committeePreference = 'Please select at least one committee';
    if (!formData.positionPreference) errors.positionPreference = 'Position preference is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    // Submit with combined data
    return await submitApplication({
      ...baseData,
      ...formData
    });
  };

  return (
    <BaseApplicationForm 
      onSubmit={handleSubmit} 
      applicationType="Delegate"
    >
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
    </BaseApplicationForm>
  );
};