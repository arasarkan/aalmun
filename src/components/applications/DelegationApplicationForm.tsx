import React, { useState, useEffect } from 'react';
import { useApplication } from '../../hooks/useApplication';
import { BaseApplicationForm } from './BaseApplicationForm';
import FormInput from '../UI/FormInput';

interface DelegationApplicationFormProps {
  applicationType: string;
}

export const DelegationApplicationForm: React.FC<DelegationApplicationFormProps> = ({ applicationType }) => {
  const { submitApplication } = useApplication();
  
  const [formData, setFormData] = useState({
    institution: '',
    delegationSize: '',
    headDelegateName: '',
    headDelegateEmail: '',
    headDelegatePhone: '',
    committeePreferences: [] as string[],
    specialRequests: '',
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!formData.headDelegateEmail) {
      // We'll get the user's email from the baseData in handleSubmit
      // No need to import useAuth here since BaseApplicationForm handles it
    }
  }, [formData.headDelegateEmail]);

  const committeeOptions = [
    'Council of the European Union (CEU)',
    'World Organization for Animal Health (WOAH)',
    'Disarmament and International Security Committee (DISEC)',
    'Müşterek Kriz Komitesi (MKK)',
    'Crisis Committee (CC)',
    'International Olympic Committee (IOC)',
    'United States Customs Court (USCC)',
    'International Maritime Organization (IMO)',
    'World Health Organization (WHO)'
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
    
    if (!formData.institution.trim()) errors.institution = 'Institution is required';
    if (!formData.delegationSize) errors.delegationSize = 'Delegation size is required';
    if (!formData.headDelegateName.trim()) errors.headDelegateName = 'Head delegate name is required';
    if (!formData.headDelegateEmail.trim()) errors.headDelegateEmail = 'Head delegate email is required';
    if (!formData.headDelegatePhone.trim()) errors.headDelegatePhone = 'Head delegate phone is required';
    
    if (formData.committeePreferences.length === 0) errors.committeePreferences = 'Please select at least one committee preference';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return false;
    }

    const applicationData = {
      ...baseData,
      ...formData,
      headDelegateEmail: formData.headDelegateEmail || baseData.email,
      type: applicationType
    };

    return await submitApplication(applicationData);
  };

  return (
    <BaseApplicationForm 
      onSubmit={handleSubmit} 
      applicationType={applicationType}
    >
      <FormInput
        label="Institution/School Name"
        name="institution"
        type="text"
        value={formData.institution}
        onChange={handleInputChange}
        error={formErrors.institution}
        required
      />

      <FormInput
        label="Delegation Size"
        name="delegationSize"
        as="select"
        value={formData.delegationSize}
        onChange={handleInputChange}
        error={formErrors.delegationSize}
        options={['15-30', '30-45', '46-60', '60+']}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          label="Head Delegate Name"
          name="headDelegateName"
          type="text"
          value={formData.headDelegateName}
          onChange={handleInputChange}
          error={formErrors.headDelegateName}
          required
        />

        <FormInput
          label="Head Delegate Email"
          name="headDelegateEmail"
          type="email"
          value={formData.headDelegateEmail}
          onChange={handleInputChange}
          error={formErrors.headDelegateEmail}
          required
          helperText="If you are the head delegate, this should match your authenticated email"
        />
      </div>

      <FormInput
        label="Head Delegate Phone"
        name="headDelegatePhone"
        type="tel"
        value={formData.headDelegatePhone}
        onChange={handleInputChange}
        error={formErrors.headDelegatePhone}
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
        label="Special Requests"
        name="specialRequests"
        as="textarea"
        value={formData.specialRequests}
        onChange={handleInputChange}
        error={formErrors.specialRequests}
        rows={3}
      />
    </BaseApplicationForm>
  );
};