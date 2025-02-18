import {initializeApp} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { cert, getApp, getApps } from "firebase-admin/app";

export const saveInviteeResponse = async ({code, quantity, assists}: {code: string, quantity: number, assists: boolean}) =>{
  const app = getFirebaseApp();
  const db = getFirestore(app);
  console.log(db);
  console.log('saving invitee response', code, quantity, assists);
  await db.collection('invitees').doc(code).set({code, quantity, assists}, {merge: true});
}

const getFirebaseApp = () =>{
  console.log(process.env.FIREBASE_CREDENTIALS);
  if(getApps().length > 0) return getApp();
  else return initializeApp({
    credential: cert(JSON.parse(process.env.FIREBASE_CREDENTIALS!)),
  })
}