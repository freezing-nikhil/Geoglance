const params = new URLSearchParams(location.search);
const countryName = params.get('name');

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}

document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('dark');

  let theme;
  if (document.body.classList.contains('dark')) {
    theme = 'dark';
  } else {
    theme = 'light';
  }

  localStorage.setItem('theme', theme);
});

const elements = {
  flag: document.getElementById('flag'),
  name: document.getElementById('name'),
  native: document.getElementById('native-name'),
  pop: document.getElementById('population'),
  reg: document.getElementById('region'),
  sub: document.getElementById('sub-region'),
  cap: document.getElementById('capital'),
  dom: document.getElementById('domain'),
  cur: document.getElementById('currencies'),
  lang: document.getElementById('languages'),
  borders: document.getElementById('borders')
};

fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(countryName)}?fullText=true`)
  .then(res => res.json())
  .then(([country]) => {
    elements.flag.src = country.flags.svg;
    elements.name.textContent = country.name.common;
    elements.native.textContent = Object.values(country.name.nativeName || {})[0].common;
    elements.pop.textContent = country.population.toLocaleString('en-IN');
    elements.reg.textContent = country.region;
    elements.sub.textContent = country.subregion || 'N/A';
    elements.cap.textContent = country.capital?.[0] || 'N/A';
    elements.dom.textContent = country.tld.join(', ');
    elements.cur.textContent = Object.values(country.currencies).map(c => c.name).join(', ');
    elements.lang.textContent = Object.values(country.languages).join(', ');

    // Border countries
    if (country.borders) {
      for (let i = 0; i < country.borders.length; i++) {
        const code = country.borders[i];
        fetch(`https://restcountries.com/v3.1/alpha/${code}`)
          .then(res => res.json())
          .then(([borderCountry]) => {
            const link = document.createElement('a');
            link.href = `country.html?name=${borderCountry.name.common}`;
            link.textContent = borderCountry.name.common;
            elements.borders.appendChild(link);
          });
      }
    }
  });
