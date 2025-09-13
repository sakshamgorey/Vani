import { render, screen, fireEvent } from '@testing-library/react'
import { FileUpload } from '@/components/FileUpload'

describe('FileUpload', () => {
  const mockOnFilesChange = jest.fn()

  beforeEach(() => {
    mockOnFilesChange.mockClear()
  })

  it('renders file upload section', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    expect(screen.getByText('Upload Files')).toBeInTheDocument()
    expect(screen.getByText('Supported formats: .txt, .docx, .pdf')).toBeInTheDocument()
  })

  it('displays file input with correct attributes', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    const fileInput = screen.getByLabelText(/upload files/i)
    expect(fileInput).toBeInTheDocument()
    expect(fileInput).toHaveAttribute('multiple')
    expect(fileInput).toHaveAttribute('accept', '.txt,.docx,.pdf')
  })

  it('shows no files message when no files are selected', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    expect(screen.getByText('No files selected')).toBeInTheDocument()
  })

  it('displays selected files', () => {
    const mockFiles = [
      new File(['content'], 'test.txt', { type: 'text/plain' }),
      new File(['content'], 'document.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
    ]

    render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

    expect(screen.getByText(/test\.txt/)).toBeInTheDocument()
    expect(screen.getByText(/document\.docx/)).toBeInTheDocument()
    expect(screen.queryByText('No files selected')).not.toBeInTheDocument()
  })

  it('calls onFilesChange when files are selected', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFile = new File(['content'], 'test.txt', { type: 'text/plain' })

    fireEvent.change(fileInput, { target: { files: [mockFile] } })

    expect(mockOnFilesChange).toHaveBeenCalledWith([mockFile])
  })

  it('handles multiple file selection', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    const fileInput = screen.getByLabelText(/upload files/i)
    const mockFiles = [
      new File(['content1'], 'file1.txt', { type: 'text/plain' }),
      new File(['content2'], 'file2.pdf', { type: 'application/pdf' })
    ]

    fireEvent.change(fileInput, { target: { files: mockFiles } })

    expect(mockOnFilesChange).toHaveBeenCalledWith(mockFiles)
  })

  it('displays file size information', () => {
    const mockFiles = [
      new File(['content'], 'test.txt', { type: 'text/plain' })
    ]

    render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

    expect(screen.getByText(/test\.txt/)).toBeInTheDocument()
  })

  it('applies correct styling classes', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    const container = screen.getByText('Click to select files or drag and drop').closest('div').parentElement?.parentElement?.parentElement
    expect(container).toHaveClass('border-2', 'border-dashed', 'border-border', 'rounded-lg', 'text-center')
  })

  it('has appropriate button size (not too big)', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)
    
    const uploadIcon = screen.getByText('Click to select files or drag and drop').closest('div')?.parentElement?.querySelector('div')
    expect(uploadIcon).toHaveClass('w-8', 'h-8')
  })

  it('handles empty file selection', () => {
    render(<FileUpload files={[]} onFilesChange={mockOnFilesChange} />)

    const fileInput = screen.getByLabelText(/upload files/i)
    fireEvent.change(fileInput, { target: { files: [] } })

    // When no files are selected and there were no files before, onFilesChange should not be called
    expect(mockOnFilesChange).not.toHaveBeenCalled()
  })

  it('shows correct file count', () => {
    const mockFiles = [
      new File(['content'], 'file1.txt', { type: 'text/plain' }),
      new File(['content'], 'file2.txt', { type: 'text/plain' }),
      new File(['content'], 'file3.pdf', { type: 'application/pdf' })
    ]

    render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

    expect(screen.getByText(/file1\.txt/)).toBeInTheDocument()
    expect(screen.getByText(/file2\.txt/)).toBeInTheDocument()
    expect(screen.getByText(/file3\.pdf/)).toBeInTheDocument()
  })

  describe('File limit validation', () => {
    it('allows up to 5 files', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' }),
        new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
        new File(['content4'], 'file4.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        new File(['content5'], 'file5.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      expect(screen.getByText(/file1\.txt/)).toBeInTheDocument()
      expect(screen.getByText(/file2\.txt/)).toBeInTheDocument()
      expect(screen.getByText(/file3\.pdf/)).toBeInTheDocument()
      expect(screen.getByText(/file4\.docx/)).toBeInTheDocument()
      expect(screen.getByText(/file5\.txt/)).toBeInTheDocument()
    })

    it('shows error message when trying to upload more than 5 files', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' }),
        new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
        new File(['content4'], 'file4.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        new File(['content5'], 'file5.txt', { type: 'text/plain' }),
        new File(['content6'], 'file6.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      expect(screen.getByText(/Maximum 5 files allowed/)).toBeInTheDocument()
    })

    it('prevents adding more files when limit is reached', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' }),
        new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
        new File(['content4'], 'file4.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        new File(['content5'], 'file5.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      const fileInput = screen.getByLabelText(/upload files/i)
      const additionalFile = new File(['content6'], 'file6.txt', { type: 'text/plain' })

      fireEvent.change(fileInput, { target: { files: [additionalFile] } })

      // Should not call onFilesChange with the additional file
      expect(mockOnFilesChange).not.toHaveBeenCalledWith([...mockFiles, additionalFile])
    })

    it('shows file count indicator', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      expect(screen.getByText(/2 of 5 files/)).toBeInTheDocument()
    })

    it('shows file count indicator when at maximum', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' }),
        new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
        new File(['content4'], 'file4.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        new File(['content5'], 'file5.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      expect(screen.getByText(/5 of 5 files/)).toBeInTheDocument()
    })

    it('disables file input when maximum files reached', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' }),
        new File(['content3'], 'file3.pdf', { type: 'application/pdf' }),
        new File(['content4'], 'file4.docx', { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        new File(['content5'], 'file5.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      const fileInput = screen.getByLabelText(/upload files/i)
      expect(fileInput).toBeDisabled()
    })

    it('enables file input when under maximum files', () => {
      const mockFiles = [
        new File(['content1'], 'file1.txt', { type: 'text/plain' }),
        new File(['content2'], 'file2.txt', { type: 'text/plain' })
      ]

      render(<FileUpload files={mockFiles} onFilesChange={mockOnFilesChange} />)

      const fileInput = screen.getByLabelText(/upload files/i)
      expect(fileInput).not.toBeDisabled()
    })
  })
})
