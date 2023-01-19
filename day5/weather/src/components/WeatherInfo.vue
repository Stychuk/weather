<template>
    <div class="main_info">
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
        weather:[]
      }
      },
      mounted(){
        axios.get("https://api.openweathermap.org/data/2.5/weather?q="+this.cityName+"&appid=7914d5a440960cfd5df3bd0388a7ad0f", {
                          units: "metric",
                })
                .then((response)=>{
                    console.log(response.data);
                    this.weather = response.data;
                    
                })
      },
      methods:{

      },
  
  }
  </script>

  <style>
    .main_info {
        margin-top: 120%;
    }
    tr {
        font-size: 20px;
    }
    .img {
        width: 10%;
    }
  </style>