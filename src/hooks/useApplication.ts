// src/hooks/useApplication.ts
import { useState, useEffect } from 'react';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './useAuth'; // Import the updated useAuth
import { Application } from '../types';

export const useApplication = () => {
  const { user, loading } = useAuth(); // Use loading from useAuth instead of authLoading
  const [applications, setApplications] = useState<{ [key: string]: Application }>({});
  const [isAppLoading, setAppLoading] = useState(true); // Separate loading state for app operations
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Don't fetch applications if auth is still loading
    if (loading) {
      console.log('Auth still loading, skipping fetch');
      setAppLoading(false);
      return;
    }

    const fetchApplications = async () => {
      // Make sure user is authenticated before proceeding
      if (!user || !user.uid) {
        console.log('No user authenticated, skipping fetch');
        setAppLoading(false);
        return;
      }

      console.log('Fetching applications for user:', user.uid);

      try {
        // Query all applications for this user
        const q = query(collection(db, 'applications'), where('uid', '==', user.uid));
        const querySnapshot = await getDocs(q);
        
        console.log('Found applications:', querySnapshot.size);
        
        const userApplications: { [key: string]: Application } = {};
        querySnapshot.forEach((doc) => {
          const appData = doc.data() as Application;
          userApplications[appData.type] = appData;
        });
        
        setApplications(userApplications);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError('Failed to fetch applications: ' + (err as Error).message);
      } finally {
        setAppLoading(false);
      }
    };

    fetchApplications();
  }, [user, loading]); // Use loading from useAuth

  const submitApplication = async (data: Omit<Application, 'uid' | 'submittedAt'>) => {
    if (!user || !user.uid) {
      setError('You must be logged in to submit an application');
      return false;
    }

    try {
      // Check if user already submitted this type of application
      if (applications[data.type]) {
        setError(`You have already submitted a ${data.type} application`);
        return false;
      }

      // Ensure we have a valid email
      const userEmail = user.email || '';
      if (!userEmail) {
        setError('Your account does not have a valid email address');
        return false;
      }

      const applicationData: Application = {
        ...data,
        uid: user.uid,
        email: userEmail,
        submittedAt: new Date(),
      };

      console.log('Submitting application:', applicationData);

      // Create a new document with a unique ID
      const newDocRef = doc(collection(db, 'applications'));
      await setDoc(newDocRef, applicationData);
      
      console.log('Application submitted successfully');
      
      // Update local state
      setApplications(prev => ({
        ...prev,
        [data.type]: applicationData
      }));
      
      return true;
    } catch (err) {
      console.error('Error submitting application:', err);
      setError('Failed to submit application: ' + (err as Error).message);
      return false;
    }
  };

  const hasAppliedForType = (type: string) => {
    return !!applications[type];
  };

  return { 
    applications, 
    loading: isAppLoading, // Use separate loading state for app operations
    error, 
    submitApplication,
    hasAppliedForType
  };
};