'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'

interface AnalysisResult {
  overall_style_summary: string
  diction: {
    word_choice: string
    word_economy: string
    notable_word_choices: string[]
  }
  syntax: {
    sentence_structure: string
    average_sentence_length_words: number
  }
  tone: {
    overall_tone: string
    rhetorical_appeals_used: string[]
  }
  rhetorical_patterns: string
  narrative_perspective: string
}

interface AnalysisDrawerProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  result: AnalysisResult | null
  onCopyJSON: () => void
  copied: boolean
}

export const AnalysisDrawer: React.FC<AnalysisDrawerProps> = ({
  isOpen,
  onOpenChange,
  result,
  onCopyJSON,
  copied
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="font-mono w-full sm:w-auto"
          disabled={!result}
        >
          View Analysis Results
        </Button>
      </DrawerTrigger>
      <DrawerContent className="terminal-drawer bg-card border-border shadow-3xl h-[75vh] min-h-[600px]">
        {/* Terminal Title Bar */}
        <div className="bg-muted/50 flex items-center px-4 py-2 border-b border-border mt-3">
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
            vani@localhost:~/analysis
          </div>
        </div>

        <DrawerHeader className="text-left">
          <DrawerTitle className="text-xl sm:text-2xl font-bold text-foreground font-mono">
            Analysis Results
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground font-mono">
            Detailed writing style analysis with AI-powered insights
          </DrawerDescription>
        </DrawerHeader>

        {result && (
          <div className="px-4 pb-4 flex-1 overflow-hidden">
            {/* Syntax-Highlighted JSON Output */}
            <Card className="bg-muted/20 backdrop-blur-sm border-border overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <ScrollArea className="h-full w-full">
                  <div className="p-4 sm:p-6">
                    <pre className="bg-transparent border-0 font-mono text-xs sm:text-sm resize-none text-foreground focus:outline-none">
                      <code className="language-json">
                        {JSON.stringify(result, null, 2)
                          .split('\n')
                          .map((line, index, array) => {
                            // Basic syntax highlighting
                            let highlightedLine = line
                              .replace(/"([^"]+)":/g, '<span class="text-blue-400">"$1"</span>:')
                              .replace(/: (\d+)/g, ': <span class="text-green-400">$1</span>')
                              .replace(/: "(.*?)"/g, ': <span class="text-yellow-400">"$1"</span>')
                              .replace(/(true|false|null)/g, '<span class="text-purple-400">$1</span>')
                            
                            // Add extra spacing for better readability
                            const isObjectStart = line.includes('{') && !line.includes('"')
                            const isObjectEnd = line.includes('}') && !line.includes('"')
                            const isArrayStart = line.includes('[') && !line.includes('"')
                            const isArrayEnd = line.includes(']') && !line.includes('"')
                            const isTopLevelProperty = line.match(/^\s*"[^"]+":\s*{/) // Top-level object properties
                            const isClosingBrace = line.match(/^\s*},?\s*$/) // Closing braces
                            
                            // Add margin bottom for better spacing
                            let spacingClass = "mb-1"
                            if (isObjectStart || isArrayStart) {
                              spacingClass = "mb-2 mt-1"
                            } else if (isObjectEnd || isArrayEnd) {
                              spacingClass = "mt-2 mb-1"
                            } else if (isTopLevelProperty) {
                              spacingClass = "mt-3 mb-1"
                            } else if (isClosingBrace) {
                              spacingClass = "mb-2"
                            }
                            
                            return (
                              <div key={index} 
                                   className={`whitespace-pre ${spacingClass}`}
                                   dangerouslySetInnerHTML={{ __html: highlightedLine }}
                              />
                            )
                          })}
                      </code>
                    </pre>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        )}

        <DrawerFooter className="pt-2">
          <div className="flex flex-col sm:flex-row gap-2 w-full">
            <Button
              onClick={onCopyJSON}
              variant="outline"
              size="sm"
              className="font-mono flex-1"
            >
              <svg className="w-3 h-3 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              {copied ? 'Copied!' : 'cp analysis.json'}
            </Button>
            <DrawerClose asChild>
              <Button variant="outline" size="sm" className="font-mono flex-1">
                Close
              </Button>
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
