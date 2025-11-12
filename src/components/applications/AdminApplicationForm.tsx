import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

export const AdminApplicationForm: React.FC = () => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
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
    
    if (!formData.motivationLetter.trim()) {
      errors.motivationLetter = 'Motivation letter is required';
    } else if (formData.motivationLetter.length < 150) {
      errors.motivationLetter = 'Motivation letter must be at least 150 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false; 
    }

    const finalData = {
      ...baseData,
      ...formData
    };

    return await submitApplication(finalData);
  };

  const motivationLetterLength = formData.motivationLetter.length;

  return (
    <BaseApplicationForm 
      onSubmit={handleSubmit} 
      applicationType="Admin"
    >
      {/* REMOVED the empty curly brace */}
      
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
    </BaseApplicationForm>
  );
};