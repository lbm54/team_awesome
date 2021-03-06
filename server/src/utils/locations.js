import Table from '../table';
let locationTable = new Table('Locations');

let insertLocation = async function(address_line_one, address_line_two, city, state, zip, lat, lng) {
    try {
        let insertObject = {address_line_one, address_line_two, city, state, zip, lat, lng};
        return (await locationTable.insert(insertObject)).id;
    } catch (err) {
        throw err;
    }
}

let getLocationId = async function(name) {
    try {
        let result = await locationTable.find({name: name});
        return result[0]["id"];
    } catch (err) {
        throw "This location doesn't exist in the db";
    }
}

let getLocation = async function(id) {
    try {
        let result = await locationTable.getOne(id);
        return result;
    } catch (err) {
        throw "This location doesn't exist in the db";
    }
}

let updateLocation = async function(location) {
    try {
        console.log(location);
        let result = await locationTable.update(location.id, location)
        return result;
    } catch (err) {
        throw "This location doesn't exist in the db";
    }
}

export { insertLocation, getLocationId, getLocation, updateLocation };