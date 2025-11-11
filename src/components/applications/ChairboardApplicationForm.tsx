import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

export const ChairboardApplicationForm: React.FC = () => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    institution: '',
    position: '',
    experience: '',
    committeePreferences: [] as string[],
    chairingExperience: '',
    crisisExperience: '',
    availability: '',
    resume: '',
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
      setFormData(prev => ({
        ...prev,
        committeePreferences: [...prev.committeePreferences, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        committeePreferences: prev.committeePreferences.filter(c => c !== value)
      }));
    }
  };

  const handleSubmit = async (baseData: any) => {
    // Validate chairboard-specific fields
    const errors: Record<string, string> = {};
    
    if (!formData.institution.trim()) errors.institution = 'Institution is required';
    if (!formData.position.trim()) errors.position = 'Position is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (formData.committeePreferences.length === 0) errors.committeePreferences = 'Please select at least one committee preference';
    if (!formData.chairingExperience.trim()) errors.chairingExperience = 'Chairing experience is required';
    if (!formData.crisisExperience.trim()) errors.crisisExperience = 'Crisis experience is required';
    if (!formData.availability.trim()) errors.availability = 'Availability is required';
    if (!formData.resume.trim()) errors.resume = 'Resume link is required';

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
      applicationType="Chairboard"
    >
      <FormInput
        label="Institution"
        name="institution"
        type="text"
        value={formData.institution}
        onChange={handleInputChange}
        error={formErrors.institution}
        required
      />

      <FormInput
        label="Current Position"
        name="position"
        type="text"
        value={formData.position}
        onChange={handleInputChange}
        error={formErrors.position}
        required
      />

      <FormInput
        label="MUN Experience"
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
          Committee Preferences
        </label>
        <div className="space-y-2">
          {committeeOptions.map((committee) => (
            <div key={committee} className="flex items-center">
              <input
                type="checkbox"
                id={committee}
                value={committee}
                checked={formData.committeePreferences.includes(committee)}
                onChange={handleCommitteeChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor={committee} className="ml-2 block text-sm text-gray-700">
                {committee}
              </label>
            </div>
          ))}
        </div>
        {formErrors.committeePreferences && (
          <p className="mt-1 text-sm text-red-600">{formErrors.committeePreferences}</p>
        )}
      </div>

      <FormInput
        label="Chairing Experience"
        name="chairingExperience"
        as="textarea"
        value={formData.chairingExperience}
        onChange={handleInputChange}
        error={formErrors.chairingExperience}
        rows={4}
        required
      />

      <FormInput
        label="Crisis Committee Experience"
        name="crisisExperience"
        as="textarea"
        value={formData.crisisExperience}
        onChange={handleInputChange}
        error={formErrors.crisisExperience}
        rows={4}
        required
      />

      <FormInput
        label="Availability During Conference"
        name="availability"
        as="textarea"
        value={formData.availability}
        onChange={handleInputChange}
        error={formErrors.availability}
        rows={3}
        required
      />

      <FormInput
        label="Resume/CV Link"
        name="resume"
        type="url"
        value={formData.resume}
        onChange={handleInputChange}
        error={formErrors.resume}
        required
      />
    </BaseApplicationForm>
  );
};