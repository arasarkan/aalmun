import React, { useState } from 'react';
import { ApplicationTypeSelector } from './ApplicationTypeSelector';
import { DelegateApplicationForm } from './DelegateApplicationForm';
import { DelegationApplicationForm } from './DelegationApplicationForm';
import { AdminApplicationForm } from './AdminApplicationForm';
import { PressApplicationForm } from './PressApplicationForm';
import { ChairboardApplicationForm } from './ChairboardApplicationForm';
import Button from '../UI/Button';

export const ApplicationContainer: React.FC = () => {
  const [applicationType, setApplicationType] = useState<string | null>(null);

  const handleSelectApplicationType = (type: string) => {
    setApplicationType(type);
  };

  const handleBackToSelection = () => {
    setApplicationType(null);
  };

  const renderApplicationForm = () => {
    switch (applicationType) {
      case 'delegate':
        return <DelegateApplicationForm />;
      case 'delegation':
        return <DelegationApplicationForm />;
      case 'admin':
        return <AdminApplicationForm />;
      case 'press':
        return <PressApplicationForm />;
      case 'chairboard':
        return <ChairboardApplicationForm />;
      default:
        return null;
    }
  };

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
        <ApplicationTypeSelector onSelect={handleSelectApplicationType} />
      )}
    </div>
  );
};