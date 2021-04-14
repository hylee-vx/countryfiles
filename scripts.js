let worldList = [];

const countryApiUrl = 'https://restcountries.eu/rest/v2/';
const modalContainer = document.querySelector('.modal-container');
const loadingSpinner = document.querySelector('.loader');

const showLoadingSpinner = () => loadingSpinner.hidden = false;
const hideLoadingSpinner = () => loadingSpinner.hidden = true;

const loadCountryApi = function () {
    showLoadingSpinner();
    return fetch(countryApiUrl).then(function (response) {
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

const newDomElement = element => document.createElement(element);

// creates modal
const showModal = function (country) {
    modalContainer.innerHTML = '';
    let modal = newDomElement('div');
    modal.classList.add('modal');

    let modalCloseButton = newDomElement('button');
    modalCloseButton.classList.add('modal-close-button');
    modalCloseButton.textContent = 'X';
    modalCloseButton.addEventListener('click', closeModal);

    let modalHeading = newDomElement('h1');
    modalHeading.classList.add('modal-heading');
    modalHeading.textContent = country.name;

    let modalMapContainer = newDomElement('div');
    modalMapContainer.classList.add('modal-map-container');

    let countryMap = newDomElement('iframe');
    countryMap.src = `https://www.google.com/maps/embed/v1/place?key=AIzaSyAbg-EXRXLkHNQQnZ--E45nvlUmdY75A1A&q=${country.name}`;
    countryMap.classList.add('country-map');

    let modalTextContainerA = newDomElement('div');
    modalTextContainerA.classList.add('modal-text-container-a');

    let modalTextContainerB = newDomElement('div');
    modalTextContainerB.classList.add('modal-text-container-b');

    let countryDetailsTemplate = (subheading, countryProperty) => `${subheading}: ${countryProperty}`;

    let countryRegion = newDomElement('p');
    countryRegion.innerHTML = countryDetailsTemplate('Region', country.region);

    let countryCapital = newDomElement('p');
    countryCapital.innerHTML = countryDetailsTemplate('Capital', country.capital);

    let countryArea = newDomElement('p');
    let countryAreaFormatted = `${country.area.toLocaleString()}km`;
    countryArea.innerHTML = countryDetailsTemplate('Area', countryAreaFormatted);

    let countryPopulation = newDomElement('p');
    let countryPopulationFormatted = `${country.population.toLocaleString()}`;
    countryPopulation.innerHTML = countryDetailsTemplate('Population', countryPopulationFormatted);

    let countryLanguages = newDomElement('p');
    let countryLanguagesFormatted = country.languages.join(', ');
    countryLanguages.innerHTML = countryDetailsTemplate('Languages', countryLanguagesFormatted);

    let countryCurrencies = newDomElement('p');
    countryCurrencies.innerHTML = countryDetailsTemplate('Currencies', country.currencies);

    // let capitalTimezone = newDomElement('p');
    // capitalTimezone.classList.add('modal-current-time');
    // capitalTimezone.innerHTML = `Current time in ${country.capital}: placeholder`;

    modal.appendChild(modalCloseButton);
    modal.appendChild(modalHeading);
    modalMapContainer.appendChild(countryMap);
    modal.appendChild(modalMapContainer);
    modalTextContainerA.appendChild(countryRegion);
    modalTextContainerA.appendChild(countryCapital);
    modalTextContainerA.appendChild(countryArea);
    modalTextContainerA.appendChild(countryPopulation);
    modalTextContainerB.appendChild(countryLanguages);
    modalTextContainerB.appendChild(countryCurrencies);
    modal.appendChild(modalTextContainerA);
    modal.appendChild(modalTextContainerB);
    // modal.appendChild(capitalTimezone);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

// displays country name and flag in buttons
const displayCountryList = function (country) {
    let countryList = document.querySelector('.country-list');

    let countryButton = document.createElement('button');
    countryButton.classList.add('country-button');

    let imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container-main');

    let countryImage = document.createElement('img');
    countryImage.src = country.flag;
    countryImage.classList.add('country-image-main');

    let countryName = document.createElement('p');
    countryName.textContent = country.name;
    countryName.classList.add('country-name-main');
    countryName.classList.add('line-clamp');

    imageContainer.appendChild(countryImage);
    countryButton.appendChild(imageContainer);
    countryButton.appendChild(countryName);
    countryList.appendChild(countryButton);

    countryButton.addEventListener('click', function () {
        displayDetails(country);
    });
};

// displays details in a modal
const displayDetails = country =>
    loadCountryApi(country).then(() => showModal(country));

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

loadCountryApi().then(function () {
    worldList.forEach(country => displayCountryList(country));
});

