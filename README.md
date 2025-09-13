# Vani – AI Writing Style Profiler

A sophisticated Next.js application that provides comprehensive writing style analysis using Google's Gemini AI. Built with TypeScript, Tailwind CSS, and modern React patterns, Vani offers deep insights into literary style, tone, and rhetorical patterns.

## ✨ Features

### 📝 **Multi-Input Support**
- **Direct Text Input**: Clean, responsive textarea for pasting content
- **File Upload**: Support for `.txt`, `.docx`, and `.pdf` files with drag-and-drop
- **Batch Processing**: Analyze multiple files simultaneously

### 🤖 **AI-Powered Analysis**
- **Comprehensive Style Analysis**: Powered by Google Gemini AI
- **Structured JSON Output**: Detailed analysis including:
  - **Overall Style Summary**: High-level writing characteristics
  - **Diction Analysis**: Word choice patterns, economy, and notable selections
  - **Syntax Analysis**: Sentence structure and average length metrics
  - **Tone Analysis**: Overall tone and rhetorical appeals (logos, pathos, ethos)
  - **Rhetorical Patterns**: Advanced rhetorical device identification
  - **Narrative Perspective**: Point of view and voice analysis

### 🎨 **Modern Interface**
- **Terminal-Inspired Design**: Clean, professional terminal aesthetic
- **Responsive Layout**: Optimized for desktop and mobile devices
- **Real-time Feedback**: Progress indicators and loading states
- **One-Click Copy**: Instant JSON result copying to clipboard
- **Error Handling**: Comprehensive error management with user-friendly messages

### 🧪 **Quality Assurance**
- **Comprehensive Testing**: Full test coverage with Jest and React Testing Library
- **Type Safety**: Complete TypeScript implementation
- **Performance Optimized**: Efficient file processing and API calls

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 3.4+ with custom animations
- **UI Components**: Radix UI primitives with custom styling
- **AI Integration**: Google Generative AI (Gemini) v1.16+
- **Testing**: Jest 29+ with React Testing Library
- **Animations**: Framer Motion 12+
- **Icons**: Lucide React
- **Notifications**: Sonner toast system
- **Deployment**: Vercel-ready with environment variable support

