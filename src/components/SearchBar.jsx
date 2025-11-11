import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [company, setCompany] = useState('Apple')
  const [ticker, setTicker] = useState('AAPL')
  const [locale, setLocale] = useState('en-US')

  const submit = (e) => {
    e.preventDefault()
    if (!company.trim()) return
    onSearch({ company: company.trim(), ticker: ticker.trim() || undefined, locale })
  }

  return (
    <form onSubmit={submit} className="w-full max-w-3xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        className="flex-1 rounded-lg border border-gray-200 bg-white/70 backdrop-blur px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search a company (e.g., Apple, Tesla, Nvidia)"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="sm:w-40 rounded-lg border border-gray-200 bg-white/70 backdrop-blur px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Ticker (optional)"
        value={ticker}
        onChange={(e) => setTicker(e.target.value.toUpperCase())}
      />
      <select
        className="sm:w-36 rounded-lg border border-gray-200 bg-white/70 backdrop-blur px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={locale}
        onChange={(e) => setLocale(e.target.value)}
      >
        <option value="en-US">en-US</option>
        <option value="en-GB">en-GB</option>
        <option value="de-DE">de-DE</option>
        <option value="fr-FR">fr-FR</option>
        <option value="ja-JP">ja-JP</option>
      </select>
      <button
        type="submit"
        disabled={loading}
        className="sm:w-36 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 transition disabled:opacity-60"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </form>
  )
}
