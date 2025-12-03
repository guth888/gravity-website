// src/hooks/useVisitorFingerprint.ts
"use client";

import { useEffect, useState } from "react";
import {
  VisitorFingerprint,
  fetchVisitorFingerprintFromIpinfo,
} from "@/lib/visitorFingerprint";

interface UseVisitorFingerprintResult {
  fingerprint: VisitorFingerprint | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to get visitor fingerprint data.
 * Uses ipinfo.io for real IP-based data enriched with browser context.
 * Falls back to mock data if ipinfo token is not configured.
 */
export function useVisitorFingerprint(): UseVisitorFingerprintResult {
  const [fingerprint, setFingerprint] = useState<VisitorFingerprint | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        setLoading(true);
        setError(null);

        // Gather browser context
        const referer = typeof document !== "undefined" ? document.referrer : undefined;
        const path = typeof window !== "undefined" ? window.location.pathname : undefined;
        const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : undefined;

        // Fetch from ipinfo.io (with fallback to mock)
        const fp = await fetchVisitorFingerprintFromIpinfo({
          referer,
          path,
          userAgent,
        });

        if (!cancelled) {
          setFingerprint(fp);
        }
      } catch (e) {
        console.error("useVisitorFingerprint error:", e);
        if (!cancelled) {
          setError("Unable to analyze your signal.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
  }, []);

  return { fingerprint, loading, error };
}

