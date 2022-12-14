import type { FallbackProps } from "react-error-boundary";

export interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: FallbackProps["resetErrorBoundary"];
}

export const ErrorFallback = ({ error, resetErrorBoundary }: ErrorFallbackProps) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
};
