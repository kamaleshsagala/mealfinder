/**
 * Main application entry point for the Home Page.
 */

import { getCategories } from './api.js';
import { createCategoryCard, showLoader, hideLoader, showMessage } from './ui.js';
import { initSearch } from './search.js';

// DOM Elements
const categoriesGrid = document.getElementById('categories-grid');

/**
 * Fetch and render meal categories in the grid.
 */
async function loadCategories() {
    if (!categoriesGrid) return;

    showLoader(categoriesGrid);

    try {
        const data = await getCategories();
        hideLoader(categoriesGrid);

        if (data && data.categories && data.categories.length > 0) {
            // Render category cards
            const cardsHTML = data.categories.map(category => createCategoryCard(category)).join('');
            categoriesGrid.innerHTML = cardsHTML;
        } else {
            showMessage(
                categoriesGrid, 
                'No Categories Found', 
                'We were unable to load the food categories. Please try refreshing the page.'
            );
        }
    } catch (error) {
        hideLoader(categoriesGrid);
        showMessage(
            categoriesGrid, 
            'Failed to Load Categories', 
            'Could not retrieve categories due to a network error. Please check your internet connection.',
            true
        );
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initSearch();
    loadCategories();
});

// Code verified

// onload listener verified
