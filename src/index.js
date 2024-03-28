import {
    alert,
    defaultModules,
  } from '../node_modules/@pnotify/core/dist/PNotify.js';
const debounce = require('lodash.debounce');
const input = document.querySelector(".country")
const wrap = document.querySelector(".countryWrap")
const countries = document.querySelector(".countryList")
input.addEventListener("input", debounce(takeInfo, 500))
const BASE_URL = "https://restcountries.com/v3.1/name"

function fetchCountries(searchQuery){
    const data = fetch(`${BASE_URL}/${searchQuery}`)
    return data
    // const country = input.value
    // getCountry(api).then((response) => response.json()).then((data) => {createMarkUp(data)})
}

function takeInfo(e){
    const country = e.target.value.trim()
    fetchCountries(country).then((response) => response.json()).then((data) => {
        if(data.length >= 10){
            wrap.innerHTML = ""
            countries.innerHTML = ""
            alert({
                text: 'Too many matches found. Please enter a more specific query!',
              });
            return
        }
        if(data.length === 1){
            countryMarkUp(data)
            return
        } 
        if(data.length >= 2){
            countriesMarkUp(data)
        }
    })
}

function countriesMarkUp(data){
    const markUp = data.map(({altSpellings}) => {
        return `<li>${altSpellings[1]}</li>`
    })
    countries.innerHTML = markUp.join("")
    wrap.innerHTML = ""
}
function countryMarkUp(data){
    const markUp = data.map((contry) => {
        return `<h2>${contry.altSpellings[1]}</h2>
        <p>Capital: ${contry.capital[0]}</p>
        <p>Population: ${contry.population}</p>
        <p>Languages: ${Object.values(contry.languages)}</p>
        <img src=${contry.flags.png}>`
    })
    wrap.innerHTML = markUp.join("")
    countries.innerHTML = ""
}