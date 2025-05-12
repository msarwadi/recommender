// api/recommendation.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  const { name, industry, goals, location } = req.body;

  const prompt = `
    A company named ${name} in the ${industry} industry based in ${location} wants to support nonprofits.
    Their goals or causes are: ${goals}.
    Based on this, suggest one nonprofit category and a specific nonprofit they should consider, with reasoning.
  `;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const recommendation = completion.choices[0].message.content;
    res.status(200).json({ recommendation });
  } catch (err) {
    console.error('OpenAI API Error:', err);
    res.status(500).json({ error: 'Failed to generate recommendation' });
  }
}
