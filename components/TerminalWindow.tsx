import React, { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Info } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { motion } from 'framer-motion'

interface TerminalWindowProps {
  children: React.ReactNode
}

export const TerminalWindow: React.FC<TerminalWindowProps> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <motion.div
      initial={isMounted ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
    <Card 
      data-testid="terminal-window"
      className="terminal-window bg-card border-border shadow-3xl overflow-hidden w-full"
    >
      {/* Terminal Title Bar */}
      <div 
        data-testid="terminal-title-bar"
        className="bg-muted/50 flex items-center px-4 py-2 border-b border-border"
      >
        {/* Traffic Light Buttons */}
        <div className="flex space-x-2 mr-4">
          <div 
            data-testid="close-button"
            className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors cursor-pointer"
          />
          <div 
            data-testid="minimize-button"
            className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors cursor-pointer"
          />
          <div 
            data-testid="maximize-button"
            className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-400 transition-colors cursor-pointer"
          />
        </div>
        
        {/* Terminal Title */}
        <div className="text-muted-foreground text-sm font-mono flex-1">
          vani@localhost:~/writing-profiler
        </div>
        
        {/* Info Button */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm"
              className="h-6 w-6 p-0 hover:bg-muted/80"
              data-testid="info-button"
            >
              <Info className="h-4 w-4" />
              <span className="sr-only">Show site information</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] md:w-[540px] flex flex-col max-h-screen p-0">
            <SheetHeader className="flex-shrink-0 p-6 pb-0">
              <SheetTitle>About Vani</SheetTitle>
              <SheetDescription>
                Writing Style Profiler - AI-powered literary analysis tool
              </SheetDescription>
            </SheetHeader>
            <ScrollArea className="flex-1 px-6">
              <div className="grid gap-6 py-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">What is Vani?</h3>
                <p className="text-sm text-muted-foreground">
                  Vani is an AI-powered writing style profiler that analyzes text using Google's Gemini AI. 
                  It provides comprehensive literary analysis including diction, syntax, tone, and rhetorical patterns.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">How to Use</h3>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-foreground">1.</span>
                    <span>upload a file(s) (.txt, .docx, or .pdf)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-foreground">2.</span>
                    <span>Click "Analyze Writing Style" to process your text with AI</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-foreground">3.</span>
                    <span>Review the detailed analysis including style summary, word choice, sentence structure, and tone</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-medium text-foreground">4.</span>
                    <span>Copy the JSON results to use in your own applications</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Features</h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Multi-format file support (TXT, DOCX, PDF)</li>
                  <li>• AI-powered literary analysis</li>
                  <li>• Detailed style breakdown</li>
                  <li>• JSON export functionality</li>
                  <li>• Responsive terminal interface</li>
                </ul>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Tech Stack</h3>
                <div className="text-sm text-muted-foreground">
                  <p>Built with Next.js 14, TypeScript, Tailwind CSS, and Google Gemini AI</p>
                </div>
              </div>
              </div>
              <footer className="backdrop-blur-sm py-4 sm:py-6 mt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center text-xs sm:text-sm text-muted-foreground">
                    Built by{' '}
                    <a 
                      href="https://github.com/sakshamgorey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="font-medium text-foreground hover:text-muted-foreground transition-colors"
                    >
                      Saksham Gorey
                    </a>
                  </div>
                </div>
              </footer>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      
      {/* Terminal Content */}
      <div className="p-6 sm:p-8 lg:p-10">
        {children}
      </div>
    </Card>
    </motion.div>
  )
}

