/**
 * UI Rendering engine for the Meal Finder application.
 */

import { truncateText, escapeHtml } from './utils.js';

/**
 * Creates the HTML structure for a Category card.
 * @param {object} category - Category data from API.
 * @returns {string} HTML string for the category card.
 */
export function createCategoryCard(category) {
    const name = escapeHtml(category.strCategory);
    const thumb = escapeHtml(category.strCategoryThumb);
    const desc = escapeHtml(truncateText(category.strCategoryDescription, 120));

    return `
        <article class="category-card" data-category="${name}">
            <img class="category-image" src="${thumb}" alt="${name} Cuisine" loading="lazy">
            <div class="category-body">
                <h3 class="category-title">${name}</h3>
                <p class="category-desc">${desc}</p>
                <a href="category.html?c=${encodeURIComponent(name)}" class="category-link">Explore Meals &rarr;</a>
            </div>
        </article>
    `;
}

/**
 * Creates the HTML structure for a Meal card.
 * @param {object} meal - Meal data from API.
 * @param {boolean} [showCountry=true] - Whether to show the country/area badge.
 * @param {string} [fallbackCategory=''] - Fallback label if country/area isn't available.
 * @returns {string} HTML string for the meal card.
 */
export function createMealCard(meal, showCountry = true, fallbackCategory = '') {
    const id = escapeHtml(meal.idMeal);
    const name = escapeHtml(meal.strMeal);
    const thumb = escapeHtml(meal.strMealThumb);
    const area = meal.strArea ? escapeHtml(meal.strArea) : escapeHtml(fallbackCategory);

    const badgeHTML = (showCountry && area) 
        ? `<div class="meal-badge">${area}</div>` 
        : '';

    return `
        <article class="meal-card" data-id="${id}">
            <div class="meal-image-wrapper">
                <img class="meal-image" src="${thumb}" alt="${name}" loading="lazy">
                ${badgeHTML}
            </div>
            <div class="meal-body">
                <h3 class="meal-title">${name}</h3>
                <a href="meal.html?id=${id}" class="meal-btn">View Recipe</a>
            </div>
        </article>
    `;
}

/**
 * Renders a loading spinner inside the specified container.
 * @param {HTMLElement} container - The DOM container element.
 */
export function showLoader(container) {
    if (!container) return;
    container.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
        </div>
    `;
}

/**
 * Removes the loading spinner from the specified container.
 * @param {HTMLElement} container - The DOM container element.
 */
export function hideLoader(container) {
    if (!container) return;
    const spinner = container.querySelector('.spinner-container');
    if (spinner) {
        spinner.remove();
    }
}

/**
 * Renders an error or status message inside the specified container.
 * @param {HTMLElement} container - The DOM container element.
 * @param {string} title - The title of the message.
 * @param {string} message - The detailed text.
 * @param {boolean} [isError=false] - Whether it represents an error state.
 */
export function showMessage(container, title, message, isError = false) {
    if (!container) return;
    container.innerHTML = `
        <div class="message-box ${isError ? 'error' : ''}">
            <h3>${escapeHtml(title)}</h3>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}

// Code verified

// card layout wrappers verified

// card layout wrappers verified
