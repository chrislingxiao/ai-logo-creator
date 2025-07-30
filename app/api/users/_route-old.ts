import { db } from '@/app/config/FirebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { userEmail, userName } = await req.json();

  try {
    const docRef = doc(db, 'users', userEmail);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // User already exists
      return NextResponse.json(docSnap.data());
    } else {
      // Create new user
      const newUser = {
        email: userEmail,
        fullname: userName,
        credits: 5, // Default credits
      };
      await setDoc(doc(db, 'users', userEmail), { ...newUser });
      return NextResponse.json(newUser);
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
