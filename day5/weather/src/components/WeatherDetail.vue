<template>
    <div class="main">
      <h1>Weather</h1>
      <table>
        <tr>
          <td>
            <input type="text" v-model="cityAdd" class="input">
            <br>
            <button @click="addCity" class="btn">Додати</button>
          </td>
          <td> 
            <select v-model="city_weather" class="input">
              <option v-for="city in wcities" v-bind:key="city" v-bind:value="city">{{city}}</option>
            </select>
            <br>
            <router-link v-bind:to="'/weather-info/'+city_weather">
                <button @click="Weather()" class="btn">Погода</button>
            </router-link>
          </td>
        </tr>
      </table>
      <table v-if="weather.cod > 0" class="txt">
        <tr>
            <img src="src/city.svg" class="img">
            City: {{weather.name}}
        </tr>
        <tr>
            <img src="src/country.svg" class="img">
            Country: {{weather.sys.country}}
        </tr>
        <tr>
            <img src="src/weather.svg" class="img">
            Weather at all: {{weather.weather[0].main}}
        </tr>
        <tr>
            <img src="src/temperature.svg" class="img">
            Temperature: {{(weather.main.temp-273.15).toFixed(2)}} C
        </tr>
        <tr>
            <img src="src/temperature_feels_like.svg" class="img">
            Feels like: {{(weather.main.feels_like-273.15).toFixed(2)}} C
        </tr>
        <tr>
            <img src="src/temperature_min.svg" class="img">
            Min. temperature: {{(weather.main.temp_min-273.15).toFixed(2)}} C
        </tr>
        <tr>
            <img src="src/temperature_max.svg" class="img">
            Max. temperature: {{(weather.main.temp_max-273.15).toFixed(2)}} C
        </tr>
        <tr>
            <img src="src/pressure.svg" class="img">
            Pressure: {{weather.main.pressure}} P
        </tr>
        <tr>
            <img src="src/wind_speed.svg" class="img">
            Wind speed: {{weather.wind.speed}}
        </tr>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props:{
           cityName:'',
       },
    data() {
      return {
        cityAdd:"",
        city_weather:"",
        wcities:[],
        weather:[],
        latitude:0,
        longitude:0,
        link:""
      }
      },
      mounted(){
        if(localStorage.getItem("wcities") !== '') {
          this.wcities = JSON.parse(localStorage.getItem("wcities") || "[]");
        };
        let getPosition = function(options) {
          return new Promise(function (resolve, reject) {
            navigator.geolocation.getCurrentPosition(resolve, reject, options);
          });
        };
        getPosition()
        .then((position)=>{
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;
          console.log(this.latitude, this.longitude);
          this.link = "https://api.openweathermap.org/data/2.5/weather?lat="+ this.latitude.toString()+"&lon="+ this.longitude.toString()+"&appid=7914d5a440960cfd5df3bd0388a7ad0f";
          axios.get(this.link, {
            units: "metric",
          })
          .then((response)=>{
            console.log(response.data);
            this.weather = response.data;
          })
        })
        .catch((err) => {
          console.error(err.message);
        });
      },
      methods:{
        Weather() {
          axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.city_weather+"&appid=7914d5a440960cfd5df3bd0388a7ad0f", {
            units: "metric",
          })
          .then((response)=>{
            console.log(response.data);
            this.weather = response.data;
          })
        },
        addCity(){
          this.wcities.push(this.cityAdd)
          localStorage.setItem("wcities",JSON.stringify(this.wcities))
        },
      },
  
  }
  </script>

  <style>
    body {
        background: url(src/pogoda.jpg) no-repeat center center fixed;
        background-size: cover;
        margin-left: auto;
        margin-right: auto;
        width: 15em;
    }
    .main {
        margin-top: 70%;
    }
    .btn {
        background-color: yellow;
        padding: 5px 5px;
        margin-top: 5px;
        font-size: 16px;
    }
    .input {
        font-size: 16px;
        padding: 4px 4px;
    }
    tr {
        font-size: 20px;
    }
    .img {
        width: 10%;
    }
  </style>