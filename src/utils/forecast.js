const request = require('request')

const forecast = (lat, long, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=62fd309d63e502087939835b23ac0eef&query=' + lat + ',' + long 

  request({url, json:true}, (error,{body}) => {
    if(error){
      callback('unable to connect to location services', undefined)
    } else if (body.error) {
      callback('Unable to find location', undefined)
    } else { 
      callback(undefined, body.current.weather_descriptions[0] + ". it is currently "+ body.current.temperature + " degrees out. Feels like " +body.current.feelslike +" degrees. There is a " + body.current.precip + " chance of rain.")
    }
  })
}

module.exports = forecast

//previous code without a callbacl fn ehich is not reusable


// const url = 'http://api.weatherstack.com/current?access_key=62fd309d63e502087939835b23ac0eef&query=37.8267,-122.4233&units=f'

// request({url: url, json: true}, (error, response) => {
//   if(error){
//     console.log('Unable to connect to weather service!')
//   } else if(response.body.error){
//     console.log('Unable to find location')
//   } else {
//     console.log(response.body.current.weather_descriptions[0] + ". it is currently "+ response.body.current.temperature + " degrees out. There is a " + response.body.current.precip + " chance of rain")
//   }
// })