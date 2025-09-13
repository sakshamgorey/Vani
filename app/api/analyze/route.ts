import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'

// Initialize Gemini AI
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY!
})

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return NextResponse.json(
        { error: 'Google Gemini AI API key is not configured. Please contact the administrator.' },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]
    
    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided for analysis. Please select at least one file.' },
        { status: 400 }
      )
    }

    // Convert files to base64 and send directly to Gemini (multimodal approach)
    const fileContents = await Promise.all(
      files.map(async (file) => {
        try {
          const arrayBuffer = await file.arrayBuffer()
          const base64 = Buffer.from(arrayBuffer).toString('base64')
          
          return {
            name: file.name,
            mimeType: file.type,
            data: base64
          }
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error)
          throw new Error(`Failed to process file "${file.name}". The file may be corrupted or in an unsupported format.`)
        }
      })
    )

    // Generate analysis using the file contents directly
    const prompt = `You are an expert literary and rhetorical analyst. Analyze the provided files for their writing style and return only a structured JSON object based on the schema.

Please provide a comprehensive analysis covering:
1. Overall style summary
2. Diction (word choice, economy, notable choices)
3. Syntax (sentence structure, average length)
4. Tone (overall tone, rhetorical appeals)
5. Rhetorical patterns
6. Narrative perspective

Analyze all the provided files together and give a comprehensive assessment.`

    // Create content parts with files and prompt
    const contentParts = [
      ...fileContents.map(file => ({
        inlineData: {
          mimeType: file.mimeType,
          data: file.data
        }
      })),
      { text: prompt }
    ]

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: contentParts
    })

    console.log('Response received from Gemini')
    
    // Extract JSON from Gemini's response (it might be wrapped in markdown)
    let responseText = result.text || ''
    console.log('Raw response:', responseText)
    
    // Try to extract JSON from markdown code blocks
    const jsonMatch = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/)
    if (jsonMatch) {
      responseText = jsonMatch[1]
    }
    
    // Try to find JSON object in the response
    const jsonObjectMatch = responseText.match(/\{[\s\S]*\}/)
    if (jsonObjectMatch) {
      responseText = jsonObjectMatch[0]
    }
    
    let analysis
    try {
      analysis = JSON.parse(responseText)
    } catch (parseError) {
      console.log('JSON parsing failed, returning raw response')
      // If JSON parsing fails, return a structured response with the raw text
      analysis = {
        raw_response: responseText,
        analysis_summary: "Analysis completed but response format could not be parsed as JSON"
      }
    }
    
    return NextResponse.json(analysis)
    
  } catch (error) {
    console.error('Analysis error:', error)
    
    // Provide more specific error messages based on the error type
    let errorMessage = 'Failed to analyze files'
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        errorMessage = 'AI service configuration error. Please try again later.'
      } else if (error.message.includes('Failed to process file')) {
        errorMessage = error.message
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.'
      } else {
        errorMessage = `Analysis failed: ${error.message}`
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
