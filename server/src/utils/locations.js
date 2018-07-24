import Table from '../table';
let locationTable = new Table('Locations');

let insertLocation = async function(address_line_one, address_line_two, city, state, zip) {
    try {
        let insertObject = {address_line_one, address_line_two, city, state, zip};
        return (await locationTable.insert(insertObject)).id;
    } catch (err) {
        console.log(err);
    }
}

let getLocationId = async function(name) {
    try {
        return (await locationTable.find({name})).id;
    } catch (err) {
        console.log(err);
    }
}

export { insertLocation, getLocationId };