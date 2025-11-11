import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

export const PressApplicationForm: React.FC = () => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    organization: '',
    position: '',
    experience: '',
    portfolio: '',
    equipment: '',
    coverageInterests: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (baseData: any) => {
    // Validate press-specific fields
    const errors: Record<string, string> = {};
    
    if (!formData.organization.trim()) errors.organization = 'Organization is required';
    if (!formData.position.trim()) errors.position = 'Position is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (!formData.portfolio.trim()) errors.portfolio = 'Portfolio link is required';
    if (!formData.equipment.trim()) errors.equipment = 'Equipment information is required';
    if (!formData.coverageInterests.trim()) errors.coverageInterests = 'Coverage interests are required';

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
      applicationType="Press"
    >
      <FormInput
        label="Media Organization"
        name="organization"
        type="text"
        value={formData.organization}
        onChange={handleInputChange}
        error={formErrors.organization}
        required
      />

      <FormInput
        label="Position"
        name="position"
        type="text"
        value={formData.position}
        onChange={handleInputChange}
        error={formErrors.position}
        required
      />

      <FormInput
        label="Journalism Experience"
        name="experience"
        as="textarea"
        value={formData.experience}
        onChange={handleInputChange}
        error={formErrors.experience}
        rows={4}
        required
      />

      <FormInput
        label="Portfolio Link"
        name="portfolio"
        type="url"
        value={formData.portfolio}
        onChange={handleInputChange}
        error={formErrors.portfolio}
        required
      />

      <FormInput
        label="Equipment You'll Bring"
        name="equipment"
        as="textarea"
        value={formData.equipment}
        onChange={handleInputChange}
        error={formErrors.equipment}
        rows={3}
        required
      />

      <FormInput
        label="Coverage Interests"
        name="coverageInterests"
        as="textarea"
        value={formData.coverageInterests}
        onChange={handleInputChange}
        error={formErrors.coverageInterests}
        rows={4}
        required
      />
    </BaseApplicationForm>
  );
};