import { useState, useEffect } from 'react';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './useAuth';
import { Application } from '../types';

export const useApplication = () => {
  const { user, loading: authLoading } = useAuth();
  const [applications, setApplications] = useState<{ [key: string]: Application }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) {
      console.log('Auth still loading, skipping fetch');
      setLoading(false);
      return;
    }

    const fetchApplications = async () => {

      if (!user || !user.uid) {
        console.log('No user authenticated, skipping fetch');
        setLoading(false);
        return;
      }

      console.log('Fetching applications for user:', user.uid);

      try {
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
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, authLoading]);

  const submitApplication = async (data: Omit<Application, 'uid' | 'submittedAt'>) => {
    if (!user || !user.uid) {
      setError('You must be logged in to submit an application');
      return false;
    }

    try {
      if (applications[data.type]) {
        setError(`You have already submitted a ${data.type} application`);
        return false;
      }

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

      const newDocRef = doc(collection(db, 'applications'));
      await setDoc(newDocRef, applicationData);
      
      console.log('Application submitted successfully');
      
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
    loading, 
    error, 
    submitApplication,
    hasAppliedForType
  };
};