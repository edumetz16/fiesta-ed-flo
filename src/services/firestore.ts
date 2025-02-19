import {initializeApp} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { cert, getApp, getApps } from "firebase-admin/app";

export const saveInviteeResponse = async ({code, quantity, assists}: {code: string, quantity: number, assists: boolean}) =>{
  const app = getFirebaseApp();
  const db = getFirestore(app);
  await db.collection('invitees').doc(code).set({code, quantity, assists}, {merge: true});
}

export const saveConfigValue = async (key: string, value: unknown) =>{ 
  const app = getFirebaseApp();
  const db = getFirestore(app);
  await db.collection('config').doc(key).set({key, value}, {merge: true});
}

export const getConfigValue = async (key: string): Promise<unknown> => {
  const app = getFirebaseApp();
  const db = getFirestore(app);
  const doc = await db.collection('config').doc(key).get();
  return doc.data();
}

const getFirebaseApp = () =>{
  if(getApps().length > 0) return getApp();
  else return initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_CREDENTIALS!)),
  })
}