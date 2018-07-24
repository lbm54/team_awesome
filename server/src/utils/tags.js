import Table from "../table";
let tagTable = new Table("tags");

let insertTag = async function(name) {
  try {
    return (await tagTable.insert({ name })).id;
  } catch (err) {
    console.log(err);
  }
};

let handleTags = async function(whichTableName, id, tags) {
    let insertObject = {};
    if (whichTableName === "events") {
        insertObject[event_id] = id;
        whichTableName === "events_tags";
    } else {
        insertObject[group_id] = id;
        whichTableName === "groups_tags";
    }
  let whichTable = new Table(whichTableName);
  tags.forEach(async tag => {
    insertObject[tag_id] = tag.id ? tag.id : await insertTag(tag.name);
    await whichTable.insert(insertObject);
  });
};

export { insertTag, handleTags };
