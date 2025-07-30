import { AIDesignIdea } from '@/app/config/AIModel';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  try {
    const res = await AIDesignIdea.sendMessage({ message: prompt });
    return NextResponse.json(JSON.parse(res.text || '{}'));
  } catch (error) {
    return NextResponse.json({ error });
  }
}
