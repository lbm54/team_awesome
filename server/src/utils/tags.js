import Table from "../table";
let tagTable = new Table("tags");

let insertTag = async function(name) {
  try {
    return (await tagTable.insert({ name })).id;
  } catch (err) {

    //tag name has already been taken so getting the other tag and returning its id
    if ((err.errno = 1062)) {
      let tag = await tagTable.find({ name });
      return tag[0]["id"];
    } else throw err;
  }
};

let handleTags = async function(whichTableName, id, tags) {
  try {

    //we have support for tags for events and tags for groups
    let insertObject = {};
    if (whichTableName === "events") {
      insertObject["event_id"] = id;
      whichTableName = "events_tags";
    } else {
      insertObject["group_id"] = id;
      whichTableName = "groups_tags";
    }
    let whichTable = new Table(whichTableName);

    //finding the tag id and inserting it into either groups_tags or events_tags junction table
    tags.forEach(async tag => {
      insertObject["tag_id"] = tag.id ? tag.id : await insertTag(tag.name);
      await whichTable.insert(insertObject);
    });
  } catch (err) {

    //duplicate tags 
    if ((err.errno = 1062)) {
      console.log("You tried to attach duplicate tags; have attached just one and returning");
    } else console.log(err);
  }
};

export { insertTag, handleTags };