## 🚀 Quick Start

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **Package Manager**: npm, yarn, or pnpm
- **Google Gemini AI API Key**: [Get your API key here](https://makersuite.google.com/app/apikey)

### Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd vani
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables:**
```bash
cp env.example .env.local
```

4. **Configure your API key:**
Edit `.env.local` and add your Gemini API key:
```env
GOOGLE_GENERATIVE_AI_API_KEY=your_actual_api_key_here
DEBUG=false
```

### 🏃‍♂️ Running the Application

**Development mode:**
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**
```bash
npm run build
npm start
```

### 🧪 Testing

**Run all tests:**
```bash
npm test
```

**Run tests in watch mode:**
```bash
npm run test:watch
```

**Run linting:**
```bash
npm run lint
```

### 📁 Project Structure Overview

```
vani/
├── app/                    # Next.js App Router
│   ├── api/analyze/       # API endpoint for text analysis
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout with providers
│   └── page.tsx           # Main application page
├── components/            # React components
│   ├── ui/               # Reusable UI components (Radix-based)
│   ├── AnalysisDrawer.tsx # Analysis results display
│   ├── FileUpload.tsx     # File upload with validation
│   ├── TerminalFeatures.tsx # Main application interface
│   └── TerminalWindow.tsx # Terminal-style wrapper
├── __tests__/            # Test files
├── types/                # TypeScript type definitions
├── lib/                  # Utility functions
└── public/               # Static assets
```

## 📡 API Documentation

### POST `/api/analyze`

Analyzes text content and uploaded files for comprehensive writing style analysis.

#### Request Format

**Method:** `POST`  
**Content-Type:** `multipart/form-data`

**Parameters:**
- `text` (string, optional): Direct text input for analysis
- `files` (File[], optional): Array of files to analyze (supports .txt, .docx, .pdf)

#### Response Format

**Success Response (200):**
```json
{
  "overall_style_summary": "The writing demonstrates a formal, academic tone with precise vocabulary and complex sentence structures...",
  "diction": {
    "word_choice": "Sophisticated and precise, favoring Latinate vocabulary over Germanic alternatives",
    "word_economy": "Efficient use of language with minimal redundancy",
    "notable_word_choices": ["paradigm", "concomitant", "ubiquitous", "ephemeral"]
  },
  "syntax": {
    "sentence_structure": "Complex with frequent use of subordinate clauses and parallel constructions",
    "average_sentence_length_words": 24.5
  },
  "tone": {
    "overall_tone": "Authoritative and analytical with subtle persuasive undertones",
    "rhetorical_appeals_used": ["logos", "ethos"]
  },
  "rhetorical_patterns": "Employs classical rhetorical devices including anaphora, antithesis, and rhetorical questions",
  "narrative_perspective": "Third-person omniscient with occasional first-person analytical intrusions"
}
```

**Error Response (400/500):**
```json
{
  "error": "Invalid file format. Please upload .txt, .docx, or .pdf files only.",
  "code": "INVALID_FILE_TYPE",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

#### Usage Examples

**cURL Example:**
```bash
curl -X POST http://localhost:3000/api/analyze \
  -F "text=Your text content here" \
  -F "files=@document.pdf"
```

**JavaScript Example:**
```javascript
const formData = new FormData();
formData.append('text', 'Sample text for analysis');
formData.append('files', fileInput.files[0]);

const response = await fetch('/api/analyze', {
  method: 'POST',
  body: formData
});

const result = await response.json();
console.log(result);
```

#### Error Codes

| Code | Description | Resolution |
|------|-------------|------------|
| `INVALID_FILE_TYPE` | Unsupported file format | Use .txt, .docx, or .pdf files |
| `FILE_TOO_LARGE` | File exceeds size limit | Reduce file size or split content |
| `API_KEY_MISSING` | Gemini API key not configured | Set `GOOGLE_GENERATIVE_AI_API_KEY` |
| `API_QUOTA_EXCEEDED` | API rate limit reached | Wait and retry or upgrade quota |
| `PROCESSING_ERROR` | Internal processing failure | Check file content and retry |

## 📖 Usage Guide

### Getting Started

1. **Launch the Application**
   - Start the development server: `npm run dev`
   - Open [http://localhost:3000](http://localhost:3000)

2. **Input Your Content**
   - **Option A**: Paste text directly into the textarea
   - **Option B**: Upload files using drag-and-drop or file picker
   - **Option C**: Combine both methods for comprehensive analysis

3. **Analyze Your Writing**
   - Click the "Analyze" button to start processing
   - Monitor progress with real-time indicators
   - View results in the expandable analysis drawer

4. **Export Results**
   - Copy JSON results to clipboard with one click
   - Use the structured data for further analysis or integration

### Supported File Types

| Format | Extension | Max Size | Notes |
|--------|-----------|----------|-------|
| Text | `.txt` | 10MB | Plain text files |
| Word Document | `.docx` | 10MB | Microsoft Word documents |
| PDF | `.pdf` | 10MB | Portable Document Format |

### Analysis Output

The AI analysis provides insights into:

- **Writing Style**: Overall characteristics and patterns
- **Vocabulary**: Word choice sophistication and economy
- **Sentence Structure**: Complexity and average length
- **Tone & Voice**: Emotional undertones and rhetorical appeals
- **Rhetorical Devices**: Literary techniques and patterns
- **Narrative Perspective**: Point of view and voice consistency

### Best Practices

- **Text Length**: Optimal analysis for 500-5000 words
- **File Quality**: Ensure files are readable and not corrupted
- **Content Type**: Works best with prose, essays, and narrative text
- **Multiple Files**: Upload related documents for comparative analysis

## 📁 Detailed Project Structure

```
vani/
├── app/                          # Next.js App Router
│   ├── api/
│   │   └── analyze/
│   │       └── route.ts         # Main API endpoint for text analysis
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout with providers and metadata
│   └── page.tsx                 # Main application page (renders TerminalFeatures)
├── components/                   # React components
│   ├── ui/                      # Reusable UI components (Radix-based)
│   │   ├── alert.tsx           # Alert/notification component
│   │   ├── badge.tsx           # Badge component for status indicators
│   │   ├── button.tsx          # Button component with variants
│   │   ├── card.tsx            # Card container component
│   │   ├── drawer.tsx          # Drawer/sidebar component
│   │   ├── input.tsx           # Input field component
│   │   ├── progress.tsx        # Progress bar component
│   │   ├── scroll-area.tsx     # Custom scrollable area
│   │   ├── sheet.tsx           # Sheet/modal component
│   │   ├── sonner.tsx          # Toast notification setup
│   │   └── textarea.tsx        # Textarea component
│   ├── AnalysisDrawer.tsx       # Analysis results display component
│   ├── FileUpload.tsx           # File upload with validation and drag-drop
│   ├── TerminalFeatures.tsx     # Main application interface component
│   └── TerminalWindow.tsx       # Terminal-style wrapper component
├── __tests__/                   # Test files
│   └── components/              # Component-specific tests
│       ├── AnalysisDrawer.test.tsx
│       ├── ErrorHandling.test.tsx
│       ├── FileUpload.test.tsx
│       ├── Layout.test.tsx
│       ├── TerminalFeatures.test.tsx
│       └── TerminalWindow.test.tsx
├── lib/
│   └── utils.ts                 # Utility functions and helpers
├── types/
│   └── index.ts                 # TypeScript type definitions
├── components.json              # shadcn/ui component configuration
├── env.example                  # Environment variables template
├── jest.config.js               # Jest testing configuration
├── jest.setup.js                # Jest setup and global test utilities
├── next.config.js               # Next.js configuration
├── next-env.d.ts                # Next.js TypeScript declarations
├── package.json                 # Dependencies and scripts
├── postcss.config.js            # PostCSS configuration
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

### Key Components Overview

- **`TerminalFeatures.tsx`**: Main application component handling the core functionality
- **`FileUpload.tsx`**: Handles file selection, validation, and display with drag-and-drop support
- **`AnalysisDrawer.tsx`**: Displays analysis results in an expandable drawer interface
- **`TerminalWindow.tsx`**: Provides the terminal-style wrapper and layout
- **`ui/`**: Collection of reusable UI components built on Radix UI primitives

## 🧪 Testing

The project follows **Test-Driven Development (TDD)** principles with comprehensive test coverage:

### Test Coverage

- **`AnalysisDrawer.test.tsx`**: Tests for analysis results display and interaction
- **`ErrorHandling.test.tsx`**: Tests for error states and user feedback
- **`FileUpload.test.tsx`**: Tests for file selection, validation, and drag-drop functionality
- **`Layout.test.tsx`**: Tests for root layout component and providers
- **`TerminalFeatures.test.tsx`**: Tests for main interface functionality and API integration
- **`TerminalWindow.test.tsx`**: Tests for terminal window wrapper component

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm test -- --coverage
```

### Testing Guidelines

- Write tests **before** implementing features
- Maintain 100% test coverage for critical paths
- Use descriptive test names and clear assertions
- Mock external dependencies (API calls, file operations)
- Test both success and error scenarios

## 🚀 Deployment

### Vercel (Recommended)

1. **Prepare your repository:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Deploy to Vercel:**
   - Connect your GitHub repository to Vercel
   - Add environment variables in Vercel dashboard:
     - `GOOGLE_GENERATIVE_AI_API_KEY`: Your Gemini API key
     - `DEBUG`: Set to `false` for production
   - Deploy automatically on push

3. **Verify deployment:**
   - Check that all environment variables are set
   - Test the API endpoint functionality
   - Verify file upload and analysis features

### Other Platforms

The application is built with standard Next.js and can be deployed to:
- **Netlify**: Use the Next.js build command
- **Railway**: Direct GitHub integration
- **Docker**: Use the included Dockerfile
- **AWS/GCP/Azure**: Standard Node.js deployment

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Development Workflow

1. **Fork and Clone:**
   ```bash
   git clone https://github.com/your-username/vani.git
   cd vani
   ```

2. **Create a Feature Branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Follow TDD Principles:**
   - Write tests first
   - Implement the feature
   - Ensure all tests pass
   - Refactor if needed

4. **Code Quality:**
   - Follow TypeScript best practices
   - Use meaningful variable and function names
   - Add comments for complex logic
   - Follow the existing code style

5. **Testing:**
   ```bash
   npm test
   npm run lint
   ```

6. **Submit a Pull Request:**
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure CI/CD checks pass

### Code Standards

- **TypeScript**: Strict mode enabled, no `any` types
- **React**: Functional components with hooks
- **Styling**: Tailwind CSS with consistent design tokens
- **Testing**: Jest + React Testing Library
- **Commits**: Conventional commit messages

### Issue Guidelines

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable

## 🔧 Troubleshooting

### Common Issues

**API Key Not Working:**
```bash
# Check environment variable
echo $GOOGLE_GENERATIVE_AI_API_KEY

# Verify in .env.local
cat .env.local
```

**File Upload Failing:**
- Ensure file size is under 10MB
- Check file format (.txt, .docx, .pdf only)
- Verify file is not corrupted

**Build Errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Test Failures:**
```bash
# Clear Jest cache
npm test -- --clearCache
npm test
```

### Performance Issues

- **Large Files**: Consider splitting content into smaller chunks
- **API Limits**: Monitor your Gemini API quota usage
- **Memory**: Restart the development server if memory usage is high

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Open a GitHub issue for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions and ideas

---

**Built with ❤️ using Next.js, TypeScript, and Google Gemini AI**
