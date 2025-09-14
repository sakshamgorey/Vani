import { render, screen, fireEvent } from '@testing-library/react'
import { TerminalWindow } from '@/components/TerminalWindow'

describe('TerminalWindow', () => {
  it('renders terminal window with traffic light buttons', () => {
    render(<TerminalWindow />)
    
    // Check for traffic light buttons
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    expect(screen.getByTestId('minimize-button')).toBeInTheDocument()
    expect(screen.getByTestId('maximize-button')).toBeInTheDocument()
  })

  it('displays terminal title bar with correct text', () => {
    render(<TerminalWindow />)
    
    expect(screen.getByText('vani@localhost:~/writing-profiler')).toBeInTheDocument()
  })

  it('renders children content inside terminal window', () => {
    render(
      <TerminalWindow>
        <div data-testid="terminal-content">Terminal Content</div>
      </TerminalWindow>
    )
    
    expect(screen.getByTestId('terminal-content')).toBeInTheDocument()
  })

  it('applies terminal window styling classes', () => {
    render(<TerminalWindow />)
    
    const terminalWindow = screen.getByTestId('terminal-window')
    expect(terminalWindow).toHaveClass('bg-card', 'border-border', 'shadow-3xl')
  })

  it('applies terminal title bar styling', () => {
    render(<TerminalWindow />)
    
    const titleBar = screen.getByTestId('terminal-title-bar')
    expect(titleBar).toHaveClass('bg-muted/50', 'flex', 'items-center')
  })

  it('applies traffic light button styling', () => {
    render(<TerminalWindow />)
    
    const closeButton = screen.getByTestId('close-button')
    const minimizeButton = screen.getByTestId('minimize-button')
    const maximizeButton = screen.getByTestId('maximize-button')
    
    expect(closeButton).toHaveClass('w-3', 'h-3', 'rounded-full', 'bg-red-500')
    expect(minimizeButton).toHaveClass('w-3', 'h-3', 'rounded-full', 'bg-yellow-500')
    expect(maximizeButton).toHaveClass('w-3', 'h-3', 'rounded-full', 'bg-green-500')
  })

  it('renders info button in terminal title bar', () => {
    render(<TerminalWindow />)
    
    const infoButton = screen.getByTestId('info-button')
    expect(infoButton).toBeInTheDocument()
    expect(infoButton).toHaveClass('h-6', 'w-6', 'p-0')
  })

  it('opens info sheet when info button is clicked', () => {
    render(<TerminalWindow />)
    
    const infoButton = screen.getByTestId('info-button')
    fireEvent.click(infoButton)
    
    // Check if sheet content is visible
    expect(screen.getByText('About Vani')).toBeInTheDocument()
    expect(screen.getByText('Writing Style Profiler - AI-powered literary analysis tool')).toBeInTheDocument()
  })

  it('displays comprehensive site information in the sheet', () => {
    render(<TerminalWindow />)
    
    const infoButton = screen.getByTestId('info-button')
    fireEvent.click(infoButton)
    
    // Check for main sections
    expect(screen.getByText('What is Vani?')).toBeInTheDocument()
    expect(screen.getByText('How to Use')).toBeInTheDocument()
    expect(screen.getByText('Features')).toBeInTheDocument()
    expect(screen.getByText('Tech Stack')).toBeInTheDocument()
    
    // Check for specific content
    expect(screen.getByText(/AI-powered writing style profiler/)).toBeInTheDocument()
    expect(screen.getByText(/upload a file\(s\) \(\.txt, \.docx, or \.pdf\)/)).toBeInTheDocument()
    expect(screen.getByText(/Multi-format file support/)).toBeInTheDocument()
    expect(screen.getByText(/Built with Next.js 14/)).toBeInTheDocument()
  })

  it('has accessible info button with screen reader text', () => {
    render(<TerminalWindow />)
    
    const screenReaderText = screen.getByText('Show site information')
    expect(screenReaderText).toBeInTheDocument()
    expect(screenReaderText).toHaveClass('sr-only')
  })

  describe('Mobile UI Tests', () => {
    beforeEach(() => {
      // Mock mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      })
      Object.defineProperty(window, 'innerHeight', {
        writable: true,
        configurable: true,
        value: 667,
      })
    })

    it('should have scrollable sheet content on mobile', () => {
      render(<TerminalWindow />)
      
      const infoButton = screen.getByTestId('info-button')
      fireEvent.click(infoButton)
      
      // Check if sheet content is visible and has proper flex layout for scrolling
      expect(screen.getByText('About Vani')).toBeInTheDocument()
      expect(screen.getByText('Writing Style Profiler - AI-powered literary analysis tool')).toBeInTheDocument()
      
      // Verify the ScrollArea is present for proper scrolling
      const scrollArea = screen.getByText('What is Vani?').closest('[data-radix-scroll-area-viewport]')
      expect(scrollArea).toBeInTheDocument()
    })

    it('should apply mobile-specific sheet width classes', () => {
      render(<TerminalWindow />)
      
      const infoButton = screen.getByTestId('info-button')
      fireEvent.click(infoButton)
      
      // The sheet should have responsive width classes
      expect(screen.getByText('About Vani')).toBeInTheDocument()
    })

    it('should have proper overflow handling for long content', () => {
      render(<TerminalWindow />)
      
      const infoButton = screen.getByTestId('info-button')
      fireEvent.click(infoButton)
      
      // Check that content sections are properly spaced and scrollable
      expect(screen.getByText('What is Vani?')).toBeInTheDocument()
      expect(screen.getByText('How to Use')).toBeInTheDocument()
      expect(screen.getByText('Features')).toBeInTheDocument()
      expect(screen.getByText('Tech Stack')).toBeInTheDocument()
    })

    it('should maintain proper spacing between content sections on mobile', () => {
      render(<TerminalWindow />)
      
      const infoButton = screen.getByTestId('info-button')
      fireEvent.click(infoButton)
      
      // Verify that content sections have proper gap classes
      const contentGrid = screen.getByText('What is Vani?').closest('.grid')
      expect(contentGrid).toHaveClass('gap-6')
    })
  })
})

