const request = require('request');

// define a function fetchBreedDescription that takes a callback function as an argument.
const fetchBreedDescription = function(breedName, callback) {
  // Inside fetchBreedDescription, specify the API endpoint (apiUrl)
  const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breedName}`;
  // use request to make a GET request to the API endpoint.
  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      if (response.statusCode === 200) {
        try {
          const data = JSON.parse(body);
          callback(null, data[0].description);
        } catch (parseError) {
          callback(parseError, null);
        }
      } else {
        callback(`Error fetching cat data status code: ${response.statusCode}`, null);
      }

    }
  });

};

module.exports = {fetchBreedDescription};