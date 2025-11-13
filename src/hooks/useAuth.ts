import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../services/firebase';

export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || '',
          photoURL: firebaseUser.photoURL || '',
        });
        console.log('User authenticated:', firebaseUser.uid);
      } else {
        setUser(null);
        console.log('User not authenticated');
      }
      setLoading(false);
    });

    const timeoutId = setTimeout(() => {
      if (loading) {
        console.log('Auth loading timeout, setting to false');
        setLoading(false);
      }
    }, 5000); 

    return () => {
      unsubscribe();
      clearTimeout(timeoutId);
    };
  }, []);

  return { user, loading };
};