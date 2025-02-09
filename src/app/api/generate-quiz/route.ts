import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { topic } = await req.json();

    const prompt = `Create 10 multiple choice questions about ${topic}. Return the response in the following JSON format:
    {
      "questions": [
        {
          "question": "Question text here",
          "options": ["option1", "option2", "option3", "option4"],
          "correctAnswer": "correct option here"
        }
      ]
    }`;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
    });

    const result = completion.choices[0].message.content;
    return NextResponse.json(JSON.parse(result));
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
