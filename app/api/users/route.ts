import dbConnect from '@/app/config/MongoDbConfig';
import { IRequestBody } from '@/app/_models/User';
import { NextResponse } from 'next/server';
import User from '@/app/models/User';

export async function POST(req: Request) {
  await dbConnect();

  const { userEmail, userName }: IRequestBody = await req.json();

  try {
    const user = await User.findOne({ email: userEmail });

    if (user) {
      // User already exists
      return NextResponse.json({
        name: user.name,
        email: user.email,
        credits: user.credits,
      });
    }
    // Create new user
    const newUser = await User.create({
      email: userEmail,
      name: userName,
      credits: 10, // Default credits
    });

    return NextResponse.json({
      name: newUser.name,
      email: newUser.email,
      credits: newUser.credits,
    });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
