import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TerminalLogo } from '../../components/TerminalLogo';

describe('TerminalLogo', () => {
  it('renders without crashing', () => {
    render(<TerminalLogo />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    render(<TerminalLogo size={32} />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('width', '32');
    expect(svgElement).toHaveAttribute('height', '32');
  });

  it('applies custom className', () => {
    render(<TerminalLogo className="custom-class" />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveClass('custom-class');
  });

  it('renders with animation by default', () => {
    render(<TerminalLogo />);
    const svgElement = document.querySelector('svg');
    const animateElement = svgElement?.querySelector('animate');
    expect(animateElement).toBeInTheDocument();
  });

  it('renders without animation when animated is false', () => {
    render(<TerminalLogo animated={false} />);
    const svgElement = document.querySelector('svg');
    const animateElement = svgElement?.querySelector('animate');
    expect(animateElement).not.toBeInTheDocument();
  });

  it('has correct viewBox attribute', () => {
    render(<TerminalLogo />);
    const svgElement = document.querySelector('svg');
    expect(svgElement).toHaveAttribute('viewBox', '0 0 64 64');
  });

  it('contains terminal window elements', () => {
    render(<TerminalLogo />);
    const svgElement = document.querySelector('svg');
    
    // Check for terminal window background
    const backgroundRect = svgElement?.querySelector('rect[fill="#1a1a1a"]');
    expect(backgroundRect).toBeInTheDocument();
    
    // Check for terminal header
    const headerRect = svgElement?.querySelector('rect[fill="#2d2d2d"]');
    expect(headerRect).toBeInTheDocument();
    
    // Check for terminal controls (circles)
    const controls = svgElement?.querySelectorAll('circle');
    expect(controls).toHaveLength(3);
    
    // Check for terminal content area
    const contentRect = svgElement?.querySelector('rect[fill="#000000"]');
    expect(contentRect).toBeInTheDocument();
  });

  it('contains terminal text elements', () => {
    render(<TerminalLogo />);
    const svgElement = document.querySelector('svg');
    
    // Check for prompt symbol
    const promptText = svgElement?.querySelector('text[fill="#00ff00"]');
    expect(promptText).toBeInTheDocument();
    expect(promptText?.textContent).toBe('$');
    
    // Check for terminal text lines
    const textElements = svgElement?.querySelectorAll('text');
    expect(textElements?.length).toBeGreaterThan(1);
  });
});
