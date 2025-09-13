# Environment Setup

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Google Gemini AI API Key
# Get your API key from: https://makersuite.google.com/app/apikey
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here

# Optional: Set to 'true' to enable debug logging
DEBUG=false
```

## Getting Your Google Gemini AI API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in your `.env.local` file

## Important Notes

- Never commit your `.env.local` file to version control
- The `.env.local` file is already in `.gitignore`
- Make sure to restart your development server after adding environment variables
