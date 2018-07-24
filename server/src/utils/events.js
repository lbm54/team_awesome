import Table from '../table';
let eventTable = new Table('Events');

let insertEvent = async function(start_time, end_time, start_date, end_date, location_id, name, thumbnail_image_link) {
    try {
        let insertObject = {start_time, end_time, start_date, end_date, location_id, name, thumbnail_image_link};
        return (await eventTable.insert(insertObject)).id;
    } catch (err) {
        console.log(err);
    }
}

export { insertEvent };