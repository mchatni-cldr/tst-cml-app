import React, { useState } from 'react'

function App() {
  const [message, setMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleClick = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    try {
      const response = await fetch('/api/hello')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      setMessage(data.message)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch')
      console.error('Error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          🧪 CML Test App
        </h1>
        
        <div className="space-y-4">
          <button
            onClick={handleClick}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? '⏳ Loading...' : '👋 Say Hello'}
          </button>

          {message && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 animate-fade-in">
              <p className="text-green-800 text-lg font-medium text-center">
                {message}
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800 text-sm">
                ❌ Error: {error}
              </p>
            </div>
          )}

          <div className="text-center text-sm text-gray-500 mt-6">
            <p>Frontend: React + TypeScript + Vite + Tailwind</p>
            <p>Backend: Flask</p>
            <p>Platform: Cloudera AI</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App