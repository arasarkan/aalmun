// types/index.ts
export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
}

export interface Application {
  uid: string;
  type: string;
  email: string;
  submittedAt: any; // Changed from Date to any to handle Firestore Timestamp
  
  // Common fields that might be shared
  motivationLetter?: string;
  committeePreference?: string[]; // Used by delegate
  committeePreferences?: string[]; // Used by delegation and chairboard
  
  // Personal information
  firstName?: string;
  lastName?: string;
  phone?: string;
  idNumber?: string;
  specialConditions?: string;
  
  // Delegate specific fields
  school?: string;
  schoolName?: string; // Alternative name used in form
  grade?: string;
  experience?: string;
  previousExperience?: string; // Alternative name used in form
  positionPreference?: string;
  
  // Delegation specific fields
  institution?: string;
  delegationSize?: string;
  headDelegateName?: string;
  headDelegateEmail?: string;
  headDelegatePhone?: string;
  specialRequests?: string;
  
  // Press specific fields
  equipment?: string;
  
  // Chairboard specific fields
  procedureHandling?: string;
  delegateEngagement?: string;
  crisisUpdateResponse?: string;
  crisisDirective?: string;
}

export interface Committee {
  id: string;
  name: string;
  topic: string;
  description: string;
  positions: string[];
}