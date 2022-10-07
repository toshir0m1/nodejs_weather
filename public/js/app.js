let weatherForm = document.querySelector('form');
let locationInput = document.querySelector('input');
let forecastDiv = document.querySelector('div#forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    forecastDiv.innerHTML = 'Loading...';

    const link = '/weather?address=' + locationInput.value;
    fetch(link).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                forecastDiv.innerHTML = data.error;
            } else {
                forecastDiv.innerHTML = [data.location, data.forecast].join('<br>');
            }
        });
    });
});