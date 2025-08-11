#  Where in the World? – Country Information App

A responsive web application that displays information about countries using the **REST Countries API**.  
You can search for a country, filter by region, and view detailed information such as population, capital, borders, currencies, and languages.  
Includes a **Dark Mode toggle** and works smoothly on both desktop and mobile devices.


## 🔗 Live Demo
[**View Project on Netlify**](https://geoglance1.netlify.app/)  

##  Features
- **Search** for countries by name.
- **Filter** countries by region.
- **View Details** of each country including:
  - Flag
  - Native name
  - Population
  - Region & Subregion
  - Capital
  - Top-level domain
  - Currencies
  - Languages
  - Border countries with clickable links
- **Dark Mode** toggle with preference saved in localStorage.
- Fully **responsive design**.

---

##  Technologies Used
- **HTML5**
- **CSS3** (Flexbox, CSS Grid, Responsive Design)
- **JavaScript (ES6)**
- **REST Countries API v3**

---

##  Project Structure
├── index.html # Main page with country list, search, and filter
├── country.html # Detail page for selected country
├── main.js # Handles country list fetching, search, and filtering
├── country.js # Handles single country details fetching
├── style.css # Styling for light and dark mode
└── README.md # Project documentation



##  How It Works
1. **Fetch all countries** on page load (`main.js`).
2. Display them as **cards** with flag, name, population, region, and capital.
3. **Search bar** filters by country name in real-time.
4. **Region dropdown** filters by continent.
5. Clicking on a country card redirects to `country.html` with its name in the query string.
6. `country.js` fetches full details for that country and displays them.
7. **Dark mode toggle** switches the theme and stores preference in `localStorage`.

