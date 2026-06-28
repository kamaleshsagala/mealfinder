/**
 * Logic for meal.html page.
 */

import { getMealDetails } from './api.js';
import { showLoader, hideLoader, showMessage } from './ui.js';
import { getQueryParam, escapeHtml } from './utils.js';

// DOM Elements
const mealDetailSection = document.getElementById('meal-detail-section');
const mealLoadingPlaceholder = document.getElementById('meal-loading-placeholder');
const mealDetailContainer = document.getElementById('meal-detail-container');

const mealTitle = document.getElementById('meal-title');
const mealMetaContainer = document.getElementById('meal-meta-container');
const mealImage = document.getElementById('meal-image');
const mealActionsContainer = document.getElementById('meal-actions-container');
const mealIngredientsList = document.getElementById('meal-ingredients-list');
const mealInstructions = document.getElementById('meal-instructions');
const backBtn = document.getElementById('meal-back-btn');

/**
 * Configure the back button to navigate backwards in history if appropriate.
 */
function setupBackButton() {
    if (backBtn && document.referrer && document.referrer.includes(window.location.hostname)) {
        backBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.history.back();
        });
    }
}

/**
 * Loads the details of a single meal based on URL parameter 'id'.
 */
async function loadMealDetails() {
    setupBackButton();

    const mealId = getQueryParam('id');

    if (!mealId) {
        showMessage(
            mealLoadingPlaceholder,
            'Meal Not Found',
            'No meal identifier was specified in the URL. Please return to the Home page.',
            true
        );
        return;
    }

    showLoader(mealLoadingPlaceholder);
    mealDetailContainer.style.display = 'none';

    try {
        const data = await getMealDetails(mealId);
        hideLoader(mealLoadingPlaceholder);

        if (data && data.meals && data.meals.length > 0) {
            const meal = data.meals[0];
            
            // Set browser tab title
            document.title = `${meal.strMeal} Recipe | Meal Finder`;

            // Populate Text Header details
            mealTitle.textContent = meal.strMeal;

            // Generate Tags (Category, Area, Custom Tags)
            let tagsHTML = '';
            if (meal.strCategory) {
                tagsHTML += `<span class="meal-meta-item category-tag">${escapeHtml(meal.strCategory)}</span>`;
            }
            if (meal.strArea) {
                tagsHTML += `<span class="meal-meta-item">${escapeHtml(meal.strArea)}</span>`;
            }
            if (meal.strTags) {
                const tags = meal.strTags.split(',');
                tags.forEach(tag => {
                    const cleanTag = tag.trim();
                    if (cleanTag) {
                        tagsHTML += `<span class="meal-meta-item">#${escapeHtml(cleanTag)}</span>`;
                    }
                });
            }
            mealMetaContainer.innerHTML = tagsHTML;

            // Populate Image
            mealImage.src = meal.strMealThumb;
            mealImage.alt = meal.strMeal;

            // Render Actions Buttons (YouTube and Source website)
            let actionsHTML = '';
            if (meal.strYoutube) {
                actionsHTML += `
                    <a href="${escapeHtml(meal.strYoutube)}" target="_blank" rel="noopener noreferrer" class="action-btn btn-youtube">
                        Watch Video Tutorial
                    </a>
                `;
            }
            if (meal.strSource) {
                actionsHTML += `
                    <a href="${escapeHtml(meal.strSource)}" target="_blank" rel="noopener noreferrer" class="action-btn btn-source">
                        Visit Source Recipe
                    </a>
                `;
            }
            mealActionsContainer.innerHTML = actionsHTML;

            // Process Ingredients & Measurements (API provides up to 20 key-value columns)
            let ingredientsHTML = '';
            for (let i = 1; i <= 20; i++) {
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];

                if (ingredient && ingredient.trim() !== '') {
                    const cleanIngredient = escapeHtml(ingredient.trim());
                    const cleanMeasure = measure ? escapeHtml(measure.trim()) : '';

                    ingredientsHTML += `
                        <div class="ingredient-row">
                            <span class="ingredient-name">${cleanIngredient}</span>
                            <span class="ingredient-measure">${cleanMeasure}</span>
                        </div>
                    `;
                }
            }
            mealIngredientsList.innerHTML = ingredientsHTML;

            // Populate Instructions
            mealInstructions.textContent = meal.strInstructions;

            // Reveal detailed view
            mealDetailContainer.style.display = 'block';

        } else {
            showMessage(
                mealLoadingPlaceholder,
                'Recipe Not Found',
                `We couldn't retrieve the recipe with the ID: "${mealId}".`
            );
        }
    } catch (error) {
        hideLoader(mealLoadingPlaceholder);
        showMessage(
            mealLoadingPlaceholder,
            'Failed to Load Recipe',
            'A network error occurred while retrieving recipe details. Please check your internet connection and try again.',
            true
        );
    }
}

// Load detail structure when DOM is ready
document.addEventListener('DOMContentLoaded', loadMealDetails);

// Code verified

// meal ingredients parsing checked

// meal ingredients parsing checked
