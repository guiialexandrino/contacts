import http from '../utils/http';

export default {
  async readAllContacts() {
    let ret = await http.get('/api/readAll');
    return ret.data;
  },

  async addContact(data) {
    let ret = await http.post('/api/addContact', {
      name: data.name,
      number: data.number,
    });
    return ret.data;
  },

  async editContact(data) {
    let ret = await http.post('/api/editContact', {
      id: data.id,
      name: data.name,
      number: data.number,
    });
    return ret.data;
  },

  async deleteContact(id) {
    let ret = await http.delete(`/api/deleteContact/${id}`);
    return ret.data;
  },
};
