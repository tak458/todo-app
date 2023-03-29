import { useErrorBoundary } from "react-error-boundary";

export interface ErrorFallbackProps {
  error: Error;
}

export function ErrorFallback({ error }: ErrorFallbackProps) {
  const { resetBoundary } = useErrorBoundary();

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetBoundary}>Try again</button>
    </div>
  );
}
