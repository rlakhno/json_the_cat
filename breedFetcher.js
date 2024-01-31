const request = require('request');
const args = process.argv.slice(2);

// define a function fetchCatData that takes a callback function as an argument.
const fetchCatData = function(breed, callback) {
  // Inside fetchCatData, specify the API endpoint (apiUrl)
  const apiUrl = `https://api.thecatapi.com/v1/breeds/search?q=${breed}`;
  // use request to make a GET request to the API endpoint.
  request(apiUrl, (error, response, body) => {
    if (error) {
      callback(error, null);
    } else {
      if (response.statusCode === 200) {
        try {
          const data = JSON.parse(body);
          callback(null, data);
        } catch (parseError) {
          callback(parseError, null);
        }
      } else {
        callback(`Error fetching cat data status code: ${response.statusCode}`, null);
      }

    }
  });

};

fetchCatData(args, (error, data) => {
  if (error) {
    console.log('Error fetching Cat data: ', error);
  } else {
    console.log(data[0].description);
  }
});