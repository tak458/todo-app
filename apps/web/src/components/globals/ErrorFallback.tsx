"use client";

import { useState } from "react";
import type { FallbackProps } from "react-error-boundary";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const [showDetails, setShowDetails] = useState(false);

  const message = getErrorMessage(error);
  const stack = error instanceof Error ? error.stack : undefined;

  const isDev = process.env.NODE_ENV === "development";

  return (
    <Box sx={{ p: 3, maxWidth: 960, mx: "auto" }}>
      <Alert severity="error" variant="outlined">
        <AlertTitle>Something went wrong</AlertTitle>

        <Typography variant="body2" sx={{ mb: 2 }}>
          An unexpected error has occurred.
        </Typography>

        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          <Button variant="contained" color="error" onClick={resetErrorBoundary}>
            Try again
          </Button>

          <Button variant="text" color="error" onClick={() => setShowDetails((v) => !v)}>
            {showDetails ? "Hide details" : "Show details"}
          </Button>
        </Box>

        <Collapse in={showDetails}>
          <Box sx={{ mt: 2 }}>
            <Typography
              variant="caption"
              component="pre"
              sx={{
                whiteSpace: "pre-wrap",
                fontFamily: "var(--mui-font-family-monospace)",
              }}
            >
              {message}
            </Typography>

            {isDev && stack && (
              <>
                <Divider sx={{ my: 1.5 }} />

                <Typography
                  variant="caption"
                  component="pre"
                  sx={{
                    whiteSpace: "pre-wrap",
                    fontFamily: "var(--mui-font-family-monospace)",
                    opacity: 0.85,
                  }}
                >
                  {stack}
                </Typography>
              </>
            )}
          </Box>
        </Collapse>
      </Alert>
    </Box>
  );
}

function getErrorMessage(error: FallbackProps["error"]): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "string") {
    return error;
  }
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return "Unknown error";
  }
}
