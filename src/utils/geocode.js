const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibG9raXRhMjgyIiwiYSI6ImNrb3p1cG1vYzEzOXQyd21wbW0zYXF0Y3UifQ.6RN0BQicu8qe_Y7Wp0NirQ&limit=1'

  request({url, json:true}, (error, {body}) => {

    if(error){
      callback('Unable to connect to location services!', undefined)
    } else if(body.features.length === 0) {
      callback('Unable to find location. Try another search.', undefined)
    } else {
        callback(undefined, {
        latitude:body.features[0].center[1],
        longtitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}


module.exports = geocode

//geocoding - before callback abstraction. This code is non reusable, hence we use callabcks as shown above so that it can be reused

// const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/philadelphia.json?access_token=pk.eyJ1IjoibG9raXRhMjgyIiwiYSI6ImNrb3p1cG1vYzEzOXQyd21wbW0zYXF0Y3UifQ.6RN0BQicu8qe_Y7Wp0NirQ&limit=1'

// request({url: geocodeUrl, json: true}, (error, response) => {
//   if(error){
//     console.log('Unable to connect to location services')
//   } else if(response.body.features.length === 0){
//     console.log('Unable to find location. Try another search')
//   }
//   else {
//     const latitude = response.body.features[0].center[1]
//     const longitude = response.body.features[0].center[0]
//     console.log(latitude, longitude)
//   }
// })