import { db } from './index';
import {
  collection,
  doc,
  setDoc,
  getDocs,
  getDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  limit,
} from 'firebase/firestore';

export interface FeaturedClassroom {
  classroomData?: unknown;
  id: string;
  topic: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl?: string;
  createdAt: number;
}

export const CLASSROOMS_COLLECTION = 'classrooms';

export async function saveFeaturedClassroom(data: FeaturedClassroom) {
  try {
    const docRef = doc(db, CLASSROOMS_COLLECTION, data.id);
    await setDoc(
      docRef,
      {
        ...data,
        createdAt: data.createdAt || Date.now(),
        _serverTimestamp: serverTimestamp(), // To allow backend sorting if needed
      },
      { merge: true },
    );
    console.log('Saved featured classroom:', data.id);
  } catch (error: any) {
    console.warn('Error saving featured classroom (typically due to permissions):', error.message);
  }
}

export function subscribeToFeaturedClassrooms(callback: (classrooms: FeaturedClassroom[], error?: Error) => void) {
  try {
    const q = query(collection(db, CLASSROOMS_COLLECTION), orderBy('createdAt', 'desc'), limit(50));

    return onSnapshot(
      q,
      (snapshot) => {
        const classrooms: FeaturedClassroom[] = [];
        snapshot.forEach((doc) => {
          const data = doc.data() as FeaturedClassroom;
          classrooms.push(data);
        });
        callback(classrooms);
      },
      (error) => {
        console.warn('Unable to fetch live featured classrooms (typically due to security rules):', error.message);
        callback([], error);
      },
    );
  } catch (error: any) {
    console.warn('Error setting up snapshot for featured classrooms:', error.message);
    callback([], error);
    return () => {};
  }
}

export async function getFeaturedClassrooms(): Promise<FeaturedClassroom[]> {
  try {
    const q = query(collection(db, CLASSROOMS_COLLECTION), orderBy('createdAt', 'desc'), limit(50));
    const snapshot = await getDocs(q);
    const classrooms: FeaturedClassroom[] = [];
    snapshot.forEach((doc) => {
      classrooms.push(doc.data() as FeaturedClassroom);
    });
    return classrooms;
  } catch (error: any) {
    console.warn('Error fetching featured classrooms:', error.message);
    return [];
  }
}

export async function getClassroomById(id: string): Promise<FeaturedClassroom | null> {
  try {
    const docRef = doc(db, CLASSROOMS_COLLECTION, id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      return snapshot.data() as FeaturedClassroom;
    }
    return null;
  } catch (error: any) {
    console.warn('Error fetching classroom by id:', error.message);
    return null;
  }
}
