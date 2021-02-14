let worldList = [];

const apiUrl = 'https://restcountries.eu/rest/v2/';
const modalContainer = document.querySelector('.modal-container');

const add = newCountry => worldList.push(newCountry);

function loadApiList() {
    // const showLoadingMessage
    return fetch(apiUrl).then(function (response) {
        return response.json();
    }).then(function (data) {
        // const hideLoadingMessage
        worldList = data.map(function (country) {
            let getLanguageNames = country.languages.map(function (language) {
                return language.name;
            });

            const nation = {
                name: country.name,
                region: country.subregion,
                capital: country.capital,
                languages: getLanguageNames,
                flag: country.flag
            };
            return nation;
        });
    }).catch(function (error) {
        // hideLoadingMessage
        console.error(error);
    })
}

// creates modal
const showModal = function (country) {
    modalContainer.innerHTML = '';
    let modal = document.createElement('div');
    modal.classList.add('modal');

    let closeButtonX = document.createElement('button');
    closeButtonX.classList.add('modal-close');
    closeButtonX.textContent = 'X';
    closeButtonX.addEventListener('click', closeModal);

    let countryName = document.createElement('h1');
    countryName.classList.add('country-name-modal');
    countryName.textContent = country.name;

    let countryRegion = document.createElement('p');
    countryRegion.textContent = country.subregion;

    let countryCapital = document.createElement('p');
    countryCapital.textContent = country.capital;

    let countryLanguages = document.createElement('p');
    countryLanguages.textContent = country.languages;

    modal.appendChild(closeButtonX);
    modal.appendChild(countryName);
    modal.appendChild(countryRegion);
    modal.appendChild(countryCapital);
    modal.appendChild(countryLanguages);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');
}

// displays country name and flag in buttons
const displayCountryList = function (country) {
    let countryList = document.querySelector('.country-list');

    let countryButton = document.createElement('button');
    countryButton.classList.add('country-button');

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    let countryName = document.createElement('p');
    countryName.textContent = country.name;
    countryName.classList.add('country-name-main');

    let countryImage = document.createElement('img');
    countryImage.src = country.flag;
    countryImage.classList.add('country-image-main');

    buttonContainer.appendChild(countryName);
    buttonContainer.appendChild(countryImage);
    countryButton.appendChild(buttonContainer);
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