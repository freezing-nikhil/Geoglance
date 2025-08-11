const searchInput = document.getElementById('search');
const regionSelect = document.getElementById('region-filter');
const countriesContainer = document.getElementById('countries-container');
const themeToggle = document.getElementById('theme-toggle');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');

  let theme;
  if (document.body.classList.contains('dark')) {
    theme = 'dark';
  } else {
    theme = 'light';
  }

  localStorage.setItem('theme', theme);
});


let allCountries = [];

function createCountryCard(country) {
  const div = document.createElement('div');
  div.className = 'country-card';
  div.addEventListener('click', () => {
    window.location.href = `country.html?name=${encodeURIComponent(country.name.common)}`;
  });

  div.innerHTML = `
    <img src="${country.flags.png}" alt="${country.name.common}" />
    <div class="country-info">
      <h3>${country.name.common}</h3>
      <p><strong>Population:</strong> ${country.population.toLocaleString('en-IN')}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Capital:</strong> ${country.capital && country.capital[0] ? country.capital[0] : 'N/A'}</p>
    </div>
  `;
  countriesContainer.appendChild(div);
}

function displayCountries(list) {
  countriesContainer.innerHTML = '';
  for (let i = 0; i < list.length; i++) {
    createCountryCard(list[i]);
  }
}

function fetchCountries() {
  fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population')
    .then(res => res.json())
    .then(data => {
      allCountries = data;
      displayCountries(allCountries);
    });
}

function filterCountries() {
  const keyword = searchInput.value.toLowerCase();
  const region = regionSelect.value;

  const filtered = [];

  for (let i = 0; i < allCountries.length; i++) {
    const country = allCountries[i];
    const nameMatch = country.name.common.toLowerCase().includes(keyword);
    const regionMatch = region === '' || country.region === region;

    if (nameMatch && regionMatch) {
      filtered.push(country);
    }
  }

  displayCountries(filtered);
}

searchInput.addEventListener('input', filterCountries);
regionSelect.addEventListener('change', filterCountries);

fetchCountries();
