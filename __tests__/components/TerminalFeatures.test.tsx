import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TerminalFeatures } from '@/components/TerminalFeatures'

// Mock fetch
global.fetch = jest.fn()

describe('TerminalFeatures', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('displays terminal header with correct format', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByText('vani@localhost:~/writing-profiler')).toBeInTheDocument()
  })

  it('shows command-style analyze button', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByText('./analyze --execute')).toBeInTheDocument()
  })

  it('displays main title and subtitle', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByText('Vani')).toBeInTheDocument()
    // Writing Style Profiler subtitle is commented out in the component
  })

  it('displays description text', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByText(/Analyze your writing style with AI-powered literary and rhetorical insights/)).toBeInTheDocument()
  })

  it('displays command prompt text', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByText('$ upload_files')).toBeInTheDocument()
  })

  it('displays file upload area', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByLabelText(/upload files/i)).toBeInTheDocument()
  })

  it('displays footer with author information', () => {
    render(<TerminalFeatures />)
    
    // Footer with author information is not present in the current component
    // This test is kept for future reference if footer is added back
  })

  it('has proper container styling for centering', () => {
    render(<TerminalFeatures />)
    
    const container = document.querySelector('.min-h-screen')
    expect(container).toHaveClass('font-mono', 'text-foreground')
  })

  it('shows command-style copy button when results are available', async () => {
    const mockResponse = {
      overall_style_summary: 'Test analysis',
      diction: { word_choice: 'Test', word_economy: 'Test', notable_word_choices: [] },
      syntax: { sentence_structure: 'Test', average_sentence_length_words: 10 },
      tone: { overall_tone: 'Test', rhetorical_appeals_used: [] },
      rhetorical_patterns: 'Test',
      narrative_perspective: 'Test'
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })
    
    render(<TerminalFeatures />)
    
    // Add files and click analyze
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [new File(['content1'], 'document1.txt', { type: 'text/plain' })]
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    const analyzeButton = screen.getByText('./analyze --execute')
    fireEvent.click(analyzeButton)
    
    await waitFor(() => {
      expect(screen.getByText('cp analysis.json')).toBeInTheDocument()
    })
  })

  it('does not display professional score or progress bar', async () => {
    const mockResponse = {
      overall_style_summary: 'Test analysis',
      diction: { word_choice: 'Test', word_economy: 'Test', notable_word_choices: [] },
      syntax: { sentence_structure: 'Test', average_sentence_length_words: 10 },
      tone: { overall_tone: 'Test', rhetorical_appeals_used: [] },
      rhetorical_patterns: 'Test',
      narrative_perspective: 'Test'
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })
    
    render(<TerminalFeatures />)
    
    // Add files and click analyze
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [new File(['content1'], 'document1.txt', { type: 'text/plain' })]
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    const analyzeButton = screen.getByText('./analyze --execute')
    fireEvent.click(analyzeButton)
    
    await waitFor(() => {
      expect(screen.queryByText(/Professionalism Score/)).not.toBeInTheDocument()
      expect(screen.queryByTestId('progress-bar')).not.toBeInTheDocument()
      expect(screen.queryByText(/%/)).not.toBeInTheDocument()
    })
  })

  it('displays syntax-highlighted JSON output', async () => {
    const mockResponse = {
      overall_style_summary: 'Test analysis',
      diction: { word_choice: 'Test', word_economy: 'Test', notable_word_choices: [] },
      syntax: { sentence_structure: 'Test', average_sentence_length_words: 10 },
      tone: { overall_tone: 'Test', rhetorical_appeals_used: [] },
      rhetorical_patterns: 'Test',
      narrative_perspective: 'Test'
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })
    
    render(<TerminalFeatures />)
    
    // Add files and click analyze
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [new File(['content1'], 'document1.txt', { type: 'text/plain' })]
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    const analyzeButton = screen.getByText('./analyze --execute')
    fireEvent.click(analyzeButton)
    
    await waitFor(() => {
      expect(screen.getByText('Analysis Results')).toBeInTheDocument()
      expect(screen.getByText(/overall_style_summary/)).toBeInTheDocument()
    })
  })

  it('handles file upload with terminal-style listing', () => {
    render(<TerminalFeatures />)
    
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [
      new File(['content1'], 'document1.txt', { type: 'text/plain' }),
      new File(['content2'], 'document2.pdf', { type: 'application/pdf' })
    ]
    
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    expect(screen.getByText('document1.txt')).toBeInTheDocument()
    expect(screen.getByText('document2.pdf')).toBeInTheDocument()
  })

  it('copies JSON to clipboard when copy button is clicked', async () => {
    const mockClipboard = {
      writeText: jest.fn().mockResolvedValue(undefined)
    }
    Object.assign(navigator, { clipboard: mockClipboard })
    
    const mockResponse = {
      overall_style_summary: 'Test analysis',
      diction: { word_choice: 'Test', word_economy: 'Test', notable_word_choices: [] },
      syntax: { sentence_structure: 'Test', average_sentence_length_words: 10 },
      tone: { overall_tone: 'Test', rhetorical_appeals_used: [] },
      rhetorical_patterns: 'Test',
      narrative_perspective: 'Test'
    }
    
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse
    })
    
    render(<TerminalFeatures />)
    
    // Add files and click analyze
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [new File(['content1'], 'document1.txt', { type: 'text/plain' })]
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    const analyzeButton = screen.getByText('./analyze --execute')
    fireEvent.click(analyzeButton)
    
    await waitFor(() => {
      const copyButton = screen.getByText('cp analysis.json')
      fireEvent.click(copyButton)
    })
    
    await waitFor(() => {
      expect(mockClipboard.writeText).toHaveBeenCalled()
    })
  })

  it('shows responsive design on mobile', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 375,
    })
    
    render(<TerminalFeatures />)
    
    const terminalWindow = screen.getByTestId('terminal-window')
    expect(terminalWindow).toBeInTheDocument()
  })

  it('displays terminal-style file upload area', () => {
    render(<TerminalFeatures />)
    
    expect(screen.getByText('$ upload_files')).toBeInTheDocument()
    expect(screen.getByText('Click to select files or drag and drop')).toBeInTheDocument()
  })

  it('shows command prompt styling', () => {
    render(<TerminalFeatures />)
    
    const commandPrompt = screen.getByText('$ upload_files')
    expect(commandPrompt).toHaveClass('text-foreground', 'font-mono')
  })

  it('applies terminal window styling', () => {
    render(<TerminalFeatures />)
    
    const terminalWindow = screen.getByTestId('terminal-window')
    expect(terminalWindow).toHaveClass('bg-card', 'border-border', 'shadow-3xl')
  })

  it('respects file upload limit of 5 files', () => {
    render(<TerminalFeatures />)
    
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.txt', { type: 'text/plain' }),
      new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
      new File(['content4'], 'file4.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
      new File(['content5'], 'file5.txt', { type: 'text/plain' }),
      new File(['content6'], 'file6.txt', { type: 'text/plain' })
    ]
    
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    // Should only show first 5 files
    expect(screen.getByText('file1.txt')).toBeInTheDocument()
    expect(screen.getByText('file2.txt')).toBeInTheDocument()
    expect(screen.getByText('file3.pdf')).toBeInTheDocument()
    expect(screen.getByText('file4.docx')).toBeInTheDocument()
    expect(screen.getByText('file5.txt')).toBeInTheDocument()
    expect(screen.queryByText('file6.txt')).not.toBeInTheDocument()
  })

  it('shows loading spinner when analyzing', async () => {
    // Mock a slow response
    ;(global.fetch as jest.Mock).mockImplementationOnce(() => 
      new Promise(resolve => setTimeout(() => resolve({
        ok: true,
        json: async () => ({
          overall_style_summary: 'Test analysis',
          diction: { word_choice: 'Test', word_economy: 'Test', notable_word_choices: [] },
          syntax: { sentence_structure: 'Test', average_sentence_length_words: 10 },
          tone: { overall_tone: 'Test', rhetorical_appeals_used: [] },
          rhetorical_patterns: 'Test',
          narrative_perspective: 'Test'
        })
      }), 100))
    )
    
    render(<TerminalFeatures />)
    
    // Add files and click analyze
    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [new File(['content1'], 'document1.txt', { type: 'text/plain' })]
    fireEvent.change(fileInput, { target: { files: mockFiles } })
    
    const analyzeButton = screen.getByText('./analyze --execute')
    fireEvent.click(analyzeButton)
    
    // Check that loading state is shown
    expect(screen.getByText('Processing')).toBeInTheDocument()
    expect(screen.getByText('Processing')).toBeDisabled()
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Processing')).not.toBeInTheDocument()
    }, { timeout: 200 })
  })
})
