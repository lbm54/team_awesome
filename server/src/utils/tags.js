import Table from "../table";
let tagTable = new Table("tags");

//for inserting event and group tags
//whichTableName right now expects either "groups" or "events"
let insertTags = async function(whichTableName, id, tags) {
  try {

    //we have support for tags for events and tags for groups
    let insertObject = {};
    if (whichTableName === "events") insertObject["event_id"] = id;
    else insertObject["group_id"] = id;
    let whichTable = new Table(`${whichTableName}_tags`);

    //finding the tag id and inserting it into either groups_tags or events_tags junction table
    tags.forEach(async tag => {
      insertObject["tag_id"] = tag.id;      
      await whichTable.insert(insertObject);
    });
  } catch (err) {

    //duplicate tags 
    if (err.errno === 1062) {
      throw "You tried to attach duplicate tags; have attached just one and returning";
    } else throw err;
  }
};

//whichTableName expects either "events" or "groups"
let getTags = async function(whichTableName, id) {
  let whichProcedure = "spGetEventsTags";
  if (whichTableName === "groups") whichProcedure = "spGetGroupsTags";

  let tagResultSet = await tagTable.callProcedure(whichProcedure, id);
  let tags = [];
  tagResultSet[0].forEach((tag) => {
    tags.push(tag);
  })
  return tags;
}

let deleteJunctionTags = async function(whichTableName, id) {
  let whichTable = new Table(`${whichTableName}_tags`);
  let key = (whichTableName === "groups") ? "group_id" : "event_id";
  whichTable.deleteAll(key, id);
}

//whichTableName expects either "events" or "groups"
let updateTags = async function(whichTableName, tags, id) {
  deleteJunctionTags(whichTableName, id);
  insertTags(whichTableName, id, tags);
}

export { insertTags, getTags, updateTags };
