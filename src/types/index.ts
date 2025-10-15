export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Application {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  experience: string;
  committeePreference: string[];
  positionPreference: string;
  submittedAt: any; // Changed from Date to any to handle Firestore Timestamp
}

export interface Committee {
  id: string;
  name: string;
  topic: string;
  description: string;
  positions: string[];
}