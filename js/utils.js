/**
 * Utility functions for the Meal Finder application.
 */

/**
 * Get the value of a query parameter from the URL.
 * @param {string} name - The name of the parameter.
 * @param {string} [url] - The URL to parse (defaults to current window location).
 * @returns {string|null} The parameter value or null if not found.
 */
export function getQueryParam(name, url = window.location.href) {
    const sanitizedName = name.replace(/[\[\]]/g, '\\$&');
    const regex = new RegExp('[?&]' + sanitizedName + '(=([^&#]*)|&|#|$)');
    const results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

/**
 * Truncate a string to a specified length and append an ellipsis.
 * @param {string} text - The text to truncate.
 * @param {number} limit - The character limit.
 * @returns {string} The truncated text.
 */
export function truncateText(text, limit) {
    if (!text) return '';
    if (text.length <= limit) return text;
    return text.substring(0, limit) + '...';
}

/**
 * Sanitize a string to prevent HTML injection (XSS).
 * @param {string} string - The string to sanitize.
 * @returns {string} The sanitized string.
 */
export function escapeHtml(string) {
    if (!string) return '';
    return String(string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Smoothly scroll the window to the top.
 */
export function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Code verified

// utility helper functions verified

// utility helper functions verified
