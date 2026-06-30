'use client'

export function IssueSkeleton() {
  return (
    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md transition-all duration-300 animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gradient-to-r from-muted via-muted to-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" style={{
          animation: 'shimmer 2s infinite'
        }} />
      </div>

      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-muted rounded-lg w-3/4" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded-lg w-full" />
          <div className="h-4 bg-muted rounded-lg w-5/6" />
        </div>

        {/* Category badge */}
        <div className="h-6 bg-muted rounded-full w-24" />

        {/* Footer */}
        <div className="flex items-center justify-between pt-2">
          <div className="h-8 bg-muted rounded-lg flex-1 mr-2" />
          <div className="h-8 bg-muted rounded-lg w-12" />
        </div>
      </div>
    </div>
  )
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* KPI cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-xl p-6 border border-border">
            <div className="h-4 bg-muted rounded w-1/2 mb-3" />
            <div className="h-8 bg-muted rounded w-3/4" />
          </div>
        ))}
      </div>

      {/* Chart skeleton */}
      <div className="bg-card rounded-xl p-6 border border-border h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer" style={{
          animation: 'shimmer 2s infinite'
        }} />
      </div>
    </div>
  )
}

export function TimelineSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-8 h-8 bg-muted rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-3 bg-muted rounded w-full" />
            <div className="h-3 bg-muted rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  )
}

export const shimmerStyle = `
  @keyframes shimmer {
    0% {
      transform: translateX(-100%);
    }
    100% {
      transform: translateX(100%);
    }
  }
`
