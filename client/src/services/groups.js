import * as baseService from './base';

function all() {
    return baseService.get('/api/groups');
}

function one(id) {
    return baseService.get(`/api/groups/${id}`);
}

function insert(data) {
    return baseService.post('/api/groups', data);
}

function update(id, data) {
    return baseService.put(`/api/groups/${id}`, data);
}

function destroy(id) {
    return baseService.destroy(`/api/groups/${id}`);
}

export { all, one, insert, update, destroy };