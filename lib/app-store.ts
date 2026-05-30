export interface AppStoreMeta {
  appId: string;
  country: string;
  url: string;
  icon: string | null;
  rating: number | null;
  ratingCount: number | null;
  screenshots: string[];
  sellerName: string | null;
  releaseDate: string | null;
  version: string | null;
}

const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/**
 * Parses an apps.apple.com URL into the country code + numeric app id.
 */
export function parseAppStoreUrl(
  url: string | null | undefined
): { country: string; appId: string } | null {
  if (!url) return null;
  const match = url.match(
    /apps\.apple\.com\/([a-z]{2})\/app\/[^/]+\/id(\d+)/i
  );
  if (!match) return null;
  return { country: match[1].toLowerCase(), appId: match[2] };
}

interface ItunesLookupResult {
  resultCount: number;
  results: Array<{
    trackId: number;
    trackViewUrl: string;
    artworkUrl512?: string;
    artworkUrl100?: string;
    artworkUrl60?: string;
    averageUserRating?: number;
    userRatingCount?: number;
    screenshotUrls?: string[];
    ipadScreenshotUrls?: string[];
    sellerName?: string;
    releaseDate?: string;
    version?: string;
  }>;
}

/**
 * Fetches public App Store metadata via the iTunes Lookup API + a
 * lightweight scraping fallback for screenshots when iTunes returns none.
 */
export async function fetchAppStoreMeta(
  url: string
): Promise<AppStoreMeta | null> {
  const parsed = parseAppStoreUrl(url);
  if (!parsed) return null;

  const { country, appId } = parsed;
  const endpoint = `https://itunes.apple.com/lookup?id=${appId}&country=${country}`;

  let lookup: ItunesLookupResult["results"][number] | null = null;
  try {
    const res = await fetch(endpoint, { next: { revalidate: 86400 } });
    if (res.ok) {
      const data = (await res.json()) as ItunesLookupResult;
      lookup = data.results?.[0] ?? null;
    }
  } catch {
    // ignore — we'll try scraping below
  }

  let screenshots =
    lookup?.screenshotUrls && lookup.screenshotUrls.length > 0
      ? lookup.screenshotUrls
      : lookup?.ipadScreenshotUrls ?? [];

  // Fallback: scrape the apps.apple.com HTML for screenshot URLs
  if (screenshots.length === 0) {
    screenshots = await scrapeAppStoreScreenshots(url);
  }

  if (!lookup && screenshots.length === 0) return null;

  return {
    appId,
    country,
    url,
    icon: lookup?.artworkUrl512 ?? lookup?.artworkUrl100 ?? null,
    rating: lookup?.averageUserRating ?? null,
    ratingCount: lookup?.userRatingCount ?? null,
    screenshots,
    sellerName: lookup?.sellerName ?? null,
    releaseDate: lookup?.releaseDate ?? null,
    version: lookup?.version ?? null,
  };
}

/**
 * Pulls screenshot URLs by scraping the apps.apple.com HTML page.
 * Used when iTunes Lookup API doesn't surface them.
 *
 * Modern App Store pages embed media in a hydration JSON blob. Each screenshot
 * is a ProductMediaItem with an Artwork that has a template URL containing
 * `{w}x{h}{c}.{f}` placeholders. We extract those templates (from the
 * PurpleSource* path namespace) and substitute the placeholders to get a
 * usable image URL. Falls back to the older direct-URL `simulator_screenshot_`
 * pattern if no templates are found.
 */
async function scrapeAppStoreScreenshots(url: string): Promise<string[]> {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": BROWSER_UA, "Accept-Language": "en-US,en;q=0.9" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return [];

    const html = await res.text();

    // Primary path: template-style media items
    const templated = extractTemplatedScreenshots(html);
    if (templated.length > 0) return templated;

    // Fallback: older sized-URL pattern (kept for compatibility)
    return extractDirectScreenshots(html);
  } catch {
    return [];
  }
}

function extractTemplatedScreenshots(html: string): string[] {
  // Match the screenshot template URLs that live inside the PurpleSource
  // namespace. We deliberately limit to templates that end in the
  // `{w}x{h}{c}.{f}` placeholder block so we don't accidentally grab icons or
  // banners (those live under Purple* / Features* / etc.)
  const re =
    /"template":"(https:\/\/[a-z0-9-]+\.mzstatic\.com\/image\/thumb\/PurpleSource\d+\/v4\/[a-f0-9/-]+\/[^"\s]+?)\/\{w\}x\{h\}\{c\}\.\{f\}"/gi;

  const seen = new Set<string>();
  const out: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const base = m[1];
    if (seen.has(base)) continue;
    seen.add(base);
    // 600x1300 keeps a ~9:19.5 aspect ratio matching modern iPhone screenshots
    out.push(`${base}/600x1300bb.webp`);
  }
  return out;
}

function extractDirectScreenshots(html: string): string[] {
  const re =
    /https:\/\/[a-z0-9-]+\.mzstatic\.com\/image\/thumb\/[A-Za-z0-9]+\/v4\/[a-f0-9/-]+\/(simulator_screenshot_[A-Z0-9-]+)\.png\/(\d+)x(\d+)bb\.(webp|jpg|png)/gi;

  const best = new Map<string, { url: string; width: number; ext: string }>();
  let m: RegExpExecArray | null;
  while ((m = re.exec(html)) !== null) {
    const [full, key, widthStr, , ext] = m;
    const width = parseInt(widthStr, 10);
    const existing = best.get(key);
    if (
      !existing ||
      width > existing.width ||
      (width === existing.width && ext === "webp" && existing.ext !== "webp")
    ) {
      best.set(key, { url: full, width, ext });
    }
  }
  return Array.from(best.values()).map((v) => v.url);
}
