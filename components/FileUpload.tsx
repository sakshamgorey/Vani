import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { toast } from 'sonner'

interface FileUploadProps {
  files: File[]
  onFilesChange: (files: File[]) => void
}

const MAX_FILES = 5
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['.txt', '.docx', '.pdf']

export function FileUpload({ files, onFilesChange }: FileUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > MAX_FILE_SIZE) {
      return `File "${file.name}" is too large. Maximum size is 10MB.`
    }

    // Check file type
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    if (!ALLOWED_TYPES.includes(fileExtension)) {
      return `File "${file.name}" has an unsupported format. Only .txt, .docx, and .pdf files are allowed.`
    }

    return null
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    
    // Validate all files first
    const validationErrors: string[] = []
    const validFiles: File[] = []
    
    selectedFiles.forEach(file => {
      const error = validateFile(file)
      if (error) {
        validationErrors.push(error)
      } else {
        validFiles.push(file)
      }
    })

    // Show validation errors as toasts
    validationErrors.forEach(error => {
      toast.error('Invalid file', {
        description: error
      })
    })

    if (validFiles.length === 0) {
      // If no valid files and we had files before, clear them
      if (files.length > 0) {
        onFilesChange([])
      }
      return
    }
    
    // If we already have files, add new ones up to the limit
    if (files.length > 0) {
      const totalFiles = files.length + validFiles.length
      if (totalFiles > MAX_FILES) {
        // Only add files up to the limit
        const remainingSlots = MAX_FILES - files.length
        const filesToAdd = validFiles.slice(0, remainingSlots)
        onFilesChange([...files, ...filesToAdd])
        
        if (validFiles.length > remainingSlots) {
          toast.warning('File limit reached', {
            description: `Only ${remainingSlots} of ${validFiles.length} files were added. Maximum ${MAX_FILES} files allowed.`
          })
        }
      } else {
        onFilesChange([...files, ...validFiles])
      }
    } else {
      // If no files selected yet, limit to MAX_FILES
      const filesToAdd = validFiles.slice(0, MAX_FILES)
      onFilesChange(filesToAdd)
      
      if (validFiles.length > MAX_FILES) {
        toast.warning('File limit reached', {
          description: `Only ${MAX_FILES} of ${validFiles.length} files were added. Maximum ${MAX_FILES} files allowed.`
        })
      }
    }
  }

  // Ensure we never exceed the limit (in case files are passed from parent)
  const validFiles = files.slice(0, MAX_FILES)

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const isAtMaxFiles = validFiles.length >= MAX_FILES
  const hasExceededLimit = files.length > MAX_FILES

  return (
    <motion.div 
      className="space-y-4"
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <label htmlFor="file-upload" className="block text-sm font-semibold text-foreground">
          Upload Files
        </label>
        {validFiles.length > 0 && (
          <Badge variant="outline" className="text-xs">
            {validFiles.length} of {MAX_FILES} files
          </Badge>
        )}
      </div>
      <motion.div 
        className="border-2 border-dashed border-border rounded-lg p-4 sm:p-6 text-center hover:border-muted-foreground/50 transition-colors duration-200 bg-muted/20 backdrop-blur-sm"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".txt,.docx,.pdf"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
          disabled={isAtMaxFiles}
        />
        <div 
          onClick={handleClick}
          className="cursor-pointer block"
        >
          <div className="space-y-2">
            <motion.div 
              className="mx-auto w-8 h-8 bg-primary rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <svg className="w-4 h-4 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </motion.div>
            <div>
              <p className="text-sm font-medium text-foreground">
                Click to select files or drag and drop
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Supported formats: .txt, .docx, .pdf
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <AnimatePresence>
        {validFiles.length > 0 && (
          <motion.div 
            className="bg-muted/20 backdrop-blur-sm rounded-lg p-4 border border-border"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h4 className="text-sm font-semibold text-foreground mb-3">Selected Files:</h4>
            <ul className="space-y-2">
              {validFiles.map((file, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center justify-between text-sm"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <span className="text-muted-foreground font-medium">{file.name}</span>
                  <Badge variant="secondary" className="text-xs">
                    {(file.size / 1024).toFixed(1)} KB
                  </Badge>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {validFiles.length === 0 && (
          <motion.div 
            className="text-sm text-muted-foreground text-center py-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            No files selected
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Error message for exceeding file limit */}
      <AnimatePresence>
        {hasExceededLimit && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertDescription>
                Maximum {MAX_FILES} files allowed. Please remove some files before adding more.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
