import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

interface PressApplicationFormProps {
  applicationType: string;
}

export const PressApplicationForm: React.FC<PressApplicationFormProps> = ({ applicationType }) => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    equipment: '',
    motivationLetter: '',
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
    const errors: Record<string, string> = {};
    
    if (!formData.equipment.trim()) errors.equipment = 'Equipment information is required';

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
      <div className="mb-2 flex justify-end">
        <p className={`text-sm ${motivationLetterLength < 150 ? 'text-red-500' : 'text-green-600'}`}>
          Characters: {motivationLetterLength} / 150 (minimum)
        </p>
      </div>

      <FormInput
        label="Motivation Letter (minimum 150 characters)"
        name="motivationLetter"
        as="textarea"
        value={formData.motivationLetter}
        onChange={handleInputChange}
        error={formErrors.motivationLetter}
        rows={6}
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
        placeholder="e.g., DSLR camera, audio recorder, laptop, etc."
        required
      />
    </BaseApplicationForm>
  );
};