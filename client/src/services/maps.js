import { resolve } from "path";

function giveMePosition(address_line_one, city, state, zip) {
  let promise = new Promise((resolve, reject) => {
    let geocoder = new google.maps.Geocoder();
    let address = `${address_line_one}, ${city}, ${state} ${zip}`;
    let position = {};
    geocoder.geocode({ address: address }, (results, status) => {
      if (status == google.maps.GeocoderStatus.OK) {
        position["lat"] = results[0].geometry.location.lat();
        position["lng"] = results[0].geometry.location.lng();
        resolve(position);
      } else {
          return reject("Geocode was not successful: " + status);
      }
    });
  })
  
  return promise;
}

export { giveMePosition };
