import dbConnect from '@/app/config/MongoDbConfig';
import mongoose from 'mongoose';
import { IUser, IRequestBody, ILogo } from '@/app/_models/User';
import { NextResponse } from 'next/server';

const LogoSchema = new mongoose.Schema<ILogo>({
  image: { type: String, required: true },
  title: { type: String, required: true },
  desc: { type: String },
  id: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credits: { type: Number, default: 10 },
  logos: [LogoSchema],
});

export const User =
  mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

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
