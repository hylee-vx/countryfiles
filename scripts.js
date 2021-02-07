const repo = [
    { name: 'Sweden', region: 'Europe', languages: 'Swedish' },
    { name: 'Vanuatu', region: 'Oceania', languages: ['Bislama', 'English', 'French'] },
    { name: 'Samoa', region: 'Oceania', languages: ['Samoan', 'English'] },
    { name: 'Bhutan', region: 'Asia', languages: 'Dzongkha' },
    { name: 'Martinique', region: 'Americas', languages: 'French' },
    { name: 'Bermuda', region: 'Americas', languages: 'English' }
]

//API
//const url = 'https://restcountries.eu/rest/v2/';

const repoCategories = ['name', 'region', 'languages'];

// checks categories of new country match categories in repo
const checkCategories = function (newCountry) {
    let result = true;
    Object.keys(newCountry).forEach(function (category) {
        if (!repoCategories.includes(category)) {
            console.log(`${newCountry.name} has the invalid category '${category}'`);
            result = false;
        }
    });
    return result;
};

// checks new country is a valid object and has the same number of categories as the countries in repo, then moves to checkCategories function
const validateNewCountry = function (newCountry) {
    if (typeof newCountry === 'object' && newCountry !== null &&
        Object.keys(newCountry).length === repoCategories.length) {
        return checkCategories(newCountry);
    } else {
        console.log(`${JSON.stringify(newCountry)} is not a valid object or does not have the correct categories`);
        return false;
    }
};

// adds new country to repo if it passes validation checks
const add = function (newCountry) {
    if (validateNewCountry(newCountry)) {
        return repo.push(newCountry);
    } else {
        console.log(`${newCountry.name || newCountry} has not been added`);
        return false;
    }
};


//TESTS
add({ name: 'Greenland', region: 'Americas', languages: 'Kalaallisut' });
add('Atlantis');
add({ name: 'Saturn', region: 'Space' });
add({ name: 'Jupiter', region: 'Space', moons: 79 });
console.log(repo);