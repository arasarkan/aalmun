import { useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from './useAuth';
import { Application } from '../types';

export const useApplication = () => {
  const { user } = useAuth();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplication = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, 'applications', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setApplication(docSnap.data() as Application);
        }
      } catch (err) {
        setError('Failed to fetch application');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [user]);

  const submitApplication = async (data: Omit<Application, 'uid' | 'submittedAt'>) => {
    if (!user) {
      setError('You must be logged in to submit an application');
      return false;
    }

    try {
      const docRef = doc(db, 'applications', user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setError('You have already submitted an application');
        return false;
      }

      const applicationData: Application = {
        ...data,
        uid: user.uid,
        submittedAt: new Date(),
      };

      await setDoc(docRef, applicationData);
      setApplication(applicationData);
      return true;
    } catch (err) {
      setError('Failed to submit application');
      console.error(err);
      return false;
    }
  };

  return { application, loading, error, submitApplication };
};