
const API_KEY = '57693c20cc9de93006be32fd645ff9bb';
// const apiUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
// const geoUrlUS = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},${country}&limit=5&appid=${API_KEY}`

const getCoordinates = async () => {
  let city = "London";
  const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
 fetch(geoUrl).then(function(response) {
  return response.json();
 }).then(function(data) {
  console.log(data)
 })
}; 

getCoordinates();

const getWeather = async () => {
  let lat = '44.34';
  let lon = '10.99';
  const weatherUrl = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  fetch(weatherUrl).then(function(res) {
    return res.json()
  }).then(function(data) {
    console.log(data)
  })

}

getWeather();

// Write a function that takes in a string and returns true if it's a pangram or false otherwise.
// Pangram: a sentence that contains every letter in the alphabet.

// Ex:
// Input: "Watch Jeopardy, Alex Trebek's fun TV quiz game"
// Output: true

// Input: "Five hexing wizard bots jump quickly"
// Output: true

// Input: "JavaScript is the best"
// Output: false


// fetch().then(function (response) {
//   return response.json();
// }) .then(function(data) {
//   console.log(data)
// })