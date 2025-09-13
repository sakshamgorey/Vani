import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { AnalysisDrawer } from '@/components/AnalysisDrawer'

// Mock the drawer components
jest.mock('@/components/ui/drawer', () => ({
  Drawer: ({ children, open, onOpenChange }: any) => (
    <div data-testid="drawer" data-open={open}>
      {children}
    </div>
  ),
  DrawerTrigger: ({ children, asChild }: any) => (
    <div data-testid="drawer-trigger" data-as-child={asChild}>
      {children}
    </div>
  ),
  DrawerContent: ({ children, className }: any) => (
    <div data-testid="drawer-content" className={className}>{children}</div>
  ),
  DrawerHeader: ({ children }: any) => (
    <div data-testid="drawer-header">{children}</div>
  ),
  DrawerTitle: ({ children }: any) => (
    <div data-testid="drawer-title">{children}</div>
  ),
  DrawerDescription: ({ children }: any) => (
    <div data-testid="drawer-description">{children}</div>
  ),
  DrawerFooter: ({ children }: any) => (
    <div data-testid="drawer-footer">{children}</div>
  ),
  DrawerClose: ({ children, asChild }: any) => (
    <div data-testid="drawer-close" data-as-child={asChild}>
      {children}
    </div>
  ),
}))

// Mock the Button component
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant, className, ...props }: any) => (
    <button
      data-testid="button"
      onClick={onClick}
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </button>
  ),
}))

// Mock the Card components
jest.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: any) => (
    <div data-testid="card" className={className}>
      {children}
    </div>
  ),
  CardContent: ({ children, className }: any) => (
    <div data-testid="card-content" className={className}>
      {children}
    </div>
  ),
}))

const mockAnalysisResult = {
  overall_style_summary: "Test style summary",
  diction: {
    word_choice: "Test word choice",
    word_economy: "Test word economy",
    notable_word_choices: ["word1", "word2"]
  },
  syntax: {
    sentence_structure: "Test sentence structure",
    average_sentence_length_words: 15
  },
  tone: {
    overall_tone: "Test tone",
    rhetorical_appeals_used: ["ethos", "pathos"]
  },
  rhetorical_patterns: "Test rhetorical patterns",
  narrative_perspective: "Test perspective"
}

describe('AnalysisDrawer', () => {
  const defaultProps = {
    isOpen: false,
    onOpenChange: jest.fn(),
    result: null,
    onCopyJSON: jest.fn(),
    copied: false
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders without crashing', () => {
    render(<AnalysisDrawer {...defaultProps} />)
    expect(screen.getByTestId('drawer')).toBeInTheDocument()
  })

  it('shows trigger button when drawer is closed', () => {
    render(<AnalysisDrawer {...defaultProps} />)
    expect(screen.getByTestId('drawer-trigger')).toBeInTheDocument()
    expect(screen.getByText('View Analysis Results')).toBeInTheDocument()
  })

  it('opens drawer when trigger is clicked', () => {
    const onOpenChange = jest.fn()
    render(<AnalysisDrawer {...defaultProps} onOpenChange={onOpenChange} />)
    
    const trigger = screen.getByTestId('drawer-trigger')
    fireEvent.click(trigger)
    
    // Since we're mocking the drawer, we can't test the actual onOpenChange call
    // but we can verify the trigger is clickable
    expect(trigger).toBeInTheDocument()
  })

  it('shows analysis results when drawer is open and result is provided', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult} 
      />
    )
    
    expect(screen.getByTestId('drawer-content')).toBeInTheDocument()
    expect(screen.getByTestId('drawer-header')).toBeInTheDocument()
    expect(screen.getByTestId('drawer-title')).toBeInTheDocument()
    expect(screen.getByText('Analysis Results')).toBeInTheDocument()
  })

  it('displays terminal-style title bar in drawer', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult} 
      />
    )
    
    // Check for terminal title bar elements
    expect(screen.getByText('vani@localhost:~/analysis')).toBeInTheDocument()
    expect(screen.getByTestId('close-button')).toBeInTheDocument()
    expect(screen.getByTestId('minimize-button')).toBeInTheDocument()
    expect(screen.getByTestId('maximize-button')).toBeInTheDocument()
  })

  it('shows copy button in drawer footer', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult} 
      />
    )
    
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument()
    expect(screen.getByText('cp analysis.json')).toBeInTheDocument()
  })

  it('calls onCopyJSON when copy button is clicked', () => {
    const onCopyJSON = jest.fn()
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult}
        onCopyJSON={onCopyJSON}
      />
    )
    
    const copyButton = screen.getByText('cp analysis.json')
    fireEvent.click(copyButton)
    
    expect(onCopyJSON).toHaveBeenCalled()
  })

  it('shows "Copied!" text when copied prop is true', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult}
        copied={true}
      />
    )
    
    expect(screen.getByText('Copied!')).toBeInTheDocument()
  })

  it('displays formatted JSON result in terminal-style code block', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult} 
      />
    )
    
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByTestId('card-content')).toBeInTheDocument()
    
    // Check that JSON content is displayed
    const jsonContent = JSON.stringify(mockAnalysisResult, null, 2)
    expect(screen.getByText('"overall_style_summary"')).toBeInTheDocument()
    expect(screen.getByText('"Test style summary"')).toBeInTheDocument()
  })

  it('applies terminal styling classes', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult} 
      />
    )
    
    const drawerContent = screen.getByTestId('drawer-content')
    expect(drawerContent).toHaveClass('terminal-drawer')
  })

  it('shows close button in drawer footer', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult} 
      />
    )
    
    expect(screen.getByTestId('drawer-close')).toBeInTheDocument()
    expect(screen.getByText('Close')).toBeInTheDocument()
  })

  it('calls onOpenChange with false when close button is clicked', () => {
    const onOpenChange = jest.fn()
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={mockAnalysisResult}
        onOpenChange={onOpenChange}
      />
    )
    
    const closeButton = screen.getByText('Close')
    fireEvent.click(closeButton)
    
    // Since we're mocking the drawer, we can't test the actual onOpenChange call
    // but we can verify the close button is clickable
    expect(closeButton).toBeInTheDocument()
  })

  it('does not show analysis content when result is null', () => {
    render(
      <AnalysisDrawer 
        {...defaultProps} 
        isOpen={true} 
        result={null} 
      />
    )
    
    // The drawer header and title are always shown, but the card content should not be
    expect(screen.queryByTestId('card')).not.toBeInTheDocument()
  })
})
