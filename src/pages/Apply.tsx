import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useApplication } from '../hooks/useApplication';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ApplicationForm from '../components/ApplicationForm';
import Button from '../components/UI/Button';

interface LoadingViewProps {}
const LoadingView: React.FC<LoadingViewProps> = () => (
  <div className="flex justify-center items-center h-screen" aria-live="polite">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" role="status" aria-label="Loading page content">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

interface ErrorViewProps {
  error: string;
}
const ErrorView: React.FC<ErrorViewProps> = ({ error }) => (
  <div className="min-h-screen bg-gray-50 flex justify-center items-center">
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
        <p className="font-medium">Error</p>
        <p>{error || 'An unexpected error occurred. Please try again later.'}</p>
      </div>
      <Button variant="primary" className="mt-4 w-full" onClick={() => window.location.reload()}>
        Try Again
      </Button>
    </div>
  </div>
);

interface UnauthenticatedViewProps {
  showLogin: boolean;
  onToggleForm: () => void;
}
const UnauthenticatedView: React.FC<UnauthenticatedViewProps> = ({ showLogin, onToggleForm }) => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <header>
        <h1 className="text-4xl font-bold mb-8 text-center">Apply to AALMUN'26</h1>
      </header>
      <main>
        <div className="max-w-md mx-auto">
          {showLogin ? (
            <LoginForm onToggleForm={onToggleForm} />
          ) : (
            <RegisterForm onToggleForm={onToggleForm} />
          )}
        </div>
      </main>
    </div>
  </div>
);

const ApplicationSubmittedView: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <main>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">Application Submitted</h1>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6" role="status">
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
      </main>
    </div>
  </div>
);

const NoApplicationView: React.FC = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="container mx-auto px-4">
      <header>
        <h1 className="text-4xl font-bold mb-8 text-center">Apply to AALMUN'26</h1>
      </header>
      <main>
        <ApplicationForm />
      </main>
    </div>
  </div>
);


// --- Main Apply Component ---

interface ApplyProps {}

const Apply: React.FC<ApplyProps> = () => {
  const { user } = useAuth();
  const { application, loading, error } = useApplication();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return <LoadingView />;
  }

  if (error) {
    return <ErrorView error={error} />;
  }

  if (!user) {
    return (
      <UnauthenticatedView 
        showLogin={showLogin} 
        onToggleForm={() => setShowLogin(!showLogin)} 
      />
    );
  }

  if (application) {
    return <ApplicationSubmittedView />;
  }

  return <NoApplicationView />;
};

export default Apply;