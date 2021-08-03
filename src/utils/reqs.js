import http from '../utils/http';

export default {
  async readAllContacts() {
    let ret = await http.get('/api/readAll');
    return ret.data;
  },
};
