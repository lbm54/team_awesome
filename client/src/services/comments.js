import * as baseService from "./base";

function all() {
  return baseService.get("/api/comments");
}

function one(id) {
  return baseService.get(`/api/comments/${id}`);
}

function insert(data) {
  return baseService.post("/api/comments", data);
}

function update(id, data) {
  return baseService.put(`/api/comments/${id}`, data);
}

function destroy(id) {
  return baseService.destroy(`/api/comments/${id}`);
}

export { all, one, insert, update, destroy};
