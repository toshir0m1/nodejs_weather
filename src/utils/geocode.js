const request = require('postman-request');

const mapboxAPI_template_URL = 'http://api.mapbox.com/geocoding/v5/mapbox.places/%where%.json?access_token=pk.eyJ1Ijoicm9tYWludmFsZXJpIiwiYSI6ImNsOGtiam5yZzA2YmQzdmxhY2pjdGNsdnMifQ.3NiLT5qt1Q3TsX2ODeZMcg&types=place&limit=1';

const geocodingCall = (locationString, callback) => {
    request(
        mapboxAPI_template_URL.replace('%where%', locationString),
        {
            json: true
        },
        (error, { body } = {}) => {
            if (error) {
                callback('Low level geocoding call error: ' + error.message);
            } else if (body.features.length === 0) {
                callback('No location has been found for "' + locationString + '"');
            } else {
                callback(undefined ,{
                    location: body.features[0].place_name,
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0]
                });
            }
        }
    )
};

module.exports = geocodingCall;