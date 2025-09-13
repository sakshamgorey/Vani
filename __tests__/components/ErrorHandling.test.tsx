import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { TerminalFeatures } from '@/components/TerminalFeatures'
import { FileUpload } from '@/components/FileUpload'
import { toast } from 'sonner'

// Mock the toast function
jest.mock('sonner', () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
    warning: jest.fn(),
  },
}))

// Mock fetch
global.fetch = jest.fn()

describe('Error Handling with Sonner Toasts', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('FileUpload Component', () => {
    it('should show error toast for invalid file types', () => {
      const mockOnFilesChange = jest.fn()
      render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)
      
      const fileInput = screen.getByLabelText(/upload files/i)
      const invalidFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      
      fireEvent.change(fileInput, { target: { files: [invalidFile] } })
      
      expect(toast.error).toHaveBeenCalledWith('Invalid file', {
        description: 'File "test.jpg" has an unsupported format. Only .txt, .docx, and .pdf files are allowed.'
      })
    })

    it('should show error toast for files that are too large', () => {
      const mockOnFilesChange = jest.fn()
      render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)
      
      const fileInput = screen.getByLabelText(/upload files/i)
      // Create a mock file with size larger than 10MB
      const largeFile = new File(['content'], 'large.txt', { type: 'text/plain' })
      // Mock the size property
      Object.defineProperty(largeFile, 'size', { value: 11 * 1024 * 1024 })
      
      fireEvent.change(fileInput, { target: { files: [largeFile] } })
      
      expect(toast.error).toHaveBeenCalledWith('Invalid file', {
        description: 'File "large.txt" is too large. Maximum size is 10MB.'
      })
    })

    it('should show warning toast when file limit is exceeded', () => {
      const mockOnFilesChange = jest.fn()
      const existingFiles = Array.from({ length: 4 }, (_, i) => 
        new File(['content'], `file${i}.txt`, { type: 'text/plain' })
      )
      
      render(<FileUpload files={existingFiles} onFilesChange={mockOnFilesChange} />)
      
      const fileInput = screen.getByLabelText(/upload files/i)
      const newFiles = Array.from({ length: 3 }, (_, i) => 
        new File(['content'], `newfile${i}.txt`, { type: 'text/plain' })
      )
      
      fireEvent.change(fileInput, { target: { files: newFiles } })
      
      expect(toast.warning).toHaveBeenCalledWith('File limit reached', {
        description: 'Only 1 of 3 files were added. Maximum 5 files allowed.'
      })
    })
  })

  describe('TerminalFeatures Component', () => {
    it('should have disabled button when no files are selected', () => {
      render(<TerminalFeatures />)
      
      // The button should be disabled when no files are selected
      const analyzeButton = screen.getByText('./analyze --execute')
      expect(analyzeButton).toBeDisabled()
    })

    it('should show error toast when analysis fails with network error', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockRejectedValueOnce(new Error('Network error'))
      
      render(<TerminalFeatures />)
      
      // Add a file first
      const fileInput = screen.getByLabelText(/upload files/i)
      const testFile = new File(['content'], 'test.txt', { type: 'text/plain' })
      fireEvent.change(fileInput, { target: { files: [testFile] } })
      
      // Click analyze button
      const analyzeButton = screen.getByText('./analyze --execute')
      fireEvent.click(analyzeButton)
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Analysis failed', {
          description: 'Network error'
        })
      })
    })

    it('should show error toast when analysis fails with HTTP error', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ error: 'Server error occurred' }),
      } as Response)
      
      render(<TerminalFeatures />)
      
      // First add a file
      const fileInput = screen.getByLabelText(/upload files/i)
      const testFile = new File(['content'], 'test.txt', { type: 'text/plain' })
      fireEvent.change(fileInput, { target: { files: [testFile] } })
      
      // Then try to analyze
      const analyzeButton = screen.getByText('./analyze --execute')
      fireEvent.click(analyzeButton)
      
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('Analysis failed', {
          description: 'Server error occurred'
        })
      })
    })

    it('should show success toast when analysis completes successfully', async () => {
      const mockFetch = fetch as jest.MockedFunction<typeof fetch>
      const mockAnalysisResult = {
        overall_style_summary: 'Test analysis',
        diction: { word_choice: 'formal', word_economy: 'concise', notable_word_choices: [] },
        syntax: { sentence_structure: 'complex', average_sentence_length_words: 15 },
        tone: { overall_tone: 'professional', rhetorical_appeals_used: [] },
        rhetorical_patterns: 'analytical',
        narrative_perspective: 'third person'
      }
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockAnalysisResult,
      } as Response)
      
      render(<TerminalFeatures />)
      
      // First add a file
      const fileInput = screen.getByLabelText(/upload files/i)
      const testFile = new File(['content'], 'test.txt', { type: 'text/plain' })
      fireEvent.change(fileInput, { target: { files: [testFile] } })
      
      // Then analyze
      const analyzeButton = screen.getByText('./analyze --execute')
      fireEvent.click(analyzeButton)
      
      await waitFor(() => {
        expect(toast.success).toHaveBeenCalledWith('Analysis completed successfully', {
          description: 'Your writing style analysis is ready to view'
        })
      })
    })

  })
})
