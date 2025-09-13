// Core analysis result interface
export interface AnalysisResult {
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

// File validation types
export interface FileValidationResult {
  isValid: boolean
  errors: string[]
  warnings: string[]
}

export interface FileInfo {
  file: File
  size: number
  type: string
  isValid: boolean
  validationErrors: string[]
}

// API response types
export interface ApiResponse<T> {
  data?: T
  error?: string
  success: boolean
  timestamp: string
}

export interface AnalysisRequest {
  files: File[]
}

// Error types
export interface AppError {
  code: string
  message: string
  userMessage: string
  retryable: boolean
  timestamp: string
}

// Loading and state types
export interface LoadingState {
  isLoading: boolean
  progress?: number
  stage?: 'uploading' | 'processing' | 'analyzing'
}

// Cache types
export interface CacheEntry<T> {
  data: T
  timestamp: number
  expiresAt: number
  key: string
}

// Rate limiting types
export interface RateLimitInfo {
  remaining: number
  resetTime: number
  limit: number
}
