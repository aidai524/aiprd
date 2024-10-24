import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_API_BASE,
});

export async function POST(req: NextRequest) {
  const { projectOverview, coreFunctions, documentation, fileStructure } = await req.json();

  const prompt = `项目概述: ${projectOverview}\n核心功能: ${coreFunctions}\n文档: ${documentation}\n当前文件结构: ${fileStructure}`;

  const stream = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "user", content: `${prompt} Above is the project i want to build, how should I structure my project files? (try to create as few files as possible) Help me adding details to the original PRD that give clear alignment to developers who willimplement the project; dont create actual code, just the PRD.including file structure into the doc,including all documentations provided (with both example code & responses, those are important context)` }
    ],
    temperature: 0.7,
    max_tokens: 8000,
    stream: true,
  });

  return new Response(
    new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || '';
          controller.enqueue(content);
        }
        controller.close();
      },
    }),
    {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    }
  );
}
