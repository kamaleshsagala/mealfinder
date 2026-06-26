# Meal Finder Website

A clean, responsive, and production-ready **Meal Finder** website designed using HTML5, CSS3, and Vanilla JavaScript (ES6). The project consumes **TheMealDB API** to browse food categories, search for dishes dynamically, and view recipes with ingredient proportions and tutorial videos.

---

## Features

- **Dynamic Search**: Instantly query recipes by keyword without page reloads. Includes loading spinners and connection error message states.
- **Browse Categories**: Grid layout displaying meal categories, complete with summaries, custom hover effects, and links to filter pages.
- **Category Filter**: Dedicated category pages showing metadata (description, thumbnail) and all relevant meals.
- **Detailed Recipe Cards**: Complete profile view including origin country, tags, detailed ingredient measures in a structured grid, step-by-step instructions, and outbound actions (YouTube tutorial video and Source recipe links).
- **Pure CSS Styling**: No Tailwind, Bootstrap, React, or jQuery. Built from scratch with flat orange theme elements, sticky navigation headers, and structured grids.
- **CSS-Based Logo**: Clean text-based logo styled using custom typography, aligning with a flat orange style.
- **Responsive Layout**: Designed for mobile devices, tablets, laptops, and desktop screens using custom CSS media queries.

---

## Technologies Used

- **HTML5**: Semantically structured layout tags.
- **CSS3**: Variables, Flexbox, Grid, and Media Queries for animations, hover transitions, and responsiveness.
- **Vanilla JavaScript (ES6+)**: Modular script imports (`import`/`export`), `fetch` API, `async`/`await`, template literals, and DOM manipulation.
- **TheMealDB API**: Raw REST data consumption.

---

## Folder Structure

```text
MealFinder/
├── index.html          # Main search and categories page
├── category.html       # Display details and meals in a category
├── meal.html           # Full recipe detail display page
├── css/
│   ├── style.css       # Core layout styling and typography tokens
│   └── responsive.css  # Device scaling media queries
└── js/
    ├── api.js          # API network fetch endpoints
    ├── app.js          # Main homepage driver
    ├── search.js       # Search form controller
    ├── category.js     # Category list controller
    ├── meal.js         # Meal details page controller
    ├── ui.js           # Shared HTML DOM card rendering elements
    └── utils.js        # Parameter parsing and string utilities
```

---

## API Endpoints Used

- **List All Categories**:
  `https://www.themealdb.com/api/json/v1/1/categories.php`
- **Search Meal by Name**:
  `https://www.themealdb.com/api/json/v1/1/search.php?s={query}`
- **Lookup Meal Details by ID**:
  `https://www.themealdb.com/api/json/v1/1/lookup.php?i={id}`
- **Filter Meals by Category**:
  `https://www.themealdb.com/api/json/v1/1/filter.php?c={category}`

---

## Installation & How to Run

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/mealfinder.git
   ```
2. Navigate to the project folder:
   ```bash
   cd mealfinder
   ```
3. Since the project uses ES6 Javascript modules (`type="module"`), the browser restricts local filesystem execution (`file://`) due to CORS policies. You **must** run this project from a local web server:
   - **VS Code Extension**: Install **Live Server**, right-click `index.html` and click **Open with Live Server**.
   - **Python (3.x)**: Run:
     ```bash
     python -m http.server 8000
     ```
     Open `http://localhost:8000` in your browser.
   - **Node.js (npx)**: Run:
     ```bash
     npx serve
     ```
     Open the URL provided in the terminal.

---

## Screenshots

*(Screenshots can be added here once deployed)*
<!-- Readme verified -->

<!-- live server setup guide completed -->
