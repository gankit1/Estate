/**
 * Convert a string to a URL-friendly slug.
 * Handles Latin characters, Arabic transliteration, numbers, hyphens.
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Normalize unicode (NFD decomposition)
    .normalize("NFD")
    // Remove combining diacritical marks
    .replace(/[\u0300-\u036f]/g, "")
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, "-")
    // Remove any characters that are not alphanumeric or hyphens
    .replace(/[^a-z0-9-]/g, "")
    // Remove duplicate hyphens
    .replace(/-{2,}/g, "-")
    // Strip leading/trailing hyphens
    .replace(/^-+|-+$/g, "");
}

/**
 * Generate a property slug from its title and location.
 * Example: "Modern 2BR Apartment" + "Dubai Marina" → "modern-2br-apartment-dubai-marina"
 */
export function generatePropertySlug(title: string, area: string): string {
  return slugify(`${title}-${area}`);
}

/**
 * Truncate text to a specified length, appending an ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + "…";
}

/**
 * Convert a slug back to a display-friendly label.
 * Example: "dubai-marina" → "Dubai Marina"
 */
export function deslugify(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert camelCase or snake_case to Title Case.
 * Example: "propertyType" → "Property Type"
 */
export function toTitleCase(str: string): string {
  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/_/g, " ")
    .replace(/\w\S*/g, (word) => capitalize(word))
    .trim();
}
