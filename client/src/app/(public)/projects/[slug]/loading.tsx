export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="h-8 w-32 bg-muted rounded animate-pulse" />
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
              <div className="h-8 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section Skeleton */}
      <section className="py-16 bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="h-6 w-32 bg-muted rounded-full mx-auto mb-6 animate-pulse" />
            <div className="h-16 w-3/4 bg-muted rounded mx-auto mb-6 animate-pulse" />
            <div className="h-6 w-1/2 bg-muted rounded mx-auto mb-8 animate-pulse" />
            <div className="flex items-center justify-center gap-8">
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
              <div className="h-4 w-20 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
      </section>

      {/* Project Image Skeleton */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-96 w-full bg-muted rounded-2xl animate-pulse" />
        </div>
      </section>

      {/* Content Skeleton */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="h-8 w-48 bg-muted rounded mb-6 animate-pulse" />
                <div className="flex flex-wrap gap-3">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="h-8 w-20 bg-muted rounded animate-pulse"
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="h-6 w-32 bg-muted rounded animate-pulse" />
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-muted rounded animate-pulse" />
                    <div className="flex-1">
                      <div className="h-4 w-16 bg-muted rounded mb-1 animate-pulse" />
                      <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
