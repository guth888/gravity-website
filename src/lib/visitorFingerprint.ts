// src/lib/visitorFingerprint.ts

export type TrafficSource =
  | "direct"
  | "organic_search"
  | "paid_search"
  | "social"
  | "referral"
  | "email"
  | "unknown";

export type VisitorSegment =
  | "b2b_saas"
  | "agency"
  | "ecommerce"
  | "solo_builder"
  | "enterprise"
  | "unknown";

export interface VisitorFingerprint {
  companyName?: string;        // e.g. "Mid-market B2B SaaS"
  industry?: string;           // e.g. "Software", "Marketing Services"
  segment: VisitorSegment;
  country?: string;
  region?: string;
  city?: string;
  timezone?: string;           // e.g. "America/New_York"
  trafficSource: TrafficSource;
  landingPath?: string;
  pagesViewed: string[];
  personaGuess: string;        // human-readable, e.g. "SaaS growth lead"
  confidence: number;          // 0–1
  userAgent?: string;          // raw user agent for device detection
}

/**
 * Normalize arbitrary provider data into our VisitorFingerprint shape.
 * Works with ipinfo.io response format:
 * {
 *   "ip": "...",
 *   "hostname": "...",
 *   "city": "...",
 *   "region": "...",
 *   "country": "...",
 *   "org": "AS12345 Company Name",
 *   "loc": "...",
 *   "timezone": "..."
 * }
 * 
 * Also accepts pre-enriched fields like segment, trafficSource, personaGuess.
 */
export function normalizeVisitorFingerprint(raw: any): VisitorFingerprint {
  // Derive companyName from org field (strip ASN prefix)
  const org = typeof raw.org === "string" ? raw.org : "";
  const companyName = raw.companyName ?? (
    org.includes(" ")
      ? org.split(" ").slice(1).join(" ")
      : undefined
  );

  const fp: VisitorFingerprint = {
    companyName,
    industry: raw.industry,
    segment: raw.segment ?? "unknown",
    country: raw.country,
    region: raw.region,
    city: raw.city,
    timezone: raw.timezone,
    trafficSource: raw.trafficSource ?? "unknown",
    landingPath: raw.landingPath,
    pagesViewed: raw.pagesViewed ?? [],
    personaGuess:
      raw.personaGuess ??
      "Operator evaluating AI monetization / performance channels.",
    confidence: raw.confidence ?? 0.7,
    userAgent: raw.userAgent,
  };
  return fp;
}

/**
 * Fetch visitor fingerprint from ipinfo.io and enrich with browser context.
 * Falls back to mockVisitorFingerprintFromBrowser() if token is missing or request fails.
 */
