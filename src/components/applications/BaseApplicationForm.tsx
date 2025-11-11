import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { validateApplicationForm } from '../../utils/validation';
import Button from '../UI/Button';
import FormInput from '../UI/FormInput';

interface BaseFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface BaseApplicationFormProps {
  onSubmit: (data: any) => Promise<boolean>;
  applicationType: string;
  children: React.ReactNode;
  additionalFields?: React.ReactNode;
}

export const BaseApplicationForm: React.FC<BaseApplicationFormProps> = ({
  onSubmit,
  applicationType,
  children,
  additionalFields
}) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<BaseFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic validation
    const errors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setLoading(false);
      return;
    }

    // Submit application with type
    const applicationData = {
      ...formData,
      applicationType
    };

    const success = await onSubmit(applicationData);

    if (success) {
      setSubmitSuccess(true);
    } else {
      setError('Failed to submit application. Please try again.');
    }
    
    setLoading(false);
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
            Thank you for your {applicationType} application. Your application has been received and is currently under review.
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
      <h2 className="text-2xl font-semibold mb-6">{applicationType} Application Form</h2>

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

        {children}
        {additionalFields}

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