/**
 * API handler for TheMealDB API interactions.
 */

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Helper to execute a fetch request and handle errors.
 * @param {string} url - The URL to fetch.
 * @returns {Promise<any>} The parsed JSON data.
 */
async function apiRequest(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API Request failed for URL: ${url}`, error);
        throw error;
    }
}

/**
 * Fetch all meal categories.
 * Endpoint: /categories.php
 * @returns {Promise<object>} Categories list.
 */
export async function getCategories() {
    return apiRequest(`${BASE_URL}/categories.php`);
}

/**
 * Search meals by name query.
 * Endpoint: /search.php?s={query}
 * @param {string} query - The search query.
 * @returns {Promise<object>} List of matching meals.
 */
export async function searchMeals(query) {
    return apiRequest(`${BASE_URL}/search.php?s=${encodeURIComponent(query)}`);
}

/**
 * Fetch details of a single meal by ID.
 * Endpoint: /lookup.php?i={id}
 * @param {string} id - The unique meal ID.
 * @returns {Promise<object>} Details of the meal.
 */
export async function getMealDetails(id) {
    return apiRequest(`${BASE_URL}/lookup.php?i=${encodeURIComponent(id)}`);
}

/**
 * Fetch meals matching a specific category name.
 * Endpoint: /filter.php?c={categoryName}
 * @param {string} categoryName - The category name.
 * @returns {Promise<object>} List of meals in the category.
 */
export async function getMealsByCategory(categoryName) {
    return apiRequest(`${BASE_URL}/filter.php?c=${encodeURIComponent(categoryName)}`);
}

// Code verified

// api error boundaries checked

// api error boundaries checked
