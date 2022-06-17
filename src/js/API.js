export default class API {
  constructor(url) {
    this.url = url;
    this.contentTypeHeader = { 'Content-Type': 'application/json' };
  }

  allUser() {
    return fetch(`${this.url}/allUser`, {
      method: 'GET',
      headers: this.contentTypeHeader,
    });
  }

  newUser(name) {
    return fetch(`${this.url}/newUser?name=${name}`, {
      method: 'POST',
      headers: this.contentTypeHeader,
    });
  }

  deleteUser(id) {
    return fetch(`${this.url}/deleteUser?id=${id}`, {
      method: 'DELETE',
      headers: this.contentTypeHeader,
    });
  }

  allMessage() {
    return fetch(`${this.url}/allMessage`, {
      method: 'GET',
      headers: this.contentTypeHeader,
    });
  }

  newMessage(idUser, userName, message) {
    return fetch(`${this.url}/newMessage?idUser=${idUser}&userName=${userName}&message=${message}`, {
      method: 'POST',
      headers: this.contentTypeHeader,
    });
  }
}
