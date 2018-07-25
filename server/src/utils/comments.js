import Table from "../table";
let commentsTable = new Table("comments");

//whichTableName expects either "events" or "groups"
//key refers to either group_id or event_id
let getComments = async function(key, id) {
  let object = {};
  object[key] = id;
  let commentsResultSet = await commentsTable.find(object);
  return commentsResultSet;
}

export { getComments };
