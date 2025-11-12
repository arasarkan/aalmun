import React, { useState } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

export const ChairboardApplicationForm: React.FC = () => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    experience: '',
    committeePreferences: [] as string[],
    motivationLetter: '',
    procedureHandling: '',      
    delegateEngagement: '',    
    crisisUpdateResponse: '',    
    crisisDirective: '',         
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
    const errors: Record<string, string> = {};
    
    if (!formData.experience.trim()) errors.experience = 'Experience is required';
    if (formData.committeePreferences.length === 0) errors.committeePreferences = 'Please select at least one committee preference';

    if (!formData.motivationLetter.trim()) {
      errors.motivationLetter = 'Motivation letter is required';
    } else if (formData.motivationLetter.length < 150) {
      errors.motivationLetter = 'Motivation letter must be at least 150 characters long.';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    return await submitApplication({
      ...baseData,
      ...formData
    });
  };

  const motivationLetterLength = formData.motivationLetter.length;

  return (
    <BaseApplicationForm 
      onSubmit={handleSubmit} 
      applicationType="Chairboard"
    >
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

      {}
      <FormInput
        label="Halfway through the committee chair-board realize that delegates do not properly understand committee procedure. The committee is not moving forward. So what can be done to move the committee forward?"
        name="procedureHandling" 
        as="textarea"
        value={formData.procedureHandling} 
        onChange={handleInputChange}
        rows={3}
      />

      <FormInput
        label="How would you ensure that delegates, especially first-timers, feel comfortable and engaged in committee sessions?"
        name="delegateEngagement" 
        as="textarea"
        value={formData.delegateEngagement} 
        onChange={handleInputChange}
        rows={3}
      />

      <FormInput
        label="How would you respond if an update took longer than expected?"
        name="crisisUpdateResponse"
        as="textarea"
        value={formData.crisisUpdateResponse} 
        onChange={handleInputChange}
        rows={3}
      />

      <FormInput
        label="Write a simple directive: You are Sultan Murad I, ruler of Ottoman Empire. It is the time of the Battle of Maritsa, where 15,000 Ottoman soldiers are preparing to face 50,000 Bulgarian soldiers."
        name="crisisDirective" 
        as="textarea"
        value={formData.crisisDirective}
        onChange={handleInputChange}
        rows={3}
      />
    </BaseApplicationForm>
  );
};