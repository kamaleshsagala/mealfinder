/**
 * Search logic handler for the home page.
 */

import { searchMeals } from './api.js';
import { createMealCard, showLoader, hideLoader, showMessage } from './ui.js';

/**
 * Initializes the search feature.
 * Binds event listeners to the search form and input.
 */
export function initSearch() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const searchSection = document.getElementById('search-section');
    const searchResultsTitle = document.getElementById('search-results-title');
    const searchMealsGrid = document.getElementById('search-meals-grid');

    if (!searchForm || !searchInput || !searchSection || !searchMealsGrid) {
        console.error('Search elements are missing in the HTML structure.');
        return;
    }

    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const query = searchInput.value.trim();
        if (!query) return;

        // Display results section and show loader
        searchSection.style.display = 'block';
        searchMealsGrid.innerHTML = '';
        showLoader(searchMealsGrid);
        
        // Scroll to results section smoothly
        searchSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        try {
            const data = await searchMeals(query);
            hideLoader(searchMealsGrid);

            if (data && data.meals && data.meals.length > 0) {
                searchResultsTitle.textContent = `Search Results for "${query}"`;
                
                // Render meals (we show the country badge for search results since area metadata is returned)
                const cardsHTML = data.meals.map(meal => createMealCard(meal, true)).join('');
                searchMealsGrid.innerHTML = cardsHTML;
            } else {
                searchResultsTitle.textContent = 'No Results';
                showMessage(
                    searchMealsGrid, 
                    'No Meals Found', 
                    `We couldn't find any recipes matching "${query}". Please check your spelling or try another cuisine.`
                );
            }
        } catch (error) {
            hideLoader(searchMealsGrid);
            searchResultsTitle.textContent = 'Error';
            showMessage(
                searchMealsGrid, 
                'Connection Error', 
                'There was a problem contacting the meal server. Please check your internet connection and try again.',
                true
            );
        }
    });
}

// Code verified

// dynamic search view updated

// dynamic search view updated
