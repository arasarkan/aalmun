import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useApplication } from '../hooks/useApplication';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { applications, loading } = useApplication();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatDate = (date: any) => {
    // Handle both Firestore Timestamp and regular Date
    if (date && date.seconds) {
      return new Date(date.seconds * 1000).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } else if (date instanceof Date) {
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    }
    return 'Unknown date';
  };

  const getApplicationTypeDisplayName = (type: string) => {
    switch (type) {
      case 'delegate':
        return 'Delegate Application';
      case 'delegation':
        return 'Delegation Application';
      case 'admin':
        return 'Admin Application';
      case 'press':
        return 'Press Application';
      case 'chairboard':
        return 'Chairboard Application';
      default:
        return 'Application';
    }
  };

  const hasApplications = applications && Object.keys(applications).length > 0;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome, {user?.displayName || 'User'}! Your Dashboard</h1>
          
          {hasApplications ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-green-50 p-6 rounded-lg mb-8 border border-green-200">
                <h2 className="text-2xl font-semibold mb-4 text-green-800">Application Confirmation</h2>
                <p className="mb-2 text-green-700">
                  <strong>Email:</strong> {user?.email}
                </p>
                <p className="text-green-700">
                  We've received your application(s) and they are currently under review. You will be notified via email once a decision has been made.
                </p>
              </div>
              
              <h2 className="text-2xl font-semibold mb-6">Your Applications</h2>
              
              {Object.entries(applications).map(([type, application]) => (
                <div key={type} className="bg-white p-8 rounded-lg shadow-md mb-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold">{getApplicationTypeDisplayName(type)}</h3>
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                      Submitted: {formatDate(application.submittedAt)}
                    </span>
                  </div>
                  
                  {type === 'delegate' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium mb-2">Personal Information</h4>
                        <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
                        <p><strong>Email:</strong> {application.email}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Academic Information</h4>
                        <p><strong>School:</strong> {application.schoolName}</p>
                        <p><strong>Grade:</strong> {application.grade}</p>
                      </div>
                      <div className="mt-4 md:col-span-2">
                        <h4 className="text-lg font-medium mb-2">Experience</h4>
                        <p>{application.previousExperience}</p>
                      </div>
                      <div className="mt-4 md:col-span-2">
                        <h4 className="text-lg font-medium mb-2">Committee Preferences</h4>
                        <ul className="list-disc list-inside">
                          {application.committeePreference?.map((committee: string, index: number) => (
                            <li key={index}>{committee}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {type === 'delegation' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-medium mb-2">Delegation Information</h4>
                        <p><strong>Institution:</strong> {application.institution}</p>
                        <p><strong>Delegation Size:</strong> {application.delegationSize}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Head Delegate Information</h4>
                        <p><strong>Name:</strong> {application.headDelegateName}</p>
                        <p><strong>Email:</strong> {application.headDelegateEmail}</p>
                        <p><strong>Phone:</strong> {application.headDelegatePhone}</p>
                      </div>
                      <div className="mt-4 md:col-span-2">
                        <h4 className="text-lg font-medium mb-2">Committee Preferences</h4>
                        <ul className="list-disc list-inside">
                          {application.committeePreferences?.map((committee: string, index: number) => (
                            <li key={index}>{committee}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {type === 'admin' && (
                    <div>
                      <h4 className="text-lg font-medium mb-2">Motivation Letter</h4>
                      <p className="whitespace-pre-wrap">{application.motivationLetter}</p>
                    </div>
                  )}
                  
                  {type === 'press' && (
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <h4 className="text-lg font-medium mb-2">Motivation Letter</h4>
                        <p className="whitespace-pre-wrap">{application.motivationLetter}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Equipment</h4>
                        <p>{application.equipment}</p>
                      </div>
                    </div>
                  )}
                  
                  {type === 'chairboard' && (
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <h4 className="text-lg font-medium mb-2">Experience</h4>
                        <p>{application.experience}</p>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Committee Preferences</h4>
                        <ul className="list-disc list-inside">
                          {application.committeePreferences?.map((committee: string, index: number) => (
                            <li key={index}>{committee}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">Motivation Letter</h4>
                        <p className="whitespace-pre-wrap">{application.motivationLetter}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <p className="mb-4">
                  Your application(s) are currently under review. You will be notified via email once a decision has been made. 
                  This typically takes 2-3 weeks after the application deadline.
                </p>
                <p>
                  If you have any questions about your application, please contact us at info@munconference.com.
                </p>
              </div>
              
              <div className="mt-6 text-center">
                <Button variant="secondary">
                  <a href="/apply">Submit Another Application</a>
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-semibold mb-4">No Applications Found</h2>
              <p className="mb-6">
                You haven't submitted any applications yet. Click the button below to start your application.
              </p>
              <Button variant="primary">
                <a href="/apply">Apply Now</a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;