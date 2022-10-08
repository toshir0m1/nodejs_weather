const request = require('postman-request');

const weatherstackAPI_template_URL = 'http://api.weatherstack.com/current?access_key=24af7e0e652de6dfdf1798821ed30337&query=%lat%,%lon%';

const weatherCall = (latitude, longitude, callback) => {
    const url = weatherstackAPI_template_URL.replace('%lat%', latitude).replace('%lon%', longitude);

    request(
        url,
        {
            json: true
        },
        (callBackError, { error, body } = {}) => {
            if (callBackError) {
                callback({
                    error: 'Low level forecast call error : ' + callBackError.message
                });
            } else if (error) {
                callback({
                    error: 'There is no data for this location'
                });
            } else {
                const {weather_descriptions, temperature, feelslike} = body.current;
                const forecast = (temperature == feelslike) ?
                    'The weather is currently "' + weather_descriptions + '". It is ' + temperature + ' degrees out and it feels just the same.':
                    'The weather is currently "' + weather_descriptions + '". It is ' + temperature + ' degrees out but it feels like ' + feelslike + '.';
                callback(undefined, {
                    forecast
                });
            }
        }
    )
};

module.exports = weatherCall;