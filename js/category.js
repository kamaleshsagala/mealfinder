/**
 * Logic for category.html page.
 */

import { getCategories, getMealsByCategory } from './api.js';
import { createMealCard, showLoader, hideLoader, showMessage } from './ui.js';
import { getQueryParam, escapeHtml } from './utils.js';

// DOM Elements
const categoryHeaderSection = document.getElementById('category-header-section');
const categoryImg = document.getElementById('category-img');
const categoryTitleHeading = document.getElementById('category-title-heading');
const categoryDescriptionText = document.getElementById('category-description-text');

const mealsLoadingContainer = document.getElementById('meals-loading-container');
const categoryMealsGrid = document.getElementById('category-meals-grid');
const mealsTitleHeading = document.getElementById('meals-title-heading');

/**
 * Loads the category page components.
 */
async function loadCategoryDetails() {
    const categoryName = getQueryParam('c');

    if (!categoryName) {
        showMessage(
            categoryMealsGrid,
            'Invalid Category',
            'No category was specified in the URL. Please return to the Home page and select a category.',
            true
        );
        if (mealsTitleHeading) mealsTitleHeading.textContent = 'Error';
        return;
    }

    // Set page title
    document.title = `${categoryName} Meals | Meal Finder`;
    if (mealsTitleHeading) mealsTitleHeading.textContent = `Meals in ${categoryName}`;

    // Show loaders
    showLoader(mealsLoadingContainer);
    categoryHeaderSection.style.display = 'none';

    try {
        // 1. Fetch category metadata (description, thumbnail)
        // Note: TheMealDB doesn't have a single-category lookup, so we fetch all and find the match.
        const categoriesData = await getCategories();
        let categoryMetadata = null;

        if (categoriesData && categoriesData.categories) {
            categoryMetadata = categoriesData.categories.find(
                cat => cat.strCategory.toLowerCase() === categoryName.toLowerCase()
            );
        }

        if (categoryMetadata) {
            // Render Header Section
            categoryImg.src = categoryMetadata.strCategoryThumb;
            categoryImg.alt = categoryMetadata.strCategory;
            categoryTitleHeading.textContent = categoryMetadata.strCategory;
            categoryDescriptionText.textContent = categoryMetadata.strCategoryDescription;
            categoryHeaderSection.style.display = 'block';
        } else {
            console.warn(`Metadata for category "${categoryName}" was not found.`);
        }

        // 2. Fetch meals in this category
        const mealsData = await getMealsByCategory(categoryName);
        hideLoader(mealsLoadingContainer);

        if (mealsData && mealsData.meals && mealsData.meals.length > 0) {
            // Render meals (we set showCountry to false since category filter returns only basic meal details without area)
            const cardsHTML = mealsData.meals
                .map(meal => createMealCard(meal, false, categoryName))
                .join('');
            categoryMealsGrid.innerHTML = cardsHTML;
        } else {
            showMessage(
                categoryMealsGrid,
                'No Meals Found',
                `We could not find any meals under the category "${categoryName}".`
            );
        }

    } catch (error) {
        hideLoader(mealsLoadingContainer);
        showMessage(
            categoryMealsGrid,
            'Error Loading Category',
            'We encountered a network error while retrieving category meals. Please check your internet connection.',
            true
        );
    }
}

// Load when DOM is ready
document.addEventListener('DOMContentLoaded', loadCategoryDetails);

// Code verified

// category parameter checks completed
