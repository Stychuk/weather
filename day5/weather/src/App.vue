<template>
  <div>
    <h1>Weather</h1>
    <table>
      <tr>
        <td>
          <input type="text" v-model="cityAdd">
          <br>
          <button @click="addCity">Додати</button>
        </td>
        <td> 
          <select v-model="city_weather">
            <option v-for="city in wcities" v-bind:key="city" v-bind:value="city">{{city}}</option>
          </select>
          <br>
          <button @click="Weather()">Погода</button>
        </td>
      </tr>
    </table>
    <table v-if="weather.cod > 0">
      <tr>City: {{weather.name}}</tr>
      <tr>Country: {{weather.sys.country}}</tr>
      <tr>Weather at all: {{weather.weather[0].main}}</tr>
      <tr>Temperature: {{weather.main.temp-273.15}} C</tr>
      <tr>Feels like: {{weather.main.feels_like-273.15}} C</tr>
      <tr>Min. temperature: {{weather.main.temp_min-273.15}} C</tr>
      <tr>Max. temperature: {{weather.main.temp_max-273.15}} C</tr>
      <tr>Pressure: {{weather.main.pressure}} P</tr>
      <tr>Wind speed: {{weather.wind.speed}}</tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cityAdd:"",
      city_weather:"",
      wcities:[],
      weather:[],
      latitude:0,
      longitude:0,
      link:""
    }},
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
<style scoped>
</style>