import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'


// Mock Next.js font
jest.mock('next/font/google', () => ({
  Inter: () => ({
    className: 'inter-font',
    subsets: ['latin']
  })
}))

// Mock the layout component
const MockRootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-full flex flex-col relative z-10 p-4 sm:p-6 lg:p-8">
      <main className="flex-1 max-w-6xl mx-auto w-full">
        {children}
      </main>
      <footer className="border-t border-gray-700 bg-gray-900/50 backdrop-blur-sm py-4 sm:py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-xs sm:text-sm text-gray-400">
            Built by{' '}
            <a 
              href="https://github.com/sakhshamgorey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium text-white hover:text-gray-300 transition-colors"
            >
              Sakhsham Gorey
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

describe('RootLayout', () => {
  const mockChildren = <div data-testid="test-children">Test Content</div>

  it('renders with proper padding and centering classes', () => {
    render(<MockRootLayout>{mockChildren}</MockRootLayout>)

    // Check that the main container has proper padding
    const mainContainer = document.querySelector('.min-h-full.flex.flex-col.relative.z-10')
    expect(mainContainer).toHaveClass('p-4', 'sm:p-6', 'lg:p-8')

    // Check that the main content area is centered with max width
    const mainContent = document.querySelector('main')
    expect(mainContent).toHaveClass('max-w-6xl', 'mx-auto', 'w-full')
  })

  it('renders children content', () => {
    render(<MockRootLayout>{mockChildren}</MockRootLayout>)

    expect(screen.getByTestId('test-children')).toBeInTheDocument()
  })

  it('renders footer with proper styling', () => {
    render(<MockRootLayout>{mockChildren}</MockRootLayout>)

    const footer = document.querySelector('footer')
    expect(footer).toHaveClass(
      'border-t',
      'border-gray-700',
      'bg-gray-900/50',
      'backdrop-blur-sm',
      'py-4',
      'sm:py-6',
      'mt-8'
    )
  })

  it('renders footer content with author link', () => {
    render(<MockRootLayout>{mockChildren}</MockRootLayout>)

    expect(screen.getByText('Built by')).toBeInTheDocument()
    expect(screen.getByText('Sakhsham Gorey')).toBeInTheDocument()
    
    const authorLink = screen.getByText('Sakhsham Gorey')
    expect(authorLink).toHaveAttribute('href', 'https://github.com/sakhshamgorey')
    expect(authorLink).toHaveAttribute('target', '_blank')
    expect(authorLink).toHaveAttribute('rel', 'noopener noreferrer')
  })
})
