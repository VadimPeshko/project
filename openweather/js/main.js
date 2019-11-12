const btn = document.querySelector('.btn');
btn.addEventListener('click', (event) => {
  event.preventDefault();
  let input = document.querySelector('.form-control');
  let query = input.value.toString();
  getData(query);
  clearInput(input);
});

function clearInput(input) {
  input = document.querySelector('.form-control').value = '';
};

function getData(query){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=5abf1d6dd6c71387e5f9f28ea8764f39`);

  xhr.responseType = 'json';

  xhr.onload = () => {
    renderData(xhr.response);
  }

  xhr.send();
};

function renderData(resp){
  let list = document.querySelector('.forcast-list');
  console.log(resp);
  let template = `
  <div class="forcast-list__cards d-flex justify-content-center">
          <div class="forcast-list__img">
            <img src="./img/sunny.svg" alt="">
          </div>
          <div class="forcast-list__title ml-5">
            <li><strong>${resp.name}, ${resp.sys.country}</strong></li>
            <li>${resp.weather[0].description}</li>
            <li>${(parseFloat(resp.main.temp) - parseFloat(273,15)).toFixed(1)}&deg;C</li>
            <li>Temperature from ${(parseFloat(resp.main.temp_min) - parseFloat(273,15)).toFixed(1)} to ${(parseFloat(resp.main.temp_max) - parseFloat(273,15)).toFixed(1)}&deg;C</li>
            <li>Wind ${resp.wind.speed} m/s, clouds ${resp.clouds.all} %</li>
            <li>1012 hpa</li>
            <li>Geo coords [${resp.coord.lat}, ${resp.coord.lon}]</li>
          </div>
        </div>`;
  list.insertAdjacentHTML('beforeend', template);
};