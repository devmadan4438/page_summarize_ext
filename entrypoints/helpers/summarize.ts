import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
});

export async function summarizeText(content: string) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: 'Summarize webpage content clearly',
      },
      {
        role: 'user',
        content,
      },
    ],
  });

  return response.choices[0].message.content;
}