import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { useApplication } from '../hooks/useApplication';
import ProtectedRoute from '../components/auth/ProtectedRoute';
import Button from '../components/UI/Button';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { application, loading } = useApplication();

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

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Welcome, {user?.displayName || 'User'}! Your Dashboard</h1>
          
          {application ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-white p-8 rounded-lg shadow-md mb-8">
                <h2 className="text-2xl font-semibold mb-6">Application Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Personal Information</h3>
                    <p><strong>Name:</strong> {application.firstName} {application.lastName}</p>
                    <p><strong>Email:</strong> {application.email}</p>
                    <p><strong>Phone:</strong> {application.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Academic Information</h3>
                    <p><strong>School:</strong> {application.school}</p>
                    <p><strong>Grade:</strong> {application.grade}</p>
                    <p><strong>Submitted:</strong> {formatDate(application.submittedAt)}</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Experience</h3>
                  <p>{application.experience}</p>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Committee Preferences</h3>
                  <ul className="list-disc list-inside">
                    {application.committeePreference.map((committee, index) => (
                      <li key={index}>{committee}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Position Preference</h3>
                  <p>{application.positionPreference}</p>
                </div>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                <p className="mb-4">
                  Your application is currently under review. You will be notified via email once a decision has been made. 
                  This typically takes 2-3 weeks after the application deadline.
                </p>
                <p>
                  If you have any questions about your application, please contact us at info@munconference.com.
                </p>
              </div>
            </div>
          ) : (
            <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
              <h2 className="text-2xl font-semibold mb-4">No Application Found</h2>
              <p className="mb-6">
                You haven't submitted an application yet. Click the button below to start your application.
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