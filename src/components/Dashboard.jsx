import { useMemo } from 'react'

function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-xs uppercase tracking-wide text-gray-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold text-gray-900">{value ?? '—'}</div>
    </div>
  )
}

function PriceChart({ prices }) {
  // Very light SVG line chart for close prices
  const { points, minY, maxY } = useMemo(() => {
    if (!prices || prices.length === 0) return { points: '', minY: 0, maxY: 0 }
    const closes = prices.map(p => p.close)
    const minY = Math.min(...closes)
    const maxY = Math.max(...closes)
    const w = 600
    const h = 200
    const dx = w / Math.max(prices.length - 1, 1)
    const scaleY = (v) => h - ((v - minY) / Math.max(maxY - minY, 1)) * h
    const path = prices.map((p, i) => `${i * dx},${scaleY(p.close)}`).join(' ')
    return { points: path, minY, maxY }
  }, [prices])

  if (!prices || prices.length === 0) return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-gray-500">No price data</div>
  )

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="text-sm text-gray-600 mb-2">Recent Close Prices</div>
      <svg viewBox="0 0 600 200" className="w-full h-48">
        <polyline fill="none" stroke="#2563eb" strokeWidth="3" points={points} />
      </svg>
      <div className="text-xs text-gray-500">Range: {minY.toFixed(2)} - {maxY.toFixed(2)}</div>
    </div>
  )
}

export default function Dashboard({ data, news }) {
  const { company, summary, financials, market_trends, competitors, pricing, projections, prices } = data || {}

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Stat label="Company" value={company} />
        <Stat label="Articles" value={news?.length ?? 0} />
        <Stat label="Last Refreshed" value={new Date(data?.last_refreshed || Date.now()).toLocaleString()} />
      </div>

      <div className="mt-6 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Summary</div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">{summary || 'No summary available.'}</p>
          </div>

          <PriceChart prices={prices} />

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Market Trends</div>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              {(market_trends || []).map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Competitors</div>
            {(!competitors || competitors.length === 0) ? (
              <p className="text-gray-500">No competitor data yet.</p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {competitors.map((c, i) => (
                  <div key={i} className="border rounded-lg p-3">
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-600">{c.note}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Financials</div>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(financials || {}).map(([k, v]) => (
                <div key={k} className="text-sm">
                  <div className="text-gray-500">{k}</div>
                  <div className="font-medium text-gray-900">{v ?? '—'}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Pricing</div>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(pricing || {}, null, 2)}</pre>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Projections</div>
            <pre className="text-xs text-gray-700 whitespace-pre-wrap">{JSON.stringify(projections || {}, null, 2)}</pre>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-lg font-semibold text-gray-900 mb-2">Latest News</div>
            <div className="space-y-3">
              {(news || []).map((n, i) => (
                <a key={i} href={n.url} target="_blank" rel="noreferrer" className="block group">
                  <div className="p-3 border rounded-lg bg-white group-hover:bg-blue-50 transition">
                    <div className="text-sm text-gray-500">{n.source} • {new Date(n.published_at || Date.now()).toLocaleString()}</div>
                    <div className="font-medium text-gray-900">{n.title}</div>
                    {n.summary && <div className="text-sm text-gray-700 line-clamp-2">{n.summary}</div>}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
