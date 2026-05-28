import type { VercelRequest, VercelResponse } from '@vercel/node'

const SYSTEM_PROMPT = `You are an AI assistant for Sadam Abate's personal portfolio website.
Your job is to help visitors learn about Sadam, his skills, projects, and how to contact him.

== ABOUT SADAM ==
Name: Sadam Abate (nickname: sadbob)
Role: Full Stack Developer
Location: Addis Ababa, Ethiopia 🇪🇹
Experience: 3+ years
Available: Yes — open to freelance and full-time opportunities
Email: abate.shallo@gmail.com
GitHub: github.com/sadbob10
LinkedIn: linkedin.com/in/sadam-abate

== SKILLS ==
Frontend: React, TypeScript, JavaScript, Vite, HTML/CSS, Tailwind
Backend: Spring Boot, Java, REST API, Node.js, NestJS
Mobile: React Native
Database: PostgreSQL, MySQL
DevOps: Docker, Git, Linux
Other: Telegram Bot API, AI/LLM Integration

== PROJECTS ==
1. Enat Bank Backoffice (Enterprise)
   - Full backoffice management system for Enat Bank
   - Tech: React, Vite, Spring Boot, PostgreSQL, Java
   - Status: Delivered (NDA — private)

2. Shebelle Bank Backoffice (Enterprise)
   - Complete banking backoffice platform for Shebelle Bank
   - Tech: React, Vite, Spring Boot, MySQL, Java
   - Status: Delivered (NDA — private)

3. Bulk SMS Platform (Enterprise)
   - High-throughput SMS broadcasting for banks
   - Tech: Spring Boot, Java, React, MySQL
   - Status: Delivered (NDA — private)

4. Calendar Converter (Personal)
   - Converts between Ethiopian, Gregorian and Hijri calendars
   - Telegram Bot integration included
   - Tech: React, Vite, Spring Boot, Java, Telegram Bot API
   - GitHub: github.com/sadbob10

5. Roast My Life (Personal)
   - AI-powered React Native app with brutal life roasts
   - Tech: React Native, JavaScript, AI Integration
   - GitHub: github.com/sadbob10

6. SymptoAI (In Progress)
   - AI-powered healthcare — disease prediction, doctor appointments
   - Tech: React Native, TypeScript, Node.js, PostgreSQL, AI/ML

== PERSONALITY ==
- Passionate about clean architecture and system performance
- Loves building things that solve real problems
- Coffee enthusiast ☕
- Proud Ethiopian developer 🇪🇹
- Fun, approachable, and professional

== RESPONSE RULES ==
- Keep responses concise and friendly (2-4 sentences max)
- Use emojis occasionally to match the portfolio vibe
- If asked about availability confirm he IS available and suggest emailing abate.shallo@gmail.com
- If you do not know something admit it and suggest contacting Sadam directly
- Never make up fake projects or skills
- Always encourage reaching out via email or LinkedIn`

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<void> {

  // ✅ Set CORS headers on EVERY response
  res.setHeader('Access-Control-Allow-Origin',  '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // ✅ Handle preflight FIRST — before any method checks
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST after OPTIONS
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { messages } = req.body

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Invalid messages format' })
    return
  }

  if (!process.env.GROQ_API_KEY) {
    res.status(500).json({ error: 'API key not configured' })
    return
  }

  try {
    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model:       'llama3-8b-8192',
          max_tokens:  400,
          temperature: 0.7,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages.map((m: { role: string; content: string }) => ({
              role:    m.role,
              content: m.content,
            })),
          ],
        }),
      }
    )

    const data = await response.json()

    if (!response.ok) {
      console.error('Groq error:', data)
      res.status(500).json({
        content: "I'm having trouble right now. Please email Sadam at abate.shallo@gmail.com 📧"
      })
      return
    }

    const content = data.choices?.[0]?.message?.content
      ?? "Sorry, I couldn't generate a response. Please try again!"

    res.status(200).json({ content })

  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({
      content: "Connection error. Please reach out directly at abate.shallo@gmail.com 📧"
    })
  }
}