export async function fetchVisitorFingerprintFromIpinfo(context: {
  referer?: string;
  path?: string;
  userAgent?: string;
}): Promise<VisitorFingerprint> {
  const token = import.meta.env.VITE_IPINFO_TOKEN;
  
  if (!token) {
    // Fallback to existing mock if token missing
    return mockVisitorFingerprintFromBrowser();
  }

  try {
    const res = await fetch(`https://ipinfo.io/json?token=${token}`);
    
    if (!res.ok) {
      // Fallback gracefully on error
      return mockVisitorFingerprintFromBrowser();
    }

    const raw = await res.json();

    // Derive trafficSource and persona/segment from referer + path
    const referer = context.referer ?? "";
    const path = context.path ?? "/";
    const ua = (context.userAgent ?? "").toLowerCase();

    // Traffic source heuristic
    let trafficSource: TrafficSource = "direct";
    if (referer.includes("google")) trafficSource = "organic_search";
    if (referer.includes("gclid=") || referer.includes("utm_source=google")) {
      trafficSource = "paid_search";
    }
    if (
      referer.includes("linkedin") ||
      referer.includes("twitter") ||
      referer.includes("x.com")
    ) {
      trafficSource = "social";
    }
    if (referer.includes("utm_medium=email") || referer.includes("mailchimp") || referer.includes("sendgrid")) {
      trafficSource = "email";
    }
    if (referer && !referer.includes(window?.location?.hostname ?? "") && trafficSource === "direct") {
      trafficSource = "referral";
    }

    // Segment and persona guess from path
    let segment: VisitorSegment = "unknown";
    let personaGuess = "Operator evaluating AI monetization / performance.";

    if (path.includes("docs") || path.includes("publishers")) {
      segment = "b2b_saas";
      personaGuess = "Product / platform lead with LLM traffic to monetize.";
    } else if (path.includes("advertisers")) {
      segment = "b2b_saas";
      personaGuess = "Growth / performance marketer exploring new channels.";
    } else if (path.includes("integration") || path.includes("sdk")) {
      segment = "b2b_saas";
      personaGuess = "Technical lead evaluating integration complexity.";
    }

    // Environment guess based on UA
    const envHint =
      ua.includes("mac") || ua.includes("safari")
        ? "Mac-heavy, product-led environment"
        : ua.includes("windows")
        ? "Windows-heavy, enterprise-leaning environment"
        : ua.includes("linux")
        ? "Developer-heavy Linux environment"
        : undefined;

    const enrichedRaw = {
      ...raw,
      segment,
      trafficSource,
      landingPath: path,
      pagesViewed: [path],
      personaGuess,
      environmentHint: envHint,
      userAgent: context.userAgent,
    };

    const fp = normalizeVisitorFingerprint(enrichedRaw);

    // If environmentHint is set and companyName is undefined, use it as fallback
    if (!fp.companyName && envHint) {
      fp.companyName = envHint;
    }

    return fp;
  } catch (error) {
    console.error("fetchVisitorFingerprintFromIpinfo error:", error);
    return mockVisitorFingerprintFromBrowser();
  }
}

/**
 * Client-side fingerprint generator using browser APIs.
 * Fallback when ipinfo.io is not available.
 */
export function mockVisitorFingerprintFromBrowser(): VisitorFingerprint {
  // SSR safety check
  if (typeof window === "undefined") {
    return {
      segment: "unknown",
      trafficSource: "unknown",
      pagesViewed: [],
      personaGuess: "Operator evaluating AI infrastructure.",
      confidence: 0.5,
    };
  }

  const referer = document.referrer;
  const urlPath = window.location.pathname;
  const userAgent = navigator.userAgent.toLowerCase();

  // Determine traffic source from referrer
  let trafficSource: TrafficSource = "direct";
  if (referer.includes("google")) trafficSource = "organic_search";
  if (referer.includes("gclid=") || referer.includes("utm_source=google")) {
    trafficSource = "paid_search";
  }
  if (referer.includes("linkedin") || referer.includes("twitter") || referer.includes("x.com")) {
    trafficSource = "social";
  }
  if (referer.includes("utm_medium=email") || referer.includes("mailchimp") || referer.includes("sendgrid")) {
    trafficSource = "email";
  }
  if (referer && !referer.includes(window.location.hostname) && trafficSource === "direct") {
    trafficSource = "referral";
  }

  // Infer segment and persona from URL path
  let segment: VisitorSegment = "unknown";
  let personaGuess = "Operator evaluating AI monetization / performance.";

  if (urlPath.includes("docs") || urlPath.includes("publishers")) {
    segment = "b2b_saas";
    personaGuess = "Product / platform lead with LLM traffic to monetize.";
  } else if (urlPath.includes("advertisers")) {
    segment = "b2b_saas";
    personaGuess = "Growth / performance marketer exploring new channels.";
  } else if (urlPath.includes("integration") || urlPath.includes("sdk")) {
    segment = "b2b_saas";
    personaGuess = "Technical lead evaluating integration complexity.";
  }

  // Infer environment from user agent
  const companyName = userAgent.includes("mac")
    ? "Mac-heavy, product-led environment"
    : userAgent.includes("windows")
    ? "Typical enterprise Windows environment"
    : userAgent.includes("linux")
    ? "Developer-heavy Linux environment"
    : undefined;

  return {
    companyName,
    industry: "Software / Digital",
    segment,
    country: undefined,  // TODO: Fill from real geo provider (IP lookup)
    region: undefined,
    city: undefined,
    trafficSource,
    landingPath: urlPath,
    pagesViewed: [urlPath],
    personaGuess,
    confidence: 0.65,
  };
}

