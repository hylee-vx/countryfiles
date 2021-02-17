let worldList = [];

const apiUrl = 'https://restcountries.eu/rest/v2/';
const modalContainer = document.querySelector('.modal-container');
const loadingSpinner = document.querySelector('.loader');

const showLoadingSpinner = () => loadingSpinner.hidden = false;
const hideLoadingSpinner = () => loadingSpinner.hidden = true;

const loadApiList = function () {
    showLoadingSpinner();
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        worldList = data.map(function (country) {
            let getCurrencyNames = country.currencies.map(currency => currency.name);
            let getLanguageNames = country.languages.map(language => language.name);

            const nation = {
                name: country.name,
                region: country.region,
                capital: country.capital,
                area: country.area,
                population: country.population,
                borders: country.borders,
                currencies: getCurrencyNames,
                languages: getLanguageNames,
                flag: country.flag
            };
            hideLoadingSpinner();
            return nation;
        });
    }).catch(function (error) {
        hideLoadingSpinner();
        console.error(error);
    });
};

// creates modal
const showModal = function (country) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let modalCloseButton = document.createElement('button');
    modalCloseButton.classList.add('modal-close-button');
    modalCloseButton.textContent = 'X';
    modalCloseButton.addEventListener('click', closeModal);

    let countryName = document.createElement('h1');
    countryName.classList.add('country-name');
    countryName.textContent = country.name;

    let countryMapContainer = document.createElement('div');
    countryMapContainer.classList.add('country-map-container');

    let countryMap = document.createElement('iframe');
    countryMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAbg-EXRXLkHNQQnZ--E45nvlUmdY75A1A&q=${country.name}`;
    countryMap.classList.add('country-map');

    let modalTextContainer = document.createElement('div');
    modalTextContainer.classList.add('modal-text-container');

    let countryRegion = document.createElement('p');
    countryRegion.innerHTML = `<span class="modal-subheading">Region:</span> ${country.region}`;

    let countryCapital = document.createElement('p');
    countryCapital.innerHTML = `<span class="modal-subheading">Capital:</span> ${country.capital}`;

    let countryArea = document.createElement('p');
    countryArea.innerHTML = `<span class="modal-subheading">Area:</span> ${country.area}km`;

    let countryPopulation = document.createElement('p');
    countryPopulation.innerHTML = `<span class="modal-subheading">Population:</span> ${country.population}`;

    let countryLanguages = document.createElement('p');
    let countryLanguagesFormatted = country.languages.join(', ');
    countryLanguages.innerHTML = `<span class="modal-subheading">Languages:</span> ${countryLanguagesFormatted}`;

    let countryCurrencies = document.createElement('p');
    countryCurrencies.innerHTML = `<span class="modal-subheading">Currencies:</span> ${country.currencies}`;

    let countryNeighbours = document.createElement('p');
    let countryNeighboursFormatted = country.borders.join(', ');
    countryNeighbours.innerHTML = `<span class="modal-subheading">Borders with</span> ${countryNeighboursFormatted}`;

    let capitalTimezone = document.createElement('p');
    capitalTimezone.classList.add('capital-current-time');
    capitalTimezone.innerHTML = `<span class="modal-subheading">Current time in ${country.capital}:</span> placeholder`;

    modal.appendChild(modalCloseButton);
    modal.appendChild(countryName);
    countryMapContainer.appendChild(countryMap);
    modal.appendChild(countryMapContainer);
    modalTextContainer.appendChild(countryRegion);
    modalTextContainer.appendChild(countryCapital);
    modalTextContainer.appendChild(countryArea);
    modalTextContainer.appendChild(countryPopulation);
    modalTextContainer.appendChild(countryLanguages);
    modalTextContainer.appendChild(countryCurrencies);
    modalTextContainer.appendChild(countryNeighbours);
    modal.appendChild(modalTextContainer);
    modal.appendChild(capitalTimezone);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

// displays country name and flag in buttons
const displayCountryList = function (country) {
    let countryList = document.querySelector('.country-list');

    let countryButton = document.createElement('button');
    countryButton.classList.add('country-button');

    let countryImage = document.createElement('img');
    countryImage.src = country.flag;
    countryImage.classList.add('country-image-main');

    let countryName = document.createElement('p');
    countryName.textContent = country.name;
    countryName.classList.add('country-name-main');

    countryButton.appendChild(countryImage);
    countryButton.appendChild(countryName);
    countryList.appendChild(countryButton);

    countryButton.addEventListener('click', function () {
        displayDetails(country);
    });
};

// displays details in a modal
const displayDetails = country =>
    loadApiList(country).then(() => showModal(country));

// closes modal
const closeModal = () => modalContainer.classList.remove('is-visible');

modalContainer.addEventListener('click', event => {
    if (event.target === modalContainer) {
        closeModal();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
        closeModal();
    };
});

loadApiList().then(function () {
    worldList.forEach(country => displayCountryList(country));
});


/////////////////////////////////////////////////////////////////////////////////////////////

// OLD CODE

// const repo = [
//     { name: 'Sweden', region: 'Europe', languages: 'Swedish' },
//     { name: 'Vanuatu', region: 'Oceania', languages: ['Bislama', 'English', 'French'] },
//     { name: 'Samoa', region: 'Oceania', languages: ['Samoan', 'English'] },
//     { name: 'Saint Vincent and the Grenadines', region: 'Americas', languages: 'English' },
//     { name: 'Republic of Korea', region: 'Asia', languages: 'Korean' }
// ];

// const repoCategories = ['name', 'region', 'languages'];

// // checks categories of new country match categories in repo
// const checkCategories = function (newCountry) {
//     let result = true;
//     Object.keys(newCountry).forEach(function (category) {
//         if (!repoCategories.includes(category)) {
//             console.log(`${newCountry.name} has the invalid category '${category}'`);
//             result = false;
//         }
//     });
//     return result;
// };

// // checks new country is a valid object and has the same number of categories as the countries in repo, then moves to checkCategories function
// const validateNewCountry = function (newCountry) {
//     if (typeof newCountry === 'object' && newCountry !== null &&
//         Object.keys(newCountry).length === repoCategories.length) {
//         return checkCategories(newCountry);
//     } else {
//         console.log(`${JSON.stringify(newCountry)} is not a valid object or does not have the correct categories`);
//         return false;
//     }
// };

// // adds new country to repo if it passes validation checks
// const add = function (newCountry) {
//     if (validateNewCountry(newCountry)) {
//         return repo.push(newCountry);
//     } else {
//         console.log(`${newCountry.name || newCountry} has not been added`);
//         return false;
//     }
// };

// basic search function of repo object values
// const searchFilter = function (searchValue) {
//     return worldList.filter(function (country) {
//         let nameMatch = searchValue === country.name,
//             regionMatch = searchValue === country.region,
//             languageMatch = country.languages.includes(searchValue);

//         if (nameMatch || regionMatch || languageMatch) {
//             return true;
//         } else {
//             return false;
//         }
//     });
// };

// // returns search result to console
// const searchResult = function (searchValue) {
//     let filterResult = searchFilter(searchValue);

//     if (filterResult.length === 0) {
//         console.log(`${searchValue} cannot be found`);
//         return false;
//     } else {
//         console.log(filterResult);
//         return true;
//     }
// }

// // organises country data by region
// // potentially use to separate each section on webpage
// const regionalOverview = worldList.reduce(function (regionSummary, country) {
//     regionSummary[country.region] = regionSummary[country.region] || [];
//     regionSummary[country.region].push({
//         Name: country.name,
//         Languages: country.languages
//     });
//     return regionSummary;
// }, {});

//TESTS
// add({ name: 'Greenland', region: 'Americas', languages: 'Kalaallisut' });
// add('Atlantis');
// add({ name: 'Saturn', region: 'Space' });
// add({ name: 'Jupiter', region: 'Space', moons: 79 });
// console.log(repo);

// searchResult('Jupiter');
// searchResult('English');
// searchResult('Oceania');

// console.log(regionalOverview);
//END TESTS

// repo.forEach(function (country) {
//     displayCountryList(country);
// });