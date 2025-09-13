import React from 'react';

interface TerminalLogoProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

/**
 * TerminalLogo component - displays a terminal window icon
 * @param size - Size of the logo in pixels (default: 64)
 * @param className - Additional CSS classes
 * @param animated - Whether to show animated cursor (default: true)
 */
export const TerminalLogo: React.FC<TerminalLogoProps> = ({ 
  size = 64, 
  className = '', 
  animated = true 
}) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 64 64" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Terminal window background */}
      <rect x="4" y="8" width="56" height="48" rx="4" fill="#1a1a1a" stroke="#333" strokeWidth="2"/>
      
      {/* Terminal window header */}
      <rect x="4" y="8" width="56" height="16" rx="4" fill="#2d2d2d"/>
      
      {/* Terminal window controls */}
      <circle cx="12" cy="16" r="3" fill="#ff5f57"/>
      <circle cx="20" cy="16" r="3" fill="#ffbd2e"/>
      <circle cx="28" cy="16" r="3" fill="#28ca42"/>
      
      {/* Terminal content area */}
      <rect x="8" y="28" width="48" height="24" fill="#000000"/>
      
      {/* Terminal prompt */}
      <text x="10" y="40" fontFamily="monospace" fontSize="8" fill="#00ff00">$</text>
      
      {/* Terminal cursor */}
      <rect x="14" y="36" width="2" height="8" fill="#00ff00">
        {animated && (
          <animate 
            attributeName="opacity" 
            values="1;0;1" 
            dur="1s" 
            repeatCount="indefinite"
          />
        )}
      </rect>
      
      {/* Terminal text lines */}
      <text x="10" y="48" fontFamily="monospace" fontSize="6" fill="#ffffff">npm run dev</text>
      <text x="10" y="56" fontFamily="monospace" fontSize="6" fill="#888888">Starting development server...</text>
    </svg>
  );
};

export default TerminalLogo;
