'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FileUpload } from './FileUpload'
import { TerminalWindow } from './TerminalWindow'
import { AnalysisDrawer } from './AnalysisDrawer'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { toast } from 'sonner'

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

export const TerminalFeatures: React.FC = () => {
  const [files, setFiles] = useState<File[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleFilesChange = (newFiles: File[]) => {
    setFiles(newFiles)
  }
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<AnalysisResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const handleAnalyze = async () => {
    if (files.length === 0) {
      toast.error('No files selected', {
        description: 'Please select at least one file to analyze'
      })
      return
    }

    setIsLoading(true)
    setError(null)
    setResult(null)

    try {
      const formData = new FormData()
      files.forEach(file => {
        formData.append('files', file)
      })

      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        const errorMessage = errorData.error || `HTTP error! status: ${response.status}`
        throw new Error(errorMessage)
      }

      const data = await response.json()
      setResult(data)
      setIsDrawerOpen(true)
      toast.success('Analysis completed successfully', {
        description: 'Your writing style analysis is ready to view'
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Analysis failed'
      setError(errorMessage)
      toast.error('Analysis failed', {
        description: errorMessage
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyJSON = async () => {
    if (!result) return
    
    try {
      await navigator.clipboard.writeText(JSON.stringify(result, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success('Copied to clipboard', {
        description: 'Analysis results copied successfully'
      })
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
      toast.error('Failed to copy', {
        description: 'Unable to copy analysis results to clipboard'
      })
    }
  }


  return (
    <div className="min-h-screen font-mono text-foreground p-2 sm:p-4 lg:p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-6xl mx-auto">
        <TerminalWindow>
          <div className="space-y-8 terminal-content">
            {/* Terminal Header */}
            <div className="text-center space-y-4">
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground  text-visible"
                initial={isMounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                Vani
              </motion.h1>
              
                {/* <motion.h2 
                  className="text-lg sm:text-xl lg:text-2xl text-foreground text-visible"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  Writing Style Profiler
                </motion.h2> */}
              
              <motion.p 
                className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed text-visible px-4"
                initial={isMounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                Analyze your writing style with AI-powered literary and rhetorical insights. 
                Get detailed analysis of diction, syntax, tone, and rhetorical patterns.
              </motion.p>
            </div>

            {/* Command Line Interface */}
            <div className="space-y-6">
              {/* Command Prompt */}
              <motion.div 
                className="text-foreground text-lg font-mono text-visible"
                initial={isMounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                $ upload_files
              </motion.div>

              {/* File Upload Area */}
              <motion.div
               initial={isMounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
                className="text-visible"
              >
                <FileUpload files={files} onFilesChange={handleFilesChange} />
              </motion.div>

              {/* Execute Button */}
              <motion.div
               initial={isMounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.8 }}
                className="text-center text-visible"
              >
                <Button
                  onClick={handleAnalyze}
                  disabled={isLoading || files.length === 0}
                  size="lg"
                  className="terminal-button font-mono text-lg py-4 px-8 bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {isLoading ? 'Processing' : './analyze --execute'}
                </Button>
              </motion.div>
            </div>

            {/* Analysis Drawer */}
            <motion.div
             initial={isMounted ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
              className="text-center"
            >
              <AnalysisDrawer
                isOpen={isDrawerOpen}
                onOpenChange={setIsDrawerOpen}
                result={result}
                onCopyJSON={handleCopyJSON}
                copied={copied}
              />
            </motion.div>

            {/* Error Display */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-destructive/20 border border-destructive rounded-lg p-4 text-destructive-foreground font-mono"
              >
                Error: {error}
              </motion.div>
            )}
          </div>
        </TerminalWindow>
      </div>
    </div>
  )
}

