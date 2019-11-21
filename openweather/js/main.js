const btn = document.querySelector('.btn');
btn.addEventListener('click', (event) => {
  event.preventDefault();
  let input = document.querySelector('.form-control');
  let query = input.value.toString().trim();
  getData(query);
  clearInput(input);
  removeClass('.alert');
  removeClass('.forcast-list__cards');
});

function clearInput(input) {
  input = document.querySelector('.form-control').value = '';
};

function getData(query){
  let xhr = new XMLHttpRequest();
  xhr.open('GET', `http://api.openweathermap.org/data/2.5/weather?q=${query}&APPID=5abf1d6dd6c71387e5f9f28ea8764f39`);

  xhr.responseType = 'json';

  xhr.onload = () => {
    if(xhr.status === 200){
      renderData(xhr.response);
    }else {
      renderError(xhr.response.message);
    }
  }

  xhr.send();
};

function renderData(resp){
  let list = document.querySelector('.forcast-list');
  console.log(resp);
  let template = `
  <div class="forcast-list__cards d-flex justify-content-center">
          <div class="forcast-list__img">
            <img src=${addImg(resp.weather[0].description)} alt="">
          </div>
          <div class="forcast-list__title ml-5">
            <li><strong>${resp.name}, ${resp.sys.country}</strong></li>
            <li>${resp.weather[0].description}</li>
            <li>${(parseFloat(resp.main.temp) - parseFloat(273,15)).toFixed(1)}&deg;C</li>
            <li>Temperature from ${(parseFloat(resp.main.temp_min) - parseFloat(273,15)).toFixed(1)} to ${(parseFloat(resp.main.temp_max) - parseFloat(273,15)).toFixed(1)}&deg;C</li>
            <li>Wind ${resp.wind.speed} m/s, clouds ${resp.clouds.all} %</li>
            <li>${resp.main.pressure} hpa</li>
            <li>Geo coords [${resp.coord.lat}, ${resp.coord.lon}]</li>
          </div>
        </div>`;
  list.insertAdjacentHTML('beforeend', template);

  function addImg(description){
    if (description === 'overcast clouds'){
      return './img/cloud.svg';
    }else if (description === 'mist' || description === 'haze'){
      return './img/mist.svg';
    }else if (description === 'clear sky'){
      return './img/sunny.svg';
    }else if (description === 'few clouds'){
      return './img/cloudy.svg';
    }else if (description === 'scattered clouds'){
      return './img/scatteredclouds.svg';
    }else if (description === 'light rain'){
      return './img/lrain.svg';
    }else if (description === 'broken clouds'){
      return './img/brokencloud.svg';
    }
  };

};

function renderError(msg){
  let list = document.querySelector('.forcast-list');
  let template = `
  <div class="alert alert-warning alert-dismissible fade show" role="alert">
    <strong>${msg}</strong>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`
  list.insertAdjacentHTML('beforeend', template);
}

function removeClass(className){
  let item = document.querySelectorAll(`${className}`);
  item.forEach(element => {
    element.remove();
  });
}