import * as baseService from "./base";

function all() {
  return baseService.get("/api/events");
}

function one(id) {
  return baseService.get(`/api/events/${id}`);
}

function insert(data) {
  return baseService.post("/api/events", data);
}

function update(id, data) {
  return baseService.put(`/api/events/${id}`, data);
}

function destroy(id) {
  return baseService.destroy(`/api/events/${id}`);
}

function formatEvent(event) {
  event.start_time = event.start_time.replace("T", " ");
  event.end_time = event.end_time.replace("T", " ");
  event.start_time = event.start_time.substr(0, 19);
  event.end_time = event.end_time.substr(0, 19);
  if (!event.thumbnail_image_link)
    event.thumbnail_image_link = `/images/default_event_image.png`;
  return event;
}

export { all, one, insert, update, destroy, formatEvent };
