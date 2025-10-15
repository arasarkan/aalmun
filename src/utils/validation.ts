export const validateApplicationForm = (formData: any): Record<string, string> => {
  const errors: Record<string, string> = {};
  
  // First Name validation
  if (!formData.firstName.trim()) {
    errors.firstName = 'First name is required';
  } else if (formData.firstName.trim().length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }
  
  // Last Name validation
  if (!formData.lastName.trim()) {
    errors.lastName = 'Last name is required';
  } else if (formData.lastName.trim().length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }
  
  // Email validation
  if (!formData.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Phone validation
  if (!formData.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{10,15}$/.test(formData.phone.replace(/\D/g, ''))) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // School validation
  if (!formData.school.trim()) {
    errors.school = 'School is required';
  }
  
  // Grade validation
  if (!formData.grade) {
    errors.grade = 'Please select your grade';
  }
  
  // Experience validation
  if (!formData.experience.trim()) {
    errors.experience = 'Please describe your MUN experience';
  } else if (formData.experience.trim().length < 10) {
    errors.experience = 'Please provide more details about your experience';
  }
  
  // Committee Preference validation
  if (formData.committeePreference.length === 0) {
    errors.committeePreference = 'Please select at least one committee preference';
  } else if (formData.committeePreference.length > 3) {
    errors.committeePreference = 'You can select up to 3 committees';
  }
  
  // Position Preference validation
  if (!formData.positionPreference) {
    errors.positionPreference = 'Please select a position preference';
  }
  
  return errors;
};