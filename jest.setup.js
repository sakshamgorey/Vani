import '@testing-library/jest-dom'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
    }
  },
  useSearchParams() {
    return new URLSearchParams()
  },
  usePathname() {
    return '/'
  },
}))

// Mock fetch globally
global.fetch = jest.fn()

// Mock File API
global.File = class MockFile {
  constructor(bits, name, options = {}) {
    this.name = name
    this.size = bits.length
    this.type = options.type || ''
    this.lastModified = options.lastModified || Date.now()
  }
}

// Mock FileReader
global.FileReader = class MockFileReader {
  constructor() {
    this.readyState = 0
    this.result = null
    this.error = null
  }

  readAsText(file) {
    setTimeout(() => {
      this.readyState = 2
      this.result = 'Mock file content'
      this.onload && this.onload({ target: this })
    }, 0)
  }
}
