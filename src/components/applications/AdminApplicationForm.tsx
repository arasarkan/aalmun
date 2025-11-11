import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

export const AdminApplicationForm: React.FC = () => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    organization: '',
    position: '',
    experience: '',
    skills: '',
    availability: '',
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
    // Validate admin-specific fields
    const errors: Record<string, string> = {};
    
    if (!formData.organization.trim()) errors.organization = 'Organization is required';
    if (!formData.position.trim()) errors.position = 'Position is required';
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (!formData.skills.trim()) errors.skills = 'Skills are required';
    if (!formData.availability.trim()) errors.availability = 'Availability is required';

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
      applicationType="Admin"
    >
      <FormInput
        label="Organization"
        name="organization"
        type="text"
        value={formData.organization}
        onChange={handleInputChange}
        error={formErrors.organization}
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
        label="Relevant Experience"
        name="experience"
        as="textarea"
        value={formData.experience}
        onChange={handleInputChange}
        error={formErrors.experience}
        rows={4}
        required
      />

      <FormInput
        label="Relevant Skills"
        name="skills"
        as="textarea"
        value={formData.skills}
        onChange={handleInputChange}
        error={formErrors.skills}
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
    </BaseApplicationForm>
  );
};