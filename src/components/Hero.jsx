import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden">
      <Spline scene="https://prod.spline.design/8nsoLg1te84JZcE9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 drop-shadow-sm">
            BusinessInsight
          </h1>
          <p className="mt-3 text-gray-700 text-base sm:text-lg max-w-2xl mx-auto">
            AI-powered business intelligence. Search any company and get a consolidated snapshot of news, pricing, competitors, and trends.
          </p>
        </div>
      </div>
    </div>
  )
}
