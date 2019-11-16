const request = require('request');

const forecast = ({ latitude, longitude, location, day } = {}, callback) => {
    const url = 'https://api.darksky.net/forecast/cf01a076ece75b0e9fd98e5834d6eb55/' + latitude + ',' + longitude + ',' + day
    request({ url: url, json: true }, (err, res) => { // json: true returns data in json format so no need for parser
        if (err) { //handles errors from the request
            callback('Error: Unable to connect to weather services.');
        } else if (res.body.error) { //handles errors from the API
            callback('Error: Unable to find location');
        } else {
            const data = res.body.currently;
            callback(
                undefined,
               {
                day: day,
                temperature: data.temperature,
                location: location,
                summary: data.summary,
                icon: data.icon,
               }
            );
        }
    });
}

module.exports = forecast;