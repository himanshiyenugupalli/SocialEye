import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { getSupabaseAdmin } from '@/lib/supabase'

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { title, description, category, location, image_url, user_id } = body

    if (!title || !description || !category) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 1. Analyze with Gemini AI
    let severity = 'PENDING'
    let ai_notes = ''

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      
      const prompt = `
        You are a city infrastructure and civic issue analyzer.
        Analyze the following issue report submitted by a citizen:
        Title: "${title}"
        Category: "${category}"
        Description: "${description}"

        Determine the severity of this issue from the following options: LOW, MEDIUM, HIGH, CRITICAL.
        Also provide a brief 1-2 sentence note on why you categorized it this way and how urgent it is.

        Return the response strictly in this JSON format:
        {
          "severity": "HIGH",
          "notes": "Brief explanation here."
        }
      `

      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      
      // Extract JSON from response (handling potential markdown blocks)
      const jsonMatch = text.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        const aiData = JSON.parse(jsonMatch[0])
        severity = aiData.severity || 'PENDING'
        ai_notes = aiData.notes || 'AI analysis could not determine urgency.'
      }
    } catch (aiError) {
      console.error('Gemini AI Error:', aiError)
      ai_notes = 'AI analysis failed.'
    }

    // 2. Insert into Supabase
    const supabaseAdmin = getSupabaseAdmin()
    const { data, error } = await supabaseAdmin
      .from('reports')
      .insert([
        {
          title,
          description,
          category,
          location,
          image_url,
          severity,
          ai_notes,
          user_id,
          status: 'REPORTED'
        }
      ])
      .select()
      .single()

    if (error) {
      console.error('Supabase Insert Error:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ success: true, data })

  } catch (err: any) {
    console.error('Server Error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
