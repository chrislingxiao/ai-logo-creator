import dbConnect from '@/app/config/MongoDbConfig';
import { NextRequest, NextResponse } from 'next/server';
import User from '@/app/models/User';

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get('email');

    if (!email)
      return NextResponse.json({ error: 'email is missing' }, { status: 400 });

    await dbConnect();

    const user = await User.findOne({ email }, 'logos');
    const logos = user?.logos || [];

    return NextResponse.json({ logos });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
