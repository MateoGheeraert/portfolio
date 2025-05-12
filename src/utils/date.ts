/**
 * Format a date string based on the locale
 * @param dateString - ISO date string
 * @param locale - Locale string (e.g., 'en', 'fr')
 * @returns Formatted date string
 */
export function formatDate(dateString: string, locale: string = "en"): string {
  const date = new Date(dateString);

  return date.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Calculate reading time in minutes for a given text
 * @param text - The content text
 * @param wordsPerMinute - Average reading speed (words per minute)
 * @returns Reading time in minutes (rounded up)
 */
export function calculateReadingTime(
  text: string,
  wordsPerMinute: number = 200
): number {
  const wordCount = text.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}
