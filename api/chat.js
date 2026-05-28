const SYSTEM_PROMPT = `You are an AI assistant for Sadam Abate's personal portfolio website.
Your job is to help visitors learn about Sadam, his skills, projects, and how to contact him.

== ABOUT SADAM ==
Name: Sadam Abate (nickname: sadbob)
Role: Full Stack Developer
Location: Addis Ababa, Ethiopia
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
1. Enat Bank Backoffice — Enterprise banking system (NDA)
2. Shebelle Bank Backoffice — Banking platform (NDA)
3. Bulk SMS Platform — Bank SMS system (NDA)
4. Calendar Converter — Ethiopian/Gregorian/Hijri converter + Telegram bot
5. Roast My Life — AI-powered React Native roast app
6. SymptoAI — AI healthcare app in progress

== RESPONSE RULES ==
- Keep responses short and friendly (2-4 sentences)
- Use emojis occasionally
- Confirm he IS available — suggest emailing abate.shallo@gmail.com
- Never make up information`

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }

  const { messages } = req.body ?? {}

  if (!messages || !Array.isArray(messages)) {
    res.status(400).json({ error: 'Messages required' })
    return
  }

  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    res.status(500).json({ content: 'API not configured.' })
    return
  }

  try {
    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192',
          max_tokens: 400,
          temperature: 0.7,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...messages,
          ],
        }),
      }
    )

    const data = await groqRes.json()
    const content = data.choices?.[0]?.message?.content
      ?? 'Sorry, could not generate a response.'

    res.status(200).json({ content })

  } catch (err) {
    console.error(err)
    res.status(500).json({
      content: "Connection error. Please email Sadam at abate.shallo@gmail.com"
    })
  }
}