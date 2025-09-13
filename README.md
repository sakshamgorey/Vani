# Vani – Writing Style Profiler

A Next.js application that analyzes writing style using AI-powered literary analysis. Built with TypeScript, Tailwind CSS, and Google's Gemini AI.

## Features

- **Text Input**: Multi-line textarea for pasting text directly
- **File Upload**: Support for `.txt`, `.docx`, and `.pdf` files
- **AI Analysis**: Powered by Google Gemini AI for comprehensive writing style analysis
- **Structured Output**: JSON response with detailed analysis including:
  - Overall style summary
  - Diction analysis (word choice, economy, notable choices)
  - Syntax analysis (sentence structure, average length)
  - Tone analysis (overall tone, rhetorical appeals)
  - Rhetorical patterns
  - Narrative perspective
- **Copy Functionality**: One-click JSON copying to clipboard
- **Responsive Design**: Clean, minimalistic black and white theme

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Google Generative AI (Gemini)
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Google Gemini AI API key

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd vani-writing-style-profiler
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env.local
```

4. Add your Gemini AI API key to `.env.local`:
```
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

### Development

Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run tests:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

### Building for Production

Build the application:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## API Endpoints

### POST /api/analyze

Analyzes text and uploaded files for writing style.

**Request:**
- Method: `POST`
- Content-Type: `multipart/form-data`
- Body:
  - `text` (string, optional): Text to analyze
  - `files` (File[], optional): Files to analyze

**Response:**
```json
{
  "overall_style_summary": "string",
  "diction": {
    "word_choice": "string",
    "word_economy": "string",
    "notable_word_choices": ["string"]
  },
  "syntax": {
    "sentence_structure": "string",
    "average_sentence_length_words": "number"
  },
  "tone": {
    "overall_tone": "string",
    "rhetorical_appeals_used": ["logos" | "pathos" | "ethos"]
  },
  "rhetorical_patterns": "string",
  "narrative_perspective": "string"
}
```

## Project Structure

```
├── app/
│   ├── api/analyze/
│   │   └── route.ts          # API endpoint for analysis
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── BackgroundPattern.tsx # Animated background component
│   ├── FileUpload.tsx        # File upload component
│   ├── TerminalFeatures.tsx  # Main terminal interface component
│   └── TerminalWindow.tsx    # Terminal window wrapper component
├── __tests__/
│   └── components/           # Component tests
├── types/
│   └── index.ts              # TypeScript type definitions
├── jest.config.js            # Jest configuration
├── jest.setup.js             # Jest setup
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── tsconfig.json             # TypeScript configuration
```

## Testing

The project includes comprehensive tests for all components:

- **BackgroundPattern**: Tests for animated background rendering and styling
- **FileUpload**: Tests for file selection, validation, and display
- **TerminalFeatures**: Tests for main interface functionality and API integration
- **TerminalWindow**: Tests for terminal window wrapper component
- **Layout**: Tests for root layout component

Run tests with:
```bash
npm test
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `GOOGLE_GENERATIVE_AI_API_KEY`
4. Deploy

### Other Platforms

The app is built with standard Next.js and can be deployed to any platform that supports Node.js applications.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions, please open an issue on GitHub.
