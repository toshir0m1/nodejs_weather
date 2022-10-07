const path = require('path');

const express = require('express');
const app = express();
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const weather = require('./utils/weather');

const publicDir = path.join(__dirname, '../public');
const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Crazy weather!',
        name: 'Romain'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'aBoUt PaGe',
        name: 'Romain'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help!',
        name: 'Romain',
        message: 'You\'re not lost. You\'re dead.'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        }

        weather(latitude, longitude, (error, {forecast} = {}) => {
            if (error) {
                return res.send({ error });
            }

            res.send({
                query: req.query.address,
                location,
                forecast
            });

            /*res.render('weather', {
                title: 'Your weather results',
                name: 'Mapbox & Weatherstack',
                query: req.query.address,
                location,
                forecast
            });*/
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 HELP NOT FOUND',
        name: 'Romain',
        missing: 'Help article'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 NOT FOUND',
        name: 'Romain',
        missing: 'Page'
    });
});

app.listen('3000', () => {
    console.log('Started listening on port 3000...');
});
