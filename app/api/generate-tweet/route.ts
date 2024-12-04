import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  baseURL: process.env.NEXT_PUBLIC_OPENAI_API_BASE,
});

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 0.7,
    });

    const tweet = completion.choices[0].message.content?.trim() || '';
    return NextResponse.json({ tweet });
  } catch (error) {
    console.error('OpenAI API error:', error);
    return NextResponse.json(
      { message: 'Error generating tweet' },
      { status: 500 }
    );
  }
} 