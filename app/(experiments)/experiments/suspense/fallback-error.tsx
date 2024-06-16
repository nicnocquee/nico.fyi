'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { TriangleAlert } from 'lucide-react'

export function Fallback({ error }: { error: Error }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert" className="flex w-full flex-col items-center justify-start text-center">
      <div>
        <TriangleAlert className="h-6 w-6 text-red-500" />
      </div>
      <div className="w-full max-w-md break-words p-2 text-sm text-red-500">{error.message}</div>
    </div>
  )
}

const ErrorBoundaryWithFallback = ({ children }: { children: React.ReactNode }) => {
  return <ErrorBoundary FallbackComponent={Fallback}>{children}</ErrorBoundary>
}

export default ErrorBoundaryWithFallback
