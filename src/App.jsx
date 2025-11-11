import { useState } from 'react'
import Hero from './components/Hero'
import SearchBar from './components/SearchBar'
import Dashboard from './components/Dashboard'

function App() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const [news, setNews] = useState([])
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onSearch = async ({ company, ticker, locale }) => {
    setLoading(true)
    setError('')
    try {
      const resp = await fetch(`${baseUrl}/api/search`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ company, ticker, locale })
      })
      if (!resp.ok) throw new Error(`Search failed: ${resp.status}`)
      const json = await resp.json()
      setData(json)
      // Fetch news separately to ensure we always show fresh list
      try {
        const n = await fetch(`${baseUrl}/api/news?company=${encodeURIComponent(company)}&limit=10`)
        setNews(n.ok ? await n.json() : [])
      } catch {
        setNews([])
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Hero />
      <div className="py-8 px-4">
        <SearchBar onSearch={onSearch} loading={loading} />
        {error && (
          <div className="max-w-3xl mx-auto mt-4 rounded-md bg-red-50 border border-red-200 text-red-800 px-4 py-3">
            {error}
          </div>
        )}
        {data ? (
          <div className="mt-8">
            <Dashboard data={data} news={news} />
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center text-gray-600 mt-8">
            Try a search to see consolidated insights. Example: Apple with ticker AAPL.
          </div>
        )}
      </div>
    </div>
  )
}

export default App
