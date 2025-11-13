import React, { useState } from 'react';
import { ApplicationTypeSelector } from './ApplicationTypeSelector';
import { DelegateApplicationForm } from './DelegateApplicationForm';
import { DelegationApplicationForm } from './DelegationApplicationForm';
import { AdminApplicationForm } from './AdminApplicationForm';
import { PressApplicationForm } from './PressApplicationForm';
import { ChairboardApplicationForm } from './ChairboardApplicationForm';
import Button from '../UI/Button';
import { useApplication } from '../../hooks/useApplication';

export const ApplicationContainer: React.FC = () => {
  const [applicationType, setApplicationType] = useState<string | null>(null);
  const { hasAppliedForType, loading } = useApplication();

  const handleSelectApplicationType = (type: string) => {
    if (hasAppliedForType(type)) {
      alert(`You have already submitted a ${type} application. You can only submit one application per type.`);
      return;
    }
    setApplicationType(type);
  };

  const handleBackToSelection = () => {
    setApplicationType(null);
  };

  const renderApplicationForm = () => {
    switch (applicationType) {
      case 'delegate':
        return <DelegateApplicationForm applicationType={applicationType} />;
      case 'delegation':
        return <DelegationApplicationForm applicationType={applicationType} />;
      case 'admin':
        return <AdminApplicationForm applicationType={applicationType} />;
      case 'press':
        return <PressApplicationForm applicationType={applicationType} />;
      case 'chairboard':
        return <ChairboardApplicationForm applicationType={applicationType} />;
      default:
        return null;
    }
  };

  if (loading) {
    return <div className="py-8 px-4 text-center">Loading...</div>;
  }

  return (
    <div className="py-8 px-4">
      {applicationType ? (
        <div>
          <div className="max-w-2xl mx-auto mb-4">
            <Button variant="secondary" onClick={handleBackToSelection}>
              ← Back to Application Types
            </Button>
          </div>
          {renderApplicationForm()}
        </div>
      ) : (
        <ApplicationTypeSelector onSelect={handleSelectApplicationType} hasAppliedForType={hasAppliedForType} />
      )}
    </div>
  );
};

export default ApplicationContainer; 