import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApplication } from '../hooks/useApplication';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ApplicationForm from '../components/ApplicationForm';
import Button from '../components/UI/Button';

const Apply: React.FC = () => {
  const { user } = useAuth();
  const { application, loading } = useApplication();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">Apply to MUN Conference 2023</h1>

          <div className="max-w-md mx-auto">
            {showLogin ? (
              <LoginForm onToggleForm={() => setShowLogin(false)} />
            ) : (
              <RegisterForm onToggleForm={() => setShowLogin(true)} />
            )}
          </div>
        </div>
      </div>
    );
  }

  if (application) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center">Application Submitted</h1>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
              <p className="font-medium">Thank you for your application!</p>
              <p>Your application has been successfully submitted. You can view your application details in your dashboard.</p>
            </div>
            <div className="text-center">
              <Button variant="primary" className="mr-4">
                <Link to="/dashboard">View Dashboard</Link>
              </Button>
              <Button variant="outline">
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Apply to MUN Conference 2023</h1>
        <ApplicationForm />
      </div>
    </div>
  );
};

export default Apply